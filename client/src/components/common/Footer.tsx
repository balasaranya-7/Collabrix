import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Linkedin, Twitter, Instagram, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-collabrix-onyx border-t border-collabrix-borderVelvet pt-16 pb-12 text-collabrix-pearlDust/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-collabrix-borderVelvet">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo />
            <p className="text-xs text-collabrix-mutedText leading-relaxed">
              Where Brands Meet AI Creators. The premier marketplace connecting creative agencies with AI-native filmmakers, animators, and generative artists.
            </p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-collabrix-velvet border border-collabrix-roseGold/20 w-fit text-[11px] text-collabrix-roseGlimmer">
              <Sparkles className="w-3.5 h-3.5 text-collabrix-roseGold" />
              <span>AI Content Creator Marketplace</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-sm text-collabrix-pearlDust font-semibold tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/explore" className="hover:text-collabrix-roseGlimmer transition-colors">Explore AI Creators</Link></li>
              <li><Link to="/how-it-works" className="hover:text-collabrix-roseGlimmer transition-colors">How It Works</Link></li>
              <li><Link to="/for-brands" className="hover:text-collabrix-roseGlimmer transition-colors">For Brands & Agencies</Link></li>
              <li><Link to="/for-creators" className="hover:text-collabrix-roseGlimmer transition-colors">For AI Creators</Link></li>
            </ul>
          </div>

          {/* AI Creative Tech */}
          <div>
            <h4 className="font-serif text-sm text-collabrix-pearlDust font-semibold tracking-wider uppercase mb-4">Supported Models</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Runway Gen-3', 'Flux.1 Dev', 'ComfyUI', 'Midjourney v6', 'Luma Dream', 'Kling AI 1.5', 'Topaz Video AI', 'ElevenLabs'].map((tool) => (
                <span key={tool} className="px-2 py-0.5 rounded bg-collabrix-velvet text-collabrix-mutedText border border-collabrix-borderVelvet">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Legal & Hackathon Disclaimer */}
          <div>
            <h4 className="font-serif text-sm text-collabrix-pearlDust font-semibold tracking-wider uppercase mb-4">Compliance</h4>
            <p className="text-[11px] text-collabrix-mutedText leading-relaxed mb-3">
              Prototype developed for hackathon demonstration. Seeded creator profiles and portfolio metrics are fictional demonstration assets.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Commercial Rights Clearance Ready</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-collabrix-mutedText">
          <p>© 2026 COLLABRIX. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/how-it-works" className="hover:text-collabrix-roseGlimmer">About</Link>
            <Link to="/how-it-works" className="hover:text-collabrix-roseGlimmer">Privacy</Link>
            <Link to="/how-it-works" className="hover:text-collabrix-roseGlimmer">Terms</Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 rounded-full bg-collabrix-velvet hover:text-collabrix-roseGlimmer transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
            <a href="#" className="p-2 rounded-full bg-collabrix-velvet hover:text-collabrix-roseGlimmer transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
            <a href="#" className="p-2 rounded-full bg-collabrix-velvet hover:text-collabrix-roseGlimmer transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
