import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { CreatorCard } from '../../components/common/CreatorCard';
import { creatorAPI, briefAPI, proposalAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Send,
  Layers,
  ShieldCheck,
  ChevronRight,
  Clock,
  Briefcase,
  SlidersHorizontal,
  X,
  FileText,
  Users,
} from 'lucide-react';

const SPECIALIZATIONS = [
  'All',
  'AI Filmmaking',
  'AI Product Advertising',
  'AI Animation',
  'AI Fashion Visuals',
  'Generative Video',
  'AI Character Design',
  'AI Architectural Visualization',
  'AI Music Videos',
  'AI Concept Art',
];

const AI_TOOLS = [
  'All',
  'Runway Gen-3 Alpha',
  'Flux.1 Dev',
  'ComfyUI',
  'Midjourney v6.1',
  'Kling AI 1.5',
  'Luma Dream Machine',
  'Topaz Video AI',
];

const VISUAL_STYLES = [
  'All',
  'Cinematic',
  'Editorial Dark Luxury',
  'Photorealistic',
  'Stylized 3D',
  'Cyberpunk',
  'Surrealist',
];

export const ForBrandsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [selectedTool, setSelectedTool] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');

  // Creators Data
  const [creators, setCreators] = useState<any[]>([]);
  const [loadingCreators, setLoadingCreators] = useState(true);

  // Logged-in Brand Data
  const [activeBriefs, setActiveBriefs] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [loadingBrandData, setLoadingBrandData] = useState(false);

  // Creative Brief Form State
  const [showBriefForm, setShowBriefForm] = useState(false);
  const [submittingBrief, setSubmittingBrief] = useState(false);
  const [briefSubmitted, setBriefSubmitted] = useState(false);
  const [briefError, setBriefError] = useState('');

  const [briefForm, setBriefForm] = useState({
    title: '',
    description: '',
    contentType: 'Video',
    visualStyle: 'Editorial Dark Luxury',
    requiredTools: ['Flux.1 Dev', 'Runway Gen-3 Alpha'],
    aspectRatio: '16:9',
    duration: '30-60s Commercial',
    deliverables: 'ProRes 422 Master, 4K Upscale, MP4 H.265',
    commercialRights: 'Full Commercial Buyout',
    budgetMin: 35000,
    budgetMax: 70000,
    deadline: '',
    revisions: 2,
  });

  // Fetch recommended & filtered creators
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoadingCreators(true);
        const params: any = { limit: 6 };
        if (search.trim()) params.search = search.trim();
        if (selectedSpec !== 'All') params.specialization = selectedSpec;
        if (selectedTool !== 'All') params.tool = selectedTool;
        if (selectedStyle !== 'All') params.visualStyle = selectedStyle;

        const res = await creatorAPI.getCreators(params);
        if (res.data.success) {
          setCreators(res.data.creators || []);
        }
      } catch (err) {
        console.error('Failed to load creators', err);
      } finally {
        setLoadingCreators(false);
      }
    };

    fetchCreators();
  }, [search, selectedSpec, selectedTool, selectedStyle]);

  // Fetch brand data if user is logged in as brand
  useEffect(() => {
    if (user && user.role === 'brand') {
      const fetchBrandData = async () => {
        try {
          setLoadingBrandData(true);
          const [briefsRes, propsRes] = await Promise.all([
            briefAPI.getBriefs().catch(() => ({ data: { briefs: [] } })),
            proposalAPI.getProposals().catch(() => ({ data: { proposals: [] } })),
          ]);
          setActiveBriefs(briefsRes.data?.briefs || []);
          setProposals(propsRes.data?.proposals || []);
        } catch (err) {
          console.error('Error fetching brand data', err);
        } finally {
          setLoadingBrandData(false);
        }
      };
      fetchBrandData();
    }
  }, [user]);

  const handleToolToggle = (tool: string) => {
    setBriefForm((prev) => {
      const exists = prev.requiredTools.includes(tool);
      return {
        ...prev,
        requiredTools: exists
          ? prev.requiredTools.filter((t) => t !== tool)
          : [...prev.requiredTools, tool],
      };
    });
  };

  const handleBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBriefError('');

    if (!user) {
      alert('Please log in or create a Brand account to publish your creative brief.');
      navigate('/login?redirect=/for-brands');
      return;
    }

    if (user.role !== 'brand') {
      setBriefError('Only Brand accounts can publish creative briefs.');
      return;
    }

    if (!briefForm.title || !briefForm.description) {
      setBriefError('Please provide a campaign title and project description.');
      return;
    }

    try {
      setSubmittingBrief(true);
      const payload = {
        title: briefForm.title,
        description: briefForm.description,
        contentType: briefForm.contentType,
        visualStyle: briefForm.visualStyle,
        requiredAIModels: briefForm.requiredTools,
        aspectRatio: briefForm.aspectRatio,
        duration: briefForm.duration,
        deliverablesSummary: briefForm.deliverables,
        commercialUsageLicense: briefForm.commercialRights,
        budget: {
          min: Number(briefForm.budgetMin),
          max: Number(briefForm.budgetMax),
          currency: 'INR',
        },
        deadline: briefForm.deadline || undefined,
        revisionsAllowed: Number(briefForm.revisions),
      };

      const res = await briefAPI.createBrief(payload);
      if (res.data.success) {
        setBriefSubmitted(true);
        if (res.data.brief) {
          setActiveBriefs((prev) => [res.data.brief, ...prev]);
        }
      }
    } catch (err: any) {
      setBriefError(err.response?.data?.message || 'Failed to submit creative brief.');
    } finally {
      setSubmittingBrief(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedSpec('All');
    setSelectedTool('All');
    setSelectedStyle('All');
  };

  return (
    <div className="min-h-screen bg-collabrix-onyx text-collabrix-pearlDust flex flex-col justify-between selection:bg-collabrix-roseGold selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden border-b border-collabrix-borderVelvet/60 bg-gradient-to-b from-collabrix-onyx via-collabrix-velvet/40 to-collabrix-onyx">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-collabrix-roseGold/10 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer shadow-luxury">
              <Briefcase className="w-3.5 h-3.5 text-collabrix-roseGold" />
              <span>For Leading Brands &amp; Creative Agencies</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-collabrix-pearlDust max-w-4xl mx-auto leading-[1.12]">
              Find the right AI creators <br />
              <span className="text-gradient-rose italic font-normal">for your next campaign.</span>
            </h1>

            <p className="text-sm sm:text-base text-collabrix-pearlDust/80 max-w-2xl mx-auto leading-relaxed font-light">
              Transform your campaign brief into exceptional AI-powered commercials, vertical reels, and key visuals. Match with audited AI creators with verified tool expertise and full commercial buyout clearance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setShowBriefForm(true);
                  setTimeout(() => {
                    document.getElementById('brief-builder')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold uppercase tracking-wider shadow-luxury hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create a Creative Brief</span>
              </button>

              <a
                href="#creator-discovery"
                className="px-8 py-3.5 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/40 text-collabrix-roseGlimmer hover:bg-collabrix-velvetLight hover:text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-collabrix-roseGold" />
                <span>Browse AI Creators</span>
              </a>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-5xl mx-auto text-left">
              <div className="p-5 rounded-2xl bg-collabrix-velvet/80 border border-collabrix-borderVelvet shadow-velvet space-y-2">
                <span className="text-collabrix-roseGold font-serif text-lg font-bold">01. Natural Briefing</span>
                <p className="text-xs text-collabrix-pearlDust/80 leading-relaxed font-light">
                  Specify aspect ratios (9:16, 16:9), target AI pipelines (Flux, Runway, ComfyUI), and commercial rights in minutes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-collabrix-velvet/80 border border-collabrix-borderVelvet shadow-velvet space-y-2">
                <span className="text-collabrix-roseGold font-serif text-lg font-bold">02. Verified AI Talent</span>
                <p className="text-xs text-collabrix-pearlDust/80 leading-relaxed font-light">
                  Every creator is pre-audited for prompt mastery, temporal consistency, LoRA training, and commercial license validity.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-collabrix-velvet/80 border border-collabrix-borderVelvet shadow-velvet space-y-2">
                <span className="text-collabrix-roseGold font-serif text-lg font-bold">03. Production Certainty</span>
                <p className="text-xs text-collabrix-pearlDust/80 leading-relaxed font-light">
                  Direct proposals, milestone tracking, 4K ProRes master reviews, and streamlined creator contracts in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand User Active Workspace Section (when logged in as brand) */}
        {user && user.role === 'brand' && (
          <section className="px-4 sm:px-6 lg:px-8 py-12 bg-collabrix-velvet/30 border-b border-collabrix-borderVelvet">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-collabrix-pearlDust">
                    Your Brand Campaigns &amp; Briefs
                  </h2>
                  <p className="text-xs text-collabrix-mutedText mt-1">
                    Manage your active creative briefs, received proposals, and ongoing creator collaborations.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/brand/dashboard"
                    className="px-4 py-2 rounded-xl bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-velvetLight transition-colors"
                  >
                    Open Brand Dashboard
                  </Link>
                  <Link
                    to="/brand/proposals"
                    className="px-4 py-2 rounded-xl bg-collabrix-roseGold text-white text-xs font-semibold shadow-luxury hover:bg-collabrix-roseGoldHover transition-colors"
                  >
                    View Proposals ({proposals.length})
                  </Link>
                </div>
              </div>

              {/* Active Briefs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeBriefs.length === 0 ? (
                  <div className="md:col-span-3 p-8 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet text-center space-y-3">
                    <p className="text-xs text-collabrix-mutedText">
                      You haven't posted any creative briefs yet.
                    </p>
                    <button
                      onClick={() => setShowBriefForm(true)}
                      className="px-5 py-2 rounded-full bg-collabrix-roseGold text-white text-xs font-semibold shadow-luxury"
                    >
                      Post Your First Campaign Brief
                    </button>
                  </div>
                ) : (
                  activeBriefs.slice(0, 3).map((b) => (
                    <div
                      key={b._id}
                      className="p-5 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold">
                            {b.status || 'Active'}
                          </span>
                          <span className="text-[11px] text-collabrix-roseGold font-bold">
                            ₹{b.budget?.max?.toLocaleString() || 'Flexible'}
                          </span>
                        </div>
                        <h3 className="font-serif text-sm font-bold text-collabrix-pearlDust truncate">
                          {b.title}
                        </h3>
                        <p className="text-xs text-collabrix-mutedText line-clamp-2">
                          {b.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-collabrix-borderVelvet/60 flex items-center justify-between">
                        <span className="text-[10px] text-collabrix-roseGlimmer">
                          {b.contentType} • {b.aspectRatio}
                        </span>
                        <Link
                          to={`/brand/briefs/${b._id}/matches`}
                          className="text-xs text-collabrix-roseGold hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>Matches</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* Creator Discovery & Working Filters Section */}
        <section id="creator-discovery" className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-collabrix-roseGold font-semibold">
                  Marketplace Discovery
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-collabrix-pearlDust">
                  Discover Recommended AI Creators
                </h2>
                <p className="text-xs text-collabrix-mutedText">
                  Filter by tool mastery, creative specialization, and production style.
                </p>
              </div>

              <Link
                to="/explore"
                className="text-xs text-collabrix-roseGold hover:text-collabrix-roseGlimmer font-semibold flex items-center gap-1 self-start md:self-auto"
              >
                <span>View all 35+ creators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Keyword Search */}
                <div className="sm:col-span-4 relative">
                  <Search className="w-4 h-4 text-collabrix-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search creators, skills, models..."
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl pl-10 pr-4 py-2.5 text-xs text-collabrix-pearlDust placeholder:text-collabrix-mutedText focus:outline-none focus:border-collabrix-roseGold"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-collabrix-mutedText hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Specialization Filter */}
                <div className="sm:col-span-3">
                  <select
                    value={selectedSpec}
                    onChange={(e) => setSelectedSpec(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  >
                    {SPECIALIZATIONS.map((s) => (
                      <option key={s} value={s}>
                        Specialization: {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* AI Tools Filter */}
                <div className="sm:col-span-3">
                  <select
                    value={selectedTool}
                    onChange={(e) => setSelectedTool(e.target.value)}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  >
                    {AI_TOOLS.map((t) => (
                      <option key={t} value={t}>
                        AI Tool: {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters Button */}
                <div className="sm:col-span-2 flex items-center">
                  <button
                    onClick={clearFilters}
                    className="w-full py-2.5 px-3 rounded-xl bg-collabrix-velvetLight text-xs font-semibold text-collabrix-pearlDust hover:text-white hover:bg-collabrix-borderVelvet transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Style Quick Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-collabrix-borderVelvet/60">
                <span className="text-[11px] text-collabrix-mutedText font-semibold mr-1">
                  Visual Style:
                </span>
                {VISUAL_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      selectedStyle === style
                        ? 'bg-collabrix-roseGold text-white shadow-luxury'
                        : 'bg-collabrix-onyx border border-collabrix-borderVelvet text-collabrix-pearlDust/80 hover:border-collabrix-roseGold/40'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Creators Grid */}
            {loadingCreators ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-2 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-collabrix-mutedText">Loading creator profiles...</span>
              </div>
            ) : creators.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-3">
                <p className="text-sm font-semibold text-collabrix-pearlDust">No creators found matching these filters.</p>
                <p className="text-xs text-collabrix-mutedText">Try clearing filters or searching with a different term.</p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 rounded-full bg-collabrix-roseGold text-white text-xs font-semibold mt-2"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((c) => (
                  <CreatorCard key={c._id} creator={c} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Comprehensive Creative Brief Form Section */}
        <section id="brief-builder" className="px-4 sm:px-6 lg:px-8 py-16 bg-collabrix-velvet/20 border-t border-collabrix-borderVelvet">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-widest text-collabrix-roseGold font-semibold">
                Campaign Brief Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-collabrix-pearlDust">
                Create a Structured Creative Brief
              </h2>
              <p className="text-xs sm:text-sm text-collabrix-mutedText max-w-xl mx-auto">
                Define your exact technical format, required AI models, aspect ratio, duration, commercial buyout terms, and deliverables.
              </p>
            </div>

            {briefSubmitted ? (
              <div className="p-8 rounded-3xl bg-collabrix-velvet border border-emerald-500/40 text-center space-y-4 shadow-velvet">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-collabrix-pearlDust">
                  Creative Brief Published Successfully!
                </h3>
                <p className="text-xs text-collabrix-pearlDust/80 max-w-md mx-auto leading-relaxed">
                  Your brief is live in the COLLABRIX ecosystem. Our AI matching engine is ranking creators according to your model requirements.
                </p>
                <div className="flex justify-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      setBriefSubmitted(false);
                      setBriefForm({
                        title: '',
                        description: '',
                        contentType: 'Video',
                        visualStyle: 'Editorial Dark Luxury',
                        requiredTools: ['Flux.1 Dev', 'Runway Gen-3 Alpha'],
                        aspectRatio: '16:9',
                        duration: '30-60s Commercial',
                        deliverables: 'ProRes 422 Master, 4K Upscale, MP4 H.265',
                        commercialRights: 'Full Commercial Buyout',
                        budgetMin: 35000,
                        budgetMax: 70000,
                        deadline: '',
                        revisions: 2,
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-collabrix-velvetLight text-collabrix-roseGlimmer text-xs font-semibold border border-collabrix-roseGold/40"
                  >
                    Create Another Brief
                  </button>
                  <Link
                    to="/explore"
                    className="px-6 py-2.5 rounded-full bg-collabrix-roseGold text-white text-xs font-semibold shadow-luxury"
                  >
                    Match Creators Now
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleBriefSubmit}
                className="p-6 sm:p-10 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-6"
              >
                {briefError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300">
                    {briefError}
                  </div>
                )}

                {/* 1. Title & Description */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Campaign Title *
                    </label>
                    <input
                      type="text"
                      value={briefForm.title}
                      onChange={(e) => setBriefForm({ ...briefForm, title: e.target.value })}
                      placeholder="e.g. Celestial Noir — Luxury Timepiece Generative Commercial"
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Creative Campaign Scope &amp; Concept *
                    </label>
                    <textarea
                      value={briefForm.description}
                      onChange={(e) => setBriefForm({ ...briefForm, description: e.target.value })}
                      rows={4}
                      placeholder="Describe your creative requirements, narrative pacing, target demographic, color tones, lighting mood, and scene breakdown..."
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl p-4 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold resize-none leading-relaxed"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* 2. Format & Style Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Content Type
                    </label>
                    <select
                      value={briefForm.contentType}
                      onChange={(e) => setBriefForm({ ...briefForm, contentType: e.target.value })}
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    >
                      <option value="Video">Generative Video</option>
                      <option value="Animation">3D / 2D AI Animation</option>
                      <option value="Product Visual">Photorealistic Product Ad</option>
                      <option value="Key Visual">Master Keyframe Stills</option>
                      <option value="Character Design">Virtual Model / Character</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Visual Aesthetic / Style
                    </label>
                    <select
                      value={briefForm.visualStyle}
                      onChange={(e) => setBriefForm({ ...briefForm, visualStyle: e.target.value })}
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    >
                      <option value="Editorial Dark Luxury">Editorial Dark Luxury</option>
                      <option value="Cinematic">Cinematic 35mm</option>
                      <option value="Photorealistic">Hyper-Photorealistic</option>
                      <option value="Stylized 3D">Stylized 3D / Kinetic</option>
                      <option value="Cyberpunk">Cyberpunk Neon</option>
                      <option value="Surrealist">Magical Realism</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Aspect Ratio
                    </label>
                    <select
                      value={briefForm.aspectRatio}
                      onChange={(e) => setBriefForm({ ...briefForm, aspectRatio: e.target.value })}
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    >
                      <option value="16:9">16:9 (Widescreen / Landscape)</option>
                      <option value="9:16">9:16 (Vertical Reels / TikTok)</option>
                      <option value="1:1">1:1 (Square Feed Post)</option>
                      <option value="4:5">4:5 (Instagram Portrait)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Duration, Deliverables, Rights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Duration / Length
                    </label>
                    <select
                      value={briefForm.duration}
                      onChange={(e) => setBriefForm({ ...briefForm, duration: e.target.value })}
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    >
                      <option value="15-30s Reels">15-30s (Short Reel)</option>
                      <option value="30-60s Commercial">30-60s (Commercial Spot)</option>
                      <option value="60-120s Cinematic">60-120s (Narrative Film)</option>
                      <option value="Static Asset Pack">Static Asset Pack (Stills)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Deliverables Spec
                    </label>
                    <input
                      type="text"
                      value={briefForm.deliverables}
                      onChange={(e) => setBriefForm({ ...briefForm, deliverables: e.target.value })}
                      placeholder="e.g. 4K ProRes 422, MP4 H.265"
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Commercial Usage Rights
                    </label>
                    <select
                      value={briefForm.commercialRights}
                      onChange={(e) => setBriefForm({ ...briefForm, commercialRights: e.target.value })}
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    >
                      <option value="Full Commercial Buyout">Full Commercial Buyout (Perpetual)</option>
                      <option value="Digital Advertising">Digital Advertising (Worldwide 24m)</option>
                      <option value="Worldwide Broadcast">Worldwide TV &amp; OTT Broadcast</option>
                      <option value="Social Media Only">Social Media Only (Organic + Paid)</option>
                    </select>
                  </div>
                </div>

                {/* 4. Required AI Tools & Models */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-2">
                    Required AI Tools &amp; Pipelines (Select preferred models)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Flux.1 Dev',
                      'Runway Gen-3 Alpha',
                      'ComfyUI',
                      'Midjourney v6.1',
                      'Kling AI 1.5',
                      'Luma Dream Machine',
                      'Topaz Video AI',
                      'ElevenLabs',
                      'ControlNet',
                    ].map((tool) => {
                      const selected = briefForm.requiredTools.includes(tool);
                      return (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => handleToolToggle(tool)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            selected
                              ? 'bg-collabrix-roseGold text-white shadow-luxury'
                              : 'bg-collabrix-onyx border border-collabrix-borderVelvet text-collabrix-pearlDust/80 hover:border-collabrix-roseGold/40'
                          }`}
                        >
                          {tool} {selected ? '✓' : '+'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Budget, Deadline & Revisions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Budget Range (₹ INR)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={briefForm.budgetMin}
                        onChange={(e) => setBriefForm({ ...briefForm, budgetMin: Number(e.target.value) })}
                        placeholder="Min"
                        className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                      />
                      <input
                        type="number"
                        value={briefForm.budgetMax}
                        onChange={(e) => setBriefForm({ ...briefForm, budgetMax: Number(e.target.value) })}
                        placeholder="Max"
                        className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Production Deadline
                    </label>
                    <input
                      type="date"
                      value={briefForm.deadline}
                      onChange={(e) => setBriefForm({ ...briefForm, deadline: e.target.value })}
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                      Revisions Included
                    </label>
                    <select
                      value={briefForm.revisions}
                      onChange={(e) => setBriefForm({ ...briefForm, revisions: Number(e.target.value) })}
                      className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    >
                      <option value={1}>1 Major Revision Pass</option>
                      <option value={2}>2 Revision Passes (Recommended)</option>
                      <option value={3}>3 Revision Passes</option>
                      <option value={5}>5 Revision Passes</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-collabrix-borderVelvet/60 flex items-center justify-between">
                  <span className="text-[11px] text-collabrix-mutedText">
                    All briefs are protected by COLLABRIX creator agreements &amp; escrow terms.
                  </span>

                  <button
                    type="submit"
                    disabled={submittingBrief}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold uppercase tracking-wider shadow-luxury hover:shadow-glow transition-all flex items-center gap-2"
                  >
                    {submittingBrief ? (
                      <span>Publishing Brief...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Creative Brief</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
