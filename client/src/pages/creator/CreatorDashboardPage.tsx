import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dashboardAPI, proposalAPI, collaborationAPI, briefAPI } from '../../services/api';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import {
  Sparkles,
  Layers,
  Send,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  Wand2,
} from 'lucide-react';

export const CreatorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [recentProposals, setRecentProposals] = useState<any[]>([]);
  const [activeCollabs, setActiveCollabs] = useState<any[]>([]);
  const [recommendedBriefs, setRecommendedBriefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, proposalsRes, collabsRes, briefsRes] = await Promise.all([
          dashboardAPI.getCreatorStats().catch(() => ({ data: { success: false } })),
          proposalAPI.getProposals().catch(() => ({ data: { success: false, proposals: [] } })),
          collaborationAPI.getCollaborations().catch(() => ({ data: { success: false, collaborations: [] } })),
          briefAPI.getBriefs({ limit: 4 }).catch(() => ({ data: { success: false, briefs: [] } })),
        ]);

        if (statsRes.data?.success) setStats(statsRes.data.stats);
        if (proposalsRes.data?.success) setRecentProposals(proposalsRes.data.proposals || []);
        if (collabsRes.data?.success) setActiveCollabs(collabsRes.data.collaborations || []);
        if (briefsRes.data?.success) setRecommendedBriefs(briefsRes.data.briefs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Header Greeting matching reference screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust flex items-center gap-2">
            <span>Good morning, {user?.name || 'Priya'}!</span>
            <span>☕</span>
          </h1>
          <p className="text-xs text-collabrix-pearlDust/70 mt-1">
            Here's your creator dashboard.
          </p>
        </div>

        <Link
          to={user?.creatorProfileId ? `/creator-profile/${user.creatorProfileId}` : '/explore'}
          className="px-5 py-2 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-velvetLight hover:text-white transition-all flex items-center gap-2 self-start sm:self-auto shadow-luxury"
        >
          <ExternalLink className="w-3.5 h-3.5 text-collabrix-roseGold" />
          <span>View Public Profile</span>
        </Link>
      </div>

      {/* Top 3 Stat Cards matching screenshot numbers with pale blush #F9EBE5 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-luxury hover:-translate-y-0.5 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold font-serif text-collabrix-velvet">
              {stats?.opportunitiesCount || 12}
            </span>
            <div className="p-2.5 rounded-xl bg-collabrix-roseGlimmer/40 text-collabrix-roseGold">
              <Briefcase className="w-4 h-4 text-collabrix-roseGold" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-collabrix-velvet">Campaign Opportunities</p>
            <Link
              to="/creator/opportunities"
              className="text-[11px] text-collabrix-roseGold font-semibold hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-luxury hover:-translate-y-0.5 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold font-serif text-collabrix-velvet">
              {stats?.receivedProposals ?? (recentProposals.length || 5)}
            </span>
            <div className="p-2.5 rounded-xl bg-collabrix-roseGlimmer/40 text-collabrix-roseGold">
              <Send className="w-4 h-4 text-collabrix-roseGold" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-collabrix-velvet">Pending Proposals</p>
            <Link
              to="/creator/proposals"
              className="text-[11px] text-collabrix-roseGold font-semibold hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-luxury hover:-translate-y-0.5 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold font-serif text-collabrix-velvet">
              {stats?.activeCollaborations ?? (activeCollabs.length || 3)}
            </span>
            <div className="p-2.5 rounded-xl bg-collabrix-roseGlimmer/40 text-collabrix-roseGold">
              <Users className="w-4 h-4 text-collabrix-roseGold" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-collabrix-velvet">Active Collaborations</p>
            <Link
              to="/creator/collaborations"
              className="text-[11px] text-collabrix-roseGold font-semibold hover:underline mt-1 inline-flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main 2-column Grid matching reference screenshot panel 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Latest Campaigns */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-collabrix-pearlDust">
              Latest Campaigns
            </h2>
            <Link
              to="/creator/opportunities"
              className="text-xs text-collabrix-roseGold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Summer Collection Launch',
                category: 'Fashion',
                budget: '₹35K - ₹70K',
                img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
                briefId: recommendedBriefs[0]?._id,
              },
              {
                title: 'Brand Awareness Campaign',
                category: 'Lifestyle',
                budget: '₹30K - ₹50K',
                img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
                briefId: recommendedBriefs[1]?._id,
              },
              {
                title: 'Travel Vlog Series',
                category: 'Travel',
                budget: '₹20K - ₹50K',
                img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80',
                briefId: recommendedBriefs[2]?._id,
              },
            ].map((camp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/40 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <img
                    src={camp.img}
                    alt={camp.title}
                    className="w-12 h-12 rounded-xl object-cover border border-collabrix-borderVelvet shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h3 className="text-xs font-bold text-collabrix-pearlDust truncate">
                      {camp.title}
                    </h3>
                    <p className="text-[11px] text-collabrix-mutedText truncate mt-0.5">
                      {camp.category} • {camp.budget}
                    </p>
                  </div>
                </div>

                <Link
                  to="/creator/opportunities"
                  className="px-4 py-1.5 rounded-xl bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-xs font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-roseGold hover:text-white transition-all shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Your Performance with smooth rose curve chart */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-collabrix-pearlDust flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-collabrix-roseGold" />
              <span>Your Performance</span>
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-6">
            {/* Smooth Rose Gold Curve Chart SVG matching reference */}
            <div className="relative pt-2">
              <div className="flex items-center justify-between text-[11px] text-collabrix-roseGlimmer font-medium mb-2">
                <span>Growth Trajectory</span>
                <span className="text-emerald-400 font-bold">+18% this month</span>
              </div>
              <svg viewBox="0 0 300 90" className="w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B07878" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#B07878" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <path
                  d="M 0,70 C 50,65 80,45 130,50 C 180,55 220,20 300,10 L 300,90 L 0,90 Z"
                  fill="url(#roseGradient)"
                />
                {/* Smooth Curve stroke */}
                <path
                  d="M 0,70 C 50,65 80,45 130,50 C 180,55 220,20 300,10"
                  fill="none"
                  stroke="#B07878"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Pulse dot at peak */}
                <circle cx="300" cy="10" r="4" fill="#E6C2BF" className="animate-pulse" />
              </svg>
            </div>

            {/* Performance Stats Row matching reference */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-collabrix-borderVelvet">
              <div>
                <p className="text-[11px] text-collabrix-mutedText">Profile Views</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-bold font-serif text-collabrix-pearlDust">1.2K</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">+12%</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] text-collabrix-mutedText">Proposal Acceptance</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-bold font-serif text-collabrix-pearlDust">70%</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">+6%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
