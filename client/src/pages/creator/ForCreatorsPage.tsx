import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Film,
  Cpu,
  Layers,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Award,
} from 'lucide-react';

export const ForCreatorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-collabrix-onyx text-collabrix-pearlDust flex flex-col justify-between selection:bg-collabrix-roseGold selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden border-b border-collabrix-borderVelvet/60 bg-gradient-to-b from-collabrix-onyx via-collabrix-velvet/40 to-collabrix-onyx text-center space-y-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-collabrix-roseGold/10 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer shadow-luxury">
              <Sparkles className="w-3.5 h-3.5 text-collabrix-roseGold" />
              <span>For AI-Native Creators &amp; Generative Artists</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-collabrix-pearlDust leading-[1.12]">
              Turn your generative craft <br />
              <span className="text-gradient-rose italic font-normal">into funded brand campaigns.</span>
            </h1>

            <p className="text-sm sm:text-base text-collabrix-pearlDust/80 max-w-2xl mx-auto leading-relaxed font-light">
              Connect directly with luxury brands, media agencies, and startups commissioning video ads, 3D animations, and AI key visuals. Get paid for your verifiable tool mastery and node workflows.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/signup?role=creator"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold uppercase tracking-wider shadow-luxury hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Join as AI Creator Pro</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/explore"
                className="px-8 py-3.5 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/40 text-collabrix-roseGlimmer hover:bg-collabrix-velvetLight hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Explore Creator Portfolios
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Steps for Creators */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-collabrix-pearlDust">
              Why Creators Choose COLLABRIX
            </h2>
            <p className="text-xs text-collabrix-mutedText">
              The first marketplace designed specifically around generative tools, node workflows, and aspect ratios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'AI Toolchain Profile',
                desc: 'Showcase your real models: Flux.1 Dev, Runway Gen-3, ComfyUI custom LoRAs, and ControlNet stacks.',
                icon: Cpu,
              },
              {
                step: '02',
                title: 'High-Budget Briefs',
                desc: 'Receive direct creative briefs with realistic budgets (₹25,000 to ₹1,50,000+) tailored to AI production.',
                icon: DollarSign,
              },
              {
                step: '03',
                title: 'Verified Ownership',
                desc: 'Clear tool expertise and commercial licensing audits to earn top-tier trust badges that brands look for.',
                icon: ShieldCheck,
              },
              {
                step: '04',
                title: 'Escrow & Milestones',
                desc: 'Guaranteed milestone payouts, clear revision passes, and contract templates protecting your IP rights.',
                icon: Award,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="p-6 rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-bold text-collabrix-roseGold">{card.step}</span>
                      <div className="p-2 rounded-xl bg-collabrix-velvetLight text-collabrix-roseGold">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-serif text-base font-bold text-collabrix-pearlDust">{card.title}</h3>
                    <p className="text-xs text-collabrix-pearlDust/70 leading-relaxed font-light">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
