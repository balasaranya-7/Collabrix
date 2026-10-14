import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { creatorAPI } from '../../services/api';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import confetti from 'canvas-confetti';
import {
  UserCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Save,
  Wand2,
  Camera,
  Layers,
  DollarSign,
  Clock,
  ExternalLink,
} from 'lucide-react';

export const CreatorProfileEditPage: React.FC = () => {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [specialization, setSpecialization] = useState('AI Filmmaking');
  const [location, setLocation] = useState('Mumbai, India');
  const [hourlyRate, setHourlyRate] = useState('120');
  const [turnaroundDays, setTurnaroundDays] = useState('5');
  const [toolsString, setToolsString] = useState('Runway Gen-3, Midjourney v6, Kling AI, ComfyUI, Flux.1');
  const [skillsString, setSkillsString] = useState('Text-to-Video, Camera Tracking, Prompt Craft, Color Grading, 4K Upscaling');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        if (user?.creatorProfileId) {
          const res = await creatorAPI.getCreatorById(user.creatorProfileId);
          if (res.data.success && res.data.creator) {
            const c = res.data.creator;
            setProfile(c);
            setName(c.user?.name || user.name || '');
            setHandle(c.handle || '');
            setBio(c.bio || '');
            setSpecialization(c.specialization || 'AI Filmmaking');
            setLocation(c.location || 'Mumbai, India');
            setHourlyRate(String(c.hourlyRate || 120));
            setTurnaroundDays(String(c.turnaroundDays || 5));
            setToolsString((c.tools || []).join(', '));
            setSkillsString((c.skills || []).join(', '));
            setAvatarUrl(c.user?.avatar || user.avatar || '');
            setIsVerified(!!c.isVerified);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        bio,
        specialization,
        location,
        hourlyRate: Number(hourlyRate),
        turnaroundDays: Number(turnaroundDays),
        tools: toolsString.split(',').map((s) => s.trim()).filter(Boolean),
        skills: skillsString.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const res = await creatorAPI.updateMyProfile(payload);
      if (res.data.success) {
        setSuccessMessage('Creator studio profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVerification = async () => {
    if (!profile?._id) return;
    try {
      const res = await creatorAPI.toggleDemoVerification(profile._id);
      if (res.data.success) {
        setIsVerified(res.data.isVerified);
        if (res.data.isVerified) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
        setSuccessMessage(
          res.data.isVerified
            ? 'Verified Creator badge enabled! AI toolchain credentials verified.'
            : 'Verification badge toggled off.'
        );
        setTimeout(() => setSuccessMessage(''), 3500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-collabrix-borderVelvet pb-6">
        <div>
          <div className="flex items-center gap-2 text-collabrix-roseGold text-xs font-semibold uppercase tracking-wider mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile Management</span>
          </div>
          <h1 className="text-2xl font-serif text-white">Creator Studio & Verification</h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            Tune your production specialization, generative tools stack, and verification badge for brand matching.
          </p>
        </div>

        {profile?.handle && (
          <a
            href={`/creators/${profile.handle}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/40 text-xs text-collabrix-roseGlimmer self-start md:self-auto transition-colors"
          >
            <span>Preview Public Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-collabrix-roseGold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-collabrix-mutedText">Loading creator studio details...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 cols): Profile Edit Form */}
          <form onSubmit={handleSave} className="lg:col-span-2 space-y-6">
            <div className="bg-collabrix-velvet/40 border border-collabrix-borderVelvet rounded-2xl p-6 space-y-5 text-xs">
              <h2 className="text-base font-serif text-white flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-collabrix-roseGold" />
                Creative Identity & Specialization
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Display Name</label>
                  <input
                    type="text"
                    disabled
                    value={name}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-collabrix-mutedText cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Creator Handle</label>
                  <input
                    type="text"
                    disabled
                    value={`@${handle}`}
                    className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-collabrix-mutedText cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-collabrix-pearlDust font-semibold mb-1">Creator Bio & Mission</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your creative background, aesthetics, and AI production capabilities..."
                  className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl p-3 text-white focus:outline-none focus:border-collabrix-roseGold resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Core Specialization</label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="AI Filmmaking">AI Filmmaking</option>
                    <option value="Hyper-realistic Commercials">Hyper-realistic Commercials</option>
                    <option value="Generative Animation">Generative Animation</option>
                    <option value="AI Fashion & Editorial">AI Fashion & Editorial</option>
                    <option value="Visual Effects & VFX">Visual Effects & VFX</option>
                    <option value="Sound & Generative Audio">Sound & Generative Audio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>

                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Base Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-collabrix-pearlDust font-semibold mb-1">
                  AI Tools & Model Pipeline (comma separated)
                </label>
                <input
                  type="text"
                  value={toolsString}
                  onChange={(e) => setToolsString(e.target.value)}
                  placeholder="e.g. Runway Gen-3, Midjourney v6, Kling AI, ComfyUI, Flux.1"
                  className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                />
                <p className="text-[10px] text-collabrix-mutedText mt-1">
                  These tools are evaluated by the AI matching engine when brands launch creative briefs.
                </p>
              </div>

              <div>
                <label className="block text-collabrix-pearlDust font-semibold mb-1">
                  Technical & Creative Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={skillsString}
                  onChange={(e) => setSkillsString(e.target.value)}
                  placeholder="e.g. Camera Prompting, Custom LoRA, Upscaling, Inpainting, Sound Design"
                  className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                />
              </div>

              <div className="pt-3 border-t border-collabrix-borderVelvet flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-mauve text-white font-semibold shadow-luxury hover:opacity-95 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Studio Profile'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Right Column (1 col): Verification Signal Card */}
          <div className="space-y-6">
            <div className="bg-collabrix-velvet/40 border border-collabrix-borderVelvet rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-collabrix-roseGold">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-sm font-serif text-white">Trust & Verification Signals</h3>
              </div>

              <p className="text-xs text-collabrix-mutedText leading-relaxed">
                Collabrix verifies creators through model license validation, original prompt provenance tests, and human-in-the-loop workflow auditing.
              </p>

              <div className="p-4 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Status</span>
                  <span className="text-[11px] text-collabrix-mutedText">
                    {isVerified ? 'Fully Verified Pro' : 'Standard Creator'}
                  </span>
                </div>
                <VerificationBadge isVerified={isVerified} showTooltip={false} />
              </div>

              <button
                type="button"
                onClick={handleToggleVerification}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  isVerified
                    ? 'bg-collabrix-velvet border-collabrix-borderVelvet text-collabrix-pearlDust hover:text-white'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent shadow-luxury'
                }`}
              >
                {isVerified ? 'Toggle Verification Off' : 'Simulate Verification Signal'}
              </button>

              <div className="text-[10px] text-collabrix-mutedText space-y-2 border-t border-collabrix-borderVelvet/60 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Runway Gen-3 Enterprise Seat Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Commercial IP & Copyright Clear</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>4K Upscale Pipeline Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
