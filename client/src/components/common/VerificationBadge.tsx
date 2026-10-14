import React from 'react';
import { ShieldCheck, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface VerificationBadgeProps {
  status?: string;
  isVerified?: boolean;
  showTooltip?: boolean;
  type?: 'tools' | 'workflow' | 'portfolio' | 'commercial';
  showDetails?: boolean;
  evidence?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status = 'Self-reported',
  isVerified,
  showTooltip = true,
  type = 'tools',
  showDetails = false,
  evidence,
}) => {
  const effectiveStatus = isVerified !== undefined ? (isVerified ? 'Verified' : 'Unverified') : status;
  const getBadgeConfig = () => {
    switch (effectiveStatus) {
      case 'Verified':
        return {
          bg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
          icon: ShieldCheck,
          label: 'Verified',
        };
      case 'Review required':
        return {
          bg: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
          icon: Clock,
          label: 'Review Required',
        };
      case 'Unverified':
        return {
          bg: 'bg-rose-950/60 border-rose-500/40 text-rose-300',
          icon: AlertCircle,
          label: 'Unverified',
        };
      default:
        return {
          bg: 'bg-collabrix-velvet border-collabrix-roseGold/30 text-collabrix-roseGlimmer',
          icon: CheckCircle2,
          label: 'Self-reported',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${config.bg} transition-all`}
        title={evidence || `${config.label} claim`}
      >
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </span>
      {showDetails && evidence && (
        <span className="text-[10px] text-collabrix-mutedText truncate max-w-xs">
          ({evidence})
        </span>
      )}
    </div>
  );
};
