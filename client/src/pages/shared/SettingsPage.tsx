import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  User,
  Shield,
  Database,
  RefreshCw,
  LogOut,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [switching, setSwitching] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSwitchToDemo = async (role: 'brand' | 'creator') => {
    try {
      setSwitching(true);
      const email = role === 'brand' ? 'brand@collabrix.ai' : 'creator@collabrix.ai';
      await login({ email, password: 'password123' });
      setMsg(`Successfully switched to Demo ${role === 'brand' ? 'Brand (Aura Fragrances)' : 'Creator (Priya Sharma)'}!`);
      setTimeout(() => {
        setMsg('');
        navigate(role === 'brand' ? '/brand/dashboard' : '/creator/dashboard');
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Header */}
      <div className="border-b border-collabrix-borderVelvet pb-6">
        <div className="flex items-center gap-2 text-collabrix-roseGold text-xs font-semibold uppercase tracking-wider mb-1">
          <Settings className="w-3.5 h-3.5" />
          <span>Platform Settings</span>
        </div>
        <h1 className="text-2xl font-serif text-white">Workspace Configuration</h1>
        <p className="text-xs text-collabrix-mutedText mt-1">
          Manage demo personas, database signals, and account credentials.
        </p>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      <div className="max-w-3xl space-y-6">
        {/* Current Account Card */}
        <div className="bg-collabrix-velvet/40 border border-collabrix-borderVelvet rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white font-serif text-sm">
            <User className="w-4 h-4 text-collabrix-roseGold" />
            <span>Active Persona</span>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover border border-collabrix-roseGold/40"
            />
            <div>
              <h3 className="text-sm font-semibold text-white">{user?.name}</h3>
              <p className="text-xs text-collabrix-mutedText">{user?.email}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-collabrix-roseGold/20 text-collabrix-roseGlimmer text-[10px] font-semibold uppercase border border-collabrix-roseGold/30">
                {user?.role} Mode
              </span>
            </div>
          </div>
        </div>

        {/* Hackathon Fast Persona Switcher */}
        <div className="bg-collabrix-velvet/40 border border-collabrix-borderVelvet rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white font-serif text-sm">
            <Sparkles className="w-4 h-4 text-collabrix-roseGold" />
            <span>Hackathon Quick Persona Switcher</span>
          </div>
          <p className="text-xs text-collabrix-mutedText leading-relaxed">
            Quickly toggle between Brand and AI Creator perspectives to evaluate discovery matching, brief authoring, proposal workflows, and deliverables approvals:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleSwitchToDemo('brand')}
              disabled={switching}
              className="p-4 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet hover:border-collabrix-roseGold/50 text-left transition-all"
            >
              <span className="text-xs font-semibold text-white block">Switch to Brand Persona</span>
              <span className="text-[11px] text-collabrix-mutedText block mt-1">
                brand@collabrix.ai (Aura Fragrances)
              </span>
            </button>

            <button
              onClick={() => handleSwitchToDemo('creator')}
              disabled={switching}
              className="p-4 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet hover:border-collabrix-roseGold/50 text-left transition-all"
            >
              <span className="text-xs font-semibold text-white block">Switch to Creator Persona</span>
              <span className="text-[11px] text-collabrix-mutedText block mt-1">
                creator@collabrix.ai (Priya Sharma - AI Filmmaker)
              </span>
            </button>
          </div>
        </div>

        {/* System & DB Status */}
        <div className="bg-collabrix-velvet/40 border border-collabrix-borderVelvet rounded-2xl p-6 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-white font-serif text-sm">
            <Database className="w-4 h-4 text-collabrix-roseGold" />
            <span>Architecture & Data Health</span>
          </div>
          <div className="space-y-2 text-collabrix-pearlDust">
            <div className="flex items-center justify-between py-2 border-b border-collabrix-borderVelvet/50">
              <span className="text-collabrix-mutedText">Stack</span>
              <span className="font-semibold">MERN (MongoDB + Express + React + Node.js)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-collabrix-borderVelvet/50">
              <span className="text-collabrix-mutedText">Database Connection</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                MongoDB Connected (32 AI Creators, 96+ Works Seeded)
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-collabrix-borderVelvet/50">
              <span className="text-collabrix-mutedText">AI Matching Engine</span>
              <span className="text-collabrix-roseGold font-semibold">Weighted Multi-Factor Scoring Active</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="pt-2">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Collabrix</span>
          </button>
        </div>
      </div>
    </div>
  );
};
