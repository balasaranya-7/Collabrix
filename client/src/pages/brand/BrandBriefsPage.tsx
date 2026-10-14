import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { briefAPI } from '../../services/api';
import { PlusCircle, Sparkles, FolderKanban, ArrowRight, Trash2, Calendar, DollarSign } from 'lucide-react';

export const BrandBriefsPage: React.FC = () => {
  const [briefs, setBriefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBriefs = async () => {
    try {
      setLoading(true);
      const res = await briefAPI.getBriefs({ myBriefs: true });
      if (res.data.success) {
        setBriefs(res.data.briefs);
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

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this brief?')) {
      try {
        await briefAPI.deleteBrief(id);
        fetchBriefs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-collabrix-pearlDust">
            My Creative Briefs
          </h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            Manage your campaign briefs and view real-time matched AI creators.
          </p>
        </div>

        <Link
          to="/brand/create-brief"
          className="px-5 py-2.5 rounded-full bg-collabrix-roseGold hover:bg-collabrix-roseGoldHover text-white text-xs font-semibold shadow-luxury transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Brief</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-24 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : briefs.length === 0 ? (
        <div className="p-12 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet text-center space-y-4 shadow-velvet">
          <FolderKanban className="w-12 h-12 text-collabrix-roseGold mx-auto opacity-70" />
          <h3 className="font-serif text-lg font-bold text-collabrix-pearlDust">
            No Creative Briefs Found
          </h3>
          <p className="text-xs text-collabrix-mutedText max-w-sm mx-auto">
            You haven't created any briefs yet. Click below to craft your first brief using our multi-step builder or AI assist!
          </p>
          <Link
            to="/brand/create-brief"
            className="px-6 py-2.5 rounded-full bg-collabrix-roseGold text-white text-xs font-semibold inline-block shadow-luxury"
          >
            Create Brief
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {briefs.map((b) => (
            <div
              key={b._id}
              className="p-6 rounded-3xl bg-collabrix-velvet border border-collabrix-borderVelvet hover:border-collabrix-roseGold/60 transition-all shadow-velvet flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-collabrix-velvetLight text-[10px] font-semibold text-collabrix-roseGlimmer border border-collabrix-roseGold/30">
                    {b.requiredSpecialization}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold uppercase">
                    {b.status}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-collabrix-pearlDust line-clamp-1">
                  {b.title}
                </h3>
                <p className="text-xs text-collabrix-mutedText line-clamp-2 leading-relaxed">
                  {b.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-collabrix-borderVelvet/60 text-xs text-collabrix-pearlDust/80">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-collabrix-mutedText">Budget Target:</span>
                    <span className="font-semibold text-collabrix-roseGold">
                      ₹{b.budget?.min?.toLocaleString()} - ₹{b.budget?.max?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-collabrix-mutedText">Format & Ratio:</span>
                    <span className="font-mono">{b.aspectRatio} • {b.contentType}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-collabrix-mutedText">Rights Scope:</span>
                    <span className="truncate max-w-[160px] text-emerald-400 font-medium">
                      {b.commercialRightsScope}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-collabrix-borderVelvet">
                <button
                  onClick={() => handleDelete(b._id)}
                  className="p-2 rounded-xl text-collabrix-mutedText hover:text-rose-400 transition-colors"
                  title="Delete Brief"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Link
                  to={`/brand/briefs/${b._id}/matches`}
                  className="px-4 py-2 rounded-xl bg-collabrix-roseGold text-white text-xs font-semibold shadow-luxury hover:bg-collabrix-roseGoldHover transition-all flex items-center gap-1.5"
                >
                  <span>Matches</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
