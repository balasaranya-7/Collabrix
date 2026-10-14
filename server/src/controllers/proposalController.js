import { Proposal } from '../models/Proposal.js';
import { CreatorProfile } from '../models/CreatorProfile.js';
import { Collaboration } from '../models/Collaboration.js';
import { Notification } from '../models/Notification.js';

// @desc    Send a collaboration proposal from Brand to Creator
// @route   POST /api/proposals
export const createProposal = async (req, res, next) => {
  try {
    const { creatorId, briefId, deliverables, compensation, currency, timeline, technicalRequirements, proposedCommercialTerms, message } = req.body;

    const creator = await CreatorProfile.findById(creatorId);
    if (!creator) {
      return res.status(404).json({ success: false, message: 'Target creator profile not found' });
    }

    const proposal = await Proposal.create({
      brand: req.user._id,
      creator: creator._id,
      brief: briefId,
      deliverables: deliverables || 'As specified in brief',
      compensation: Number(compensation) || creator.startingPrice,
      currency: currency || 'INR',
      timeline: timeline || '14 days',
      technicalRequirements: technicalRequirements || '4K UHD, 9:16 vertical, ProRes',
      proposedCommercialTerms: proposedCommercialTerms || 'Digital Paid Ads (1 Year)',
      message,
      status: 'pending',
    });

    // Notify creator
    await Notification.create({
      recipient: creator.user,
      sender: req.user._id,
      type: 'proposal_received',
      title: 'New Collaboration Proposal Received',
      message: `${req.user.companyName || req.user.name} sent you an engagement proposal for ₹${proposal.compensation.toLocaleString()}`,
      link: `/creator/proposals`,
    });

    res.status(201).json({
      success: true,
      message: 'Proposal dispatched to creator successfully',
      proposal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get proposals for logged-in user (role aware)
// @route   GET /api/proposals
export const getProposals = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === 'brand') {
      query.brand = req.user._id;
    } else if (req.user.role === 'creator') {
      const creatorProfile = await CreatorProfile.findOne({ user: req.user._id });
      if (!creatorProfile) {
        return res.status(200).json({ success: true, count: 0, proposals: [] });
      }
      query.creator = creatorProfile._id;
    }

    const proposals = await Proposal.find(query)
      .sort({ createdAt: -1 })
      .populate('brand', 'name companyName avatar email')
      .populate('creator', 'displayName handle avatar primarySpecialization startingPrice')
      .populate('brief', 'title requiredSpecialization contentType budget');

    res.status(200).json({ success: true, count: proposals.length, proposals });
  } catch (error) {
    next(error);
  }
};

// @desc    Respond to proposal (Creator accepts or declines)
// @route   PATCH /api/proposals/:id/respond
export const respondProposal = async (req, res, next) => {
  try {
    const { status, responseNotes } = req.body; // 'accepted' or 'declined'

    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be accepted or declined' });
    }

    const creatorProfile = await CreatorProfile.findOne({ user: req.user._id });
    if (!creatorProfile) {
      return res.status(403).json({ success: false, message: 'Creator profile required' });
    }

    const proposal = await Proposal.findById(req.params.id)
      .populate('brand', 'name companyName email')
      .populate('creator', 'displayName handle');

    if (!proposal) {
      return res.status(404).json({ success: false, message: 'Proposal not found' });
    }

    if (proposal.creator._id.toString() !== creatorProfile._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized to respond to this proposal' });
    }

    proposal.status = status;
    proposal.responseNotes = responseNotes || '';
    proposal.respondedAt = new Date();
    await proposal.save();

    let collaboration = null;

    if (status === 'accepted') {
      // Create new Collaboration record
      collaboration = await Collaboration.create({
        brand: proposal.brand._id,
        creator: proposal.creator._id,
        brief: proposal.brief,
        proposal: proposal._id,
        status: 'active',
        agreedCompensation: proposal.compensation,
        currency: proposal.currency,
        commercialRightsSummary: proposal.proposedCommercialTerms,
        milestones: [
          { title: 'Concept Frames & Prompt Architecture', dueDate: 'Day 3', status: 'pending' },
          { title: 'Generative Rough Cut & Consistency Check', dueDate: 'Day 7', status: 'pending' },
          { title: 'Final 4K Master & Upscaling Delivery', dueDate: 'Day 12', status: 'pending' },
        ],
      });

      // Update creator metrics
      await CreatorProfile.findByIdAndUpdate(creatorProfile._id, {
        $inc: { 'metrics.totalCollaborations': 1 },
      });

      // Notify brand
      await Notification.create({
        recipient: proposal.brand._id,
        sender: req.user._id,
        type: 'proposal_accepted',
        title: 'Proposal Accepted! Collaboration Started 🎉',
        message: `${proposal.creator.displayName} accepted your proposal for ₹${proposal.compensation.toLocaleString()}. Production workspace is now open!`,
        link: `/brand/collaborations`,
      });
    } else {
      // Notify brand declined
      await Notification.create({
        recipient: proposal.brand._id,
        sender: req.user._id,
        type: 'proposal_declined',
        title: 'Proposal Declined',
        message: `${proposal.creator.displayName} was unable to accept your proposal at this time.`,
        link: `/brand/proposals`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Proposal ${status} successfully`,
      proposal,
      collaboration,
    });
  } catch (error) {
    next(error);
  }
};
