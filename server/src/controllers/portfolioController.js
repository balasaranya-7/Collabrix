import { PortfolioItem } from '../models/PortfolioItem.js';
import { CreatorProfile } from '../models/CreatorProfile.js';

// @desc    Get portfolio items for a creator
// @route   GET /api/portfolio/creator/:creatorId
export const getCreatorPortfolio = async (req, res, next) => {
  try {
    const items = await PortfolioItem.find({ creator: req.params.creatorId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, portfolio: items });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single portfolio item by ID
// @route   GET /api/portfolio/:id
export const getPortfolioItemById = async (req, res, next) => {
  try {
    const item = await PortfolioItem.findById(req.params.id).populate('creator');
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }
    res.status(200).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new portfolio item
// @route   POST /api/portfolio
export const addPortfolioItem = async (req, res, next) => {
  try {
    const profile = await CreatorProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(403).json({ success: false, message: 'Only registered creators can publish portfolio items' });
    }

    const {
      title,
      description,
      category,
      mediaUrl,
      thumbnailUrl,
      mediaType,
      aiToolsModels,
      technicalSkills,
      workflowSummary,
      processPromptNotes,
      visualStyle,
      aspectRatio,
      resolution,
      duration,
      commercialUseStatus,
      rightsNotes,
      ownershipDeclaration,
      tags,
    } = req.body;

    const item = await PortfolioItem.create({
      creator: profile._id,
      title,
      description,
      category: category || 'Generative Video',
      mediaUrl,
      thumbnailUrl: thumbnailUrl || mediaUrl,
      mediaType: mediaType || 'video',
      aiToolsModels: Array.isArray(aiToolsModels) ? aiToolsModels : (aiToolsModels ? aiToolsModels.split(',').map(s => s.trim()) : []),
      technicalSkills: Array.isArray(technicalSkills) ? technicalSkills : (technicalSkills ? technicalSkills.split(',').map(s => s.trim()) : []),
      workflowSummary: workflowSummary || '',
      processPromptNotes: processPromptNotes || '',
      visualStyle: visualStyle || 'Cinematic',
      aspectRatio: aspectRatio || '16:9',
      resolution: resolution || '4K UHD',
      duration: duration || '',
      commercialUseStatus: commercialUseStatus || 'Commercial Ready',
      rightsNotes: rightsNotes || 'Original work created with licensed generative models.',
      ownershipDeclaration: ownershipDeclaration || 'Certified creator output',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(s => s.trim()) : []),
      verificationStatus: 'Self-reported',
    });

    res.status(201).json({ success: true, message: 'Portfolio item added successfully', item });
  } catch (error) {
    next(error);
  }
};

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
export const updatePortfolioItem = async (req, res, next) => {
  try {
    const profile = await CreatorProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(403).json({ success: false, message: 'Creator profile required' });
    }

    const item = await PortfolioItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }

    // Ownership check
    if (item.creator.toString() !== profile._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized: you do not own this portfolio item' });
    }

    const updated = await PortfolioItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Portfolio item updated', item: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
export const deletePortfolioItem = async (req, res, next) => {
  try {
    const profile = await CreatorProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(403).json({ success: false, message: 'Creator profile required' });
    }

    const item = await PortfolioItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }

    // Ownership check
    if (item.creator.toString() !== profile._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized: you do not own this portfolio item' });
    }

    await PortfolioItem.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Portfolio item deleted successfully' });
  } catch (error) {
    next(error);
  }
};
