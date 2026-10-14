import { CreativeBrief } from '../models/CreativeBrief.js';
import { CreatorProfile } from '../models/CreatorProfile.js';
import { PortfolioItem } from '../models/PortfolioItem.js';
import { calculateBriefCreatorMatch } from '../services/matchingEngine.js';
import { parseRoughIdeaToBrief } from '../services/briefBuilderService.js';

// @desc    Get ranked creator matches for a saved brief
// @route   GET /api/matches/:briefId
export const getMatchesForBrief = async (req, res, next) => {
  try {
    const brief = await CreativeBrief.findById(req.params.briefId);
    if (!brief) {
      return res.status(404).json({ success: false, message: 'Creative brief not found' });
    }

    const creators = await CreatorProfile.find().populate('user', 'name email avatar');
    const allPortfolios = await PortfolioItem.find();

    const matches = creators.map((creator) => {
      const creatorPortfolios = allPortfolios.filter(
        (p) => p.creator.toString() === creator._id.toString()
      );
      return calculateBriefCreatorMatch(brief, creator, creatorPortfolios);
    });

    // Sort descending by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      brief: {
        id: brief._id,
        title: brief.title,
        brandName: brief.brandName,
        description: brief.description,
        requiredSpecialization: brief.requiredSpecialization,
        contentType: brief.contentType,
        visualStyle: brief.visualStyle,
        toneMood: brief.toneMood,
        aspectRatio: brief.aspectRatio,
        resolution: brief.resolution,
        duration: brief.duration,
        requiredTools: brief.requiredTools || [],
        commercialRightsScope: brief.commercialRightsScope,
        budget: brief.budget,
        deadline: brief.deadline,
        deliverablesCount: brief.deliverablesCount,
      },
      count: matches.length,
      matches,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Quick match analyzer for landing page 'See It In Action' interactive widget
// @route   POST /api/matches/quick-analyze
export const analyzeBriefMatchesQuick = async (req, res, next) => {
  try {
    const { ideaPrompt } = req.body;
    if (!ideaPrompt || ideaPrompt.trim() === '') {
      return res.status(400).json({ success: false, message: 'Please provide brief text to analyze' });
    }

    // Turn idea prompt into virtual brief
    const parsedSuggestion = await parseRoughIdeaToBrief(ideaPrompt);
    const virtualBrief = {
      title: parsedSuggestion.generatedTitle,
      description: ideaPrompt,
      requiredSpecialization: parsedSuggestion.suggestedSpecialization,
      contentType: parsedSuggestion.suggestedContentType,
      visualStyle: parsedSuggestion.suggestedVisualStyle,
      aspectRatio: parsedSuggestion.suggestedAspectRatio,
      resolution: parsedSuggestion.suggestedResolution,
      requiredTools: parsedSuggestion.suggestedTools,
      budget: parsedSuggestion.suggestedBudget,
    };

    const creators = await CreatorProfile.find().populate('user', 'name email avatar');
    const allPortfolios = await PortfolioItem.find();

    const matches = creators.map((creator) => {
      const creatorPortfolios = allPortfolios.filter(
        (p) => p.creator.toString() === creator._id.toString()
      );
      return calculateBriefCreatorMatch(virtualBrief, creator, creatorPortfolios);
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      virtualBrief,
      topMatches: matches.slice(0, 5),
    });
  } catch (error) {
    next(error);
  }
};
