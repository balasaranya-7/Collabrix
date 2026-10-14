import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dashboardAPI } from '../../services/api';
import {
  FolderKanban,
  Send,
  Bookmark,
  Users,
  PlusCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const BrandDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>({
    activeCampaigns: 3,
    totalProposals: 12,
    savedCreators: 24,
    successfulCollaborations: 8,
  });
  const [recentBriefs, setRecentBriefs] = useState<any[]>([]);
  const [suggestedCreators, setSuggestedCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await dashboardAPI.getBrandStats();
        if (res.data.success) {
          if (res.data.stats) setStats(res.data.stats);
          setRecentBriefs(res.data.recentBriefs || []);
          setSuggestedCreators(res.data.suggestedCreators || []);
        }
      } catch (err) {
        console.error('Error fetching brand stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Greeting matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust">
            Good morning, {user?.companyName || user?.name || 'BrandCo'}! 👋
          </h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            Here's what's happening with your creative briefs and AI creator engagements.
          </p>
        </div>

        <Link
          to="/brand/create-brief"
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold shadow-luxury hover:shadow-glow transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Brief</span>
        </Link>
      </div>

      {/* Top 4 Stat Cards matching screenshot numbers with pale blush #F9EBE5 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-luxury hover:-translate-y-0.5 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold font-serif text-collabrix-velvet">
              {stats.activeCampaigns || 3}
            </span>
            <div className="p-2 rounded-xl bg-collabrix-roseGlimmer/40 text-collabrix-roseGold">
              <FolderKanban className="w-4 h-4 text-collabrix-roseGold" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-collabrix-velvet">Active Campaigns</p>
            <Link
              to="/brand/briefs"
              className="text-[11px] text-collabrix-roseGold font-semibold hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-luxury hover:-translate-y-0.5 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold font-serif text-collabrix-velvet">
              {stats.totalProposals || 12}
            </span>
            <div className="p-2 rounded-xl bg-collabrix-roseGlimmer/40 text-collabrix-roseGold">
              <Send className="w-4 h-4 text-collabrix-roseGold" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-collabrix-velvet">Total Proposals</p>
            <Link
              to="/brand/proposals"
              className="text-[11px] text-collabrix-roseGold font-semibold hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-luxury hover:-translate-y-0.5 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold font-serif text-collabrix-velvet">
              {stats.savedCreators || 24}
            </span>
            <div className="p-2 rounded-xl bg-collabrix-roseGlimmer/40 text-collabrix-roseGold">
              <Bookmark className="w-4 h-4 text-collabrix-roseGold" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-collabrix-velvet">Saved Creators</p>
            <Link
              to="/brand/saved"
              className="text-[11px] text-collabrix-roseGold font-semibold hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-luxury hover:-translate-y-0.5 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold font-serif text-collabrix-velvet">
              {stats.successfulCollaborations || 8}
            </span>
            <div className="p-2 rounded-xl bg-collabrix-roseGlimmer/40 text-collabrix-roseGold">
              <Users className="w-4 h-4 text-collabrix-roseGold" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-collabrix-velvet">Successful Collaborations</p>
            <Link
              to="/brand/collaborations"
              className="text-[11px] text-collabrix-roseGold font-semibold hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Two Columns: Recent Campaigns & AI Matches matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Briefs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-collabrix-pearlDust">
              Recent Campaigns & Briefs
            </h2>
            <Link to="/brand/briefs" className="text-xs text-collabrix-roseGold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentBriefs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet text-center space-y-3">
                <p className="text-xs text-collabrix-mutedText">No briefs created yet.</p>
                <Link
                  to="/brand/create-brief"
                  className="px-4 py-2 rounded-full bg-collabrix-roseGold text-white text-xs font-medium inline-block"
                >
                  Create Your First Brief
                </Link>
              </div>
            ) : (
              recentBriefs.map((brief) => (
                <div
                  key={brief._id}
                  className="p-4 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/40 transition-all flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 overflow-hidden">
                    <h3 className="text-xs font-bold text-collabrix-pearlDust truncate">
                      {brief.title}
                    </h3>
                    <p className="text-[11px] text-collabrix-mutedText truncate">
                      {brief.requiredSpecialization} • Budget: ₹{brief.budget?.max?.toLocaleString() || 'Flexible'} • {brief.contentType}
                    </p>
                  </div>

                  <Link
                    to={`/brand/briefs/${brief._id}/matches`}
                    className="px-3.5 py-1.5 rounded-xl bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-xs font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-roseGold hover:text-white transition-all shrink-0"
                  >
                    View Matches
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Suggested AI Matches */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-collabrix-pearlDust flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-collabrix-roseGold" />
              <span>Suggested AI Creators</span>
            </h2>
            <Link to="/explore" className="text-xs text-collabrix-roseGold hover:underline">
              Explore All
            </Link>
          </div>

          <div className="space-y-3">
            {suggestedCreators.map((c) => (
              <div
                key={c._id}
                className="p-3.5 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/40 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={c.avatar}
                    alt={c.displayName}
                    className="w-10 h-10 rounded-full object-cover border border-collabrix-roseGold/50 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-collabrix-pearlDust truncate">
                      {c.displayName}
                    </h4>
                    <p className="text-[10px] text-collabrix-mutedText truncate">
                      {c.primarySpecialization} • From ₹{(c.startingPrice || 20000).toLocaleString()}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/creator-profile/${c._id}`}
                  className="px-3 py-1 rounded-xl bg-collabrix-velvetLight text-[11px] font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-roseGold hover:text-white transition-all shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
