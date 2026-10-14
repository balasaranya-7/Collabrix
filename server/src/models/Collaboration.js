import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    dueDate: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    notes: { type: String, default: '' },
  },
  { _id: true }
);

const deliveryAssetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, default: 'video' },
    notes: { type: String, default: '' },
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const collaborationSchema = new mongoose.Schema(
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
    brief: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CreativeBrief',
      required: true,
    },
    proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'in_production', 'review', 'delivered', 'completed'],
      default: 'active',
      index: true,
    },
    milestones: [milestoneSchema],
    deliveryAssets: [deliveryAssetSchema],
    revisionsRequested: [
      {
        feedback: String,
        requestedAt: { type: Date, default: Date.now },
      },
    ],
    agreedCompensation: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    commercialRightsSummary: {
      type: String,
      default: '',
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Collaboration = mongoose.model('Collaboration', collaborationSchema);
