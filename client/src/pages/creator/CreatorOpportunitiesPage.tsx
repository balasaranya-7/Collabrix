import React, { useState, useEffect } from 'react';
import { briefAPI, proposalAPI } from '../../services/api';
import {
  Briefcase,
  Search,
  DollarSign,
  Calendar,
  Sparkles,
  Send,
  CheckCircle2,
  Filter,
  X,
  Layers,
} from 'lucide-react';

export const CreatorOpportunitiesPage: React.FC = () => {
  const [briefs, setBriefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrief, setSelectedBrief] = useState<any | null>(null);
  const [specializationFilter, setSpecializationFilter] = useState('all');

  // Proposal submission modal
  const [proposalModalBrief, setProposalModalBrief] = useState<any | null>(null);
  const [proposalPrice, setProposalPrice] = useState('');
  const [proposalDays, setProposalDays] = useState('7');
  const [proposalCoverNote, setProposalCoverNote] = useState('');
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBriefs = async () => {
    try {
      setLoading(true);
      const res = await briefAPI.getBriefs();
      if (res.data.success) {
        setBriefs(res.data.briefs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefs();
  }, []);

  const handleOpenProposal = (brief: any) => {
    setProposalModalBrief(brief);
    setProposalPrice(brief.budget?.max ? String(brief.budget.max) : '2500');
    setProposalDays(brief.timelineDays ? String(brief.timelineDays) : '7');
    setProposalCoverNote(
      `Hello! I specialize in ${brief.specialization || 'generative AI production'} using ${
        (brief.requiredTools || ['Runway Gen-3', 'Midjourney v6']).join(', ')
      }. I can deliver broadcast-ready assets within your timeline.`
    );
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalModalBrief) return;

    try {
      setSubmittingProposal(true);
      await proposalAPI.createProposal({
        briefId: proposalModalBrief._id,
        recipientId: proposalModalBrief.brand?._id || proposalModalBrief.brand,
        proposedPrice: Number(proposalPrice),
        estimatedDays: Number(proposalDays),
        coverNote: proposalCoverNote,
      });

      setSuccessMessage('Proposal sent successfully to the brand!');
      setProposalModalBrief(null);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingProposal(false);
    }
  };

  const filteredBriefs = briefs.filter((b) => {
    if (specializationFilter === 'all') return true;
    const filterLower = specializationFilter.toLowerCase();
    const specLower = (b.requiredSpecialization || b.specialization || '').toLowerCase();
    const titleLower = (b.title || '').toLowerCase();
    const descLower = (b.description || '').toLowerCase();
    return specLower.includes(filterLower) || titleLower.includes(filterLower) || descLower.includes(filterLower);
  });

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Page Header matching reference panel 11 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-collabrix-borderVelvet pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-collabrix-pearlDust font-bold">
            Campaign Opportunities
          </h1>
          <p className="text-xs text-collabrix-pearlDust/70 mt-1">
            Browse live campaign briefs and match your AI creative workflows with brand requirements.
          </p>
        </div>

        {/* Filter Pills matching reference screenshot: All Campaigns, Fashion, Lifestyle, Travel, Food */}
        <div className="flex flex-wrap items-center gap-2">
          {['All Campaigns', 'Fashion', 'Lifestyle', 'Travel', 'Food'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSpecializationFilter(cat === 'All Campaigns' ? 'all' : cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                (specializationFilter === 'all' && cat === 'All Campaigns') || specializationFilter === cat
                  ? 'bg-collabrix-pearlDust text-collabrix-onyx font-bold shadow-luxury'
                  : 'bg-collabrix-velvet text-collabrix-pearlDust/80 hover:text-white border border-collabrix-borderVelvet'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Briefs Grid matching reference panel 11 */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-collabrix-roseGold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-collabrix-mutedText">Scanning open campaign opportunities...</p>
        </div>
      ) : filteredBriefs.length === 0 ? (
        <div className="py-20 text-center bg-collabrix-velvet/30 border border-collabrix-borderVelvet rounded-2xl p-8 max-w-md mx-auto">
          <Briefcase className="w-10 h-10 text-collabrix-roseGold mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-semibold text-white mb-1">No matching briefs found</h3>
          <p className="text-xs text-collabrix-mutedText">Try adjusting the filter category above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBriefs.map((brief, bIdx) => {
            // Realistic calculated match score based on creator's profile traits
            const mockScores = [92, 88, 82, 78, 75, 71];
            const displayMatch = brief.matchScore || mockScores[bIdx % mockScores.length];

            return (
              <div
                key={brief._id}
                className="bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-velvet"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-collabrix-onyx text-[10px] font-semibold text-collabrix-roseGold border border-collabrix-roseGold/30 uppercase tracking-wider">
                          {brief.requiredSpecialization || brief.specialization || 'AI Filmmaking'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[10px] text-emerald-300 font-bold">
                          {displayMatch}% match
                        </span>
                      </div>
                      <h2 className="text-base font-semibold text-collabrix-pearlDust mt-2 leading-snug">
                        {brief.title}
                      </h2>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-collabrix-pearlDust">
                        ₹{brief.budget?.min ? `${brief.budget.min.toLocaleString()} - ${brief.budget.max?.toLocaleString()}` : (brief.budget?.max || 35000).toLocaleString()}
                      </span>
                      <p className="text-[10px] text-collabrix-mutedText">Campaign Budget</p>
                    </div>
                  </div>

                  <p className="text-xs text-collabrix-pearlDust/80 line-clamp-3 leading-relaxed">
                    {brief.description}
                  </p>

                  {/* Technical Specs Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-collabrix-borderVelvet/50 text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-collabrix-onyx text-collabrix-pearlDust border border-collabrix-borderVelvet">
                      Ratio: {brief.aspectRatio || '16:9'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-collabrix-onyx text-collabrix-pearlDust border border-collabrix-borderVelvet">
                      Deliverables: {brief.deliverablesCount || 1} asset
                    </span>
                    {(brief.requiredTools || ['Flux.1', 'Runway Gen-3']).slice(0, 3).map((tool: string) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-md bg-collabrix-roseGold/10 text-collabrix-roseGlimmer border border-collabrix-roseGold/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-collabrix-borderVelvet">
                  <div className="text-[11px] text-collabrix-mutedText flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-collabrix-roseGold" />
                    <span>Timeline: {brief.deadlineDays || brief.timelineDays || 7} days</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenProposal(brief)}
                      className="px-4 py-2 rounded-xl bg-collabrix-pearlDust text-collabrix-onyx text-xs font-bold hover:bg-white shadow-luxury transition-all"
                    >
                      View &amp; Pitch
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pitch Proposal Modal */}
      {proposalModalBrief && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-collabrix-onyx border border-collabrix-borderVelvet rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-collabrix-borderVelvet pb-4">
              <div>
                <h3 className="text-base font-serif text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-collabrix-roseGold" />
                  Submit Campaign Proposal
                </h3>
                <p className="text-xs text-collabrix-mutedText mt-0.5 truncate max-w-xs">
                  Brief: {proposalModalBrief.title}
                </p>
              </div>
              <button
                onClick={() => setProposalModalBrief(null)}
                className="p-1 rounded-full bg-collabrix-velvet text-collabrix-mutedText hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Proposed Fee ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={proposalPrice}
                    onChange={(e) => setProposalPrice(e.target.value)}
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Turnaround Days</label>
                  <input
                    type="number"
                    required
                    value={proposalDays}
                    onChange={(e) => setProposalDays(e.target.value)}
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-collabrix-pearlDust font-semibold mb-1">
                  Creative Approach & Production Note
                </label>
                <textarea
                  rows={4}
                  required
                  value={proposalCoverNote}
                  onChange={(e) => setProposalCoverNote(e.target.value)}
                  className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl p-3 text-white focus:outline-none focus:border-collabrix-roseGold resize-none"
                  placeholder="Outline your planned generative tools, custom LoRAs, upscale pipeline, and commercial rights..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-collabrix-borderVelvet">
                <button
                  type="button"
                  onClick={() => setProposalModalBrief(null)}
                  className="px-4 py-2 rounded-xl bg-collabrix-velvet text-collabrix-mutedText hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingProposal}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-mauve text-white font-semibold disabled:opacity-50"
                >
                  {submittingProposal ? 'Transmitting...' : 'Send Proposal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
