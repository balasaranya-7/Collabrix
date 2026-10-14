import React, { useState, useEffect } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { proposalAPI, briefAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface ProposalModalProps {
  creator: any | null;
  briefId?: string;
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  creator,
  briefId,
  isOpen = true,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [briefs, setBriefs] = useState<any[]>([]);
  const [selectedBriefId, setSelectedBriefId] = useState(briefId || '');
  const [deliverables, setDeliverables] = useState(
    '3x 4K Cinematic Cutdowns with clean color grade'
  );
  const [compensation, setCompensation] = useState(
    creator?.startingPrice || 25000
  );
  const [timeline, setTimeline] = useState('14 days');
  const [technicalRequirements, setTechnicalRequirements] = useState(
    '4K UHD, 9:16 vertical + 16:9 widescreen, ProRes 422'
  );
  const [commercialTerms, setCommercialTerms] = useState(
    'Digital Paid Ads (1 Year) worldwide'
  );
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (creator) {
      setCompensation(creator.startingPrice || 25000);
      setMessage(
        `Hi ${creator.displayName}, we were very impressed by your AI portfolio and specialized workflow. We would like to commission you for an upcoming campaign.`
      );
    }
  }, [creator]);

  useEffect(() => {
    setSelectedBriefId(briefId || '');

    const fetchMyBriefs = async () => {
      try {
        const res = await briefAPI.getBriefs({ myBriefs: true });

        if (res.data.success && res.data.briefs.length > 0) {
          setBriefs(res.data.briefs);
          setSelectedBriefId(
            briefId || res.data.briefs[0]._id
          );
        } else {
          setBriefs([]);
        }
      } catch {
        // Briefs could not be loaded.
        setBriefs([]);
      }
    };

    fetchMyBriefs();
  }, [creator, briefId]);

  if (!isOpen || !creator) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || user.role !== 'brand') {
      setError('You must be logged in as a Brand to dispatch collaboration proposals.');
      return;
    }

    if (!selectedBriefId && briefs.length > 0) {
      setError('Please select a creative brief for this proposal.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await proposalAPI.createProposal({
        creatorId: creator._id,
        briefId: selectedBriefId || briefs[0]?._id,
        deliverables,
        compensation: Number(compensation),
        timeline,
        technicalRequirements,
        proposedCommercialTerms: commercialTerms,
        message,
      });

      setSubmitted(true);
      onSuccess?.();

      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Failed to submit proposal. Please check requirements.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-collabrix-velvet border border-collabrix-borderVelvet rounded-2xl shadow-velvet max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-collabrix-borderVelvet flex items-center justify-between bg-collabrix-onyx/50">
          <div className="flex items-center gap-3">
            <img
              src={
                creator.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
              }
              alt={creator.displayName}
              className="w-10 h-10 rounded-full object-cover border border-collabrix-roseGold/60"
            />

            <div>
              <h3 className="font-serif text-base font-bold text-collabrix-pearlDust">
                Send Proposal to {creator.displayName}
              </h3>
              <p className="text-xs text-collabrix-mutedText">
                {creator.primarySpecialization} • Rate from ₹
                {(creator.startingPrice || 20000).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-collabrix-velvet hover:bg-collabrix-velvetLight text-collabrix-mutedText hover:text-white"
            aria-label="Close proposal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-2xl animate-bounce">
              ✓
            </div>

            <h4 className="font-serif text-xl font-bold text-collabrix-pearlDust">
              Proposal Dispatched Successfully!
            </h4>

            <p className="text-xs text-collabrix-mutedText max-w-sm">
              {creator.displayName} has received your proposal in their creator
              dashboard. You can track status in your Sent Proposals tab.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-4"
          >
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                Select Creative Brief *
              </label>

              {briefs.length > 0 ? (
                <select
                  value={selectedBriefId}
                  onChange={(e) => setSelectedBriefId(e.target.value)}
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2.5 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  required
                >
                  {briefs.map((brief) => (
                    <option key={brief._id} value={brief._id}>
                      {brief.title} (Budget: ₹
                      {brief.budget?.max?.toLocaleString() || 'Flexible'})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet text-xs text-collabrix-mutedText">
                  No saved briefs found. A default demo campaign brief will be
                  linked automatically.
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Proposed Compensation (₹ INR) *
                </label>
                <input
                  type="number"
                  value={compensation}
                  onChange={(e) => setCompensation(Number(e.target.value))}
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  min="5000"
                  step="1000"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Production Timeline *
                </label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                Required Deliverables *
              </label>
              <input
                type="text"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Technical Formats
                </label>
                <input
                  type="text"
                  value={technicalRequirements}
                  onChange={(e) => setTechnicalRequirements(e.target.value)}
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                  Commercial Rights Scope
                </label>
                <input
                  type="text"
                  value={commercialTerms}
                  onChange={(e) => setCommercialTerms(e.target.value)}
                  className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-collabrix-mutedText mb-1.5">
                Invitation Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full bg-collabrix-onyx border border-collabrix-borderVelvet rounded-xl px-3.5 py-2 text-xs text-collabrix-pearlDust focus:outline-none focus:border-collabrix-roseGold resize-none"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold tracking-wide shadow-luxury hover:shadow-glow transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Dispatching Proposal...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Collaboration Proposal</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};