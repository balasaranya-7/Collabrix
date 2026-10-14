import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { briefAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Clock,
  Film,
} from 'lucide-react';

const SPECIALIZATIONS = [
  'AI Filmmaking',
  'Generative Video',
  'AI Animation',
  'AI Product Advertising',
  'AI Character Design',
  'AI Fashion Visuals',
  'AI Music Videos',
  'AI Storytelling',
  'AI Concept Art',
  'AI Game Art',
  'AI Architectural Visualization',
  'AI Visual Effects',
  'AI Brand Identity',
];

export const CreateBriefPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // AI Assist State (Bonus Feature)
  const [roughPrompt, setRoughPrompt] = useState('');
  const [generatingAi, setGeneratingAi] = useState(false);
  const [aiGeneratedFlag, setAiGeneratedFlag] = useState(false);

  // Form Fields State
  // Step 1: Project Overview
  const [title, setTitle] = useState('');
  const [brandName, setBrandName] = useState(user?.companyName || user?.name || 'Aura Luxury Studios');
  const [productService, setProductService] = useState('');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [requiredSpecialization, setRequiredSpecialization] = useState('AI Filmmaking');

  // Step 2: Creative Requirements
  const [contentType, setContentType] = useState('video');
  const [visualStyle, setVisualStyle] = useState('Cinematic');
  const [toneMood, setToneMood] = useState('High-production value, aspirational, photorealistic');
  const [requiredTools, setRequiredTools] = useState<string[]>(['Runway Gen-3 Alpha', 'Flux.1']);
  const [preferredWorkflow, setPreferredWorkflow] = useState('');

  // Step 3: Technical & Commercial Requirements
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [resolution, setResolution] = useState('1080p');
  const [duration, setDuration] = useState('30 seconds');
  const [deliverablesCount, setDeliverablesCount] = useState(3);
  const [budgetMin, setBudgetMin] = useState(25000);
  const [budgetMax, setBudgetMax] = useState(55000);
  const [intendedUse, setIntendedUse] = useState('paid advertising');
  const [commercialRightsScope, setCommercialRightsScope] = useState('Digital Paid Ads (1 Year)');
  const [deadlineDays, setDeadlineDays] = useState(14);

  // AI Assist Action
  const handleAiAssist = async (promptToUse = roughPrompt) => {
    if (!promptToUse.trim()) return;
    try {
      setGeneratingAi(true);
      setError('');
      const res = await briefAPI.generateAiBrief(promptToUse);
      if (res.data.success && res.data.suggestion) {
        const s = res.data.suggestion;
        setTitle(s.generatedTitle || title);
        setDescription(promptToUse);
        setObjective(s.suggestedKeyMessage || '');
        setRequiredSpecialization(s.suggestedSpecialization || requiredSpecialization);
        setContentType(s.suggestedContentType || contentType);
        setVisualStyle(s.suggestedVisualStyle || visualStyle);
        setToneMood(s.suggestedToneMood || toneMood);
        setAspectRatio(s.suggestedAspectRatio || aspectRatio);
        setResolution(s.suggestedResolution || resolution);
        setDuration(s.suggestedDuration || duration);
        if (s.suggestedTools) setRequiredTools(s.suggestedTools);
        if (s.suggestedBudget) {
          setBudgetMin(s.suggestedBudget.min || budgetMin);
          setBudgetMax(s.suggestedBudget.max || budgetMax);
        }
        if (s.suggestedIntendedUse) setIntendedUse(s.suggestedIntendedUse);
        if (s.suggestedCommercialRights) setCommercialRightsScope(s.suggestedCommercialRights);
        setAiGeneratedFlag(true);
      }
    } catch (err) {
      console.error(err);
      setError('AI Assist failed. Please enter fields manually.');
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const deadline = new Date();
      deadline.setDate(deadline.getDate() + Number(deadlineDays));

      const payload = {
        title: title.trim() || 'Untitled Creative Brief',
        brandName,
        productService,
        description: description.trim() || 'No description provided',
        objective,
        targetAudience,
        requiredSpecialization,
        contentType,
        visualStyle,
        toneMood,
        requiredTools,
        preferredWorkflow,
        aspectRatio,
        resolution,
        duration,
        deliverablesCount: Number(deliverablesCount),
        intendedUse,
        commercialRightsScope,
        budget: {
          min: Number(budgetMin),
          max: Number(budgetMax),
          currency: 'INR',
        },
        deadline,
        rawIdeaPrompt: roughPrompt,
        isAiGenerated: aiGeneratedFlag,
        status: 'active',
      };

      const res = await briefAPI.createBrief(payload);
      if (res.data.success && res.data.brief) {
        // Redirect directly to creator matches page for this brief!
        navigate(`/brand/briefs/${res.data.brief._id}/matches`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save brief. Please check required fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust">
            Create Creative Brief
          </h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            Specify artistic vision, AI tool requirements, technical aspect ratios, and commercial licensing.
          </p>
        </div>
      </div>

      {/* Bonus AI-Assisted Brief Builder Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-collabrix-velvet via-collabrix-velvetLight to-collabrix-velvet border border-collabrix-roseGold/40 shadow-luxury space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-collabrix-roseGold animate-pulse" />
            <h3 className="font-serif text-sm font-bold text-collabrix-pearlDust">
              AI-Assisted Brief Builder (Bonus)
            </h3>
          </div>
          <span className="text-[10px] text-collabrix-roseGlimmer font-medium">Heuristic NLP Parser</span>
        </div>

        <p className="text-xs text-collabrix-pearlDust/80">
          Enter a rough idea and our engine will automatically generate structured technical and commercial specifications.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={roughPrompt}
            onChange={(e) => setRoughPrompt(e.target.value)}
            placeholder="e.g. Create a premium cinematic AI video ad for a luxury skincare product, vertical format, suitable for paid social advertising."
            className="flex-1 bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-xs text-collabrix-pearlDust placeholder:text-collabrix-mutedText focus:outline-none focus:border-collabrix-roseGold"
          />
          <button
            type="button"
            onClick={() => handleAiAssist()}
            disabled={generatingAi}
            className="px-5 py-2.5 rounded-xl bg-collabrix-roseGold hover:bg-collabrix-roseGoldHover text-white text-xs font-semibold shadow-luxury transition-all flex items-center justify-center gap-2 shrink-0"
          >
            {generatingAi ? <span>Synthesizing...</span> : <span>Generate Blueprint</span>}
          </button>
        </div>

        {/* Quick sample clickers */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-collabrix-mutedText">
          <span>Try quick example:</span>
          {[
            'Cinematic Skincare Vertical Ad',
            'Artisanal Coffee Heritage Reel',
            'Cyberpunk Anime Music Visualizer',
          ].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setRoughPrompt(sample);
                handleAiAssist(sample);
              }}
              className="px-2.5 py-0.5 rounded-full bg-collabrix-onyx border border-collabrix-borderVelvet text-collabrix-roseGlimmer hover:border-collabrix-roseGold/60 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Stepper Form matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-6">
          {/* Stepper Navigation */}
          <div className="flex items-center justify-between border-b border-collabrix-borderVelvet pb-4 text-xs font-medium">
            {[
              { num: 1, label: '1. Brief' },
              { num: 2, label: '2. Style & Tools' },
              { num: 3, label: '3. Technical & Commercial' },
              { num: 4, label: '4. Review' },
            ].map((step) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-1.5 transition-colors ${
                  currentStep === step.num
                    ? 'text-collabrix-roseGlimmer font-bold'
                    : currentStep > step.num
                    ? 'text-emerald-400 font-semibold'
                    : 'text-collabrix-mutedText'
                }`}
              >
                <span>{step.label}</span>
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Step 1: Project Overview */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Collection Launch — Cinematic AI Film"
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Product / Service
                  </label>
                  <input
                    type="text"
                    value={productService}
                    onChange={(e) => setProductService(e.target.value)}
                    placeholder="e.g. Organic Hydration Serum"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Required Creator Specialization *
                </label>
                <select
                  value={requiredSpecialization}
                  onChange={(e) => setRequiredSpecialization(e.target.value)}
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                >
                  {SPECIALIZATIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Campaign Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe your vision, core narrative, and what you are looking for creators to deliver..."
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl p-3.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold resize-none leading-relaxed"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Creative Objective
                  </label>
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    placeholder="e.g. Elevate luxury brand perception"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Affluent consumers aged 24-40"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-collabrix-roseGold text-white text-xs font-semibold flex items-center gap-2"
                >
                  <span>Next: Style & Tools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Creative Requirements & AI Models */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Content Type *
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="video">Generative Video</option>
                    <option value="animation">AI Animation</option>
                    <option value="product visual">Product Visual / Commercial Stills</option>
                    <option value="character design">Character Design</option>
                    <option value="image">High-Res Key Visual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Visual Style *
                  </label>
                  <select
                    value={visualStyle}
                    onChange={(e) => setVisualStyle(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="Cinematic">Cinematic</option>
                    <option value="Photorealistic">Photorealistic</option>
                    <option value="Editorial Dark Luxury">Editorial Dark Luxury</option>
                    <option value="Stylized 3D">Stylized 3D</option>
                    <option value="Cyberpunk">Cyberpunk Neon</option>
                    <option value="Surrealist">Surrealist</option>
                    <option value="Minimalist">Minimalist</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Tone and Mood
                </label>
                <input
                  type="text"
                  value={toneMood}
                  onChange={(e) => setToneMood(e.target.value)}
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Required AI Tools / Models Preference
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Runway Gen-3 Alpha', 'Flux.1 Dev', 'ComfyUI', 'Midjourney v6.1', 'Luma Dream Machine', 'Kling AI 1.5', 'Topaz Video AI', 'ElevenLabs'].map((tool) => {
                    const isSelected = requiredTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setRequiredTools(requiredTools.filter((t) => t !== tool));
                          } else {
                            setRequiredTools([...requiredTools, tool]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                          isSelected
                            ? 'bg-collabrix-roseGold text-white font-semibold'
                            : 'bg-collabrix-onyx text-collabrix-pearlDust/80 border border-collabrix-borderVelvet'
                        }`}
                      >
                        {isSelected ? `✓ ${tool}` : tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Preferred Workflow Notes (Optional)
                </label>
                <input
                  type="text"
                  value={preferredWorkflow}
                  onChange={(e) => setPreferredWorkflow(e.target.value)}
                  placeholder="e.g. Flux keyframes -> ComfyUI LoRA -> Runway Gen-3 camera control"
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet text-xs text-collabrix-mutedText hover:text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-collabrix-roseGold text-white text-xs font-semibold flex items-center gap-2"
                >
                  <span>Next: Technical & Commercial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Technical & Commercial Requirements */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Aspect Ratio *
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="9:16">9:16 (Vertical Reels / TikTok)</option>
                    <option value="16:9">16:9 (Landscape Widescreen)</option>
                    <option value="1:1">1:1 (Square Feed)</option>
                    <option value="4:5">4:5 (Portrait Editorial)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Resolution *
                  </label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="1080p">1080p FHD</option>
                    <option value="4K UHD">4K UHD Master</option>
                    <option value="720p">720p Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Target Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 30 seconds"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Deliverables Count
                  </label>
                  <input
                    type="number"
                    value={deliverablesCount}
                    onChange={(e) => setDeliverablesCount(Number(e.target.value))}
                    min="1"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
              </div>

              {/* Commercial Use Terms */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Intended Use *
                  </label>
                  <select
                    value={intendedUse}
                    onChange={(e) => setIntendedUse(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="paid advertising">Paid Social & Digital Advertising</option>
                    <option value="organic marketing">Organic Social Media Only</option>
                    <option value="website">Website / E-Commerce Landing Page</option>
                    <option value="broadcast">Broadcast / Streaming OTT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Commercial Rights Scope *
                  </label>
                  <select
                    value={commercialRightsScope}
                    onChange={(e) => setCommercialRightsScope(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="Digital Paid Ads (1 Year)">Digital Paid Ads (1 Year)</option>
                    <option value="Full Commercial Buyout">Full Commercial Buyout</option>
                    <option value="Organic Social Media Only">Organic Social Media Only</option>
                    <option value="Undecided / Negotiable">Undecided / Negotiable</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Budget Min (₹ INR)
                  </label>
                  <input
                    type="number"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(Number(e.target.value))}
                    step="5000"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                    Budget Max (₹ INR)
                  </label>
                  <input
                    type="number"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(Number(e.target.value))}
                    step="5000"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet text-xs text-collabrix-mutedText hover:text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-collabrix-roseGold text-white text-xs font-semibold flex items-center gap-2"
                >
                  <span>Next: Review Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review Completed Brief */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-collabrix-onyx border border-collabrix-borderVelvet space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-collabrix-pearlDust">{title || 'Untitled Brief'}</h3>
                    <p className="text-xs text-collabrix-roseGold">{requiredSpecialization} • {contentType}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/30 text-xs font-bold text-collabrix-roseGlimmer">
                    ₹{budgetMin.toLocaleString()} - ₹{budgetMax.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-collabrix-pearlDust/85 leading-relaxed font-light">{description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-collabrix-borderVelvet">
                  <div>
                    <p className="text-[10px] uppercase text-collabrix-mutedText">Aspect Ratio</p>
                    <p className="font-mono text-collabrix-pearlDust">{aspectRatio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-collabrix-mutedText">Resolution</p>
                    <p className="font-mono text-collabrix-pearlDust">{resolution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-collabrix-mutedText">Duration</p>
                    <p className="font-mono text-collabrix-pearlDust">{duration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-collabrix-mutedText">Rights Scope</p>
                    <p className="font-medium text-emerald-400">{commercialRightsScope}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-collabrix-mutedText mb-1.5">Required Tooling:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {requiredTools.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-collabrix-velvet text-[11px] text-collabrix-roseGlimmer border border-collabrix-roseGold/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet text-xs text-collabrix-mutedText hover:text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold tracking-wide shadow-luxury hover:shadow-glow transition-all flex items-center gap-2"
                >
                  {loading ? <span>Publishing & Matching...</span> : <span>Publish Brief & Discover Creators</span>}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Decorative Card matching screenshot ("Better Together" with botanical illustration) */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet flex flex-col justify-between min-h-[480px] relative overflow-hidden">
          {/* Subtle rose floral background */}
          <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
              alt=""
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-collabrix-velvet via-transparent to-collabrix-velvet/80"></div>
          </div>

          <div className="space-y-4 relative z-10">
            <span className="text-[10px] uppercase tracking-widest text-collabrix-roseGold font-semibold">
              The Collabrix Standard
            </span>
            <h3 className="font-serif text-3xl font-bold text-collabrix-pearlDust leading-tight">
              Better <br />
              <span className="text-gradient-rose italic font-normal">Together.</span>
            </h3>
            <p className="text-xs text-collabrix-pearlDust/80 leading-relaxed font-light">
              Clear creative briefs attract top-tier AI filmmakers and generative directors. Define your requirements accurately to unlock high-precision matches.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-collabrix-borderVelvet/60 space-y-3">
            <div className="flex items-center gap-2 text-xs text-collabrix-roseGlimmer">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Commercial Buyout Ready</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-collabrix-roseGlimmer">
              <Zap className="w-4 h-4 text-collabrix-roseGold" />
              <span>Instant 7-Factor Match Ranking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
