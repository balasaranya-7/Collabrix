import React, { useState, useEffect } from 'react';
import { proposalAPI } from '../../services/api';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const CreatorProposalsPage: React.FC = () => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all');

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const res = await proposalAPI.getProposals();
      if (res.data.success) {
        setProposals(res.data.proposals || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleRespond = async (proposalId: string, status: 'accepted' | 'declined') => {
    try {
      await proposalAPI.respondProposal(proposalId, {
        status,
        responseNotes:
          status === 'accepted'
            ? 'Accepted terms! Ready to initiate generative production.'
            : 'Declined due to scheduling or scope constraints.',
      });

      if (status === 'accepted') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setActionSuccess('Proposal accepted! Active collaboration initiated.');
      } else {
        setActionSuccess('Proposal declined.');
      }

      fetchProposals();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = proposals.filter((p) => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-collabrix-borderVelvet pb-6">
        <div>
          <div className="flex items-center gap-2 text-collabrix-roseGold text-xs font-semibold uppercase tracking-wider mb-1">
            <Send className="w-3.5 h-3.5" />
            <span>Deal Management</span>
          </div>
          <h1 className="text-2xl font-serif text-white">Campaign Proposals</h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            Review inbound production offers from creative agencies and direct brand advertisers.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 bg-collabrix-velvet p-1 rounded-xl border border-collabrix-borderVelvet">
          {(['all', 'pending', 'accepted', 'declined'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-collabrix-roseGold text-white shadow-luxury'
                  : 'text-collabrix-mutedText hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
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
          <p className="text-xs text-collabrix-mutedText">Loading proposal records...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center bg-collabrix-velvet/30 border border-collabrix-borderVelvet rounded-2xl p-8 max-w-md mx-auto">
          <Send className="w-10 h-10 text-collabrix-roseGold mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-semibold text-white mb-1">No proposals in this view</h3>
          <p className="text-xs text-collabrix-mutedText">When brands discover your AI portfolio, their inquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-collabrix-velvet/40 border border-collabrix-borderVelvet hover:border-collabrix-roseGold/40 rounded-2xl p-6 transition-all duration-300 space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-semibold text-white">
                      {item.brief?.title || item.projectTitle || 'Generative Production Project'}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'accepted'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.status === 'declined'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-collabrix-mutedText mt-1">
                    Client: <span className="text-collabrix-pearlDust font-medium">{item.sender?.companyName || item.sender?.name || item.brand?.companyName || 'Brand Partner'}</span>
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-base font-bold text-emerald-400">
                      ${item.proposedPrice || item.offeredBudget || 2500}
                    </span>
                    <p className="text-[10px] text-collabrix-mutedText">Contract Total</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-collabrix-pearlDust">
                      {item.estimatedDays || 7} Days
                    </span>
                    <p className="text-[10px] text-collabrix-mutedText">Timeline</p>
                  </div>
                </div>
              </div>

              {/* Cover Note */}
              {item.coverNote && (
                <div className="p-3.5 bg-collabrix-onyx/70 border border-collabrix-borderVelvet rounded-xl text-xs text-collabrix-pearlDust/90 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-collabrix-roseGold block mb-1">
                    Campaign Scope & Note
                  </span>
                  {item.coverNote}
                </div>
              )}

              {/* Actions for Pending Proposals */}
              {item.status === 'pending' && (
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-collabrix-borderVelvet">
                  <button
                    onClick={() => handleRespond(item._id, 'declined')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-red-500/40 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline Offer</span>
                  </button>
                  <button
                    onClick={() => handleRespond(item._id, 'accepted')}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold shadow-luxury hover:opacity-95 transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept & Begin Project</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
