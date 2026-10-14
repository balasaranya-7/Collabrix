import { CreativeBrief } from '../models/CreativeBrief.js';
import { parseRoughIdeaToBrief } from '../services/briefBuilderService.js';

// @desc    Create a new structured creative brief
// @route   POST /api/briefs
export const createBrief = async (req, res, next) => {
  try {
    const briefData = {
      ...req.body,
      brand: req.user._id,
      brandName: req.body.brandName || req.user.companyName || req.user.name,
    };

    const brief = await CreativeBrief.create(briefData);
    res.status(201).json({ success: true, message: 'Creative brief created successfully', brief });
  } catch (error) {
    next(error);
  }
};

// @desc    Get briefs (with filtering by role/status)
// @route   GET /api/briefs
export const getBriefs = async (req, res, next) => {
  try {
    const query = {};

    // If query says myBriefs and user is logged in
    if (req.query.myBriefs && req.user) {
      query.brand = req.user._id;
    } else if (req.query.status) {
      query.status = req.query.status;
    } else {
      // Default for discovering opportunities: active briefs
      query.status = { $in: ['active', 'in_progress'] };
    }

    if (req.query.specialization && req.query.specialization !== 'All') {
      query.requiredSpecialization = new RegExp(req.query.specialization, 'i');
    }

    const briefs = await CreativeBrief.find(query)
      .sort({ createdAt: -1 })
      .populate('brand', 'name companyName avatar');

    res.status(200).json({ success: true, count: briefs.length, briefs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single creative brief by ID
// @route   GET /api/briefs/:id
export const getBriefById = async (req, res, next) => {
  try {
    const brief = await CreativeBrief.findById(req.params.id).populate('brand', 'name companyName avatar');
    if (!brief) {
      return res.status(404).json({ success: false, message: 'Creative brief not found' });
    }
    res.status(200).json({ success: true, brief });
  } catch (error) {
    next(error);
  }
};

// @desc    Update brief
// @route   PUT /api/briefs/:id
export const updateBrief = async (req, res, next) => {
  try {
    const brief = await CreativeBrief.findById(req.params.id);
    if (!brief) {
      return res.status(404).json({ success: false, message: 'Brief not found' });
    }

    if (brief.brand.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized: only the authoring brand can edit this brief' });
    }

    const updated = await CreativeBrief.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Brief updated successfully', brief: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete brief
// @route   DELETE /api/briefs/:id
export const deleteBrief = async (req, res, next) => {
  try {
    const brief = await CreativeBrief.findById(req.params.id);
    if (!brief) {
      return res.status(404).json({ success: false, message: 'Brief not found' });
    }

    if (brief.brand.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await CreativeBrief.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Brief deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    AI-assisted brief generator from rough creative idea
// @route   POST /api/brief-builder/assist
export const generateAiBrief = async (req, res, next) => {
  try {
    const { ideaPrompt } = req.body;
    if (!ideaPrompt || ideaPrompt.trim() === '') {
      return res.status(400).json({ success: false, message: 'Please provide a rough creative idea prompt' });
    }

    const parsedBriefSuggestion = await parseRoughIdeaToBrief(ideaPrompt);

    res.status(200).json({
      success: true,
      message: 'Idea successfully transformed into structured brief blueprint',
      suggestion: parsedBriefSuggestion,
    });
  } catch (error) {
    next(error);
  }
};
