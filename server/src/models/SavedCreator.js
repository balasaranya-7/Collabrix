import mongoose from 'mongoose';

const savedCreatorSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CreatorProfile',
      required: true,
      index: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

savedCreatorSchema.index({ brand: 1, creator: 1 }, { unique: true });

export const SavedCreator = mongoose.model('SavedCreator', savedCreatorSchema);
