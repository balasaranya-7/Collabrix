import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { matchAPI } from '../../services/api';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Film,
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Zap,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to section when navigating via hash or path
  useEffect(() => {
    if (location.pathname === '/how-it-works' || location.hash === '#how-it-works') {
      const el = document.getElementById('how-it-works');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else if (location.hash === '#for-brands') {
      const el = document.getElementById('for-brands');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else if (location.hash === '#for-creators') {
      const el = document.getElementById('for-creators');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [location.pathname, location.hash]);

  // "See It In Action" interactive widget state
  const [briefPrompt, setBriefPrompt] = useState(
    'We need a Instagram reels for a coffee brand, modern aesthetic, ₹20,000 budget, targeting college students.'
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedResults, setAnalyzedResults] = useState<any[] | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);

  const samplePrompts = [
    'We need a Instagram reels for a coffee brand, modern aesthetic, ₹20,000 budget, targeting college students.',
    'Cinematic 30s vertical AI video ad for a luxury botanical skincare serum, photorealistic lighting.',
    'Cyberpunk anime music visualizer for an electronic EP release, 4K widescreen format.',
  ];

  const handleAnalyzeBrief = async (promptToAnalyze = briefPrompt) => {
    try {
      setAnalyzing(true);
      const res = await matchAPI.quickAnalyze(promptToAnalyze);
      if (res.data.success && res.data.topMatches) {
        setAnalyzedResults(res.data.topMatches);
        setSelectedMatch(res.data.topMatches[0] || null);
      }
    } catch (err) {
      console.error('Quick analyze error', err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Run initial analysis on first view if not yet run
  useEffect(() => {
    handleAnalyzeBrief();
  }, []);

  return (
    <div className="min-h-screen bg-collabrix-onyx text-collabrix-pearlDust overflow-x-hidden selection:bg-collabrix-roseGold selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Subtle Luxury Floral & Rose Gold Gradient Backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-collabrix-velvet via-collabrix-roseGold/20 to-transparent blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute top-10 right-0 w-96 h-96 bg-collabrix-roseGlimmer/5 blur-[140px] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/30 text-xs font-semibold text-collabrix-roseGlimmer">
                <Sparkles className="w-3.5 h-3.5 text-collabrix-roseGold animate-pulse" />
                <span>Next-Generation AI Content Creator Marketplace</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-collabrix-pearlDust leading-[1.08]">
                Where Brands Meet <br />
                <span className="text-gradient-rose italic font-normal">AI Creators.</span>
              </h1>

              <p className="text-base sm:text-lg text-collabrix-pearlDust/80 max-w-xl leading-relaxed font-light">
                Turn your campaign idea into the perfect creator collaboration — powered by AI.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/role-select"
                  className="px-8 py-3.5 rounded-full bg-collabrix-pearlDust text-collabrix-onyx hover:bg-white text-sm font-semibold tracking-wide shadow-luxury hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-collabrix-onyx" />
                </Link>

                <Link
                  to="/explore"
                  className="px-8 py-3.5 rounded-full bg-collabrix-velvet/80 border border-collabrix-roseGold/40 text-collabrix-pearlDust hover:bg-collabrix-velvet hover:text-white text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Creators</span>
                </Link>
              </div>

              {/* Supported AI Models Ribbon */}
              <div className="pt-6 border-t border-collabrix-borderVelvet/60">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-collabrix-mutedText mb-3">
                  Production Models & Toolchains Supported
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Flux.1 Dev', 'Runway Gen-3 Alpha', 'ComfyUI LoRA', 'Midjourney v6.1', 'Luma Dream Machine', 'Kling AI 1.5', 'Topaz 4K', 'ElevenLabs'].map(
                    (tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 rounded-full bg-collabrix-velvet/80 border border-collabrix-borderVelvet text-collabrix-roseGlimmer/90 text-[11px] hover:border-collabrix-roseGold/40 transition-colors"
                      >
                        {tool}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Visual Collage matching Screenshot with Brand, Creator, AI Nexus & Floral Backdrop */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md p-7 rounded-3xl bg-collabrix-velvet/90 border border-collabrix-borderVelvet shadow-velvet backdrop-blur-xl overflow-hidden">
                {/* Decorative Floral / Dark Rose Petals Accent */}
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-br from-collabrix-roseGold/30 to-collabrix-velvet blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-collabrix-roseGold/20 blur-3xl pointer-events-none"></div>

                {/* Central Connected Diagram matching reference */}
                <div className="flex items-center justify-between relative py-6">
                  {/* Brand Node */}
                  <div className="flex flex-col items-center gap-2.5 z-10">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-collabrix-roseGold/50 shadow-luxury bg-collabrix-onyx">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                        alt="Brand"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-collabrix-pearlDust text-collabrix-onyx text-xs font-bold shadow-sm">
                      Brand
                    </span>
                  </div>

                  {/* AI Nexus Connector */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-collabrix-onyx via-collabrix-velvet to-collabrix-roseGold border-2 border-collabrix-roseGlimmer/40 shadow-glow flex items-center justify-center">
                      <span className="font-serif text-collabrix-pearlDust font-black text-base tracking-widest">AI</span>
                    </div>
                    <span className="text-[10px] text-collabrix-roseGlimmer font-medium mt-1">Collabrix</span>
                  </div>

                  {/* Creator Node */}
                  <div className="flex flex-col items-center gap-2.5 z-10">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-collabrix-roseGold/50 shadow-luxury bg-collabrix-onyx">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                        alt="Creator"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-collabrix-pearlDust text-collabrix-onyx text-xs font-bold shadow-sm">
                      Creator
                    </span>
                  </div>

                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-[2px] bg-gradient-to-r from-collabrix-roseGold/20 via-collabrix-roseGold to-collabrix-roseGold/20"></div>
                </div>

                {/* Sub-gallery of 3 AI outputs using real photography */}
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-collabrix-borderVelvet/80">
                  <div className="aspect-square rounded-xl overflow-hidden border border-collabrix-borderVelvet group relative">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
                      alt="Luxury Watch"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden border border-collabrix-borderVelvet group relative">
                    <img
                      src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
                      alt="Artisanal Coffee"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden border border-collabrix-borderVelvet group relative">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
                      alt="Couture Fashion"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </div>

                {/* Match Banner at bottom */}
                <div className="mt-4 p-3 rounded-xl bg-collabrix-velvetLight/90 border border-collabrix-roseGold/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-collabrix-pearlDust font-semibold">94% High-Precision Match</span>
                  </div>
                  <span className="text-collabrix-roseGlimmer font-medium">Aaradhya Sharma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Row matching screenshot */}
      <section className="py-10 border-y border-collabrix-borderVelvet/60 bg-collabrix-velvet/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-85">
            {['Spotify', 'amazon', 'NETFLIX', 'YouTube', 'Adobe', 'ZARA'].map((brand) => (
              <span key={brand} className="font-serif text-lg md:text-xl font-bold tracking-wider text-collabrix-pearlDust/80 hover:text-collabrix-roseGlimmer transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section matching screenshot with pale blush #F9EBE5 cards */}
      <section id="how-it-works" className="py-24 bg-collabrix-onyx relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-collabrix-pearlDust">
              How It Works
            </h2>
            <p className="text-sm text-collabrix-pearlDust/70">
              Simple steps. Powerful results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '1. Create Brief',
                desc: 'Tell us what you need in simple words.',
                icon: Layers,
              },
              {
                step: '2. AI Matches',
                desc: 'Our AI analyses and finds the best-fit creators.',
                icon: Cpu,
              },
              {
                step: '3. Discover',
                desc: 'View top matches with match scores & insights.',
                icon: Search,
              },
              {
                step: '4. Collaborate',
                desc: 'Send proposals and start creating!',
                icon: Film,
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="p-6 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-luxury hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-collabrix-roseGlimmer/40 border border-collabrix-roseGold/30 text-collabrix-roseGold flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-collabrix-roseGold" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-collabrix-velvet mb-2">
                      {card.step}
                    </h3>
                    <p className="text-xs text-collabrix-velvet/80 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  {idx < 3 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-collabrix-velvet text-collabrix-roseGlimmer items-center justify-center text-xs shadow-md">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Brands & For Creators Showcase Sections matching screenshot */}
      <section className="py-24 bg-gradient-to-b from-collabrix-onyx via-collabrix-velvet/30 to-collabrix-onyx border-t border-collabrix-borderVelvet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* For Brands */}
          <div id="for-brands" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-collabrix-pearlDust leading-tight">
                For Brands <br />
                <span className="text-sm sm:text-base font-sans font-normal text-collabrix-pearlDust/80 block mt-2">
                  Find the right creators. Faster.
                </span>
              </h2>
              <div className="space-y-3.5 pt-2">
                {[
                  'Describe your campaign in natural language',
                  'AI finds best-fit creators',
                  'See why they match (look at numbers)',
                  'Send proposals & track progress',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-collabrix-roseGold shrink-0 mt-0.5" />
                    <span className="text-xs text-collabrix-pearlDust/90 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/role-select"
                  className="px-8 py-3.5 rounded-full bg-collabrix-roseGlimmer hover:bg-collabrix-pearlDust text-collabrix-onyx text-xs font-bold tracking-wide shadow-luxury hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Brand Preview Card matching screenshot with Aaradhya Sharma 94% match */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-collabrix-borderVelvet bg-collabrix-velvet/80 shadow-velvet p-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                      alt="Creator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
                      alt="Creator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Top Match Card overlay matching reference */}
                <div className="p-4 rounded-2xl bg-collabrix-pearlDust text-collabrix-velvet shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                      alt="Aaradhya"
                      className="w-12 h-12 rounded-full object-cover border-2 border-collabrix-roseGold"
                    />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-collabrix-roseGold font-bold">Top Match</p>
                      <h4 className="font-serif text-sm font-bold text-collabrix-velvet">Aaradhya Sharma</h4>
                      <p className="text-[11px] text-collabrix-velvet/70">Fashion &amp; Lifestyle Creator</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-collabrix-velvet text-collabrix-pearlDust text-xs font-bold">
                      94% match
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* For Creators */}
          <div id="for-creators" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Creator Opportunities Card Visual matching reference */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <div className="rounded-3xl overflow-hidden border border-collabrix-borderVelvet bg-collabrix-velvet/80 shadow-velvet p-6">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    alt="Creator Studio"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating New Opportunities Card */}
                <div className="p-5 rounded-2xl bg-collabrix-velvetLight/90 border border-collabrix-borderVelvet shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-collabrix-borderVelvet">
                    <span className="text-xs font-bold text-collabrix-pearlDust">New Opportunities</span>
                    <span className="text-[10px] text-collabrix-roseGlimmer">Active Now</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-collabrix-pearlDust/90">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span> Fashion
                      </span>
                      <span className="text-collabrix-roseGlimmer font-semibold">92% match ›</span>
                    </div>
                    <div className="flex items-center justify-between text-collabrix-pearlDust/90">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span> Lifestyle
                      </span>
                      <span className="text-collabrix-roseGlimmer font-semibold">87% match ›</span>
                    </div>
                    <div className="flex items-center justify-between text-collabrix-pearlDust/90">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span> Travel
                      </span>
                      <span className="text-collabrix-roseGlimmer font-semibold">76% match ›</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Description */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-collabrix-pearlDust leading-tight">
                For Creators <br />
                <span className="text-sm sm:text-base font-sans font-normal text-collabrix-pearlDust/80 block mt-2">
                  Turn your creativity into opportunities.
                </span>
              </h2>
              <div className="space-y-3.5 pt-2">
                {[
                  'Build your AI creator profile',
                  'Showcase your portfolio',
                  'Discover relevant campaigns',
                  'Receive collaboration proposals',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-collabrix-roseGold shrink-0 mt-0.5" />
                    <span className="text-xs text-collabrix-pearlDust/90 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  to="/role-select"
                  className="px-8 py-3.5 rounded-full bg-collabrix-roseGlimmer hover:bg-collabrix-pearlDust text-collabrix-onyx text-xs font-bold tracking-wide shadow-luxury hover:scale-[1.02] active:scale-[0.98] transition-all inline-block"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "See It In Action" Interactive Matching Demo Section matching screenshot */}
      <section className="py-24 bg-collabrix-onyx border-t border-collabrix-borderVelvet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/30 text-[11px] font-semibold text-collabrix-roseGlimmer">
              <Zap className="w-3.5 h-3.5 text-collabrix-roseGold" />
              <span>Real-Time Matching Engine</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-collabrix-pearlDust">
              See It in Action
            </h2>
            <p className="text-sm text-collabrix-mutedText">
              Here's how Collabrix finds your perfect match in real time from our database of 30+ AI creators.
            </p>
          </div>

          {/* Interactive 3-Column Matching Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Column 1: Campaign Brief Input */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-collabrix-pearlDust">
                  Campaign Brief Prompt
                </h3>
                <span className="text-[10px] text-collabrix-mutedText">Natural Language Input</span>
              </div>

              <textarea
                value={briefPrompt}
                onChange={(e) => setBriefPrompt(e.target.value)}
                rows={5}
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl p-3.5 text-xs text-collabrix-pearlDust placeholder:text-collabrix-mutedText focus:outline-none focus:border-collabrix-roseGold resize-none leading-relaxed"
                placeholder="Describe your creative requirements..."
              ></textarea>

              {/* Sample Prompts */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-semibold text-collabrix-mutedText">
                  Or test with sample brief:
                </p>
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setBriefPrompt(p);
                      handleAnalyzeBrief(p);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-collabrix-velvetLight/40 hover:bg-collabrix-velvetLight text-[11px] text-collabrix-pearlDust/80 truncate border border-collabrix-borderVelvet/60 transition-colors"
                  >
                    "{p}"
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleAnalyzeBrief()}
                disabled={analyzing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold tracking-wide shadow-luxury hover:shadow-glow transition-all flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <span>Analyzing with AI Engine...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze & Match Creators</span>
                  </>
                )}
              </button>
            </div>

            {/* Column 2: Top Matches List */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-collabrix-pearlDust">
                  Top Matches Ranked
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {analyzedResults?.length || 0} evaluated
                </span>
              </div>

              <div className="space-y-2.5">
                {analyzing ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-2 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-collabrix-mutedText">Calculating 7-factor weights...</span>
                  </div>
                ) : analyzedResults && analyzedResults.length > 0 ? (
                  analyzedResults.slice(0, 4).map((m, idx) => {
                    const isSelected = selectedMatch?.creator?._id === m.creator._id;
                    return (
                      <div
                        key={m.creator._id}
                        onClick={() => setSelectedMatch(m)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-collabrix-velvetLight border-collabrix-roseGold shadow-luxury'
                            : 'bg-collabrix-onyx border-collabrix-borderVelvet hover:border-collabrix-roseGold/40'
                        }`}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <span className="text-xs font-mono font-bold text-collabrix-mutedText w-4">
                            {idx + 1}
                          </span>
                          <img
                            src={m.creator.avatar}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border border-collabrix-roseGold/40 shrink-0"
                          />
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-collabrix-pearlDust truncate">
                              {m.creator.displayName}
                            </h4>
                            <p className="text-[10px] text-collabrix-mutedText truncate">
                              {m.creator.primarySpecialization}
                            </p>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full bg-collabrix-roseGold text-white text-[10px] font-bold shrink-0">
                          {m.matchScore}%
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-collabrix-mutedText py-8 text-center">
                    Click Analyze to run the matching engine.
                  </p>
                )}
              </div>
            </div>

            {/* Column 3: Why This Creator? Breakdown */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-collabrix-pearlDust">
                  Why this creator?
                </h3>
                {selectedMatch && (
                  <span className="text-[11px] font-bold text-collabrix-roseGold">
                    Score: {selectedMatch.matchScore}%
                  </span>
                )}
              </div>

              {selectedMatch ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet">
                    <p className="text-xs font-semibold text-collabrix-pearlDust mb-1">
                      {selectedMatch.creator.displayName}
                    </p>
                    <p className="text-[11px] text-collabrix-mutedText leading-relaxed">
                      {selectedMatch.creator.bio}
                    </p>
                  </div>

                  {/* Reasons list */}
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-semibold text-collabrix-mutedText">
                      Recommendation Drivers:
                    </p>
                    {(selectedMatch.reasons || []).map((reason: string, rIdx: number) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-collabrix-pearlDust/90">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span className="text-[11px] leading-relaxed">{reason}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA matching reference */}
                  <div className="pt-2">
                    <Link
                      to={`/creator-profile/${selectedMatch.creator._id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-collabrix-pearlDust text-collabrix-onyx text-xs font-semibold hover:bg-white flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 text-collabrix-onyx" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-collabrix-mutedText">
                  Select a creator on the left to inspect reasoning breakdown.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section matching screenshot */}
      <section className="py-24 bg-gradient-to-t from-collabrix-velvet via-collabrix-onyx to-collabrix-onyx border-t border-collabrix-borderVelvet relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-collabrix-pearlDust">
            Ready to find your <br />
            <span className="text-gradient-rose italic font-normal">perfect collaboration?</span>
          </h2>
          <p className="text-base text-collabrix-pearlDust/80 max-w-lg mx-auto">
            Join Collabrix today and turn your ideas into impactful content — powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/role-select"
              className="px-8 py-3.5 rounded-full bg-collabrix-pearlDust hover:bg-white text-collabrix-onyx text-sm font-semibold tracking-wide shadow-luxury hover:shadow-glow transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/explore"
              className="px-8 py-3.5 rounded-full bg-collabrix-velvet/80 border border-collabrix-roseGold/40 text-collabrix-pearlDust hover:bg-collabrix-velvet hover:text-white text-sm font-semibold transition-all"
            >
              Explore Creators
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
