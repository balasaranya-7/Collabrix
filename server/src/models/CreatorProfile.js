import mongoose from 'mongoose';

const verificationSubSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['Verified', 'Self-reported', 'Unverified', 'Review required'],
      default: 'Self-reported',
    },
    evidence: {
      type: String,
      default: '',
    },
    verifiedBy: {
      type: String,
      default: 'System Audit',
    },
    verifiedAt: {
      type: Date,
    },
  },
  { _id: false }
);

const creatorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    },
    bio: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: 'Bengaluru, India',
    },
    primarySpecialization: {
      type: String,
      required: true,
      index: true,
    },
    secondarySpecializations: [
      {
        type: String,
      },
    ],
    technicalSkills: [
      {
        type: String,
        index: true,
      },
    ],
    aiToolsModels: [
      {
        type: String,
        index: true,
      },
    ],
    experienceLevel: {
      type: String,
      enum: ['Emerging', 'Mid-Level', 'Senior Studio Lead', 'Master Director'],
      default: 'Senior Studio Lead',
    },
    experienceDescription: {
      type: String,
      default: '',
    },
    productionWorkflow: {
      type: String,
      default: '',
    },
    preferredProjectTypes: [
      {
        type: String,
      },
    ],
    contentTypes: [
      {
        type: String,
        index: true,
      },
    ],
    visualStyles: [
      {
        type: String,
        index: true,
      },
    ],
    supportedAspectRatios: [
      {
        type: String,
      },
    ],
    supportedResolutions: [
      {
        type: String,
      },
    ],
    supportedDurations: [
      {
        type: String,
      },
    ],
    outputFormats: [
      {
        type: String,
      },
    ],
    languages: [
      {
        type: String,
      },
    ],
    startingPrice: {
      type: Number,
      default: 20000,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    availability: {
      type: String,
      enum: ['Available Now', 'Next Week', 'Booked This Month', 'In Discussion'],
      default: 'Available Now',
    },
    verification: {
      toolExpertise: {
        type: verificationSubSchema,
        default: () => ({ status: 'Self-reported', evidence: 'Creator documented stack' }),
      },
      workflowAudit: {
        type: verificationSubSchema,
        default: () => ({ status: 'Self-reported', evidence: 'Node workflow submitted' }),
      },
      portfolioOwnership: {
        type: verificationSubSchema,
        default: () => ({ status: 'Self-reported', evidence: 'Original renders verified' }),
      },
      commercialLicensing: {
        type: verificationSubSchema,
        default: () => ({ status: 'Self-reported', evidence: 'Commercial rights declaration' }),
      },
    },
    metrics: {
      totalCollaborations: { type: Number, default: 0 },
      matchRating: { type: Number, default: 95 },
      responseRate: { type: String, default: '< 2 hours' },
      profileViews: { type: Number, default: 120 },
      proposalAcceptanceRate: { type: Number, default: 85 },
      followersCount: { type: String, default: '125K' },
      engagementRate: { type: String, default: '4.8%' },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Text index for keyword discovery
creatorProfileSchema.index({
  displayName: 'text',
  bio: 'text',
  primarySpecialization: 'text',
  secondarySpecializations: 'text',
  technicalSkills: 'text',
  aiToolsModels: 'text',
  visualStyles: 'text',
  location: 'text',
});

export const CreatorProfile = mongoose.model('CreatorProfile', creatorProfileSchema);
