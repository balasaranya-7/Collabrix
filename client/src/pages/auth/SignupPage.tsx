import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, User, Mail, Lock, Building, AlertCircle, Sparkles } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as 'brand' | 'creator') || 'brand';

  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<'brand' | 'creator'>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const data = await register({
        name,
        email,
        password,
        role,
        companyName: role === 'brand' ? companyName : undefined,
      });

      if (data.user.role === 'brand') {
        navigate('/brand/dashboard');
      } else {
        navigate('/creator/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-collabrix-onyx flex flex-col justify-between text-collabrix-pearlDust relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-collabrix-roseGold/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Top Header */}
      <header className="p-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo />
        <Link to="/login" className="text-xs text-collabrix-roseGlimmer hover:underline">
          Already have an account? Login
        </Link>
      </header>

      {/* Form Container */}
      <main className="max-w-xl w-full mx-auto px-6 py-4 relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust">
              Create Your Account
            </h1>
            <p className="text-xs text-collabrix-mutedText font-light">
              Join the ecosystem where brands collaborate with AI-native creators.
            </p>
          </div>

          {/* Role Toggle Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-collabrix-onyx border border-collabrix-borderVelvet">
            <button
              type="button"
              onClick={() => setRole('brand')}
              className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                role === 'brand'
                  ? 'bg-collabrix-velvetLight text-collabrix-roseGlimmer border border-collabrix-roseGold/40 shadow-luxury'
                  : 'text-collabrix-mutedText hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Brand / Agency</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('creator')}
              className={`py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                role === 'creator'
                  ? 'bg-collabrix-velvetLight text-collabrix-roseGlimmer border border-collabrix-roseGold/40 shadow-luxury'
                  : 'text-collabrix-mutedText hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>AI Creator Pro</span>
            </button>
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
                Full Name / Contact Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Lin"
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                required
              />
            </div>

            {role === 'brand' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Brand or Agency Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-collabrix-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Aura Studio / Acme Agency"
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl pl-10 pr-4 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    required={role === 'brand'}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-collabrix-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl pl-10 pr-4 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                Create Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-collabrix-mutedText absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl pl-10 pr-4 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold tracking-wide shadow-luxury hover:shadow-glow transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Create {role === 'brand' ? 'Brand' : 'Creator'} Account</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-collabrix-mutedText text-center leading-relaxed">
            By signing up, you agree to COLLABRIX Terms of Service and acknowledge the platform verification & commercial rights policy.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[11px] text-collabrix-mutedText">
        COLLABRIX — Where Brands Meet AI Creators
      </footer>
    </div>
  );
};
