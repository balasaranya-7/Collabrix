import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { portfolioAPI, creatorAPI } from '../../services/api';
import { PortfolioModal } from '../../components/common/PortfolioModal';
import {
  Layers,
  PlusCircle,
  Sparkles,
  Trash2,
  Eye,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  Tag,
  Wand2,
  X,
  ExternalLink,
} from 'lucide-react';

export const CreatorPortfolioPage: React.FC = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItemForModal, setSelectedItemForModal] = useState<any | null>(null);

  // Add Item Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '16:9',
    primaryModel: 'Runway Gen-3 Alpha',
    supportingTools: 'ComfyUI, Topaz Video AI, ElevenLabs',
    promptSnippet: 'Cinematic hyper-realistic macro shot of luxury fragrance bottle enveloped in silk fluid, 8k octane render, dramatic rim lighting',
    commercialRights: 'Full Commercial & Advertising Rights',
    workflowNotes: 'Custom LoRA trained on brand aesthetics, multi-pass inpainting with ComfyUI, 4K upscaled via Topaz.',
  });

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      // Fetch creator profile or items
      const creatorId = user?.creatorProfileId || user?.id;
      if (creatorId) {
        const res = await portfolioAPI.getCreatorPortfolio(creatorId);
        if (res.data.success) {
          setPortfolioItems(res.data.portfolioItems || []);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this portfolio piece?')) return;
    try {
      await portfolioAPI.deletePortfolioItem(id);
      setPortfolioItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        title: formData.title,
        description: formData.description,
        contentType: formData.contentType,
        mediaUrl: formData.mediaUrl,
        thumbnailUrl: formData.thumbnailUrl || formData.mediaUrl,
        aspectRatio: formData.aspectRatio,
        toolsUsed: formData.supportingTools.split(',').map((s) => s.trim()).filter(Boolean),
        primaryModel: formData.primaryModel,
        promptSnippet: formData.promptSnippet,
        commercialRights: formData.commercialRights,
        workflowNotes: formData.workflowNotes,
      };

      const res = await portfolioAPI.addPortfolioItem(payload);
      if (res.data.success) {
        setPortfolioItems((prev) => [res.data.portfolioItem, ...prev]);
        setIsAddModalOpen(false);
        // Reset form
        setFormData({
          title: '',
          description: '',
          contentType: 'video',
          mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          aspectRatio: '16:9',
          primaryModel: 'Runway Gen-3 Alpha',
          supportingTools: 'ComfyUI, Topaz Video AI, ElevenLabs',
          promptSnippet: '',
          commercialRights: 'Full Commercial & Advertising Rights',
          workflowNotes: '',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-collabrix-onyx min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-collabrix-borderVelvet pb-6">
        <div>
          <div className="flex items-center gap-2 text-collabrix-roseGold text-xs font-semibold uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>AI Portfolio Manager</span>
          </div>
          <h1 className="text-2xl font-serif text-white">Generative AI Showcase</h1>
          <p className="text-xs text-collabrix-mutedText mt-1">
            Publish your AI productions with full model provenance, prompt notes, and commercial licensing status to attract matching brand briefs.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-collabrix-roseGold to-collabrix-mauve text-white text-xs font-semibold shadow-luxury hover:opacity-95 transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add AI Project</span>
        </button>
      </div>

      {/* Grid of Portfolio Items */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-collabrix-roseGold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-collabrix-mutedText">Loading portfolio showcase...</p>
        </div>
      ) : portfolioItems.length === 0 ? (
        <div className="py-16 text-center bg-collabrix-velvet/40 border border-collabrix-borderVelvet rounded-2xl p-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-collabrix-velvet border border-collabrix-roseGold/30 flex items-center justify-center mx-auto mb-4">
            <Layers className="w-6 h-6 text-collabrix-roseGold" />
          </div>
          <h3 className="text-base font-serif text-white mb-2">No portfolio items published yet</h3>
          <p className="text-xs text-collabrix-mutedText leading-relaxed mb-6">
            Upload your first generative AI video, high-resolution visual concept, or audio pipeline to start receiving automated matching scores from brand creative briefs.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-collabrix-roseGold text-white text-xs font-semibold hover:opacity-90 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create First Portfolio Item</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item._id}
              className="group bg-collabrix-velvet/40 border border-collabrix-borderVelvet hover:border-collabrix-roseGold/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
            >
              {/* Media Preview Box */}
              <div
                className="relative aspect-video overflow-hidden cursor-pointer bg-collabrix-onyx"
                onClick={() => setSelectedItemForModal(item)}
              >
                <img
                  src={item.thumbnailUrl || item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-collabrix-onyx/80 via-transparent to-black/30"></div>

                {/* Aspect Ratio Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-mono border border-white/10">
                  {item.aspectRatio || '16:9'}
                </div>

                {/* Content Type Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-collabrix-roseGold/80 backdrop-blur-md text-[10px] text-white font-semibold flex items-center gap-1">
                  {item.contentType === 'video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                  <span className="capitalize">{item.contentType}</span>
                </div>

                {/* Quick inspect overlay */}
                <div className="absolute inset-0 bg-collabrix-velvet/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-white text-collabrix-onyx text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Details
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    onClick={() => setSelectedItemForModal(item)}
                    className="text-sm font-semibold text-white group-hover:text-collabrix-roseGlimmer cursor-pointer transition-colors"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-collabrix-mutedText mt-1 line-clamp-2 leading-relaxed">
                    {item.description || item.promptSnippet || 'Generative production showcase'}
                  </p>
                </div>

                {/* AI Models / Stack Pills */}
                <div className="space-y-3 pt-2 border-t border-collabrix-borderVelvet/60">
                  <div className="flex flex-wrap gap-1.5">
                    {item.primaryModel && (
                      <span className="px-2 py-0.5 rounded-full bg-collabrix-onyx text-[10px] font-semibold text-collabrix-roseGold border border-collabrix-roseGold/30">
                        {item.primaryModel}
                      </span>
                    )}
                    {(item.toolsUsed || []).slice(0, 2).map((t: string) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full bg-collabrix-onyx text-[10px] text-collabrix-pearlDust/80 border border-collabrix-borderVelvet"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Commercial Ready</span>
                    </span>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-collabrix-mutedText hover:text-red-400 transition-colors p-1"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-collabrix-onyx border border-collabrix-borderVelvet rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-collabrix-borderVelvet pb-4">
              <div>
                <h3 className="text-lg font-serif text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-collabrix-roseGold" />
                  Add AI Portfolio Work
                </h3>
                <p className="text-xs text-collabrix-mutedText mt-0.5">
                  Publish work with technical model provenance to increase campaign match rates.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full bg-collabrix-velvet text-collabrix-mutedText hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-collabrix-pearlDust font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cyberpunk Haute Couture Campaign Video"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Content Type</label>
                  <select
                    value={formData.contentType}
                    onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="video">AI Video / Animation</option>
                    <option value="image">AI Still / Art</option>
                    <option value="audio">Generative Audio / Soundtrack</option>
                    <option value="multimodal">Multi-modal Production</option>
                  </select>
                </div>

                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Aspect Ratio</label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="16:9">16:9 (Landscape / YouTube)</option>
                    <option value="9:16">9:16 (Vertical / Reels & TikTok)</option>
                    <option value="1:1">1:1 (Square / Feed)</option>
                    <option value="4:5">4:5 (Portrait / Instagram)</option>
                    <option value="2.39:1">2.39:1 (Cinemascope)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-collabrix-pearlDust font-semibold mb-1">Image / Render Preview URL</label>
                <input
                  type="url"
                  required
                  value={formData.mediaUrl}
                  onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value, thumbnailUrl: e.target.value })}
                  className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Primary AI Model</label>
                  <select
                    value={formData.primaryModel}
                    onChange={(e) => setFormData({ ...formData, primaryModel: e.target.value })}
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  >
                    <option value="Runway Gen-3 Alpha">Runway Gen-3 Alpha</option>
                    <option value="Kling AI 1.5">Kling AI 1.5</option>
                    <option value="Luma Dream Machine">Luma Dream Machine</option>
                    <option value="Midjourney v6.1">Midjourney v6.1</option>
                    <option value="Flux.1 Pro">Flux.1 Pro</option>
                    <option value="ComfyUI Custom Pipeline">ComfyUI Custom Pipeline</option>
                    <option value="Suno v3.5">Suno v3.5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-collabrix-pearlDust font-semibold mb-1">Supporting Pipeline Tools</label>
                  <input
                    type="text"
                    value={formData.supportingTools}
                    onChange={(e) => setFormData({ ...formData, supportingTools: e.target.value })}
                    placeholder="e.g. ComfyUI, ElevenLabs, Topaz Video AI"
                    className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-collabrix-pearlDust font-semibold mb-1">Prompt Engineering Note / Snippet</label>
                <textarea
                  rows={2}
                  placeholder="Share prompt keywords or style guidance..."
                  value={formData.promptSnippet}
                  onChange={(e) => setFormData({ ...formData, promptSnippet: e.target.value })}
                  className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold resize-none"
                />
              </div>

              <div>
                <label className="block text-collabrix-pearlDust font-semibold mb-1">Workflow & Human Post-Processing</label>
                <textarea
                  rows={2}
                  placeholder="Describe upscale, color grading, or custom LoRA steps..."
                  value={formData.workflowNotes}
                  onChange={(e) => setFormData({ ...formData, workflowNotes: e.target.value })}
                  className="w-full bg-collabrix-velvet border border-collabrix-borderVelvet rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-collabrix-roseGold resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-collabrix-borderVelvet">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-collabrix-velvet text-collabrix-mutedText hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-collabrix-roseGold to-collabrix-mauve text-white font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish to Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Viewer Modal */}
      {selectedItemForModal && (
        <PortfolioModal
          item={selectedItemForModal}
          isOpen={!!selectedItemForModal}
          onClose={() => setSelectedItemForModal(null)}
        />
      )}
    </div>
  );
};
