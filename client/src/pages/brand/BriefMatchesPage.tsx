import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matchAPI } from '../../services/api';
import { ProposalModal } from '../../components/common/ProposalModal';
import { PortfolioModal } from '../../components/common/PortfolioModal';
import {
  Sparkles,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Layers,
  Cpu,
  ShieldCheck,
  Film,
  ExternalLink,
  DollarSign,
  Ratio,
} from 'lucide-react';
import { getFallbackAvatar, getFallbackPortfolio } from '../../utils/fallbackImage';

export const BriefMatchesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [brief, setBrief] = useState<any | null>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [minScoreFilter, setMinScoreFilter] = useState('All');
  const [commercialFilter, setCommercialFilter] = useState('All');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  // Modals
  const [selectedCreatorForProposal, setSelectedCreatorForProposal] = useState<any | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await matchAPI.getMatchesForBrief(id);
          if (res.data.success) {
            setBrief(res.data.brief);
            setMatches(res.data.matches || []);
          }
        }
      } catch (err) {
        console.error('Error fetching brief matches', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [id]);

  // Apply filters
  const filteredMatches = matches.filter((item) => {
    const c = item.creator;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const nameMatch = c.displayName?.toLowerCase().includes(term);
      const specMatch = c.primarySpecialization?.toLowerCase().includes(term);
      const toolMatch = (c.aiToolsModels || []).some((t: string) => t.toLowerCase().includes(term));
      if (!nameMatch && !specMatch && !toolMatch) return false;
    }

    if (minScoreFilter !== 'All') {
      const threshold = parseInt(minScoreFilter, 10);
      if (item.matchScore < threshold) return false;
    }

    if (commercialFilter !== 'All') {
      if (commercialFilter === 'Enterprise Cleared' && item.commercialCompatibilityStatus !== 'Enterprise Cleared') {
        return false;
      }
    }

    return true;
  });

  const toggleExpand = (creatorId: string) => {
    setExpandedMatchId((prev) => (prev === creatorId ? null : creatorId));
  };

  if (loading) {
    return (
      <div className="py-28 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 border-4 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-serif font-bold text-collabrix-pearlDust">
          Evaluating 7-Factor Matching Engine
        </p>
        <p className="text-xs text-collabrix-mutedText max-w-sm">
          Scoring skills (25%), models (20%), style (15%), formats (15%), portfolio (10%), commercial rights (10%), and budget (5%)...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb & Brief Summary Header */}
      <div className="space-y-4">
        <Link
          to="/brand/briefs"
          className="text-xs text-collabrix-mutedText hover:text-collabrix-roseGlimmer inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaigns</span>
        </Link>

        {/* Campaign Requirement Overview Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-collabrix-velvetLight text-[11px] font-semibold text-collabrix-roseGlimmer border border-collabrix-roseGold/30">
                <Sparkles className="w-3.5 h-3.5 text-collabrix-roseGold animate-pulse" />
                <span>Explainable Campaign-Specific Matching</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-collabrix-pearlDust">
                {brief?.title || 'Creative Campaign'}
              </h1>
              <p className="text-xs text-collabrix-mutedText line-clamp-2 max-w-3xl">
                {brief?.description || 'Campaign specifications matching against creator database.'}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1 shrink-0">
              <span className="text-xs text-emerald-400 font-mono font-semibold">
                {matches.length} creators evaluated
              </span>
              <span className="text-[11px] text-collabrix-mutedText">
                Target Budget: ₹{brief?.budget?.max ? brief.budget.max.toLocaleString() : 'Flexible'}
              </span>
            </div>
          </div>

          {/* Quick Specifications Ribbon */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-collabrix-borderVelvet/60 text-xs">
            <span className="px-3 py-1 rounded-full bg-collabrix-onyx border border-collabrix-borderVelvet text-collabrix-pearlDust font-medium">
              Specialization: <strong className="text-collabrix-roseGlimmer">{brief?.requiredSpecialization}</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-collabrix-onyx border border-collabrix-borderVelvet text-collabrix-pearlDust font-medium">
              Format: <strong className="text-collabrix-roseGlimmer">{brief?.contentType} ({brief?.aspectRatio || '9:16'})</strong>
            </span>
            <span className="px-3 py-1 rounded-full bg-collabrix-onyx border border-collabrix-borderVelvet text-collabrix-pearlDust font-medium">
              Style: <strong className="text-collabrix-roseGlimmer">{brief?.visualStyle || 'Cinematic'}</strong>
            </span>
            {brief?.requiredTools && brief.requiredTools.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-collabrix-onyx border border-collabrix-borderVelvet text-collabrix-pearlDust font-medium">
                Tools: <strong className="text-collabrix-roseGold">{brief.requiredTools.join(', ')}</strong>
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-collabrix-onyx border border-collabrix-borderVelvet text-collabrix-pearlDust font-medium">
              Rights: <strong className="text-collabrix-roseGlimmer">{brief?.commercialRightsScope || 'Standard'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-collabrix-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search matching creators or tools..."
            className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl pl-10 pr-4 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold placeholder:text-collabrix-mutedText"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-collabrix-mutedText">
            <Filter className="w-3.5 h-3.5 text-collabrix-roseGold" />
            <span>Score:</span>
            <select
              value={minScoreFilter}
              onChange={(e) => setMinScoreFilter(e.target.value)}
              className="bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-1.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
            >
              <option value="All">All Scores</option>
              <option value="90">90%+ Best Fit</option>
              <option value="80">80%+ Strong Fit</option>
              <option value="70">70%+ Good Fit</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-collabrix-mutedText">
            <span>Commercial:</span>
            <select
              value={commercialFilter}
              onChange={(e) => setCommercialFilter(e.target.value)}
              className="bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3 py-1.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
            >
              <option value="All">All Licensing</option>
              <option value="Enterprise Cleared">Enterprise Cleared Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-collabrix-pearlDust">
            Ranked Recommendations ({filteredMatches.length})
          </h2>
          <span className="text-xs text-collabrix-mutedText">
            Algorithm: 7-Factor Weighted Scoring Model
          </span>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="p-12 text-center text-xs text-collabrix-mutedText rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet">
            No creators match the current filter criteria. Try lowering the match score threshold or clearing search terms.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMatches.map((item, idx) => {
              const c = item.creator;
              const isExpanded = expandedMatchId === c._id;
              const breakdown = item.scoreBreakdown;

              return (
                <div
                  key={c._id}
                  className="p-6 sm:p-7 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/60 transition-all shadow-velvet space-y-5"
                >
                  {/* Top Bar: Creator Info & Match Score */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={c.avatar || getFallbackAvatar(c.displayName)}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = getFallbackAvatar(c.displayName);
                          }}
                          alt={c.displayName}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-collabrix-roseGold/60 bg-collabrix-onyx"
                        />
                        <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/40 text-[10px] font-mono font-bold text-collabrix-roseGlimmer flex items-center justify-center">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg font-bold text-collabrix-pearlDust">
                            {c.displayName}
                          </h3>
                          <span className="text-[11px] text-collabrix-mutedText">@{c.handle}</span>
                        </div>
                        <p className="text-xs text-collabrix-roseGlimmer font-semibold">
                          {c.primarySpecialization} • <span className="text-collabrix-pearlDust/80">{c.location}</span>
                        </p>
                        <p className="text-[11px] text-collabrix-mutedText">
                          Rate: ₹{(c.startingPrice || 20000).toLocaleString()} • Response: {c.metrics?.responseRate || '< 2 hours'}
                        </p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex items-center sm:flex-col sm:items-end gap-3 sm:gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-collabrix-mutedText">
                          Match Score
                        </span>
                        <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-sm font-bold shadow-glow flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{item.matchScore}%</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        {item.matchScore >= 90 ? 'Exceptional Fit' : item.matchScore >= 80 ? 'Strong Fit' : 'Good Fit'}
                      </span>
                    </div>
                  </div>

                  {/* Why this creator matches section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Reasons list */}
                    <div className="p-4 rounded-2xl bg-collabrix-onyx border border-collabrix-borderVelvet/80 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-collabrix-roseGlimmer flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Why this creator matches:</span>
                      </p>
                      <div className="space-y-1.5">
                        {(item.reasons || []).map((reason: string, rIdx: number) => (
                          <div key={rIdx} className="flex items-start gap-2 text-xs text-collabrix-pearlDust/90">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span className="text-[11px] leading-relaxed">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Limitations & Missing info (Honest disclosure) */}
                    <div className="p-4 rounded-2xl bg-collabrix-onyx border border-collabrix-borderVelvet/80 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Missing data / Considerations:</span>
                      </p>
                      <div className="space-y-1.5">
                        {item.limitations && item.limitations.length > 0 ? (
                          item.limitations.map((limit: string, lIdx: number) => (
                            <div key={lIdx} className="flex items-start gap-2 text-xs text-amber-200/80">
                              <span className="text-amber-400 font-bold shrink-0">!</span>
                              <span className="text-[11px] leading-relaxed">{limit}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-[11px] text-emerald-300/80 italic">
                            All key technical format, model, and licensing criteria fully satisfied.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Matching skills & tools tags */}
                  <div className="space-y-2 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold text-collabrix-mutedText uppercase tracking-wider">
                        Matched Skills &amp; Stack:
                      </span>
                      {(item.matchedTools || []).map((tool: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/40 text-[10px] text-collabrix-roseGlimmer font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                      {(item.matchedSkills || []).map((sk: string, sIdx: number) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded-full bg-collabrix-velvetLight/60 border border-collabrix-borderVelvet text-[10px] text-collabrix-pearlDust font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-300 font-medium">
                        Licensing: {item.commercialCompatibilityStatus}
                      </span>
                    </div>
                  </div>

                  {/* Relevant Portfolio Examples (if any) */}
                  {item.relevantPortfolioItems && item.relevantPortfolioItems.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-collabrix-borderVelvet/60">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-collabrix-mutedText">
                        Relevant Showcase Pieces ({item.relevantPortfolioItems.length}):
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {item.relevantPortfolioItems.map((pItem: any) => (
                          <div
                            key={pItem._id}
                            onClick={() => setSelectedPortfolioItem(pItem)}
                            className="p-2.5 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet hover:border-collabrix-roseGold/50 transition-all cursor-pointer group flex items-center gap-3"
                          >
                            <img
                              src={pItem.thumbnailUrl || pItem.mediaUrl || getFallbackPortfolio(pItem.title, pItem.category)}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = getFallbackPortfolio(pItem.title, pItem.category);
                              }}
                              alt={pItem.title}
                              className="w-12 h-12 rounded-lg object-cover border border-collabrix-borderVelvet group-hover:scale-105 transition-transform shrink-0"
                            />
                            <div className="overflow-hidden">
                              <h4 className="text-xs font-semibold text-collabrix-pearlDust truncate group-hover:text-collabrix-roseGlimmer transition-colors">
                                {pItem.title}
                              </h4>
                              <p className="text-[10px] text-collabrix-mutedText truncate">
                                {pItem.category} • {pItem.aspectRatio || '16:9'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expandable 7-factor explainable breakdown */}
                  {isExpanded && breakdown && (
                    <div className="p-4 rounded-2xl bg-collabrix-onyx border border-collabrix-borderVelvet space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between pb-2 border-b border-collabrix-borderVelvet">
                        <span className="text-xs font-bold text-collabrix-pearlDust font-serif">
                          Detailed 7-Factor Algorithm Score Breakdown
                        </span>
                        <span className="text-[10px] text-collabrix-roseGold font-mono font-bold">
                          Total: {item.matchScore} / 100
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>Skills &amp; Specialization (25%)</span>
                            <span className="text-collabrix-roseGold">{breakdown.skillsSpecialization?.score}/25</span>
                          </div>
                          <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-collabrix-roseGold h-full rounded-full"
                              style={{ width: `${(breakdown.skillsSpecialization?.score / 25) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>AI Tools / Models (20%)</span>
                            <span className="text-collabrix-roseGold">{breakdown.toolsModels?.score}/20</span>
                          </div>
                          <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-collabrix-roseGold h-full rounded-full"
                              style={{ width: `${(breakdown.toolsModels?.score / 20) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>Type &amp; Visual Style (15%)</span>
                            <span className="text-collabrix-roseGold">{breakdown.contentTypeStyle?.score}/15</span>
                          </div>
                          <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-collabrix-roseGold h-full rounded-full"
                              style={{ width: `${(breakdown.contentTypeStyle?.score / 15) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>Technical Format (15%)</span>
                            <span className="text-collabrix-roseGold">{breakdown.technicalFormat?.score}/15</span>
                          </div>
                          <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-collabrix-roseGold h-full rounded-full"
                              style={{ width: `${(breakdown.technicalFormat?.score / 15) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>Workflow &amp; Portfolio (10%)</span>
                            <span className="text-collabrix-roseGold">{breakdown.workflowPortfolio?.score}/10</span>
                          </div>
                          <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-collabrix-roseGold h-full rounded-full"
                              style={{ width: `${(breakdown.workflowPortfolio?.score / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>Commercial Buyout (10%)</span>
                            <span className="text-collabrix-roseGold">{breakdown.commercialCompatibility?.score}/10</span>
                          </div>
                          <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-collabrix-roseGold h-full rounded-full"
                              style={{ width: `${(breakdown.commercialCompatibility?.score / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>Budget Fit (5%)</span>
                            <span className="text-collabrix-roseGold">{breakdown.budgetFit?.score}/5</span>
                          </div>
                          <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-collabrix-roseGold h-full rounded-full"
                              style={{ width: `${(breakdown.budgetFit?.score / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Actions Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-collabrix-borderVelvet">
                    <button
                      onClick={() => toggleExpand(c._id)}
                      className="text-xs text-collabrix-roseGlimmer hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>{isExpanded ? 'Hide Algorithm Breakdown' : 'Explain Scoring Logic (7 Factors)'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Link
                        to={`/creator-profile/${c._id}`}
                        className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-collabrix-velvetLight border border-collabrix-borderVelvet text-xs font-semibold text-collabrix-pearlDust hover:text-white hover:bg-collabrix-velvet transition-colors text-center"
                      >
                        View Full Profile
                      </Link>

                      <button
                        onClick={() => setSelectedCreatorForProposal(c)}
                        className="flex-1 sm:flex-none py-2 px-5 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover hover:shadow-glow text-xs font-semibold text-white shadow-luxury transition-all flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Proposal</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Proposal Modal */}
      {selectedCreatorForProposal && (
        <ProposalModal
          creator={selectedCreatorForProposal}
          briefId={brief?.id}
          onClose={() => setSelectedCreatorForProposal(null)}
        />
      )}

      {/* Portfolio Item Preview Modal */}
      {selectedPortfolioItem && (
        <PortfolioModal
          item={selectedPortfolioItem}
        
          onClose={() => setSelectedPortfolioItem(null)}
        />
      )}
    </div>
  );
};
