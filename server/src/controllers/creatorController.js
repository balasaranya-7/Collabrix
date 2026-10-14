import { CreatorProfile } from '../models/CreatorProfile.js';
import { PortfolioItem } from '../models/PortfolioItem.js';

// @desc    Get creators with rich filtering, search, and pagination
// @route   GET /api/creators
export const getCreators = async (req, res, next) => {
  try {
    const {
      search,
      specialization,
      skill,
      tool,
      contentType,
      visualStyle,
      aspectRatio,
      resolution,
      commercialStatus,
      minPrice,
      maxPrice,
      availability,
      verificationStatus,
      sortBy = 'rating',
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    // Keyword search across text indexed fields or regex fallback
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { displayName: searchRegex },
        { bio: searchRegex },
        { primarySpecialization: searchRegex },
        { secondarySpecializations: searchRegex },
        { technicalSkills: searchRegex },
        { aiToolsModels: searchRegex },
        { visualStyles: searchRegex },
        { location: searchRegex },
      ];
    }

    if (specialization && specialization !== 'All') {
      query.$or = query.$or || [];
      const specRegex = new RegExp(specialization, 'i');
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { primarySpecialization: specRegex },
          { secondarySpecializations: specRegex },
        ],
      });
    }

    if (skill && skill !== 'All') {
      query.technicalSkills = { $in: [new RegExp(skill, 'i')] };
    }

    if (tool && tool !== 'All') {
      query.aiToolsModels = { $in: [new RegExp(tool, 'i')] };
    }

    if (contentType && contentType !== 'All') {
      query.contentTypes = { $in: [new RegExp(contentType, 'i')] };
    }

    if (visualStyle && visualStyle !== 'All') {
      query.visualStyles = { $in: [new RegExp(visualStyle, 'i')] };
    }

    if (aspectRatio && aspectRatio !== 'All') {
      query.supportedAspectRatios = { $in: [aspectRatio] };
    }

    if (resolution && resolution !== 'All') {
      query.supportedResolutions = { $in: [new RegExp(resolution, 'i')] };
    }

    if (availability && availability !== 'All') {
      query.availability = availability;
    }

    if (minPrice || maxPrice) {
      query.startingPrice = {};
      if (minPrice) query.startingPrice.$gte = Number(minPrice);
      if (maxPrice) query.startingPrice.$lte = Number(maxPrice);
    }

    if (verificationStatus && verificationStatus !== 'All') {
      query['verification.toolExpertise.status'] = verificationStatus;
    }

    // Sort order
    let sortOptions = {};
    if (sortBy === 'price_asc') sortOptions = { startingPrice: 1 };
    else if (sortBy === 'price_desc') sortOptions = { startingPrice: -1 };
    else if (sortBy === 'collaborations') sortOptions = { 'metrics.totalCollaborations': -1 };
    else sortOptions = { 'metrics.matchRating': -1, createdAt: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const total = await CreatorProfile.countDocuments(query);
    const creators = await CreatorProfile.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .populate('user', 'name email avatar');

    // Attach up to 3 showcase portfolio thumbnails for rich card preview
    const creatorIds = creators.map((c) => c._id);
    const samplePortfolios = await PortfolioItem.find({ creator: { $in: creatorIds } });

    const creatorsWithPortfolios = creators.map((c) => {
      const cObj = c.toObject();
      cObj.portfolioPreviews = samplePortfolios.filter(
        (p) => p.creator.toString() === c._id.toString()
      ).slice(0, 4);
      return cObj;
    });

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      creators: creatorsWithPortfolios,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single creator by ID
// @route   GET /api/creators/:id
export const getCreatorById = async (req, res, next) => {
  try {
    const creator = await CreatorProfile.findById(req.params.id).populate('user', 'name email avatar');
    if (!creator) {
      return res.status(404).json({ success: false, message: 'Creator profile not found' });
    }

    const portfolio = await PortfolioItem.find({ creator: creator._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      creator,
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get creator by handle
// @route   GET /api/creators/handle/:handle
export const getCreatorByHandle = async (req, res, next) => {
  try {
    const creator = await CreatorProfile.findOne({ handle: req.params.handle }).populate('user', 'name email avatar');
    if (!creator) {
      return res.status(404).json({ success: false, message: 'Creator profile not found' });
    }

    const portfolio = await PortfolioItem.find({ creator: creator._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      creator,
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update authenticated creator's profile
// @route   PUT /api/creators/me
export const updateMyProfile = async (req, res, next) => {
  try {
    let profile = await CreatorProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Creator profile not found for this user' });
    }

    // Prohibit forging verified audit flags directly from self-edit
    const safeBody = { ...req.body };
    delete safeBody.verification;
    delete safeBody.metrics;
    delete safeBody.user;

    profile = await CreatorProfile.findByIdAndUpdate(profile._id, safeBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      creator: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Simulate/toggle demo verification status for presentation walkthrough
// @route   POST /api/creators/:id/toggle-demo-verification
export const toggleDemoVerification = async (req, res, next) => {
  try {
    const creator = await CreatorProfile.findById(req.params.id);
    if (!creator) {
      return res.status(404).json({ success: false, message: 'Creator not found' });
    }

    const currentStatus = creator.verification?.toolExpertise?.status || 'Self-reported';
    const newStatus = currentStatus === 'Verified' ? 'Review required' : 'Verified';

    creator.verification = {
      toolExpertise: {
        status: newStatus,
        evidence: 'Hackathon Demo Signal: Model workflow logs inspected and validated',
        verifiedBy: 'COLLABRIX Audit Engine',
        verifiedAt: new Date(),
      },
      workflowAudit: {
        status: newStatus,
        evidence: 'ComfyUI & Runway Gen-3 composition graphs reviewed',
        verifiedBy: 'COLLABRIX Audit Engine',
        verifiedAt: new Date(),
      },
      portfolioOwnership: {
        status: newStatus,
        evidence: 'Original high-res master frames match generator seed logs',
        verifiedBy: 'COLLABRIX Audit Engine',
        verifiedAt: new Date(),
      },
      commercialLicensing: {
        status: newStatus,
        evidence: 'Commercial tier subscription validated with zero IP conflicts',
        verifiedBy: 'COLLABRIX Audit Engine',
        verifiedAt: new Date(),
      },
    };

    await creator.save();

    res.status(200).json({
      success: true,
      message: `Demo verification toggled to ${newStatus}`,
      verification: creator.verification,
    });
  } catch (error) {
    next(error);
  }
};
