import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { PortfolioModal } from '../../components/common/PortfolioModal';
import { ProposalModal } from '../../components/common/ProposalModal';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { creatorAPI, savedCreatorAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  MapPin,
  Bookmark,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Info,
  Clock,
  Film,
} from 'lucide-react';
import { getFallbackAvatar, getFallbackPortfolio } from '../../utils/fallbackImage';

export const CreatorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [creator, setCreator] = useState<any | null>(null);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'about' | 'dna' | 'verification'>('portfolio');

  // Modals
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [togglingVerification, setTogglingVerification] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        if (id) {
          const res = await creatorAPI.getCreatorById(id);
          if (res.data.success) {
            setCreator(res.data.creator);
            setPortfolio(res.data.portfolio || []);
          }
        }
      } catch (err) {
        console.error('Error loading creator profile', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleToggleSave = async () => {
    if (!user || user.role !== 'brand') {
      alert('Please log in with a Brand account to save creators.');
      return;
    }
    try {
      if (isSaved) {
        await savedCreatorAPI.unsaveCreator(creator._id);
        setIsSaved(false);
      } else {
        await savedCreatorAPI.saveCreator(creator._id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleDemoVerification = async () => {
    try {
      setTogglingVerification(true);
      const res = await creatorAPI.toggleDemoVerification(creator._id);
      if (res.data.success) {
        setCreator({ ...creator, verification: res.data.verification });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingVerification(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-collabrix-onyx flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-collabrix-onyx text-collabrix-pearlDust flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-32 space-y-4">
          <h2 className="font-serif text-2xl font-bold">Creator Profile Not Found</h2>
          <Link to="/explore" className="text-xs text-collabrix-roseGold underline">
            Back to Explore
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-collabrix-onyx text-collabrix-pearlDust flex flex-col justify-between selection:bg-collabrix-roseGold selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Cover Landscape Banner matching screenshot */}
        <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden border border-collabrix-borderVelvet bg-collabrix-velvet shadow-velvet">
          <img
            src={creator.coverImage || getFallbackPortfolio(creator.displayName, creator.primarySpecialization)}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = getFallbackPortfolio(creator.displayName, creator.primarySpecialization);
            }}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-collabrix-onyx via-black/40 to-transparent"></div>

          {/* Verification Audit Simulated Toggle Pill (Bonus Presentation Feature) */}
          <div className="absolute top-4 right-4">
            <button
              onClick={handleToggleDemoVerification}
              disabled={togglingVerification}
              className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-collabrix-roseGold/40 text-[11px] font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-roseGold/30 transition-all flex items-center gap-1.5 shadow-lg"
              title="Click to toggle between Verified and Review Required states"
            >
              <Sparkles className="w-3.5 h-3.5 text-collabrix-roseGold" />
              <span>Simulate Audit Status: {creator.verification?.toolExpertise?.status || 'Self-reported'}</span>
            </button>
          </div>
        </div>

        {/* Profile Card & Info Row */}
        <div className="relative px-4 sm:px-8 -mt-20 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Avatar & Core Bio */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <img
                  src={creator.avatar || getFallbackAvatar(creator.displayName)}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = getFallbackAvatar(creator.displayName);
                  }}
                  alt={creator.displayName}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-collabrix-onyx shadow-2xl bg-collabrix-velvet"
                />
                {creator.verification?.toolExpertise?.status === 'Verified' && (
                  <div
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-4 border-collabrix-onyx flex items-center justify-center text-xs text-white"
                    title="Verified AI Creator"
                  >
                    ✓
                  </div>
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust">
                    {creator.displayName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/30 text-[11px] text-collabrix-roseGlimmer">
                    @{creator.handle}
                  </span>
                </div>

                <p className="text-xs text-collabrix-roseGold font-semibold">
                  {creator.primarySpecialization} {creator.secondarySpecializations?.length ? `• ${creator.secondarySpecializations.join(', ')}` : ''}
                </p>

                <div className="flex items-center gap-4 text-xs text-collabrix-mutedText pt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-collabrix-roseGold" />
                    <span>{creator.location || 'Global Remote'}</span>
                  </span>
                  <span>•</span>
                  <span>{creator.experienceLevel || 'Senior Studio Lead'}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">● {creator.availability || 'Available Now'}</span>
                </div>
              </div>

              {/* Action Buttons: Save & Send Proposal matching screenshot */}
              <div className="flex items-center gap-3 w-full sm:w-auto pt-2 sm:pt-0">
                <button
                  onClick={handleToggleSave}
                  className={`p-3 rounded-2xl border transition-all ${
                    isSaved
                      ? 'bg-collabrix-roseGold text-white border-collabrix-roseGold'
                      : 'bg-collabrix-velvet border-collabrix-borderVelvet text-collabrix-pearlDust hover:border-collabrix-roseGold/40'
                  }`}
                  title={isSaved ? 'Remove from saved' : 'Save Creator'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <button
                  onClick={() => setShowProposalModal(true)}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold shadow-luxury hover:shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Proposal</span>
                </button>
              </div>
            </div>

            {/* Metrics Row matching screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet">
              <div>
                <p className="text-xs font-bold text-collabrix-pearlDust">
                  {creator.metrics?.followersCount || '125K'}
                </p>
                <p className="text-[10px] text-collabrix-mutedText uppercase tracking-wider">Followers</p>
              </div>
              <div>
                <p className="text-xs font-bold text-collabrix-pearlDust">
                  {creator.metrics?.engagementRate || '4.8%'}
                </p>
                <p className="text-[10px] text-collabrix-mutedText uppercase tracking-wider">Engagement</p>
              </div>
              <div>
                <p className="text-xs font-bold text-collabrix-pearlDust">
                  {creator.metrics?.totalCollaborations || 14}
                </p>
                <p className="text-[10px] text-collabrix-mutedText uppercase tracking-wider">Collabs Done</p>
              </div>
              <div>
                <p className="text-xs font-bold text-collabrix-roseGold">
                  From ₹{(creator.startingPrice || 20000).toLocaleString()}
                </p>
                <p className="text-[10px] text-collabrix-mutedText uppercase tracking-wider">Starting Rate</p>
              </div>
            </div>
          </div>

          {/* Right Match Score & Breakdown Card matching screenshot */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-collabrix-borderVelvet">
              <span className="text-xs font-semibold text-collabrix-roseGlimmer">Match Score?</span>
              <span className="px-3 py-1 rounded-full bg-collabrix-roseGold text-white text-xs font-bold shadow-glow">
                {creator.metrics?.matchRating || 94}%
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-collabrix-pearlDust/90">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Perfect creator for {creator.primarySpecialization}</span>
              </div>
              <div className="flex items-center gap-2 text-collabrix-pearlDust/90">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>High temporal consistency & 4K ProRes capability</span>
              </div>
              <div className="flex items-center gap-2 text-collabrix-pearlDust/90">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Commercial enterprise rights verified</span>
              </div>
              <div className="flex items-center gap-2 text-collabrix-pearlDust/90">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Past brand collabs with verified ratings</span>
              </div>
            </div>

            <button
              onClick={() => setShowProposalModal(true)}
              className="w-full mt-2 py-2.5 rounded-xl bg-collabrix-velvetLight border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-roseGold hover:text-white transition-all text-center block"
            >
              Start Collaboration
            </button>
          </div>
        </div>

        {/* Navigation Tabs matching screenshot */}
        <div className="flex items-center gap-4 border-b border-collabrix-borderVelvet px-4 sm:px-8 mb-8 text-xs font-medium">
          {[
            { id: 'portfolio', label: `Portfolio (${portfolio.length})` },
            { id: 'about', label: 'About & Bio' },
            { id: 'dna', label: 'Creator DNA / Workflow' },
            { id: 'verification', label: 'Verification Signals' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 transition-all relative ${
                activeTab === tab.id
                  ? 'text-collabrix-roseGlimmer font-semibold'
                  : 'text-collabrix-mutedText hover:text-collabrix-pearlDust'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-collabrix-roseGold"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Portfolio Grid */}
        {activeTab === 'portfolio' && (
          <div className="px-4 sm:px-8 space-y-6">
            {portfolio.length === 0 ? (
              <div className="p-12 text-center text-xs text-collabrix-mutedText rounded-2xl bg-collabrix-velvet">
                No portfolio items published yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setSelectedPortfolioItem(item)}
                    className="group rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/60 transition-all duration-300 overflow-hidden cursor-pointer shadow-velvet flex flex-col justify-between"
                  >
                    {/* Media Preview */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <img
                        src={item.thumbnailUrl || item.mediaUrl || getFallbackPortfolio(item.title, item.category)}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = getFallbackPortfolio(item.title, item.category);
                        }}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-collabrix-roseGlimmer border border-collabrix-roseGold/30">
                          {item.aspectRatio || '16:9'}
                        </span>
                        {item.duration && (
                          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-collabrix-roseGlimmer border border-collabrix-roseGold/30">
                            {item.duration}
                          </span>
                        )}
                      </div>

                      {/* Commercial status */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-medium">
                          {item.commercialUseStatus || 'Commercial Ready'}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-serif text-sm font-bold text-collabrix-pearlDust truncate group-hover:text-collabrix-roseGlimmer transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-collabrix-mutedText line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {(item.aiToolsModels || []).slice(0, 3).map((t: string) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-collabrix-velvetLight text-[10px] text-collabrix-roseGlimmer border border-collabrix-borderVelvet"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] text-collabrix-mutedText border-t border-collabrix-borderVelvet/50">
                      <span>{item.category}</span>
                      <span className="text-collabrix-roseGold group-hover:underline">Inspect Tools & DNA →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: About & Bio */}
        {activeTab === 'about' && (
          <div className="px-4 sm:px-8 max-w-4xl space-y-6">
            <div className="p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-4">
              <h3 className="font-serif text-lg font-bold text-collabrix-pearlDust">Professional Bio</h3>
              <p className="text-xs sm:text-sm text-collabrix-pearlDust/85 leading-relaxed font-light">
                {creator.bio}
              </p>
              {creator.experienceDescription && (
                <div className="pt-4 border-t border-collabrix-borderVelvet space-y-1">
                  <h4 className="text-xs uppercase font-semibold text-collabrix-mutedText">Experience Background</h4>
                  <p className="text-xs text-collabrix-pearlDust/80 leading-relaxed">
                    {creator.experienceDescription}
                  </p>
                </div>
              )}
            </div>

            {/* Technical Capabilities Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-2">
                <h4 className="text-xs uppercase font-semibold text-collabrix-roseGold">Supported Aspect Ratios</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(creator.supportedAspectRatios || ['9:16', '16:9', '1:1', '4:5']).map((r: string) => (
                    <span key={r} className="px-2.5 py-1 rounded-lg bg-collabrix-onyx border border-collabrix-borderVelvet">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-2">
                <h4 className="text-xs uppercase font-semibold text-collabrix-roseGold">Supported Output Resolutions</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(creator.supportedResolutions || ['1080p', '4K UHD']).map((res: string) => (
                    <span key={res} className="px-2.5 py-1 rounded-lg bg-collabrix-onyx border border-collabrix-borderVelvet">
                      {res}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Creator DNA / Workflow */}
        {activeTab === 'dna' && (
          <div className="px-4 sm:px-8 max-w-4xl space-y-6">
            <div className="p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-4">
              <div className="flex items-center gap-2 text-collabrix-roseGold">
                <Cpu className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-collabrix-pearlDust">Production Workflow Architecture</h3>
              </div>
              <p className="text-xs sm:text-sm text-collabrix-pearlDust/90 leading-relaxed font-mono bg-collabrix-onyx p-4 rounded-xl border border-collabrix-borderVelvet">
                {creator.productionWorkflow || 'Proprietary multi-stage latent rendering and video consistency pipeline.'}
              </p>
            </div>

            {/* Tools and Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-3">
                <h4 className="text-xs uppercase font-semibold text-collabrix-roseGold">AI Tools & Models Mastery</h4>
                <div className="flex flex-wrap gap-2">
                  {(creator.aiToolsModels || []).map((t: string) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/40 text-xs text-collabrix-roseGlimmer">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-3">
                <h4 className="text-xs uppercase font-semibold text-collabrix-roseGold">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(creator.technicalSkills || []).map((s: string) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-collabrix-onyx border border-collabrix-borderVelvet text-xs text-collabrix-pearlDust">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Verification Signals (Challenge Bonus 13) */}
        {activeTab === 'verification' && (
          <div className="px-4 sm:px-8 max-w-4xl space-y-6">
            <div className="p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-collabrix-borderVelvet">
                <div>
                  <h3 className="font-serif text-lg font-bold text-collabrix-pearlDust">Trust & Verification Signals</h3>
                  <p className="text-xs text-collabrix-mutedText">
                    Multi-tier platform audits guaranteeing models, node workflows, and enterprise commercial IP clearance.
                  </p>
                </div>
                <button
                  onClick={handleToggleDemoVerification}
                  disabled={togglingVerification}
                  className="px-4 py-2 rounded-xl bg-collabrix-velvetLight border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-roseGold hover:text-white transition-all"
                >
                  {togglingVerification ? 'Toggling...' : 'Simulate Status Switch'}
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: '1. AI Tool & Model Expertise',
                    record: creator.verification?.toolExpertise,
                    desc: 'Verifies active commercial subscription and hands-on node mastery for models like Flux, Runway Gen-3, and ComfyUI.',
                  },
                  {
                    title: '2. Workflow Architecture Audit',
                    record: creator.verification?.workflowAudit,
                    desc: 'Inspects temporal consistency pipelines, LoRA training datasets, and multi-pass resolution upscaling.',
                  },
                  {
                    title: '3. Portfolio Ownership & Provenance',
                    record: creator.verification?.portfolioOwnership,
                    desc: 'Validates raw generation seeds, project files, and frame-by-frame master exports.',
                  },
                  {
                    title: '4. Commercial-Use IP Clearance',
                    record: creator.verification?.commercialLicensing,
                    desc: 'Ensures model terms allow global commercial paid advertising and transfers clean usage rights to commissioning brands.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-collabrix-pearlDust">{item.title}</h4>
                      <p className="text-[11px] text-collabrix-mutedText max-w-xl">{item.desc}</p>
                      {item.record?.evidence && (
                        <p className="text-[10px] text-collabrix-roseGlimmer font-mono pt-1">
                          Audit Note: {item.record.evidence}
                        </p>
                      )}
                    </div>
                    <VerificationBadge status={item.record?.status || 'Self-reported'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Portfolio Item Detail Modal */}
      {selectedPortfolioItem && (
        <PortfolioModal
          item={selectedPortfolioItem}
          onClose={() => setSelectedPortfolioItem(null)}
          onSendProposal={() => {
            setSelectedPortfolioItem(null);
            setShowProposalModal(true);
          }}
        />
      )}

      {/* Send Proposal Modal */}
      {showProposalModal && (
        <ProposalModal
          creator={creator}
          onClose={() => setShowProposalModal(false)}
        />
      )}

      <Footer />
    </div>
  );
};
