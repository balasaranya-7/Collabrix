import React, { useState, useEffect } from 'react';
import { collaborationAPI } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  Users,
  CheckCircle2,
  Clock,
  Film,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const BrandCollaborationsPage: React.FC = () => {
  const [collaborations, setCollaborations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCollab, setActiveCollab] = useState<any | null>(null);

  // Revision state
  const [feedback, setFeedback] = useState('');
  const [submittingRevision, setSubmittingRevision] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchCollaborations = async () => {
    try {
      setLoading(true);
      const res = await collaborationAPI.getCollaborations();
      if (res.data.success) {
        setCollaborations(res.data.collaborations);
        if (res.data.collaborations.length > 0 && !activeCollab) {
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

  const handleRequestRevision = async (collabId: string) => {
    if (!feedback.trim()) return;
    try {
      setSubmittingRevision(true);
      await collaborationAPI.requestRevision(collabId, { feedback });
      setActionSuccess('Revision request sent to creator successfully!');
      setFeedback('');
      fetchCollaborations();
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingRevision(false);
    }
  };

  const handleCompleteProject = async (collabId: string) => {
    try {
      await collaborationAPI.completeCollaboration(collabId);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setActionSuccess('Collaboration successfully approved and completed! 🌟');
      fetchCollaborations();
      setTimeout(() => setActionSuccess(''), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust">
          Active Collaborations
        </h1>
        <p className="text-xs text-collabrix-mutedText mt-1">
          Monitor milestone execution, inspect delivered video masters, and manage revisions.
        </p>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-300 font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {loading ? (
        <div className="py-24 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : collaborations.length === 0 ? (
        <div className="p-12 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet text-center space-y-4">
          <Users className="w-12 h-12 text-collabrix-roseGold mx-auto opacity-70" />
          <h3 className="font-serif text-lg font-bold text-collabrix-pearlDust">
            No Active Collaborations
          </h3>
          <p className="text-xs text-collabrix-mutedText max-w-sm mx-auto">
            When an AI creator accepts your proposal, your collaborative production workspace will activate automatically here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {collaborations.map((collab) => (
            <div
              key={collab._id}
              className="p-6 sm:p-8 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-6"
            >
              {/* Collab Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-collabrix-borderVelvet">
                <div className="flex items-center gap-4">
                  <img
                    src={collab.creator?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={collab.creator?.displayName}
                    className="w-14 h-14 rounded-2xl object-cover border border-collabrix-roseGold/60 shadow-md"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-collabrix-roseGold">
                      Campaign Collaboration
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-collabrix-pearlDust">
                      {collab.brief?.title || 'Creative Campaign'}
                    </h2>
                    <p className="text-xs text-collabrix-mutedText">
                      Lead Creator: <strong className="text-collabrix-pearlDust">{collab.creator?.displayName}</strong> • Agreed Fee: <strong className="text-collabrix-roseGold font-semibold">₹{collab.agreedCompensation?.toLocaleString()}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    collab.status === 'completed'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'bg-collabrix-velvetLight text-collabrix-roseGlimmer border border-collabrix-roseGold/30'
                  }`}>
                    {collab.status.replace('_', ' ')}
                  </span>
                  {collab.status !== 'completed' && (
                    <button
                      onClick={() => handleCompleteProject(collab._id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-luxury transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Approve & Complete</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Milestones Tracker */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText">
                  Milestone Progress
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(collab.milestones || []).map((m: any, idx: number) => (
                    <div
                      key={m._id || idx}
                      className="p-3.5 rounded-2xl bg-collabrix-onyx border border-collabrix-borderVelvet space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-collabrix-pearlDust">{m.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          m.status === 'completed'
                            ? 'bg-emerald-950 text-emerald-400'
                            : 'bg-amber-950 text-amber-300'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-collabrix-mutedText">{m.notes || `Target: ${m.dueDate}`}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Assets Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText">
                    Delivered Assets ({collab.deliveryAssets?.length || 0})
                  </h3>
                  <span className="text-[11px] text-collabrix-roseGold">ProRes 4K Master / Preview</span>
                </div>

                {collab.deliveryAssets && collab.deliveryAssets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {collab.deliveryAssets.map((asset: any) => (
                      <div
                        key={asset._id}
                        className="p-4 rounded-2xl bg-collabrix-onyx border border-collabrix-borderVelvet space-y-3"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                          <img
                            src={asset.url}
                            alt={asset.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-collabrix-pearlDust">{asset.title}</h4>
                          <p className="text-[11px] text-collabrix-mutedText">{asset.notes || 'Master creative asset delivered for client review.'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-collabrix-onyx border border-collabrix-borderVelvet text-xs text-collabrix-mutedText">
                    Creator is currently rendering initial scene sequences. Deliverables will appear here once uploaded.
                  </div>
                )}
              </div>

              {/* Revision Request Area if active */}
              {collab.status !== 'completed' && (
                <div className="p-4 rounded-2xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet space-y-3">
                  <h4 className="text-xs font-semibold text-collabrix-pearlDust">Request Revisions or Notes</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="e.g. Please warm up the color grading in the macro coffee pour shot..."
                      className="flex-1 bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-4 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                    />
                    <button
                      type="button"
                      onClick={() => handleRequestRevision(collab._id)}
                      disabled={submittingRevision}
                      className="px-4 py-2 rounded-xl bg-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer hover:bg-collabrix-roseGold hover:text-white transition-colors shrink-0"
                    >
                      {submittingRevision ? 'Sending...' : 'Send Revision'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
