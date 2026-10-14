/**
 * COLLABRIX AI-Assisted Brief Builder Service
 * Transforms a rough creative idea prompt into a comprehensive, editable structured brief.
 * Works with optional Gemini/OpenAI API or high-intelligence deterministic heuristic NLP fallback.
 */

export async function parseRoughIdeaToBrief(promptText) {
  const text = (promptText || '').trim();
  const lower = text.toLowerCase();

  // Keyword extraction heuristics
  let contentType = 'video';
  if (lower.includes('animation') || lower.includes('anime') || lower.includes('cartoon')) contentType = 'animation';
  else if (lower.includes('image') || lower.includes('photo') || lower.includes('render') || lower.includes('poster')) contentType = 'image';
  else if (lower.includes('character')) contentType = 'character design';
  else if (lower.includes('product') && (lower.includes('visual') || lower.includes('photo'))) contentType = 'product visual';
  else if (lower.includes('motion') || lower.includes('graphics')) contentType = 'motion graphics';

  let specialization = 'AI Filmmaking';
  if (lower.includes('product') || lower.includes('skincare') || lower.includes('perfume') || lower.includes('coffee') || lower.includes('ad')) {
    specialization = 'AI Product Advertising';
  } else if (lower.includes('fashion') || lower.includes('apparel') || lower.includes('lookbook')) {
    specialization = 'AI Fashion Visuals';
  } else if (lower.includes('animation') || lower.includes('cartoon')) {
    specialization = 'AI Animation';
  } else if (lower.includes('music') || lower.includes('track') || lower.includes('song')) {
    specialization = 'AI Music Videos';
  } else if (lower.includes('character') || lower.includes('avatar')) {
    specialization = 'AI Character Design';
  } else if (lower.includes('concept') || lower.includes('game') || lower.includes('world')) {
    specialization = 'AI Concept Art';
  } else if (lower.includes('motion')) {
    specialization = 'AI Motion Graphics';
  } else if (lower.includes('story') || lower.includes('narrative') || lower.includes('doc')) {
    specialization = 'AI Storytelling';
  }

  // Aspect ratio detection
  let aspectRatio = '9:16';
  if (lower.includes('vertical') || lower.includes('reel') || lower.includes('tiktok') || lower.includes('story') || lower.includes('9:16')) {
    aspectRatio = '9:16';
  } else if (lower.includes('horizontal') || lower.includes('widescreen') || lower.includes('landscape') || lower.includes('16:9') || lower.includes('youtube')) {
    aspectRatio = '16:9';
  } else if (lower.includes('square') || lower.includes('1:1') || lower.includes('feed')) {
    aspectRatio = '1:1';
  } else if (lower.includes('4:5')) {
    aspectRatio = '4:5';
  }

  // Style detection
  let visualStyle = 'Cinematic';
  if (lower.includes('photorealistic') || lower.includes('realistic')) visualStyle = 'Photorealistic';
  else if (lower.includes('editorial') || lower.includes('luxury') || lower.includes('vogue')) visualStyle = 'Editorial Dark Luxury';
  else if (lower.includes('surreal') || lower.includes('dream')) visualStyle = 'Surrealist & Ethereal';
  else if (lower.includes('cyberpunk') || lower.includes('sci-fi') || lower.includes('futuristic')) visualStyle = 'Cyberpunk Neon';
  else if (lower.includes('3d') || lower.includes('render')) visualStyle = 'Stylized 3D';
  else if (lower.includes('minimal')) visualStyle = 'Minimalist Clean';

  // Duration detection
  let duration = '30 seconds';
  if (lower.includes('15') || lower.includes('reel') || lower.includes('short')) duration = '15-20 seconds';
  else if (lower.includes('60') || lower.includes('minute')) duration = '60 seconds';
  else if (lower.includes('45')) duration = '45 seconds';

  // Tools suggestion based on requirements
  const suggestedTools = [];
  if (specialization.includes('Video') || specialization.includes('Advertising') || specialization.includes('Filmmaking')) {
    suggestedTools.push('Runway Gen-3 Alpha', 'Luma Dream Machine', 'Topaz Video AI');
  }
  if (visualStyle.includes('Photorealistic') || visualStyle.includes('Editorial') || contentType === 'image') {
    suggestedTools.push('Flux.1', 'Midjourney v6', 'ComfyUI');
  }
  if (suggestedTools.length === 0) {
    suggestedTools.push('Flux.1', 'Runway Gen-3', 'ComfyUI');
  }

  // Title generation
  let generatedTitle = 'AI Creative Campaign';
  if (lower.includes('skincare')) generatedTitle = 'Cinematic AI Skincare Video Showcase';
  else if (lower.includes('coffee')) generatedTitle = 'Artisanal Coffee Heritage Reel Campaign';
  else if (lower.includes('fashion')) generatedTitle = 'Haute Couture Generative Lookbook';
  else if (lower.includes('perfume') || lower.includes('fragrance')) generatedTitle = 'Atmospheric Luxury Fragrance Film';
  else if (text.length > 5 && text.length < 50) {
    generatedTitle = text.charAt(0).toUpperCase() + text.slice(1);
  } else {
    generatedTitle = `${visualStyle} ${specialization} Campaign`;
  }

  return {
    isAiGenerated: true,
    generatedTitle,
    suggestedSpecialization: specialization,
    suggestedContentType: contentType,
    suggestedVisualStyle: visualStyle,
    suggestedToneMood: 'High-production value, visually arresting, polished brand aesthetic with seamless temporal coherence',
    suggestedAspectRatio: aspectRatio,
    suggestedResolution: '1080p',
    suggestedDuration: duration,
    suggestedDeliverablesCount: 3,
    suggestedTools,
    suggestedIntendedUse: lower.includes('paid') || lower.includes('ad') ? 'paid advertising' : 'organic marketing',
    suggestedCommercialRights: 'Digital Paid Ads (1 Year)',
    suggestedBudget: {
      min: lower.includes('budget') && lower.match(/\d+/) ? parseInt(lower.match(/\d+/)[0], 10) : 25000,
      max: 60000,
      currency: 'INR',
    },
    suggestedKeyMessage: 'Deliver cutting-edge AI visual storytelling that elevates product desirability while preserving flawless photorealism.',
    creativeConstraintsAdvice: 'Ensure facial and product logo consistency across camera cuts; avoid uncanny valley artifacts in macro shots.',
    commercialConfirmationChecklist: [
      'Confirm rights scope: digital paid advertising vs broadcast',
      'Confirm required model commercial licenses (Flux.1 / Runway Gen-3 enterprise)',
      'Confirm whether raw ComfyUI workflow / project files must be handed over',
    ],
  };
}
