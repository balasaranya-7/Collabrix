import { Collaboration } from '../models/Collaboration.js';
import { CreatorProfile } from '../models/CreatorProfile.js';
import { Notification } from '../models/Notification.js';

// @desc    Get user collaborations
// @route   GET /api/collaborations
export const getCollaborations = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'brand') {
      query.brand = req.user._id;
    } else {
      const creatorProfile = await CreatorProfile.findOne({ user: req.user._id });
      if (!creatorProfile) {
        return res.status(200).json({ success: true, count: 0, collaborations: [] });
      }
      query.creator = creatorProfile._id;
    }

    const collaborations = await Collaboration.find(query)
      .sort({ updatedAt: -1 })
      .populate('brand', 'name companyName avatar email')
      .populate('creator', 'displayName handle avatar primarySpecialization')
      .populate('brief', 'title requiredSpecialization contentType budget');

    res.status(200).json({ success: true, count: collaborations.length, collaborations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single collaboration by ID
// @route   GET /api/collaborations/:id
export const getCollaborationById = async (req, res, next) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id)
      .populate('brand', 'name companyName avatar email')
      .populate('creator', 'displayName handle avatar primarySpecialization technicalSkills aiToolsModels')
      .populate('brief', 'title description requiredSpecialization contentType visualStyle aspectRatio resolution deliverablesCount budget deadline commercialRightsScope')
      .populate('proposal');

    if (!collaboration) {
      return res.status(404).json({ success: false, message: 'Collaboration workspace not found' });
    }

    res.status(200).json({ success: true, collaboration });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit delivery asset (Creator)
// @route   POST /api/collaborations/:id/assets
export const submitDeliveryAsset = async (req, res, next) => {
  try {
    const { title, url, type, notes } = req.body;
    const collaboration = await Collaboration.findById(req.params.id);

    if (!collaboration) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }

    collaboration.deliveryAssets.push({
      title,
      url,
      type: type || 'video',
      notes: notes || '',
      submittedAt: new Date(),
    });
    collaboration.status = 'review';
    await collaboration.save();

    await Notification.create({
      recipient: collaboration.brand,
      sender: req.user._id,
      type: 'collaboration_update',
      title: 'New Creative Asset Delivered',
      message: `Creator delivered a creative file: "${title}". Please review.`,
      link: `/brand/collaborations`,
    });

    res.status(200).json({ success: true, message: 'Asset submitted successfully', collaboration });
  } catch (error) {
    next(error);
  }
};

// @desc    Request revision (Brand)
// @route   POST /api/collaborations/:id/revisions
export const requestRevision = async (req, res, next) => {
  try {
    const { feedback } = req.body;
    const collaboration = await Collaboration.findById(req.params.id).populate('creator');

    if (!collaboration) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }

    collaboration.revisionsRequested.push({
      feedback,
      requestedAt: new Date(),
    });
    collaboration.status = 'in_production';
    await collaboration.save();

    await Notification.create({
      recipient: collaboration.creator.user,
      sender: req.user._id,
      type: 'collaboration_update',
      title: 'Revision Feedback Requested',
      message: `Brand requested a revision: "${feedback.slice(0, 80)}..."`,
      link: `/creator/collaborations`,
    });

    res.status(200).json({ success: true, message: 'Revision feedback submitted', collaboration });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete collaboration
// @route   POST /api/collaborations/:id/complete
export const completeCollaboration = async (req, res, next) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id).populate('creator');
    if (!collaboration) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }

    collaboration.status = 'completed';
    collaboration.completedAt = new Date();
    await collaboration.save();

    await Notification.create({
      recipient: collaboration.creator.user,
      sender: req.user._id,
      type: 'collaboration_update',
      title: 'Collaboration Marked Completed! 🌟',
      message: `Brand has approved all deliverables and completed the project!`,
      link: `/creator/collaborations`,
    });

    res.status(200).json({ success: true, message: 'Collaboration completed', collaboration });
  } catch (error) {
    next(error);
  }
};
