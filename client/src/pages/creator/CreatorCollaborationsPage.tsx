import React, { useState, useEffect } from 'react';
import { collaborationAPI } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  Users,
  CheckCircle2,
  Clock,
  Film,
  AlertCircle,
  Upload,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const CreatorCollaborationsPage: React.FC = () => {
  const [collaborations, setCollaborations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCollab, setActiveCollab] = useState<any | null>(null);

  // Deliverable submission state
  const [assetTitle, setAssetTitle] = useState('');
  const [assetUrl, setAssetUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');
  const [assetNotes, setAssetNotes] = useState('Draft 4K render created via Runway Gen-3 Alpha with custom ComfyUI post-processing and color grading.');
  const [submittingAsset, setSubmittingAsset] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchCollaborations = async () => {
    try {
      setLoading(true);
      const res = await collaborationAPI.getCollaborations();
      if (res.data.success) {
        setCollaborations(res.data.collaborations || []);
        if (res.data.collaborations?.length > 0 && !activeCollab) {
          setActiveCollab(res.data.collaborations[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const handleSubmitDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCollab) return;

    try {
      setSubmittingAsset(true);
      await collaborationAPI.submitAsset(activeCollab._id, {
        title: assetTitle || 'Master Render v1',
        assetUrl,
        notes: assetNotes,
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      setActionSuccess('Deliverable asset submitted to brand for review!');
      setAssetTitle('');
      fetchCollaborations();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingAsset(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-collabrix-borderVelvet pb-6">
        <div>
          <div className="flex items-center gap-2 text-collabrix-roseGold text-xs font-semibold uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Production Manager</span>
          </div>
          <h1 className="text-2xl font-serif text-white">Active Brand Collaborations</h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            Deliver generative video renders, track client milestone reviews, and manage revision feedback.
          </p>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-collabrix-roseGold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-collabrix-mutedText">Loading project studio...</p>
        </div>
      ) : collaborations.length === 0 ? (
        <div className="py-20 text-center bg-collabrix-velvet/30 border border-collabrix-borderVelvet rounded-2xl p-8 max-w-md mx-auto">
          <Users className="w-10 h-10 text-collabrix-roseGold mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-semibold text-white mb-1">No active collaborations yet</h3>
          <p className="text-xs text-collabrix-mutedText">Once a brand accepts your pitch or sends a direct offer, your live campaign tracker will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Col: Projects List */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-collabrix-mutedText uppercase tracking-wider">
              Contracted Campaigns ({collaborations.length})
            </h3>
            <div className="space-y-3">
              {collaborations.map((c) => (
                <div
                  key={c._id}
                  onClick={() => setActiveCollab(c)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                    activeCollab?._id === c._id
                      ? 'bg-collabrix-velvet border-collabrix-roseGold shadow-luxury'
                      : 'bg-collabrix-velvet/40 border-collabrix-borderVelvet hover:border-collabrix-roseGold/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-white truncate max-w-[180px]">
                      {c.brief?.title || c.title || 'Generative Campaign'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        c.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : c.status === 'review'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-collabrix-mutedText">
                    Brand: {c.brand?.companyName || c.brand?.name || 'Client Agency'}
                  </p>
                  <div className="mt-2 text-[11px] text-emerald-400 font-semibold">
                    ${c.agreedPrice || c.budget || 2500} Total
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Active Project Details & Asset Delivery */}
          {activeCollab && (
            <div className="lg:col-span-2 space-y-6">
              {/* Project Card */}
              <div className="bg-collabrix-velvet/40 border border-collabrix-borderVelvet rounded-2xl p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-collabrix-borderVelvet pb-4">
                  <div>
                    <h2 className="text-lg font-serif text-white">
                      {activeCollab.brief?.title || activeCollab.title || 'AI Commercial Production'}
                    </h2>
                    <p className="text-xs text-collabrix-mutedText mt-0.5">
                      Client: {activeCollab.brand?.companyName || activeCollab.brand?.name || 'Client Agency'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-emerald-400">
                      ${activeCollab.agreedPrice || activeCollab.budget || 2500}
                    </span>
                    <p className="text-[10px] text-collabrix-mutedText">Payout on Completion</p>
                  </div>
                </div>

                {/* Milestone Stepper */}
                <div>
                  <h4 className="text-xs font-semibold text-collabrix-pearlDust mb-3">Project Milestones</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: 'Creative Kickoff', done: true },
                      { name: 'Draft Renders', done: !!activeCollab.assets?.length },
                      { name: 'Brand Review', done: activeCollab.status === 'review' || activeCollab.status === 'completed' },
                      { name: 'Delivery & Payout', done: activeCollab.status === 'completed' },
                    ].map((step, idx) => (
                      <div
                        key={step.name}
                        className={`p-3 rounded-xl border text-center ${
                          step.done
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-collabrix-onyx border-collabrix-borderVelvet text-collabrix-mutedText'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          {step.done ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-collabrix-mutedText" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium block">{step.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivered Assets List */}
                {activeCollab.assets && activeCollab.assets.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-collabrix-borderVelvet">
                    <h4 className="text-xs font-semibold text-collabrix-pearlDust">Submitted Assets</h4>
                    <div className="space-y-2">
                      {activeCollab.assets.map((asset: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3 bg-collabrix-onyx/70 border border-collabrix-borderVelvet rounded-xl flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <Film className="w-4 h-4 text-collabrix-roseGold shrink-0" />
                            <div>
                              <p className="font-semibold text-white">{asset.title || `Deliverable #${idx + 1}`}</p>
                              <p className="text-[10px] text-collabrix-mutedText">{asset.notes}</p>
                            </div>
                          </div>
                          <a
                            href={asset.assetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-collabrix-roseGold hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <span>Preview</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Revision Feedback If Any */}
                {activeCollab.revisions && activeCollab.revisions.length > 0 && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      <span>Brand Revision Request</span>
                    </div>
                    <p className="text-collabrix-pearlDust leading-relaxed">
                      {activeCollab.revisions[activeCollab.revisions.length - 1].feedback}
                    </p>
                  </div>
                )}

                {/* Submit New Asset Deliverable Form */}
                <form onSubmit={handleSubmitDeliverable} className="pt-4 border-t border-collabrix-borderVelvet space-y-4">
                  <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-collabrix-roseGold" />
                    <span>Upload Deliverable Asset for Client Approval</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-collabrix-pearlDust mb-1">Asset Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Master Final 4K Render"
                        value={assetTitle}
                        onChange={(e) => setAssetTitle(e.target.value)}
                        className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-collabrix-roseGold"
                      />
                    </div>
                    <div>
                      <label className="block text-collabrix-pearlDust mb-1">Asset URL (Video / Drive / CDN)</label>
                      <input
                        type="url"
                        required
                        value={assetUrl}
                        onChange={(e) => setAssetUrl(e.target.value)}
                        className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-collabrix-roseGold"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-collabrix-pearlDust mb-1">Delivery Notes & Model Run Details</label>
                    <textarea
                      rows={2}
                      value={assetNotes}
                      onChange={(e) => setAssetNotes(e.target.value)}
                      placeholder="Include notes on resolution, framerate, model weights..."
                      className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl p-3 text-white focus:outline-none focus:border-collabrix-roseGold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingAsset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-mauve text-white text-xs font-semibold shadow-luxury hover:opacity-95 transition-all disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{submittingAsset ? 'Submitting Deliverable...' : 'Submit Deliverable to Brand'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
