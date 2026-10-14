import { SavedCreator } from '../models/SavedCreator.js';

// @desc    Save a creator to brand's shortlist
// @route   POST /api/saved-creators
export const saveCreator = async (req, res, next) => {
  try {
    const { creatorId, notes } = req.body;

    const existing = await SavedCreator.findOne({ brand: req.user._id, creator: creatorId });
    if (existing) {
      return res.status(200).json({ success: true, message: 'Creator already in saved list', saved: existing });
    }

    const saved = await SavedCreator.create({
      brand: req.user._id,
      creator: creatorId,
      notes: notes || '',
    });

    res.status(201).json({ success: true, message: 'Creator saved to shortlist', saved });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove creator from saved list
// @route   DELETE /api/saved-creators/:creatorId
export const unsaveCreator = async (req, res, next) => {
  try {
    await SavedCreator.findOneAndDelete({ brand: req.user._id, creator: req.params.creatorId });
    res.status(200).json({ success: true, message: 'Creator removed from saved list' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all saved creators for brand
// @route   GET /api/saved-creators
export const getSavedCreators = async (req, res, next) => {
  try {
    const saved = await SavedCreator.find({ brand: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'creator',
        populate: { path: 'user', select: 'name email avatar' },
      });

    res.status(200).json({ success: true, count: saved.length, saved });
  } catch (error) {
    next(error);
  }
};
