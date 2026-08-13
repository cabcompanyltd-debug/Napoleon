import React, { useState, useEffect } from 'react';
import {
  GalleryItemData,
  getAllGalleryItemsAdmin,
  saveGalleryItem,
  deleteGalleryItem,
  toggleGalleryItemPublished,
  uploadToInsForgeStorage,
  extractYouTubeVideoId,
  getYouTubeThumbnailUrl,
} from '../../lib/insforge';
import {
  Image as ImageIcon,
  Youtube,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Upload,
  CheckCircle2,
  AlertCircle,
  Play,
  Loader2,
  X,
  Search,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';

const CATEGORIES = [
  'Farms',
  'Crops',
  'Machinery',
  'People',
  'Volta Region',
  'Technology',
  'Processing',
];

export const GalleryManager: React.FC = () => {
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [itemType, setItemType] = useState<'image' | 'youtube'>('image');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Farms');
  const [location, setLocation] = useState('Ho, Volta Region, Ghana');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isPublished, setIsPublished] = useState(true);

  // Image Specifics
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // YouTube Specifics
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  // Filters & Search
  const [filterType, setFilterType] = useState<'all' | 'image' | 'youtube'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Preview Modal
  const [previewItem, setPreviewItem] = useState<GalleryItemData | null>(null);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    setLoading(true);
    try {
      const data = await getAllGalleryItemsAdmin();
      setItems(data);
      // Auto-set default display order to next sequence
      if (data.length > 0) {
        const maxOrder = Math.max(...data.map((i) => i.displayOrder || 0));
        setDisplayOrder(maxOrder + 1);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const [fetchingYoutubeInfo, setFetchingYoutubeInfo] = useState(false);

  // Auto-fetch YouTube video title & details using public oEmbed API
  const fetchYoutubeMetadata = async (vidId: string) => {
    if (!vidId) return;
    setFetchingYoutubeInfo(true);
    try {
      const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vidId}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.title) {
          setTitle(data.title);
          if (data.author_name) {
            setDescription(`YouTube video features by ${data.author_name}`);
          }
          setStatusMsg({
            type: 'success',
            text: `Auto-fetched YouTube title: "${data.title}"`,
          });
        }
      }
    } catch (err) {
      console.error('Failed to auto-fetch YouTube metadata:', err);
    } finally {
      setFetchingYoutubeInfo(false);
    }
  };

  // Auto detect YouTube video ID when user types/pastes URL
  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url);
    const id = extractYouTubeVideoId(url);
    setYoutubeVideoId(id);
    if (!id && url.trim().length > 10) {
      setUploadError('Invalid YouTube URL format. Expected watch?v=, youtu.be/, or shorts/');
    } else {
      setUploadError(null);
      if (id && (!title || title.trim() === '')) {
        fetchYoutubeMetadata(id);
      }
    }
  };

  // Handle Image File Upload with Validation
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // 1. File Type Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid image format. Please upload JPG, PNG, WEBP, or GIF.');
      return;
    }

    // 2. File Size Limit (Max 10MB)
    const MAX_SIZE_MB = 10;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setUploadError(`File size exceeds ${MAX_SIZE_MB}MB limit. Please select a smaller image.`);
      return;
    }

    // Local Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to InsForge Storage
    setUploadingImage(true);
    try {
      const { url, error } = await uploadToInsForgeStorage(file);
      if (error || !url) {
        // Fallback to local Data URL if network upload encounters issues
        setImageUrl(imagePreview || '');
        setUploadError('Storage upload warning: Using local optimized image data.');
      } else {
        setImageUrl(url);
        setStatusMsg({ type: 'success', text: 'Image uploaded successfully to InsForge storage!' });
      }
    } catch (err: any) {
      setUploadError(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setItemType('image');
    setTitle('');
    setDescription('');
    setCategory('Farms');
    setLocation('Ho, Volta Region, Ghana');
    const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.displayOrder || 0)) : 0;
    setDisplayOrder(maxOrder + 1);
    setIsPublished(true);
    setImageUrl('');
    setImagePreview(null);
    setYoutubeUrl('');
    setYoutubeVideoId(null);
    setUploadError(null);
  };

  const handleEditInit = (item: GalleryItemData) => {
    setIsEditing(true);
    setEditId(item.id);
    setItemType(item.type);
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setLocation(item.location || 'Ho, Volta Region, Ghana');
    setDisplayOrder(item.displayOrder);
    setIsPublished(item.isPublished);

    if (item.type === 'image') {
      setImageUrl(item.imageUrl || '');
      setImagePreview(item.imageUrl || null);
      setYoutubeUrl('');
      setYoutubeVideoId(null);
    } else {
      setYoutubeUrl(item.youtubeUrl || '');
      setYoutubeVideoId(item.youtubeVideoId || extractYouTubeVideoId(item.youtubeUrl || ''));
      setImageUrl('');
      setImagePreview(null);
    }

    // Scroll smoothly to form top
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setUploadError(null);

    if (!title.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter a title for the gallery item.' });
      return;
    }

    if (itemType === 'image' && !imageUrl && !imagePreview) {
      setStatusMsg({ type: 'error', text: 'Please upload or provide an image URL.' });
      return;
    }

    if (itemType === 'youtube' && !youtubeVideoId) {
      setStatusMsg({
        type: 'error',
        text: 'Please enter a valid YouTube video URL (e.g. watch?v=..., youtu.be/...)',
      });
      return;
    }

    setSaving(true);
    try {
      const finalImage = imageUrl || imagePreview || '';
      const finalThumbnail =
        itemType === 'youtube' && youtubeVideoId
          ? getYouTubeThumbnailUrl(youtubeVideoId)
          : finalImage;

      await saveGalleryItem({
        id: editId || undefined,
        type: itemType,
        title: title.trim(),
        description: description.trim(),
        category,
        location,
        displayOrder: Number(displayOrder) || 1,
        isPublished,
        imageUrl: itemType === 'image' ? finalImage : '',
        youtubeUrl: itemType === 'youtube' ? youtubeUrl : '',
        youtubeVideoId: itemType === 'youtube' ? youtubeVideoId || '' : '',
        thumbnailUrl: finalThumbnail,
      });

      setStatusMsg({
        type: 'success',
        text: isEditing ? 'Gallery item updated successfully!' : 'New gallery item published!',
      });

      resetForm();
      await loadGalleryItems();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to save gallery item.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string, itemTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${itemTitle}"?`)) return;

    try {
      await deleteGalleryItem(id);
      setStatusMsg({ type: 'success', text: `Deleted "${itemTitle}".` });
      await loadGalleryItems();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: 'Failed to delete gallery item.' });
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await toggleGalleryItemPublished(id, !currentStatus);
      await loadGalleryItems();
    } catch (err) {
      console.error('Toggle publish failed:', err);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2B1B] via-[#0D3B24] to-[#04120B] p-6 sm:p-8 rounded-3xl border border-[#1E5E3A]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Asset CMS</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
            Gallery & Media Asset Manager
          </h2>
          <p className="text-emerald-200/80 text-xs sm:text-sm mt-1 max-w-xl">
            Publish high-res farm photos and YouTube video tours directly to the Napoleon Steadings public website.
          </p>
        </div>

        <button
          onClick={resetForm}
          className="px-5 py-3 rounded-2xl bg-[#A3E635] hover:bg-[#b8f747] text-[#0B2B1B] font-bold text-xs shadow-lg shadow-[#A3E635]/20 transition-all flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Gallery Item</span>
        </button>
      </div>

      {/* Notifications */}
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium animate-in fade-in ${
            statusMsg.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/80 border-rose-500/40 text-rose-200'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#A3E635] shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* ADD / EDIT FORM CARD */}
      <div className="bg-[#0B2B1B]/80 backdrop-blur-md border border-[#1E5E3A]/40 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1E5E3A]/40 pb-4 mb-6">
          <h3 className="font-editorial text-xl font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-5 h-5 text-[#A3E635]" /> : <Plus className="w-5 h-5 text-[#A3E635]" />}
            <span>{isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}</span>
          </h3>

          {isEditing && (
            <button
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
            >
              <X className="w-4 h-4" />
              <span>Cancel Edit</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSaveItem} className="space-y-6">
          {/* STEP 1: ITEM TYPE SELECTION */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
              Item Type
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setItemType('image')}
                className={`py-3 px-4 rounded-2xl font-bold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  itemType === 'image'
                    ? 'bg-[#1E5E3A] text-[#A3E635] border-[#A3E635] shadow-inner scale-102'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Image Gallery Item</span>
              </button>

              <button
                type="button"
                onClick={() => setItemType('youtube')}
                className={`py-3 px-4 rounded-2xl font-bold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  itemType === 'youtube'
                    ? 'bg-[#1E5E3A] text-[#A3E635] border-[#A3E635] shadow-inner scale-102'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube Video Item</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC MEDIA INPUTS */}
          {itemType === 'image' ? (
            <div className="space-y-4 bg-black/30 p-5 rounded-2xl border border-white/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300">
                Upload Image
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] font-bold text-xs border border-[#A3E635]/30 cursor-pointer transition-all flex items-center justify-center gap-2 shrink-0">
                  {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>

                <div className="flex-1 w-full">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="Or paste external image URL (https://...)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#A3E635]"
                  />
                </div>
              </div>

              {uploadError && <p className="text-xs text-rose-400 font-medium">{uploadError}</p>}

              {/* IMAGE PREVIEW BOX */}
              {(imagePreview || imageUrl) && (
                <div className="mt-3 relative rounded-2xl overflow-hidden bg-black/60 border border-white/20 aspect-video max-w-sm">
                  <img
                    src={imagePreview || imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/80 text-[10px] font-bold text-[#A3E635] uppercase border border-[#A3E635]/40">
                    Image Preview
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 bg-black/30 p-5 rounded-2xl border border-white/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300">
                YouTube Video URL
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                  placeholder="Paste YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#A3E635]"
                  required
                />
                {youtubeVideoId && (
                  <button
                    type="button"
                    onClick={() => fetchYoutubeMetadata(youtubeVideoId)}
                    disabled={fetchingYoutubeInfo}
                    className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] font-bold text-xs border border-[#A3E635]/30 cursor-pointer transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                  >
                    {fetchingYoutubeInfo ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{fetchingYoutubeInfo ? 'Fetching...' : 'Auto-Fill Info'}</span>
                  </button>
                )}
              </div>

              {youtubeVideoId && (
                <div className="space-y-3">
                  <p className="text-xs text-emerald-300 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                    <span>YouTube Video ID Detected: <strong className="text-white font-mono">{youtubeVideoId}</strong></span>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Thumbnail Preview */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-black aspect-video">
                      <img
                        src={getYouTubeThumbnailUrl(youtubeVideoId)}
                        alt="YouTube Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white uppercase">
                        Auto Thumbnail
                      </span>
                    </div>

                    {/* Embedded Player Test */}
                    <div className="rounded-2xl overflow-hidden border border-white/20 bg-black aspect-video">
                      <iframe
                        title="YouTube Preview"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* METADATA FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                Item Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern Maize Harvest at Adaklu"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#A3E635]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#04120B] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#A3E635]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
              Description / Caption
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description showcasing farm operations, machinery specs, or Volta Region location..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#A3E635]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ho Central, Volta Region"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#A3E635]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#A3E635]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                Publish Status
              </label>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isPublished ? 'bg-[#A3E635]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                      isPublished ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs font-semibold text-white">
                  {isPublished ? 'Published (Visible)' : 'Draft (Hidden)'}
                </span>
              </div>
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            {/* Preview Button */}
            <button
              type="button"
              onClick={() => {
                const finalImg = imageUrl || imagePreview || '';
                const finalThumb =
                  itemType === 'youtube' && youtubeVideoId
                    ? getYouTubeThumbnailUrl(youtubeVideoId)
                    : finalImg;
                setPreviewItem({
                  id: 'preview',
                  type: itemType,
                  title: title || 'Preview Title',
                  description: description || 'Preview Description...',
                  category,
                  location,
                  displayOrder,
                  isPublished,
                  imageUrl: itemType === 'image' ? finalImg : '',
                  youtubeUrl: itemType === 'youtube' ? youtubeUrl : '',
                  youtubeVideoId: itemType === 'youtube' ? youtubeVideoId || '' : '',
                  thumbnailUrl: finalThumb,
                  createdAt: new Date().toISOString(),
                });
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#A3E635]" />
              <span>Preview Item</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287A4B] text-[#A3E635] font-bold text-xs border border-[#A3E635]/40 transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{isEditing ? 'Update Item' : 'Publish Gallery Item'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* EXISTING ITEMS TABLE / GRID */}
      <div className="bg-[#0B2B1B]/80 backdrop-blur-md border border-[#1E5E3A]/40 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E5E3A]/40 pb-4">
          <div>
            <h3 className="font-editorial text-xl font-bold text-white">
              Published Gallery Inventory ({filteredItems.length})
            </h3>
            <p className="text-xs text-emerald-200/70 mt-0.5">
              Manage existing photos and videos. Toggle visibility or edit details.
            </p>
          </div>

          {/* FILTER & SEARCH CONTROLS */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterType === 'all' ? 'bg-[#1E5E3A] text-[#A3E635]' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('image')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterType === 'image' ? 'bg-[#1E5E3A] text-[#A3E635]' : 'text-slate-400 hover:text-white'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setFilterType('youtube')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterType === 'youtube' ? 'bg-[#1E5E3A] text-[#A3E635]' : 'text-slate-400 hover:text-white'
                }`}
              >
                YouTube
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gallery..."
                className="pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#A3E635] w-36 sm:w-48"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-emerald-300/70 flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#A3E635]" />
            <span className="text-xs font-medium">Loading Gallery Records...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-12 text-center text-slate-400 bg-black/20 rounded-2xl border border-white/5 p-6">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-white">No gallery items found.</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting search filters or add a new item above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-bold text-emerald-300 border-b border-white/10 bg-black/40">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Media</th>
                  <th className="py-3 px-4">Title & Details</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.type === 'youtube' && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-4 h-4 text-red-500 fill-current" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Details */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-bold text-white text-xs truncate">{item.title}</p>
                      <p className="text-[10px] text-emerald-200/70 truncate mt-0.5">{item.description}</p>
                      {item.location && (
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.location}</p>
                      )}
                    </td>

                    {/* Type */}
                    <td className="py-3 px-4">
                      {item.type === 'youtube' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-500/30 text-[10px] font-bold">
                          <Youtube className="w-3 h-3 text-red-400" />
                          <span>YouTube</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                          <ImageIcon className="w-3 h-3 text-[#A3E635]" />
                          <span>Image</span>
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300">
                        {item.category}
                      </span>
                    </td>

                    {/* Order */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-300">
                      #{item.displayOrder}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(item.id, item.isPublished)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                          item.isPublished
                            ? 'bg-[#1E5E3A] text-[#A3E635] border-[#A3E635]/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {item.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{item.isPublished ? 'Published' : 'Hidden'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEditInit(item)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id, item.title)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer border border-rose-500/30"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B2B1B] border border-[#1E5E3A] text-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3E635] flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>Public Card Preview</span>
              </span>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video relative">
              {previewItem.type === 'youtube' && previewItem.youtubeVideoId ? (
                <iframe
                  title="YouTube Preview Modal"
                  src={`https://www.youtube.com/embed/${previewItem.youtubeVideoId}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <img
                  src={previewItem.thumbnailUrl || previewItem.imageUrl}
                  alt={previewItem.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">
                {previewItem.category} • {previewItem.location}
              </span>
              <h3 className="font-editorial text-lg font-bold text-white mt-0.5">
                {previewItem.title}
              </h3>
              <p className="text-xs text-emerald-200/80 mt-1">{previewItem.description}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 rounded-xl bg-[#1E5E3A] text-[#A3E635] font-bold text-xs border border-[#A3E635]/40"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
