import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VerificationBadge } from './VerificationBadge';
import { Bookmark, Sparkles, MapPin, Eye, ArrowRight } from 'lucide-react';
import { savedCreatorAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getFallbackAvatar, getFallbackPortfolio } from '../../utils/fallbackImage';

interface CreatorCardProps {
  creator: any;
  matchScore?: number;
  matchReasons?: string[];
  isSavedInitial?: boolean;
  onSaveToggle?: (saved: boolean) => void;
  onSendProposal?: (creator: any) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  matchScore,
  matchReasons,
  isSavedInitial = false,
  onSaveToggle,
  onSendProposal,
}) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const [saving, setSaving] = useState(false);

  const fallbackAvatar = getFallbackAvatar(creator.displayName || creator.name);
  const fallbackCover = getFallbackPortfolio(creator.displayName || creator.name, creator.primarySpecialization);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || user.role !== 'brand') {
      alert('Please log in with a Brand account to save creators to your shortlist.');
      return;
    }

    try {
      setSaving(true);
      if (isSaved) {
        await savedCreatorAPI.unsaveCreator(creator._id);
        setIsSaved(false);
        onSaveToggle?.(false);
      } else {
        await savedCreatorAPI.saveCreator(creator._id);
        setIsSaved(true);
        onSaveToggle?.(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const displayScore = matchScore || creator.metrics?.matchRating || 95;

  return (
    <div className="group relative rounded-2xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/60 transition-all duration-300 hover:shadow-luxury hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      {/* Top Banner & Bookmark */}
      <div className="relative h-28 w-full overflow-hidden bg-collabrix-onyx">
        <img
          src={creator.coverImage || fallbackCover}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackCover;
          }}
          alt=""
          className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-collabrix-velvet via-transparent to-black/40"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-collabrix-onyx/80 backdrop-blur-md border border-collabrix-roseGold/30 text-[10px] font-semibold text-collabrix-roseGlimmer">
            {creator.primarySpecialization}
          </span>
          <div className="flex items-center gap-2">
            {displayScore && (
              <span className="px-2 py-0.5 rounded-full bg-collabrix-roseGold text-white font-bold text-[10px] shadow-glow flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>{displayScore}% Match</span>
              </span>
            )}
            <button
              onClick={handleToggleSave}
              disabled={saving}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-collabrix-roseGold text-white'
                  : 'bg-black/50 text-collabrix-pearlDust hover:text-collabrix-roseGlimmer'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save creator'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="px-5 pt-0 pb-3 -mt-9 relative z-10">
        <div className="flex items-end gap-3.5 mb-2.5">
          <div className="relative">
            <img
              src={creator.avatar || fallbackAvatar}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
              }}
              alt={creator.displayName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-collabrix-roseGold/60 shadow-velvet bg-collabrix-onyx"
            />
            {creator.verification?.toolExpertise?.status === 'Verified' && (
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-collabrix-velvet flex items-center justify-center text-[10px] text-white"
                title="Verified AI Workflow"
              >
                ✓
              </div>
            )}
          </div>
          <div className="overflow-hidden pb-1">
            <h3 className="font-serif text-base font-bold text-collabrix-pearlDust truncate group-hover:text-collabrix-roseGlimmer transition-colors">
              {creator.displayName}
            </h3>
            <p className="text-xs text-collabrix-mutedText truncate">@{creator.handle}</p>
          </div>
        </div>

        {/* Location & Rate */}
        <div className="flex items-center justify-between text-xs text-collabrix-mutedText mb-3">
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 text-collabrix-roseGold shrink-0" />
            <span className="truncate">{creator.location || 'Global Remote'}</span>
          </div>
          <div className="text-collabrix-pearlDust font-semibold shrink-0">
            From ₹{(creator.startingPrice || 20000).toLocaleString()}
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-collabrix-pearlDust/80 line-clamp-2 leading-relaxed mb-3">
          {creator.bio}
        </p>

        {/* Tools Badges */}
        <div className="flex flex-wrap gap-1 mb-3.5">
          {(creator.aiToolsModels || []).slice(0, 3).map((tool: string) => (
            <span
              key={tool}
              className="px-2 py-0.5 rounded bg-collabrix-velvetLight text-[10px] text-collabrix-roseGlimmer border border-collabrix-borderVelvet"
            >
              {tool}
            </span>
          ))}
          {(creator.aiToolsModels || []).length > 3 && (
            <span className="px-1.5 py-0.5 rounded bg-collabrix-velvetLight text-[10px] text-collabrix-mutedText">
              +{creator.aiToolsModels.length - 3}
            </span>
          )}
        </div>

        {/* Portfolio Previews Grid (if attached) */}
        {creator.portfolioPreviews && creator.portfolioPreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-1.5 mb-3.5 pt-2 border-t border-collabrix-borderVelvet/60">
            {creator.portfolioPreviews.slice(0, 3).map((item: any) => {
              const itemThumb = item.thumbnailUrl || item.mediaUrl;
              const itemFallback = getFallbackPortfolio(item.title, item.category);
              return (
                <div key={item._id} className="relative aspect-video rounded-lg overflow-hidden bg-black group/img">
                  <img
                    src={itemThumb || itemFallback}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = itemFallback;
                    }}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover/img:bg-transparent transition-colors"></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reasons checkmarks if matching */}
        {matchReasons && matchReasons.length > 0 && (
          <div className="space-y-1 mb-3.5 py-2 px-2.5 rounded-xl bg-collabrix-velvetLight/60 border border-collabrix-roseGold/20 text-[11px] text-collabrix-pearlDust">
            {matchReasons.slice(0, 2).map((reason, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-collabrix-roseGlimmer">
                <span className="text-emerald-400 font-bold">✓</span>
                <span className="truncate">{reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Action */}
      <div className="p-4 pt-0">
        <Link
          to={`/creator-profile/${creator._id}`}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-collabrix-velvetLight to-collabrix-velvet border border-collabrix-roseGold/40 text-xs font-semibold text-collabrix-roseGlimmer hover:text-white hover:border-collabrix-roseGold hover:bg-collabrix-roseGold/20 flex items-center justify-center gap-2 transition-all"
        >
          <span>View Profile & AI DNA</span>
          <ArrowRight className="w-3.5 h-3.5 text-collabrix-roseGold group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
