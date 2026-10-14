import mongoose from 'mongoose';

const portfolioItemSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CreatorProfile',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Generative Video',
      index: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    mediaType: {
      type: String,
      enum: ['video', 'image', 'animation'],
      default: 'image',
    },
    aiToolsModels: [
      {
        type: String,
      },
    ],
    technicalSkills: [
      {
        type: String,
      },
    ],
    workflowSummary: {
      type: String,
      default: '',
    },
    processPromptNotes: {
      type: String,
      default: '',
    },
    visualStyle: {
      type: String,
      default: 'Cinematic',
    },
    aspectRatio: {
      type: String,
      default: '16:9',
    },
    resolution: {
      type: String,
      default: '4K UHD',
    },
    duration: {
      type: String,
      default: '',
    },
    commercialUseStatus: {
      type: String,
      enum: ['Commercial Ready', 'Editorial Only', 'Personal Non-Commercial', 'Rights Unverified'],
      default: 'Commercial Ready',
      index: true,
    },
    rightsNotes: {
      type: String,
      default: 'Fully cleared for global commercial paid ads and social distribution.',
    },
    ownershipDeclaration: {
      type: String,
      default: 'Original creator generated using licensed commercial model tier.',
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],
    verificationStatus: {
      type: String,
      enum: ['Verified', 'Self-reported', 'Unverified', 'Review required'],
      default: 'Verified',
    },
    verificationEvidence: {
      type: String,
      default: 'Node generation logs & raw project files verified',
    },
    viewsCount: {
      type: Number,
      default: 450,
    },
    likesCount: {
      type: Number,
      default: 89,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

portfolioItemSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  aiToolsModels: 'text',
  technicalSkills: 'text',
  tags: 'text',
});

export const PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);
