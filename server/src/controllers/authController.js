import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { CreatorProfile } from '../models/CreatorProfile.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'collabrix_luxury_ai_creator_jwt_secret_2026_dev', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email address' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'brand',
      companyName: role === 'brand' ? (companyName || name) : undefined,
    });

    // If registered as creator, create empty creator profile shell
    let creatorProfile = null;
    if (user.role === 'creator') {
      const handle = (name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Math.floor(100 + Math.random() * 900)).slice(0, 30);
      creatorProfile = await CreatorProfile.create({
        user: user._id,
        displayName: user.name,
        handle,
        bio: 'AI-Native creative production specialist exploring generative filmmaking and visual arts.',
        primarySpecialization: 'AI Filmmaking',
        technicalSkills: ['Prompt Engineering', 'Generative Motion', 'Visual Upscaling'],
        aiToolsModels: ['Flux.1', 'Runway Gen-3', 'ComfyUI'],
        contentTypes: ['Video', 'Animation'],
        visualStyles: ['Cinematic', 'Editorial Dark Luxury'],
        supportedAspectRatios: ['9:16', '16:9', '1:1'],
        supportedResolutions: ['1080p', '4K UHD'],
        startingPrice: 20000,
        currency: 'INR',
        availability: 'Available Now',
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        avatar: user.avatar,
        creatorProfileId: creatorProfile ? creatorProfile._id : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    let creatorProfile = null;
    if (user.role === 'creator') {
      creatorProfile = await CreatorProfile.findOne({ user: user._id });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        avatar: user.avatar,
        creatorProfileId: creatorProfile ? creatorProfile._id : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    let creatorProfile = null;
    if (user.role === 'creator') {
      creatorProfile = await CreatorProfile.findOne({ user: user._id });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        avatar: user.avatar,
        bio: user.bio,
        creatorProfileId: creatorProfile ? creatorProfile._id : null,
        creatorProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};
