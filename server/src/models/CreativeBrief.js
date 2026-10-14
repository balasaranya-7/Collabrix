import mongoose from 'mongoose';

const creativeBriefSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    brandName: {
      type: String,
      default: 'Brand Partner',
    },
    productService: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    objective: {
      type: String,
      default: '',
    },
    targetAudience: {
      type: String,
      default: '',
    },
    requiredSpecialization: {
      type: String,
      required: true,
      index: true,
    },
    keyMessage: {
      type: String,
      default: '',
    },
    referenceLinks: [
      {
        type: String,
      },
    ],
    // Creative Requirements
    contentType: {
      type: String,
      enum: ['video', 'animation', 'image', 'graphic', 'product visual', 'character design', 'mixed media'],
      default: 'video',
    },
    visualStyle: {
      type: String,
      default: 'Cinematic',
    },
    toneMood: {
      type: String,
      default: 'Premium, modern, aspirational',
    },
    subjectMatter: {
      type: String,
      default: '',
    },
    creativeConstraints: {
      type: String,
      default: '',
    },
    requiredTools: [
      {
        type: String,
      },
    ],
    preferredWorkflow: {
      type: String,
      default: '',
    },
    // Technical Requirements
    aspectRatio: {
      type: String,
      enum: ['9:16', '16:9', '1:1', '4:5', '3:2', 'custom'],
      default: '9:16',
    },
    resolution: {
      type: String,
      enum: ['720p', '1080p', '4K UHD', 'custom'],
      default: '1080p',
    },
    duration: {
      type: String,
      default: '30 seconds',
    },
    deliverablesCount: {
      type: Number,
      default: 3,
    },
    fileFormat: {
      type: String,
      default: 'MP4 (H.264 / ProRes)',
    },
    targetPlatforms: [
      {
        type: String,
      },
    ],
    sourceFilesRequired: {
      type: Boolean,
      default: false,
    },
    // Commercial-Use Requirements
    intendedUse: {
      type: String,
      enum: ['paid advertising', 'organic marketing', 'website', 'broadcast', 'internal use', 'undecided'],
      default: 'paid advertising',
    },
    commercialRightsScope: {
      type: String,
      enum: ['Full Commercial Buyout', 'Digital Paid Ads (1 Year)', 'Organic Social Media Only', 'Undecided / Negotiable'],
      default: 'Digital Paid Ads (1 Year)',
    },
    licenseDuration: {
      type: String,
      default: '12 Months',
    },
    geographicRegion: {
      type: String,
      default: 'Worldwide',
    },
    exclusivity: {
      type: String,
      enum: ['Non-Exclusive', 'Category Exclusive (6 Months)', 'Full Exclusive'],
      default: 'Non-Exclusive',
    },
    thirdPartyAssetClearance: {
      type: Boolean,
      default: true,
    },
    budget: {
      min: { type: Number, default: 20000 },
      max: { type: Number, default: 50000 },
      currency: { type: String, default: 'INR' },
    },
    deadline: {
      type: Date,
      default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    revisionRounds: {
      type: Number,
      default: 2,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'in_progress', 'completed', 'cancelled'],
      default: 'active',
      index: true,
    },
    rawIdeaPrompt: {
      type: String,
      default: '',
    },
    isAiGenerated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const CreativeBrief = mongoose.model('CreativeBrief', creativeBriefSchema);
