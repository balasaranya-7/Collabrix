import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { CreatorCard } from '../../components/common/CreatorCard';
import { creatorAPI } from '../../services/api';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

const SPECIALIZATIONS = [
  'All',
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

const AI_TOOLS = [
  'All',
  'Flux.1 Dev',
  'Runway Gen-3 Alpha',
  'ComfyUI',
  'Midjourney v6.1',
  'Luma Dream Machine',
  'Kling AI 1.5',
  'Topaz Video AI',
  'ElevenLabs',
  'AnimateDiff',
  'ControlNet',
];

const CONTENT_TYPES = ['All', 'Video', 'Animation', 'Product Visual', 'Character Design', 'Image'];
const VISUAL_STYLES = ['All', 'Cinematic', 'Photorealistic', 'Editorial Dark Luxury', 'Stylized 3D', 'Cyberpunk', 'Surrealist', 'Minimalist'];
const ASPECT_RATIOS = ['All', '9:16', '16:9', '1:1', '4:5'];

export const ExploreCreatorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [specialization, setSpecialization] = useState(searchParams.get('specialization') || 'All');
  const [tool, setTool] = useState(searchParams.get('tool') || 'All');
  const [contentType, setContentType] = useState(searchParams.get('contentType') || 'All');
  const [visualStyle, setVisualStyle] = useState(searchParams.get('visualStyle') || 'All');
  const [aspectRatio, setAspectRatio] = useState(searchParams.get('aspectRatio') || 'All');
  const [verificationStatus, setVerificationStatus] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [page, setPage] = useState(1);

  // Data state
  const [creators, setCreators] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit: 9,
        sortBy,
      };

      if (search.trim()) params.search = search.trim();
      if (specialization !== 'All') params.specialization = specialization;
      if (tool !== 'All') params.tool = tool;
      if (contentType !== 'All') params.contentType = contentType;
      if (visualStyle !== 'All') params.visualStyle = visualStyle;
      if (aspectRatio !== 'All') params.aspectRatio = aspectRatio;
      if (verificationStatus !== 'All') params.verificationStatus = verificationStatus;

      const res = await creatorAPI.getCreators(params);
      if (res.data.success) {
        setCreators(res.data.creators);
        setTotal(res.data.total);
        setTotalPages(res.data.pages);
      }
    } catch (err) {
      console.error('Error fetching creators', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [specialization, tool, contentType, visualStyle, aspectRatio, verificationStatus, sortBy, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCreators();
  };

  const handleResetFilters = () => {
    setSearch('');
    setSpecialization('All');
    setTool('All');
    setContentType('All');
    setVisualStyle('All');
    setAspectRatio('All');
    setVerificationStatus('All');
    setSortBy('rating');
    setPage(1);
  };

  const activeFiltersCount = [
    specialization !== 'All',
    tool !== 'All',
    contentType !== 'All',
    visualStyle !== 'All',
    aspectRatio !== 'All',
    verificationStatus !== 'All',
    Boolean(search.trim()),
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-collabrix-onyx text-collabrix-pearlDust flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Page Title & Search Bar matching screenshot */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/30 text-[11px] font-semibold text-collabrix-roseGlimmer mb-2">
                <Sparkles className="w-3 h-3 text-collabrix-roseGold" />
                <span>AI Talent Discovery Engine</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-collabrix-pearlDust">
                Explore AI Creators
              </h1>
              <p className="text-xs sm:text-sm text-collabrix-mutedText mt-1">
                Discover {total} AI-native creators with verifiable models, technical aspect ratios, and production pipelines.
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-collabrix-mutedText shrink-0">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
              >
                <option value="rating">Highest Match Rating</option>
                <option value="collaborations">Most Collaborations</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Keyword Search & Filter Toggle Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search className="w-4 h-4 text-collabrix-mutedText absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by creator name, tools (e.g. Flux.1, Runway), skills, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-2xl pl-11 pr-24 py-3 text-xs text-collabrix-pearlDust placeholder:text-collabrix-mutedText focus:outline-none focus:border-collabrix-roseGold shadow-velvet"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-collabrix-roseGold hover:bg-collabrix-roseGoldHover text-white text-xs font-semibold shadow-luxury transition-colors"
              >
                Search
              </button>
            </form>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="sm:hidden px-4 py-3 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet text-xs text-collabrix-roseGlimmer flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters ({activeFiltersCount})</span>
            </button>
          </div>

          {/* Quick Specialization Tags Horizontal Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {SPECIALIZATIONS.slice(0, 8).map((spec) => (
              <button
                key={spec}
                onClick={() => {
                  setSpecialization(spec);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all text-xs ${
                  specialization === spec
                    ? 'bg-collabrix-roseGold text-white font-semibold shadow-glow'
                    : 'bg-collabrix-velvet text-collabrix-pearlDust/80 border border-collabrix-borderVelvet hover:border-collabrix-roseGold/40'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Active Filter Tags with Reset */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-collabrix-mutedText text-[11px]">Active Filters:</span>
              {specialization !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGlimmer text-[11px] flex items-center gap-1">
                  Spec: {specialization}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSpecialization('All')} />
                </span>
              )}
              {tool !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGlimmer text-[11px] flex items-center gap-1">
                  Tool: {tool}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setTool('All')} />
                </span>
              )}
              {contentType !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGlimmer text-[11px] flex items-center gap-1">
                  Type: {contentType}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setContentType('All')} />
                </span>
              )}
              {visualStyle !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGlimmer text-[11px] flex items-center gap-1">
                  Style: {visualStyle}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setVisualStyle('All')} />
                </span>
              )}
              {aspectRatio !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGlimmer text-[11px] flex items-center gap-1">
                  Aspect: {aspectRatio}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setAspectRatio('All')} />
                </span>
              )}
              {verificationStatus !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGlimmer text-[11px] flex items-center gap-1">
                  Status: {verificationStatus}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setVerificationStatus('All')} />
                </span>
              )}
              {search.trim() && (
                <span className="px-2.5 py-1 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGlimmer text-[11px] flex items-center gap-1">
                  "{search}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch('')} />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-collabrix-roseGold hover:underline font-semibold flex items-center gap-1 ml-2"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset all</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Layout: Filters Sidebar + Creators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside
            className={`lg:col-span-3 bg-collabrix-velvet border border-collabrix-borderVelvet rounded-2xl p-5 space-y-6 ${
              showFiltersMobile ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-collabrix-borderVelvet">
              <span className="font-serif text-sm font-bold text-collabrix-pearlDust flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-collabrix-roseGold" />
                <span>Filter Specifications</span>
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-collabrix-mutedText hover:text-collabrix-roseGlimmer"
              >
                Reset
              </button>
            </div>

            {/* AI Tools & Models */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-collabrix-mutedText">
                AI Tool / Model
              </label>
              <select
                value={tool}
                onChange={(e) => {
                  setTool(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
              >
                {AI_TOOLS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Content Type */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-collabrix-mutedText">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => {
                  setContentType(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
              >
                {CONTENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Visual Style */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-collabrix-mutedText">
                Visual Style
              </label>
              <select
                value={visualStyle}
                onChange={(e) => {
                  setVisualStyle(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
              >
                {VISUAL_STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Supported Aspect Ratio */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-collabrix-mutedText">
                Supported Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => {
                  setAspectRatio(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
              >
                {ASPECT_RATIOS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Verification Status */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-collabrix-mutedText">
                Verification Signal
              </label>
              <select
                value={verificationStatus}
                onChange={(e) => {
                  setVerificationStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
              >
                <option value="All">All Statuses</option>
                <option value="Verified">Verified Audit Only</option>
                <option value="Self-reported">Self-Reported</option>
                <option value="Review required">Under Review</option>
              </select>
            </div>
          </aside>

          {/* Creators Grid Column */}
          <div className="lg:col-span-9 space-y-6">
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-collabrix-roseGlimmer font-medium tracking-wide">
                  Querying MongoDB AI Creators...
                </p>
              </div>
            ) : creators.length === 0 ? (
              /* Meaningful Empty State with suggestions to relax filters */
              <div className="p-12 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet text-center space-y-4 shadow-velvet">
                <div className="w-16 h-16 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGold flex items-center justify-center mx-auto text-xl">
                  🔍
                </div>
                <h3 className="font-serif text-xl font-bold text-collabrix-pearlDust">
                  No creators found matching these strict criteria
                </h3>
                <p className="text-xs text-collabrix-mutedText max-w-md mx-auto leading-relaxed">
                  We never return unrelated creators simply to fill a grid. Try clearing the model tool filter or switching your specialization.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-full bg-collabrix-roseGold text-white text-xs font-semibold shadow-luxury hover:bg-collabrix-roseGoldHover transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {creators.map((creator) => (
                    <CreatorCard key={creator._id} creator={creator} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-8">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-xl bg-collabrix-velvet border border-collabrix-borderVelvet text-collabrix-pearlDust hover:border-collabrix-roseGold disabled:opacity-40 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-collabrix-mutedText">
                      Page <strong className="text-collabrix-pearlDust">{page}</strong> of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-xl bg-collabrix-velvet border border-collabrix-borderVelvet text-collabrix-pearlDust hover:border-collabrix-roseGold disabled:opacity-40 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
