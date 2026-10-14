import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema(
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
      index: true,
    },
    deliverables: {
      type: String,
      required: true,
    },
    compensation: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    timeline: {
      type: String,
      default: '14 days',
    },
    technicalRequirements: {
      type: String,
      default: '4K UHD, 9:16 vertical, ProRes 422 delivery',
    },
    proposedCommercialTerms: {
      type: String,
      default: '12 Months Paid Social Ad usage across Meta & YouTube',
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'withdrawn'],
      default: 'pending',
      index: true,
    },
    responseNotes: {
      type: String,
      default: '',
    },
    respondedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Proposal = mongoose.model('Proposal', proposalSchema);
