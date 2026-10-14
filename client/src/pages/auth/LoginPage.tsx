import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Sparkles, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const data = await login({ email, password });
      if (data.user.role === 'brand') {
        navigate('/brand/dashboard');
      } else {
        navigate('/creator/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: 'brand' | 'creator') => {
    try {
      setLoading(true);
      setError('');
      const demoEmail = role === 'brand' ? 'brand@collabrix.ai' : 'creator@collabrix.ai';
      const data = await login({ email: demoEmail, password: 'password123' });
      if (data.user.role === 'brand') {
        navigate('/brand/dashboard');
      } else {
        navigate('/creator/dashboard');
      }
    } catch (err: any) {
      setError('Demo login failed. Make sure database is seeded.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-collabrix-onyx flex flex-col justify-between text-collabrix-pearlDust relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-collabrix-roseGold/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Top Navbar */}
      <header className="p-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo />
        <Link
          to="/role-select"
          className="text-xs text-collabrix-roseGlimmer hover:underline"
        >
          Need an account? Sign up
        </Link>
      </header>

      {/* Center 2-Column Card matching screenshot */}
      <main className="max-w-4xl w-full mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet">
          {/* Left Form Column */}
          <div className="md:col-span-7 p-8 sm:p-12 space-y-6">
            <div className="space-y-1.5">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust">
                Welcome Back
              </h1>
              <p className="text-xs text-collabrix-mutedText">
                Login to continue to your dashboard
              </p>
            </div>

            {/* Quick Demo Logins for judges */}
            <div className="p-3.5 rounded-2xl bg-collabrix-velvetLight/80 border border-collabrix-roseGold/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-collabrix-roseGlimmer flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-collabrix-roseGold" />
                  <span>Instant Demo Accounts (One Click)</span>
                </span>
                <span className="text-[10px] text-collabrix-mutedText font-mono">Password: password123</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('brand')}
                  disabled={loading}
                  className="py-2 px-3 rounded-xl bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-pearlDust hover:bg-collabrix-roseGold/20 hover:text-white transition-colors"
                >
                  ⚡ Aura Brand Studio
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('creator')}
                  disabled={loading}
                  className="py-2 px-3 rounded-xl bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-pearlDust hover:bg-collabrix-roseGold/20 hover:text-white transition-colors"
                >
                  ⚡ Priya Sharma (AI Creator)
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-collabrix-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. brand@collabrix.ai"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl pl-10 pr-4 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText">
                    Password
                  </label>
                  <a href="#" className="text-[11px] text-collabrix-roseGold hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-collabrix-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl pl-10 pr-10 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-collabrix-mutedText hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold tracking-wide shadow-luxury hover:shadow-glow transition-all flex items-center justify-center gap-2"
              >
                {loading ? <span>Logging In...</span> : <span>Login to Dashboard</span>}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-collabrix-mutedText">
                Don't have an account?{' '}
                <Link to="/role-select" className="text-collabrix-roseGlimmer font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Right Editorial Banner Column matching screenshot ("Better Matches. Bigger Ideas.") */}
          <div className="md:col-span-5 bg-gradient-to-br from-collabrix-velvetLight via-collabrix-velvet to-collabrix-onyx p-8 sm:p-12 flex flex-col justify-between border-t md:border-t-0 md:border-l border-collabrix-borderVelvet relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-collabrix-roseGold/20 blur-3xl"></div>

            <div className="space-y-4 relative z-10">
              <span className="px-3 py-1 rounded-full bg-collabrix-onyx/80 border border-collabrix-roseGold/30 text-[10px] font-semibold text-collabrix-roseGlimmer">
                COLLABRIX 2.0
              </span>
              <h2 className="font-serif text-3xl font-bold text-collabrix-pearlDust leading-tight">
                Better Matches. <br />
                <span className="text-gradient-rose italic font-normal">Bigger Ideas.</span>
              </h2>
              <p className="text-xs text-collabrix-pearlDust/70 leading-relaxed font-light">
                Discover creators whose workflows, LoRAs, and commercial rights match your technical production needs with precision.
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <div className="p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-collabrix-roseGold/20 text-xs space-y-1">
                <p className="text-collabrix-pearlDust font-semibold">Ready for production</p>
                <p className="text-[11px] text-collabrix-mutedText">
                  Over 30+ verified AI creators ready to execute video, animation, and visual campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[11px] text-collabrix-mutedText">
        COLLABRIX — Where Brands Meet AI Creators
      </footer>
    </div>
  );
};
