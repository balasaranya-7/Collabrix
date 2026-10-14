import { CreativeBrief } from '../models/CreativeBrief.js';
import { Proposal } from '../models/Proposal.js';
import { Collaboration } from '../models/Collaboration.js';
import { SavedCreator } from '../models/SavedCreator.js';
import { CreatorProfile } from '../models/CreatorProfile.js';
import { PortfolioItem } from '../models/PortfolioItem.js';

// @desc    Get Brand Dashboard stats & data
// @route   GET /api/dashboard/brand
export const getBrandDashboardStats = async (req, res, next) => {
  try {
    const brandId = req.user._id;

    const [activeBriefsCount, totalProposalsCount, savedCreatorsCount, collaborationsCount, recentBriefs, topCreators] =
      await Promise.all([
        CreativeBrief.countDocuments({ brand: brandId, status: { $in: ['active', 'in_progress'] } }),
        Proposal.countDocuments({ brand: brandId }),
        SavedCreator.countDocuments({ brand: brandId }),
        Collaboration.countDocuments({ brand: brandId, status: { $in: ['active', 'in_production', 'review', 'completed'] } }),
        CreativeBrief.find({ brand: brandId }).sort({ createdAt: -1 }).limit(5),
        CreatorProfile.find().sort({ 'metrics.matchRating': -1, 'metrics.totalCollaborations': -1 }).limit(4),
      ]);

    // Proposals breakdown
    const pendingProposals = await Proposal.countDocuments({ brand: brandId, status: 'pending' });
    const acceptedProposals = await Proposal.countDocuments({ brand: brandId, status: 'accepted' });

    res.status(200).json({
      success: true,
      stats: {
        activeCampaigns: activeBriefsCount,
        totalProposals: totalProposalsCount,
        pendingProposals,
        acceptedProposals,
        savedCreators: savedCreatorsCount,
        successfulCollaborations: collaborationsCount,
      },
      recentBriefs,
      suggestedCreators: topCreators,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Creator Dashboard stats & data
// @route   GET /api/dashboard/creator
export const getCreatorDashboardStats = async (req, res, next) => {
  try {
    const creatorProfile = await CreatorProfile.findOne({ user: req.user._id });
    if (!creatorProfile) {
      return res.status(200).json({
        success: true,
        stats: {
          campaignOpportunities: 0,
          receivedProposals: 0,
          pendingProposals: 0,
          activeCollaborations: 0,
          portfolioCount: 0,
        },
        opportunities: [],
        proposals: [],
        portfolio: [],
      });
    }

    const [opportunitiesCount, proposalsCount, pendingCount, collaborationsCount, portfolioCount, recentOpportunities, recentProposals, portfolioItems] =
      await Promise.all([
        CreativeBrief.countDocuments({ status: 'active' }),
        Proposal.countDocuments({ creator: creatorProfile._id }),
        Proposal.countDocuments({ creator: creatorProfile._id, status: 'pending' }),
        Collaboration.countDocuments({ creator: creatorProfile._id, status: { $in: ['active', 'in_production', 'review'] } }),
        PortfolioItem.countDocuments({ creator: creatorProfile._id }),
        CreativeBrief.find({ status: 'active' }).sort({ createdAt: -1 }).limit(5).populate('brand', 'name companyName avatar'),
        Proposal.find({ creator: creatorProfile._id }).sort({ createdAt: -1 }).limit(5).populate('brand', 'name companyName avatar').populate('brief', 'title budget'),
        PortfolioItem.find({ creator: creatorProfile._id }).limit(6),
      ]);

    res.status(200).json({
      success: true,
      creatorProfile,
      stats: {
        campaignOpportunities: opportunitiesCount,
        receivedProposals: proposalsCount,
        pendingProposals: pendingCount,
        activeCollaborations: collaborationsCount,
        portfolioCount,
        profileViews: creatorProfile.metrics?.profileViews || 120,
        proposalAcceptance: creatorProfile.metrics?.proposalAcceptanceRate || 85,
        matchRating: creatorProfile.metrics?.matchRating || 95,
      },
      latestOpportunities: recentOpportunities,
      recentProposals,
      portfolioPreview: portfolioItems,
    });
  } catch (error) {
    next(error);
  }
};
