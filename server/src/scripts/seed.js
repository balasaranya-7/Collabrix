import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { CreatorProfile } from '../models/CreatorProfile.js';
import { PortfolioItem } from '../models/PortfolioItem.js';
import { CreativeBrief } from '../models/CreativeBrief.js';
import { Proposal } from '../models/Proposal.js';
import { Collaboration } from '../models/Collaboration.js';
import { SavedCreator } from '../models/SavedCreator.js';
import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { Notification } from '../models/Notification.js';
import { generateAll32Creators } from './seedData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/collabrix';
    console.log(`[Seed] Connecting to MongoDB: ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB!');

    // 1. Clean existing demo marketplace collections without touching real registered users
    console.log('[Seed] Clearing previous demo accounts while preserving real user registrations...');
    const demoUsers = await User.find({ email: { $regex: /@collabrix\.ai$/i } }).select('_id');
    const demoUserIds = demoUsers.map((u) => u._id);

    await Promise.all([
      User.deleteMany({ email: { $regex: /@collabrix\.ai$/i } }),
      CreatorProfile.deleteMany({ $or: [{ isDemo: true }, { user: { $in: demoUserIds } }] }),
      PortfolioItem.deleteMany({ isDemo: true }),
      CreativeBrief.deleteMany({ brand: { $in: demoUserIds } }),
      Proposal.deleteMany({ $or: [{ sender: { $in: demoUserIds } }, { recipient: { $in: demoUserIds } }] }),
      Collaboration.deleteMany({ $or: [{ brand: { $in: demoUserIds } }, { creator: { $in: demoUserIds } }] }),
      SavedCreator.deleteMany({ user: { $in: demoUserIds } }),
      Conversation.deleteMany({ participants: { $in: demoUserIds } }),
      Message.deleteMany({ sender: { $in: demoUserIds } }),
      Notification.deleteMany({ recipient: { $in: demoUserIds } }),
    ]);

    // 2. Create Default Brand User
    console.log('[Seed] Creating demo Brand user: brand@collabrix.ai ...');
    const brandUser = await User.create({
      name: 'Aura Luxury Studios',
      email: 'brand@collabrix.ai',
      password: 'password123',
      role: 'brand',
      companyName: 'Aura Luxury Brand Group',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
      bio: 'Leading luxury consumer goods & creative agency commissioning next-generation AI visuals.',
    });

    // 3. Create Default Secondary Brand User
    const brandUser2 = await User.create({
      name: 'Glow Cosmetics & Wellness',
      email: 'glow@collabrix.ai',
      password: 'password123',
      role: 'brand',
      companyName: 'Glow Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Next-gen organic beauty and skincare brand.',
    });

    // 4. Seed all 32 creators & portfolios
    console.log('[Seed] Seeding 32 distinct fictional AI Creators...');
    const creatorsData = generateAll32Creators();
    const createdCreatorProfiles = [];

    for (let i = 0; i < creatorsData.length; i++) {
      const cData = creatorsData[i];
      // Creator User email
      const email = i === 0 ? 'creator@collabrix.ai' : `creator_${i + 1}@collabrix.ai`;
      const creatorUser = await User.create({
        name: cData.name,
        email,
        password: 'password123',
        role: 'creator',
        avatar: cData.avatar,
        bio: cData.bio,
      });

      const profile = await CreatorProfile.create({
        user: creatorUser._id,
        displayName: cData.name,
        handle: cData.handle,
        avatar: cData.avatar,
        coverImage: cData.coverImage,
        location: cData.location,
        bio: cData.bio,
        primarySpecialization: cData.primarySpecialization,
        secondarySpecializations: cData.secondarySpecializations,
        technicalSkills: cData.technicalSkills,
        aiToolsModels: cData.aiToolsModels,
        experienceLevel: cData.experienceLevel,
        experienceDescription: cData.experienceDescription,
        productionWorkflow: cData.productionWorkflow,
        preferredProjectTypes: cData.preferredProjectTypes,
        contentTypes: cData.contentTypes,
        visualStyles: cData.visualStyles,
        supportedAspectRatios: cData.supportedAspectRatios,
        supportedResolutions: cData.supportedResolutions,
        supportedDurations: cData.supportedDurations,
        outputFormats: cData.outputFormats,
        languages: cData.languages,
        startingPrice: cData.startingPrice,
        currency: cData.currency,
        availability: cData.availability,
        verification: cData.verification,
        metrics: cData.metrics,
        isFeatured: i < 6,
        isDemo: true,
      });

      createdCreatorProfiles.push(profile);

      // Seed portfolio items for this creator
      for (const pItem of cData.portfolios) {
        await PortfolioItem.create({
          creator: profile._id,
          title: pItem.title,
          description: pItem.description,
          category: pItem.category,
          mediaUrl: pItem.mediaUrl,
          thumbnailUrl: pItem.thumbnailUrl,
          mediaType: pItem.mediaType,
          aiToolsModels: pItem.aiToolsModels,
          technicalSkills: pItem.technicalSkills,
          workflowSummary: pItem.workflowSummary,
          processPromptNotes: pItem.processPromptNotes,
          visualStyle: pItem.visualStyle,
          aspectRatio: pItem.aspectRatio,
          resolution: pItem.resolution,
          duration: pItem.duration,
          commercialUseStatus: pItem.commercialUseStatus,
          rightsNotes: pItem.rightsNotes,
          ownershipDeclaration: 'Certified creator output under commercial terms',
          tags: pItem.tags,
          verificationStatus: 'Verified',
          isDemo: true,
        });
      }
    }

    console.log(`[Seed] Seeded ${createdCreatorProfiles.length} creator profiles & ${createdCreatorProfiles.length * 3} portfolio items!`);

    // 5. Create Realistic Seed Briefs for Aura Studios & Glow Labs
    console.log('[Seed] Seeding realistic Creative Briefs...');
    const brief1 = await CreativeBrief.create({
      brand: brandUser._id,
      title: 'Summer Collection Launch — Cinematic AI Film',
      brandName: 'Aura Luxury Brand Group',
      productService: 'Haute Couture Linen & Resort Wear',
      description: 'We are launching our new Mediterranean summer resort collection and looking for AI filmmakers to create a 30s cinematic film showcasing outfits in natural aesthetic lighting.',
      objective: 'Drive brand desirability and elevate perception through photorealistic Mediterranean luxury visuals.',
      targetAudience: 'Affluent fashion consumers aged 24-45, design enthusiasts.',
      requiredSpecialization: 'AI Filmmaking',
      keyMessage: 'Effortless luxury bathed in golden hour coastal radiance.',
      contentType: 'video',
      visualStyle: 'Cinematic',
      toneMood: 'Warm, aspirational, sun-drenched, editorial elegance',
      aspectRatio: '16:9',
      resolution: '4K UHD',
      duration: '30 seconds',
      deliverablesCount: 2,
      requiredTools: ['Runway Gen-3 Alpha', 'Flux.1', 'Topaz Video AI'],
      budget: { min: 50000, max: 90000, currency: 'INR' },
      intendedUse: 'paid advertising',
      commercialRightsScope: 'Digital Paid Ads (1 Year)',
      geographicRegion: 'Worldwide',
      status: 'active',
    });

    const brief2 = await CreativeBrief.create({
      brand: brandUser._id,
      title: 'Artisanal Espresso Heritage Campaign',
      brandName: 'Aura Luxury Brand Group',
      productService: 'Single-Origin Ethiopian Reserve Coffee',
      description: 'Need 3 Instagram Reels for a luxury single-origin coffee brand, modern aesthetic, slow-motion crema and bean cascading shots.',
      objective: 'Showcase artisanal roasting craftsmanship and ultra-high-speed macro liquid textures.',
      targetAudience: 'Third-wave coffee lovers, urban connoisseurs.',
      requiredSpecialization: 'AI Product Advertising',
      keyMessage: 'Pure sensory origin in every droplet.',
      contentType: 'video',
      visualStyle: 'Photorealistic',
      toneMood: 'Moody, rich chiaroscuro, warm roasted amber tones',
      aspectRatio: '9:16',
      resolution: '1080p',
      duration: '20 seconds',
      deliverablesCount: 3,
      requiredTools: ['Flux.1 Pro', 'Runway Gen-3'],
      budget: { min: 30000, max: 55000, currency: 'INR' },
      intendedUse: 'paid advertising',
      commercialRightsScope: 'Full Commercial Buyout',
      geographicRegion: 'Worldwide',
      status: 'active',
    });

    const brief3 = await CreativeBrief.create({
      brand: brandUser2._id,
      title: 'Dewdrop Peptide Serum Social Launch',
      brandName: 'Glow Labs',
      productService: 'Botanical Hydration Facial Elixir',
      description: 'High-converting vertical video commercial showing macro rose petal dewdrops blending into translucent serum on glowing skin.',
      objective: 'Highlight ingredient purity and scientific hydration efficacy with zero synthetic artifacts.',
      targetAudience: 'Skincare enthusiasts aged 18-35.',
      requiredSpecialization: 'AI Product Advertising',
      keyMessage: 'Glass skin powered by botanical biotechnology.',
      contentType: 'video',
      visualStyle: 'Editorial Dark Luxury',
      toneMood: 'Luminous, refreshing, scientific beauty',
      aspectRatio: '9:16',
      resolution: '4K UHD',
      duration: '15 seconds',
      deliverablesCount: 3,
      requiredTools: ['Flux.1', 'Luma Dream Machine'],
      budget: { min: 25000, max: 45000, currency: 'INR' },
      intendedUse: 'paid advertising',
      commercialRightsScope: 'Digital Paid Ads (1 Year)',
      status: 'active',
    });

    // 6. Seed Proposals & Collaboration for Priya Sharma (creator #1)
    const priya = createdCreatorProfiles[0]; // Priya Sharma
    const aarav = createdCreatorProfiles[1]; // Aarav Mehta

    console.log('[Seed] Seeding sample proposals and active collaborations...');
    const proposal1 = await Proposal.create({
      brand: brandUser._id,
      creator: priya._id,
      brief: brief1._id,
      deliverables: '2x 4K 30s Cinematic Master cuts + 3x 9:16 Social Cutdowns',
      compensation: 65000,
      currency: 'INR',
      timeline: '10 days',
      technicalRequirements: '4K UHD, ProRes 422, color-graded delivery',
      proposedCommercialTerms: '12 Months Digital Paid Ads Worldwide',
      message: 'Hi Priya, we reviewed your Celestial Noir commercial and loved your temporal consistency. We would love to collaborate on our Summer Collection Launch.',
      status: 'accepted',
      responseNotes: 'Delighted to take this on! Will prepare moodboards and ComfyUI seed frames by Thursday.',
      respondedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    });

    const proposal2 = await Proposal.create({
      brand: brandUser._id,
      creator: priya._id,
      brief: brief2._id,
      deliverables: '3x 9:16 Vertical Instagram Reels with slow-mo macro',
      compensation: 38000,
      currency: 'INR',
      timeline: '7 days',
      technicalRequirements: '1080x1920 MP4, H.265 high bitrate',
      proposedCommercialTerms: 'Global Commercial Buyout',
      message: 'Priya, can you also helm our coffee heritage reel series?',
      status: 'pending',
    });

    const proposal3 = await Proposal.create({
      brand: brandUser._id,
      creator: aarav._id,
      brief: brief1._id,
      deliverables: 'Animated 3D title resolve and cloth morphs',
      compensation: 32000,
      currency: 'INR',
      timeline: '8 days',
      technicalRequirements: 'ProRes 4444 Alpha channel',
      proposedCommercialTerms: 'Digital Paid Ads (1 Year)',
      message: 'Hi Aarav, looking to incorporate your kinetic typography into our launch.',
      status: 'pending',
    });

    // 7. Seed Active Collaboration
    const collab = await Collaboration.create({
      brand: brandUser._id,
      creator: priya._id,
      brief: brief1._id,
      proposal: proposal1._id,
      status: 'in_production',
      agreedCompensation: 65000,
      currency: 'INR',
      commercialRightsSummary: '12 Months Digital Paid Ads Worldwide',
      milestones: [
        { title: 'Moodboard & Mediterranean Color Palette', dueDate: 'Day 2', status: 'completed', notes: 'Approved with minor warm contrast adjustments' },
        { title: 'Generative Scene Sequences (Runway Gen-3)', dueDate: 'Day 5', status: 'in_progress', notes: 'Initial cuts rendered; finalizing camera dolly speed' },
        { title: '4K Topaz Upscaling & ProRes Master Delivery', dueDate: 'Day 9', status: 'pending', notes: '' },
      ],
      deliveryAssets: [
        {
          title: 'First Look — Sequence 01 Draft Render',
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
          type: 'video',
          notes: 'Preview render of coastal opening sequence at 1080p.',
          submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        },
      ],
    });

    // 8. Seed Saved Creators for Brand
    console.log('[Seed] Seeding Saved Creators...');
    await SavedCreator.create({ brand: brandUser._id, creator: priya._id, notes: 'Top choice for fashion films' });
    await SavedCreator.create({ brand: brandUser._id, creator: aarav._id, notes: 'Best for 3D kinetic anime' });
    await SavedCreator.create({ brand: brandUser._id, creator: createdCreatorProfiles[2]._id, notes: 'Elena Rostova - luxury couture' });
    await SavedCreator.create({ brand: brandUser._id, creator: createdCreatorProfiles[4]._id, notes: 'Diya Patel - coffee specialist' });

    // 9. Seed Chat Conversation & Messages
    console.log('[Seed] Seeding Messages & Conversations...');
    const conv = await Conversation.create({
      participants: [brandUser._id, priya.user],
      lastMessage: 'I have shared the draft render for Sequence 01 in the collaboration room!',
      lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      relatedBrief: brief1._id,
    });

    await Message.create({
      conversation: conv._id,
      sender: brandUser._id,
      content: 'Hi Priya! We are thrilled to start work on the Summer Collection Launch.',
      readBy: [brandUser._id, priya.user],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    });

    await Message.create({
      conversation: conv._id,
      sender: priya.user,
      content: 'Thank you! The creative brief has excellent technical clarity. I am running the initial Flux Mediterranean environment passes now.',
      readBy: [brandUser._id, priya.user],
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    });

    await Message.create({
      conversation: conv._id,
      sender: priya.user,
      content: 'I have shared the draft render for Sequence 01 in the collaboration room!',
      readBy: [brandUser._id],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    });

    // 10. Seed Notifications
    console.log('[Seed] Seeding Notifications...');
    await Notification.create({
      recipient: brandUser._id,
      sender: priya.user,
      type: 'collaboration_update',
      title: 'New Creative Asset Delivered',
      message: 'Priya Sharma uploaded "First Look — Sequence 01 Draft Render" for Summer Collection Launch.',
      link: '/brand/collaborations',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    });

    await Notification.create({
      recipient: brandUser._id,
      sender: priya.user,
      type: 'proposal_accepted',
      title: 'Proposal Accepted! Collaboration Started 🎉',
      message: 'Priya Sharma accepted your proposal for ₹65,000.',
      link: '/brand/collaborations',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    });

    await Notification.create({
      recipient: priya.user,
      sender: brandUser._id,
      type: 'proposal_received',
      title: 'New Collaboration Proposal Received',
      message: 'Aura Luxury Studios sent you an engagement proposal for ₹38,000 for Artisanal Espresso Heritage Campaign.',
      link: '/creator/proposals',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    });

    console.log('-----------------------------------------------------------');
    console.log('✅ COLLABRIX DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(`- 32 Distinct AI Creators Created`);
    console.log(`- 96+ Specialized AI Portfolio Items Created`);
    console.log(`- Demo Brand: brand@collabrix.ai (password: password123)`);
    console.log(`- Demo Creator: creator@collabrix.ai (Priya Sharma, password: password123)`);
    console.log(`- 3 Active Creative Briefs, Proposals, Collaborations & Real Chats`);
    console.log('-----------------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
