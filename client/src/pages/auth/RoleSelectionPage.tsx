import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { Briefcase, User, ArrowRight, Sparkles } from 'lucide-react';

export const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role: 'brand' | 'creator') => {
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-collabrix-onyx flex flex-col justify-between relative overflow-hidden text-collabrix-pearlDust">
      {/* Background Glows & Floral Luxury Accents matching reference */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-collabrix-roseGold/10 rounded-full blur-[140px] pointer-events-none"></div>
      
      {/* Top Right Botanical Rose Corner Accent matching panel 2 */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
          alt=""
          className="w-full h-full object-cover scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-collabrix-onyx/60 to-collabrix-onyx"></div>
      </div>

      {/* Top Header */}
      <header className="p-8 flex items-center justify-center">
        <Logo />
      </header>

      {/* Main Role Selection Modal Card */}
      <main className="max-w-2xl w-full mx-auto px-6 py-8 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-collabrix-pearlDust">
            Welcome to Collabrix
          </h1>
          <p className="text-sm text-collabrix-mutedText font-light">
            Choose how you want to continue
          </p>
        </div>

        {/* 2 Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Continue as Brand */}
          <div
            onClick={() => handleSelectRole('brand')}
            className="group p-8 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/70 transition-all duration-300 hover:shadow-luxury hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center justify-between min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGold flex items-center justify-center mb-6 shadow-luxury group-hover:scale-110 group-hover:border-collabrix-roseGold transition-all">
              <Briefcase className="w-7 h-7" />
            </div>

            <div className="space-y-2 mb-6">
              <h2 className="font-serif text-xl font-bold text-collabrix-pearlDust group-hover:text-collabrix-roseGlimmer transition-colors">
                Continue as <br /> Brand
              </h2>
              <p className="text-xs text-collabrix-mutedText leading-relaxed max-w-[200px]">
                Find the perfect creators for your campaigns.
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/40 text-collabrix-roseGlimmer group-hover:bg-collabrix-roseGold group-hover:text-white flex items-center justify-center transition-all shadow-md">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Continue as Creator */}
          <div
            onClick={() => handleSelectRole('creator')}
            className="group p-8 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/70 transition-all duration-300 hover:shadow-luxury hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center justify-between min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-collabrix-velvetLight border border-collabrix-roseGold/30 text-collabrix-roseGold flex items-center justify-center mb-6 shadow-luxury group-hover:scale-110 group-hover:border-collabrix-roseGold transition-all">
              <User className="w-7 h-7" />
            </div>

            <div className="space-y-2 mb-6">
              <h2 className="font-serif text-xl font-bold text-collabrix-pearlDust group-hover:text-collabrix-roseGlimmer transition-colors">
                Continue as <br /> Creator
              </h2>
              <p className="text-xs text-collabrix-mutedText leading-relaxed max-w-[200px]">
                Showcase your talent, get brand opportunities.
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-collabrix-velvetLight border border-collabrix-roseGold/40 text-collabrix-roseGlimmer group-hover:bg-collabrix-roseGold group-hover:text-white flex items-center justify-center transition-all shadow-md">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Login Alternative */}
        <div className="text-center mt-10">
          <p className="text-xs text-collabrix-mutedText">
            Already have an account?{' '}
            <Link to="/login" className="text-collabrix-roseGlimmer font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center text-[11px] text-collabrix-mutedText">
        COLLABRIX — Where Brands Meet AI Creators
      </footer>
    </div>
  );
};
