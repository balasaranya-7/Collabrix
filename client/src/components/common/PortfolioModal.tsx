import React from 'react';
import { X, Sparkles, ShieldCheck, Film, Image as ImageIcon, Cpu, Clock, Maximize2, Tag, ArrowRight } from 'lucide-react';
import { getFallbackPortfolio } from '../../utils/fallbackImage';

interface PortfolioModalProps {
  item: any | null;
  isOpen?: boolean;
  onClose: () => void;
  onSendProposal?: (creatorId: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, isOpen = true, onClose, onSendProposal }) => {
  if (isOpen === false || !item) return null;

  const fallbackMedia = getFallbackPortfolio(item.title, item.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-collabrix-velvet border border-collabrix-borderVelvet rounded-2xl shadow-velvet max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-collabrix-borderVelvet flex items-center justify-between shrink-0 bg-collabrix-onyx/50">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-collabrix-velvet border border-collabrix-roseGold/30 text-collabrix-roseGold">
              {item.mediaType === 'video' ? <Film className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
            </span>
            <div>
              <h3 className="font-serif text-base font-bold text-collabrix-pearlDust truncate max-w-md">
                {item.title}
              </h3>
              <p className="text-[11px] text-collabrix-mutedText">{item.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-collabrix-velvet hover:bg-collabrix-velvetLight text-collabrix-mutedText hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Media Player / Viewer */}
          <div className="relative w-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-collabrix-borderVelvet max-h-[460px]">
            <img
              src={item.mediaUrl || item.thumbnailUrl || fallbackMedia}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = fallbackMedia;
              }}
              alt={item.title}
              className="w-full h-full object-contain max-h-[450px]"
            />
            {/* Aspect Ratio Badge Overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-black/75 backdrop-blur-md text-[11px] font-mono text-collabrix-roseGlimmer border border-collabrix-roseGold/30">
                {item.aspectRatio || '16:9'}
              </span>
              <span className="px-2 py-1 rounded bg-black/75 backdrop-blur-md text-[11px] font-mono text-collabrix-roseGlimmer border border-collabrix-roseGold/30">
                {item.resolution || '4K UHD'}
              </span>
              {item.duration && (
                <span className="px-2 py-1 rounded bg-black/75 backdrop-blur-md text-[11px] font-mono text-collabrix-roseGlimmer border border-collabrix-roseGold/30">
                  {item.duration}
                </span>
              )}
            </div>

            {/* Commercial Clearance Badge Overlay */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/50 text-[11px] font-medium text-emerald-300 flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{item.commercialUseStatus || 'Commercial Ready'}</span>
              </span>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-collabrix-mutedText font-semibold mb-1">
                  Creative Overview
                </h4>
                <p className="text-xs text-collabrix-pearlDust leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Workflow Breakdown */}
              {item.workflowSummary && (
                <div className="p-3.5 rounded-xl bg-collabrix-velvetLight/50 border border-collabrix-borderVelvet">
                  <div className="flex items-center gap-2 text-xs font-semibold text-collabrix-roseGlimmer mb-1.5">
                    <Cpu className="w-3.5 h-3.5 text-collabrix-roseGold" />
                    <span>Production Workflow Architecture</span>
                  </div>
                  <p className="text-xs text-collabrix-pearlDust/90 leading-relaxed font-mono">
                    {item.workflowSummary}
                  </p>
                </div>
              )}

              {/* Process / Prompt Notes */}
              {item.processPromptNotes && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-collabrix-mutedText font-semibold mb-1">
                    Process & Prompt Notes
                  </h4>
                  <div className="p-3 rounded-lg bg-collabrix-onyx/70 border border-collabrix-borderVelvet text-xs font-mono text-collabrix-pearlDust/80">
                    "{item.processPromptNotes}"
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Metadata */}
            <div className="space-y-4 p-4 rounded-xl bg-collabrix-velvetLight/40 border border-collabrix-borderVelvet">
              {/* AI Models Used */}
              <div>
                <h4 className="text-[11px] uppercase tracking-wider text-collabrix-mutedText font-semibold mb-2">
                  AI Tools & Models
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(item.aiToolsModels || []).map((tool: string) => (
                    <span
                      key={tool}
                      className="px-2 py-1 rounded bg-collabrix-velvet text-[11px] text-collabrix-roseGlimmer border border-collabrix-roseGold/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="text-[11px] uppercase tracking-wider text-collabrix-mutedText font-semibold mb-2">
                  Demonstrated Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(item.technicalSkills || []).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-collabrix-onyx text-[10px] text-collabrix-pearlDust border border-collabrix-borderVelvet"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Commercial & Rights */}
              <div className="pt-2 border-t border-collabrix-borderVelvet/60">
                <h4 className="text-[11px] uppercase tracking-wider text-collabrix-mutedText font-semibold mb-1">
                  Licensing Terms
                </h4>
                <p className="text-[11px] text-collabrix-pearlDust/80 mb-2 leading-tight">
                  {item.rightsNotes || 'Commercial rights verified by creator under enterprise terms.'}
                </p>
                <div className="text-[10px] text-collabrix-mutedText italic">
                  Declaration: {item.ownershipDeclaration || 'Original creator synthesis'}
                </div>
              </div>

              {/* CTA */}
              {onSendProposal && (
                <button
                  onClick={() => {
                    onClose();
                    onSendProposal(item.creator?._id || item.creator);
                  }}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-roseGoldHover text-white text-xs font-semibold shadow-luxury hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Proposal to Creator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
