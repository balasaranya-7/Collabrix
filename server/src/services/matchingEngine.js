/**
 * COLLABRIX AI Creator Matching Engine
 * 
 * Challenge Scoring Model:
 * 1. Skills & Specialization Relevance: 25%
 * 2. AI Tools / Models Compatibility: 20%
 * 3. Content Type & Visual Style: 15%
 * 4. Technical Format & Aspect Ratio: 15%
 * 5. Workflow & Portfolio Relevance: 10%
 * 6. Commercial-Use Compatibility: 10%
 * 7. Budget Compatibility: 5%
 * Total: 100%
 */

export function calculateBriefCreatorMatch(brief, creator, portfolioItems = []) {
  const reasons = [];
  const limitations = [];
  const breakdowns = {
    skillsSpecialization: { max: 25, score: 0, matched: [], missing: [] },
    toolsModels: { max: 20, score: 0, matched: [], missing: [] },
    contentTypeStyle: { max: 15, score: 0, matched: [], missing: [] },
    technicalFormat: { max: 15, score: 0, matched: [], missing: [] },
    workflowPortfolio: { max: 10, score: 0, matched: [], missing: [] },
    commercialCompatibility: { max: 10, score: 0, matched: [], missing: [] },
    budgetFit: { max: 5, score: 0, details: '' },
  };

  // --- 1. Skills & Specialization (25%) ---
  let specScore = 0;
  const reqSpec = (brief.requiredSpecialization || '').toLowerCase();
  const creatorPrimary = (creator.primarySpecialization || '').toLowerCase();
  const creatorSecondaries = (creator.secondarySpecializations || []).map((s) => s.toLowerCase());

  if (creatorPrimary.includes(reqSpec) || reqSpec.includes(creatorPrimary)) {
    specScore += 15;
    breakdowns.skillsSpecialization.matched.push(`Primary Specialization: ${creator.primarySpecialization}`);
    reasons.push(`Top match for required specialization in ${creator.primarySpecialization}`);
  } else if (creatorSecondaries.some((s) => s.includes(reqSpec) || reqSpec.includes(s))) {
    specScore += 10;
    breakdowns.skillsSpecialization.matched.push(`Secondary Specialization Match`);
    reasons.push(`Covers specialization via secondary expertise`);
  } else {
    breakdowns.skillsSpecialization.missing.push(`Required: ${brief.requiredSpecialization}`);
    limitations.push(`Creator specializes in ${creator.primarySpecialization}, not primary ${brief.requiredSpecialization}`);
  }

  // Skills overlap
  const creatorSkills = (creator.technicalSkills || []).map((s) => s.toLowerCase());
  const briefDesc = `${brief.title} ${brief.description} ${brief.objective} ${brief.keyMessage}`.toLowerCase();
  const matchedSkills = (creator.technicalSkills || []).filter((skill) =>
    briefDesc.includes(skill.toLowerCase())
  );

  if (matchedSkills.length > 0) {
    const skillBonus = Math.min(10, matchedSkills.length * 4);
    specScore += skillBonus;
    breakdowns.skillsSpecialization.matched.push(...matchedSkills.map((s) => `Skill: ${s}`));
  } else {
    specScore += 4; // base competence
  }
  breakdowns.skillsSpecialization.score = Math.min(25, specScore);

  // --- 2. AI Tools & Models Compatibility (20%) ---
  const briefTools = brief.requiredTools || [];
  const creatorTools = (creator.aiToolsModels || []).map((t) => t.toLowerCase());

  if (briefTools.length === 0) {
    // If brief specifies no strict tool constraint, evaluate standard industry capability
    breakdowns.toolsModels.score = 18;
    breakdowns.toolsModels.matched.push(`Versatile AI Model Stack (${creator.aiToolsModels?.slice(0, 3).join(', ')})`);
    reasons.push(`Proficient across contemporary generative pipelines (${creator.aiToolsModels?.slice(0, 3).join(', ')})`);
  } else {
    let toolMatches = 0;
    briefTools.forEach((reqTool) => {
      const match = (creator.aiToolsModels || []).find((cTool) =>
        cTool.toLowerCase().includes(reqTool.toLowerCase()) || reqTool.toLowerCase().includes(cTool.toLowerCase())
      );
      if (match) {
        toolMatches++;
        breakdowns.toolsModels.matched.push(match);
      } else {
        breakdowns.toolsModels.missing.push(reqTool);
      }
    });

    if (toolMatches === briefTools.length) {
      breakdowns.toolsModels.score = 20;
      reasons.push(`100% toolchain alignment with required models: ${breakdowns.toolsModels.matched.join(', ')}`);
    } else if (toolMatches > 0) {
      breakdowns.toolsModels.score = Math.round((toolMatches / briefTools.length) * 20);
      reasons.push(`Supports key required models: ${breakdowns.toolsModels.matched.join(', ')}`);
      limitations.push(`Lacks explicit profile verification for: ${breakdowns.toolsModels.missing.join(', ')}`);
    } else {
      breakdowns.toolsModels.score = 3;
      limitations.push(`Does not advertise required models: ${briefTools.join(', ')}`);
    }
  }

  // --- 3. Content Type & Visual Style (15%) ---
  let typeStyleScore = 0;
  const briefContentType = (brief.contentType || '').toLowerCase();
  const creatorContentTypes = (creator.contentTypes || []).map((c) => c.toLowerCase());

  if (creatorContentTypes.some((c) => c.includes(briefContentType) || briefContentType.includes(c))) {
    typeStyleScore += 8;
    breakdowns.contentTypeStyle.matched.push(`Content Type: ${brief.contentType}`);
  } else {
    breakdowns.contentTypeStyle.missing.push(`Content Type: ${brief.contentType}`);
    limitations.push(`Content type ${brief.contentType} not listed in primary offerings`);
  }

  const briefStyle = (brief.visualStyle || '').toLowerCase();
  const creatorStyles = (creator.visualStyles || []).map((s) => s.toLowerCase());

  if (creatorStyles.some((s) => s.includes(briefStyle) || briefStyle.includes(s))) {
    typeStyleScore += 7;
    breakdowns.contentTypeStyle.matched.push(`Visual Style: ${brief.visualStyle}`);
    reasons.push(`Aesthetic matches requested style (${brief.visualStyle})`);
  } else {
    typeStyleScore += 3;
    breakdowns.contentTypeStyle.missing.push(`Visual Style: ${brief.visualStyle}`);
  }
  breakdowns.contentTypeStyle.score = Math.min(15, typeStyleScore);

  // --- 4. Technical Format & Aspect Ratio (15%) ---
  let techScore = 0;
  const briefRatio = brief.aspectRatio || '9:16';
  const creatorRatios = creator.supportedAspectRatios || [];

  if (creatorRatios.includes(briefRatio) || creatorRatios.length === 0) {
    techScore += 8;
    breakdowns.technicalFormat.matched.push(`Aspect Ratio: ${briefRatio}`);
  } else {
    breakdowns.technicalFormat.missing.push(`Aspect Ratio: ${briefRatio}`);
    limitations.push(`Creator profile does not explicitly confirm ${briefRatio} aspect ratio`);
  }

  const briefRes = brief.resolution || '1080p';
  const creatorRes = creator.supportedResolutions || [];
  if (creatorRes.some((r) => r.includes('4K') || r.includes(briefRes))) {
    techScore += 7;
    breakdowns.technicalFormat.matched.push(`Resolution: ${briefRes}`);
  } else {
    techScore += 3;
    breakdowns.technicalFormat.missing.push(`Resolution: ${briefRes}`);
  }
  breakdowns.technicalFormat.score = Math.min(15, techScore);

  // --- 5. Workflow & Portfolio Relevance (10%) ---
  let wfScore = 0;
  const relevantPortfolio = portfolioItems.filter((item) => {
    const itemText = `${item.title} ${item.description} ${item.category} ${item.visualStyle} ${(item.tags || []).join(' ')}`.toLowerCase();
    return itemText.includes(reqSpec) || itemText.includes(briefContentType) || (brief.visualStyle && itemText.includes(briefStyle));
  });

  if (relevantPortfolio.length >= 2) {
    wfScore += 10;
    breakdowns.workflowPortfolio.matched.push(`${relevantPortfolio.length} verified showcase pieces match project theme`);
    reasons.push(`Strong portfolio evidence with ${relevantPortfolio.length} directly related pieces`);
  } else if (relevantPortfolio.length === 1) {
    wfScore += 7;
    breakdowns.workflowPortfolio.matched.push(`1 relevant portfolio item`);
    reasons.push(`Contains relevant showcase item: "${relevantPortfolio[0].title}"`);
  } else if (portfolioItems.length > 0) {
    wfScore += 4;
    breakdowns.workflowPortfolio.matched.push(`General AI portfolio available (${portfolioItems.length} items)`);
    limitations.push(`Portfolio contains work in other aesthetics, none specifically tagged for ${brief.visualStyle || brief.contentType}`);
  } else {
    wfScore += 1;
    breakdowns.workflowPortfolio.missing.push('No verified portfolio items uploaded');
    limitations.push('Portfolio: Unspecified (no sample projects currently published)');
  }

  // Check production workflow disclosure
  if (!creator.productionWorkflow || creator.productionWorkflow.trim() === '') {
    limitations.push('Production workflow: Unspecified in profile');
  } else {
    breakdowns.workflowPortfolio.matched.push(`Documented pipeline: ${creator.productionWorkflow.slice(0, 60)}...`);
  }
  breakdowns.workflowPortfolio.score = Math.min(10, wfScore);

  // --- 6. Commercial-Use Compatibility (10%) ---
  let commScore = 0;
  const commStatus = creator.verification?.commercialLicensing?.status;
  const hasCommercialPortfolio = portfolioItems.some((item) => item.commercialUseStatus === 'Commercial Ready');

  let commercialCompatibilityStatus = 'Unspecified';
  if (commStatus === 'Verified' || hasCommercialPortfolio) {
    commScore += 10;
    commercialCompatibilityStatus = 'Enterprise Cleared';
    breakdowns.commercialCompatibility.matched.push('Commercial rights verified & enterprise cleared');
    reasons.push('Verified commercial licensing clearance with buyout readiness');
  } else if (commStatus === 'Self-reported') {
    commScore += 6;
    commercialCompatibilityStatus = 'Self-reported';
    breakdowns.commercialCompatibility.matched.push('Self-reported commercial readiness');
    limitations.push('Commercial licensing: Self-reported, formal enterprise audit pending');
  } else {
    commScore += 2;
    commercialCompatibilityStatus = 'Unspecified';
    breakdowns.commercialCompatibility.missing.push('Commercial licensing terms not established');
    limitations.push('Commercial licensing: Unspecified in profile, requires contract clearance');
  }
  breakdowns.commercialCompatibility.score = Math.min(10, commScore);

  // --- 7. Budget Fit (5%) ---
  let budgetScore = 0;
  const briefBudgetMax = brief.budget?.max || 50000;
  const creatorRate = creator.startingPrice || 20000;

  if (creatorRate <= briefBudgetMax) {
    budgetScore = 5;
    breakdowns.budgetFit.details = `Starting rate (₹${creatorRate.toLocaleString()}) within brief budget (max ₹${briefBudgetMax.toLocaleString()})`;
    reasons.push(`Budget compatible: starting fee ₹${creatorRate.toLocaleString()}`);
  } else {
    const diff = creatorRate - briefBudgetMax;
    budgetScore = Math.max(1, 5 - Math.round(diff / 10000));
    breakdowns.budgetFit.details = `Starting rate (₹${creatorRate.toLocaleString()}) exceeds budget (max ₹${briefBudgetMax.toLocaleString()})`;
    limitations.push(`Creator standard rate (₹${creatorRate.toLocaleString()}) is above target max budget (₹${briefBudgetMax.toLocaleString()})`);
  }
  breakdowns.budgetFit.score = budgetScore;

  // Calculate total score normalized
  const totalScore = Math.min(
    99,
    Math.max(
      35,
      breakdowns.skillsSpecialization.score +
        breakdowns.toolsModels.score +
        breakdowns.contentTypeStyle.score +
        breakdowns.technicalFormat.score +
        breakdowns.workflowPortfolio.score +
        breakdowns.commercialCompatibility.score +
        breakdowns.budgetFit.score
    )
  );

  return {
    creator,
    matchScore: totalScore,
    scoreBreakdown: breakdowns,
    reasons: reasons.slice(0, 4),
    limitations: limitations.slice(0, 3),
    relevantPortfolioItems: relevantPortfolio.slice(0, 3),
    matchedSkills: breakdowns.skillsSpecialization.matched,
    missingSkills: breakdowns.skillsSpecialization.missing,
    matchedTools: breakdowns.toolsModels.matched,
    missingTools: breakdowns.toolsModels.missing,
    commercialCompatibilityStatus,
    technicalFormatCompatibility: breakdowns.technicalFormat.missing.length === 0 ? 'Full Compatibility' : 'Partial Compatibility',
  };
}
