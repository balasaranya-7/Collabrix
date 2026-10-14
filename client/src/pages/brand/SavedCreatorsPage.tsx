import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { savedCreatorAPI } from '../../services/api';
import { CreatorCard } from '../../components/common/CreatorCard';
import { ProposalModal } from '../../components/common/ProposalModal';
import { Bookmark, Sparkles, Search, Trash2, MessageSquare, ArrowRight } from 'lucide-react';

export const SavedCreatorsPage: React.FC = () => {
  const [savedList, setSavedList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCreatorForProposal, setSelectedCreatorForProposal] = useState<any | null>(null);

  const fetchSavedCreators = async () => {
    try {
      setLoading(true);
      const res = await savedCreatorAPI.getSavedCreators();
      if (res.data.success) {
        setSavedList(res.data.savedCreators || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedCreators();
  }, []);

  const handleUnsave = async (creatorId: string) => {
    try {
      await savedCreatorAPI.unsaveCreator(creatorId);
      setSavedList((prev) => prev.filter((item) => (item.creator?._id || item.creator) !== creatorId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-collabrix-borderVelvet pb-6">
        <div>
          <div className="flex items-center gap-2 text-collabrix-roseGold text-xs font-semibold uppercase tracking-wider mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Shortlisted Talent</span>
          </div>
          <h1 className="text-2xl font-serif text-white">Saved AI Creators</h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            AI filmmakers, prompt engineers, and visual artists bookmarked for current or future campaigns.
          </p>
        </div>

        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/50 text-xs font-medium text-collabrix-pearlDust hover:text-white transition-all self-start md:self-auto"
        >
          <Search className="w-3.5 h-3.5 text-collabrix-roseGold" />
          <span>Explore More Creators</span>
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-collabrix-roseGold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-collabrix-mutedText">Loading saved talent book...</p>
        </div>
      ) : savedList.length === 0 ? (
        <div className="py-20 text-center bg-collabrix-velvet/40 border border-collabrix-borderVelvet/60 rounded-2xl p-8 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/30 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-6 h-6 text-collabrix-roseGold" />
          </div>
          <h3 className="text-base font-serif text-white mb-2">No creators saved yet</h3>
          <p className="text-xs text-collabrix-mutedText leading-relaxed mb-6">
            Browse our directory of top generative AI creators, review their workflows, and click the bookmark button to save them here for easy outreach.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-collabrix-roseGold to-collabrix-mauve text-white text-xs font-semibold shadow-luxury hover:opacity-95 transition-all"
          >
            <span>Browse AI Creators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((item) => {
            const creator = item.creator;
            if (!creator) return null;
            return (
              <div key={item._id} className="relative group">
                <CreatorCard
                  creator={creator}
                  onSendProposal={(c) => setSelectedCreatorForProposal(c)}
                />
                {/* Notes & Quick Action Bar */}
                <div className="mt-2 p-3 bg-collabrix-velvet/60 border border-collabrix-borderVelvet rounded-xl flex items-center justify-between text-xs">
                  <span className="text-[11px] text-collabrix-mutedText italic truncate max-w-[200px]">
                    {item.notes || 'No private notes'}
                  </span>
                  <button
                    onClick={() => handleUnsave(creator._id)}
                    className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Proposal Modal */}
      {selectedCreatorForProposal && (
        <ProposalModal
          creator={selectedCreatorForProposal}
          isOpen={!!selectedCreatorForProposal}
          onClose={() => setSelectedCreatorForProposal(null)}
          onSuccess={() => setSelectedCreatorForProposal(null)}
        />
      )}
    </div>
  );
};
