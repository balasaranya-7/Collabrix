import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard, Sparkles, Compass, Briefcase, Wand2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string, fallbackPath: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(fallbackPath);
  };

  const handleForBrandsClick = () => {
    setMobileMenuOpen(false);
    if (user?.role === 'brand') {
      navigate('/brand/dashboard');
    } else {
      navigate('/for-brands');
    }
  };

  const handleForCreatorsClick = () => {
    setMobileMenuOpen(false);
    if (user?.role === 'creator') {
      navigate('/creator/dashboard');
    } else {
      navigate('/for-creators');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-collabrix-onyx/90 backdrop-blur-md border-b border-collabrix-borderVelvet transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links matching reference screenshot */}
        <div className="hidden lg:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('how-it-works', '/#how-it-works')}
            className={`text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
              location.hash === '#how-it-works' || location.pathname === '/how-it-works'
                ? 'text-collabrix-roseGlimmer'
                : 'text-collabrix-pearlDust/80 hover:text-collabrix-roseGlimmer'
            }`}
          >
            How It Works
          </button>

          <button
            onClick={handleForBrandsClick}
            className={`text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
              location.pathname === '/for-brands'
                ? 'text-collabrix-roseGlimmer'
                : 'text-collabrix-pearlDust/80 hover:text-collabrix-roseGlimmer'
            }`}
          >
            For Brands
          </button>

          <button
            onClick={handleForCreatorsClick}
            className={`text-xs font-semibold tracking-wider transition-colors cursor-pointer ${
              location.pathname === '/for-creators'
                ? 'text-collabrix-roseGlimmer'
                : 'text-collabrix-pearlDust/80 hover:text-collabrix-roseGlimmer'
            }`}
          >
            For Creators
          </button>

          <Link
            to="/explore"
            className={`text-xs font-semibold tracking-wider transition-colors ${
              location.pathname === '/explore'
                ? 'text-collabrix-roseGold font-bold'
                : 'text-collabrix-pearlDust/80 hover:text-collabrix-roseGlimmer'
            }`}
          >
            Explore Creators
          </Link>
        </div>

        {/* Right CTA / Auth Status matching reference screenshot */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={user.role === 'brand' ? '/brand/dashboard' : '/creator/dashboard'}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-velvetLight transition-all shadow-luxury"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-collabrix-roseGold" />
                <span>Dashboard ({user.role === 'brand' ? 'Brand' : 'Creator'})</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                title="Logout"
                className="p-2 rounded-full bg-collabrix-velvet/60 hover:bg-collabrix-velvet text-collabrix-mutedText hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to="/login"
                className="text-xs font-semibold tracking-wider text-collabrix-pearlDust hover:text-collabrix-roseGlimmer transition-colors px-2 py-1.5"
              >
                Login
              </Link>
              <Link
                to="/role-select"
                className="px-6 py-2.5 rounded-full bg-collabrix-pearlDust hover:bg-collabrix-roseGlimmer text-collabrix-onyx text-xs font-bold tracking-wide shadow-luxury hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-collabrix-pearlDust hover:text-collabrix-roseGlimmer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-collabrix-velvet border-b border-collabrix-borderVelvet px-5 pt-4 pb-6 space-y-3 shadow-velvet animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-collabrix-pearlDust hover:text-collabrix-roseGlimmer"
          >
            Home
          </Link>
          <button
            onClick={() => handleNavClick('how-it-works', '/#how-it-works')}
            className="block w-full text-left py-2 text-sm font-semibold text-collabrix-pearlDust hover:text-collabrix-roseGlimmer"
          >
            How It Works
          </button>
          <button
            onClick={handleForBrandsClick}
            className="block w-full text-left py-2 text-sm font-semibold text-collabrix-pearlDust hover:text-collabrix-roseGlimmer"
          >
            For Brands
          </button>
          <button
            onClick={handleForCreatorsClick}
            className="block w-full text-left py-2 text-sm font-semibold text-collabrix-pearlDust hover:text-collabrix-roseGlimmer"
          >
            For Creators
          </button>
          <Link
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-collabrix-roseGlimmer hover:underline flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-collabrix-roseGold" />
            <span>Discover Creators</span>
          </Link>

          <div className="pt-4 border-t border-collabrix-borderVelvet flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={user.role === 'brand' ? '/brand/dashboard' : '/creator/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full bg-collabrix-velvetLight text-collabrix-roseGlimmer font-semibold text-xs border border-collabrix-roseGold/40"
                >
                  Go to Dashboard ({user.role === 'brand' ? 'Brand' : 'Creator'})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full text-center py-2 text-xs text-collabrix-mutedText hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full bg-collabrix-velvetLight text-collabrix-pearlDust font-semibold text-xs border border-collabrix-borderVelvet"
                >
                  Login
                </Link>
                <Link
                  to="/role-select"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full bg-collabrix-roseGold text-white font-semibold text-xs shadow-luxury"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
