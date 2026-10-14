import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { proposalAPI } from '../../services/api';
import { Send, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const BrandProposalsPage: React.FC = () => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const res = await proposalAPI.getProposals();
        if (res.data.success) {
          setProposals(res.data.proposals);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Accepted</span>
          </span>
        );
      case 'declined':
        return (
          <span className="px-2.5 py-1 rounded-full bg-rose-950 border border-rose-500/40 text-[11px] font-bold text-rose-300 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Declined</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-950 border border-amber-500/40 text-[11px] font-bold text-amber-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Response</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust">
          Sent Proposals
        </h1>
        <p className="text-xs text-collabrix-mutedText mt-1">
          Review engagement proposals dispatched to AI creators.
        </p>
      </div>

      {loading ? (
        <div className="py-24 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : proposals.length === 0 ? (
        <div className="p-12 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet text-center space-y-4">
          <Send className="w-12 h-12 text-collabrix-roseGold mx-auto opacity-70" />
          <h3 className="font-serif text-lg font-bold text-collabrix-pearlDust">No Proposals Sent Yet</h3>
          <p className="text-xs text-collabrix-mutedText max-w-sm mx-auto">
            Discover creators or inspect brief match recommendations to dispatch your first proposal.
          </p>
          <Link
            to="/explore"
            className="px-6 py-2.5 rounded-full bg-collabrix-roseGold text-white text-xs font-semibold inline-block"
          >
            Explore AI Creators
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((p) => (
            <div
              key={p._id}
              className="p-6 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet shadow-velvet space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={p.creator?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={p.creator?.displayName}
                    className="w-12 h-12 rounded-full object-cover border border-collabrix-roseGold/50"
                  />
                  <div>
                    <h3 className="font-serif text-base font-bold text-collabrix-pearlDust">
                      Proposal to {p.creator?.displayName}
                    </h3>
                    <p className="text-xs text-collabrix-mutedText">
                      Campaign: <strong className="text-collabrix-pearlDust">{p.brief?.title || 'Direct Brief'}</strong> • Compensation: <strong className="text-collabrix-roseGold font-semibold">₹{p.compensation?.toLocaleString()}</strong>
                    </p>
                  </div>
                </div>

                {getStatusBadge(p.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-collabrix-onyx border border-collabrix-borderVelvet text-xs">
                <div>
                  <span className="text-[10px] uppercase text-collabrix-mutedText block">Deliverables</span>
                  <span className="text-collabrix-pearlDust font-medium">{p.deliverables}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-collabrix-mutedText block">Timeline</span>
                  <span className="text-collabrix-pearlDust font-medium">{p.timeline}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-collabrix-mutedText block">Commercial Rights</span>
                  <span className="text-emerald-400 font-medium">{p.proposedCommercialTerms}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet text-xs text-collabrix-pearlDust/90">
                <span className="text-collabrix-mutedText font-semibold">Invitation Note: </span>
                "{p.message}"
              </div>

              {p.status === 'accepted' && (
                <div className="flex justify-end pt-1">
                  <Link
                    to="/brand/collaborations"
                    className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-xs font-semibold text-emerald-300 hover:bg-emerald-900 transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Active Collaboration Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
