import React, { useState, useRef } from 'react';
import { uploadToInsForgeStorage } from '../../lib/insforge';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Image as ImageIcon, 
  Code, 
  Eye, 
  Edit3, 
  Sparkles, 
  UploadCloud, 
  Tag, 
  CheckCircle, 
  Save, 
  Send
} from 'lucide-react';

interface RichBlogEditorProps {
  initialTitle?: string;
  initialSummary?: string;
  initialContent?: string;
  initialCategory?: string;
  initialCoverImage?: string;
  initialTags?: string[];
  initialIsPublished?: boolean;
  onSave: (data: {
    title: string;
    summary: string;
    content: string;
    category: string;
    coverImage: string;
    tags: string[];
    isPublished: boolean;
    readTime: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  onCancel?: () => void;
}

const CATEGORIES = [
  'Agricultural Innovation',
  'Commercial Grain',
  'Livestock & Processing',
  'Horticulture & Export',
  'Outgrower Schemes',
  'Agro-Tech & Mechanization',
  'Sustainability & Climate'
];

export const RichBlogEditor: React.FC<RichBlogEditorProps> = ({
  initialTitle = '',
  initialSummary = '',
  initialContent = '',
  initialCategory = 'Agricultural Innovation',
  initialCoverImage = '',
  initialTags = ['GhanaAgri', 'VoltaRegion', 'Innovation'],
  initialIsPublished = true,
  onSave,
  isSubmitting,
  onCancel
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [summary, setSummary] = useState(initialSummary);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialTags);
  const [isPublished, setIsPublished] = useState(initialIsPublished);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingInline, setIsUploadingInline] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);

  const tagsJoined = (initialTags || []).join(',');
  React.useEffect(() => {
    setTitle(initialTitle);
    setSummary(initialSummary);
    setContent(initialContent);
    setCategory(initialCategory || 'Agricultural Innovation');
    setCoverImage(initialCoverImage || '');
    setTags(initialTags && initialTags.length > 0 ? initialTags : ['GhanaAgri', 'VoltaRegion', 'Innovation']);
    setIsPublished(initialIsPublished ?? true);
  }, [initialTitle, initialSummary, initialContent, initialCategory, initialCoverImage, tagsJoined, initialIsPublished]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Formatting helpers
  const insertFormatting = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = `${prefix}${selectedText || 'Text'}${suffix}`;

    const newContent = 
      textarea.value.substring(0, start) + 
      replacement + 
      textarea.value.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const cleanTag = tagInput.trim().replace(/^#/, '');
    if (!tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const calculateReadTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    await onSave({
      title,
      summary: summary.trim() || title,
      content,
      category,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
      tags,
      isPublished,
      readTime: calculateReadTime(content)
    });
  };

  // Convert simple markdown/HTML formatting for live preview
  const formatPreviewHtml = (raw: string) => {
    let formatted = raw
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" />')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br />');

    return `<p>${formatted}</p>`;
  };

  return (
    <div className="w-full bg-[#071910] border border-[#1E5E3A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1E5E3A]/30 mb-8">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A3E635] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Napoleon Steadings Creator Studio
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
            Publish Agricultural Insight / Blog
          </h2>
        </div>

        {/* Action Toggle Write vs Preview */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-[#1E5E3A]/40">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'write' ? 'bg-[#1E5E3A] text-[#A3E635]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              activeTab === 'preview' ? 'bg-[#1E5E3A] text-[#A3E635]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {editorError && (
          <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center justify-between">
            <span>{editorError}</span>
            <button type="button" onClick={() => setEditorError(null)} className="text-white hover:text-red-300 font-bold ml-2">✕</button>
          </div>
        )}

        {activeTab === 'write' ? (
          <>
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block">
                  Article Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern Drip Irrigation Scaling Across Volta Commercial Farms"
                  className="w-full px-5 py-3.5 rounded-2xl bg-black/50 border border-[#1E5E3A] text-white font-editorial text-lg placeholder-slate-500 focus:outline-none focus:border-[#A3E635]"
                />
              </div>

              <div className="lg:col-span-4 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl bg-[#0B2518] border border-[#1E5E3A] text-white text-xs font-bold focus:outline-none focus:border-[#A3E635]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary / Subtitle */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block">
                Short Summary / Lead Abstract
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A brief 1-2 sentence lead paragraph introducing the key takeaways..."
                className="w-full px-5 py-3 rounded-xl bg-black/50 border border-[#1E5E3A] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#A3E635]"
              />
            </div>

            {/* Cover Image Direct Uploader */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block">
                Article Cover Image Banner
              </label>

              {coverImage ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#1E5E3A] bg-black/60 h-48 sm:h-64 w-full group">
                  <img src={coverImage} alt="Article Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex items-end justify-between">
                    <span className="text-xs font-bold text-white/90 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                      Cover Banner Uploaded
                    </span>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105">
                        <UploadCloud className="w-4 h-4" />
                        <span>{isUploadingCover ? 'Uploading...' : 'Change Cover File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingCover}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setIsUploadingCover(true);
                              const res = await uploadToInsForgeStorage(file);
                              setIsUploadingCover(false);
                              if (res.url) {
                                setCoverImage(res.url);
                                setEditorError(null);
                              } else {
                                setEditorError('Upload failed: ' + (res.error || 'Unknown error'));
                              }
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => setCoverImage('')}
                        className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 text-xs font-bold transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block rounded-2xl border-2 border-dashed border-[#1E5E3A] hover:border-[#A3E635] bg-black/30 hover:bg-black/50 p-8 text-center space-y-3 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-[#1E5E3A]/40 text-[#A3E635] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white group-hover:text-[#A3E635] transition-colors">
                      {isUploadingCover ? 'Uploading file to InsForge Storage...' : 'Click to select & upload cover banner image'}
                    </p>
                    <p className="text-[11px] text-emerald-200/60">Supports JPG, PNG, WEBP directly from device</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploadingCover}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setIsUploadingCover(true);
                        const res = await uploadToInsForgeStorage(file);
                        setIsUploadingCover(false);
                        if (res.url) {
                          setCoverImage(res.url);
                          setEditorError(null);
                        } else {
                          setEditorError('Upload failed: ' + (res.error || 'Unknown error'));
                        }
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Rich Editor Toolbar */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block">
                Article Content Editor *
              </label>

              <div className="p-2 rounded-2xl bg-[#0A2015] border border-[#1E5E3A] flex flex-wrap items-center gap-1.5 shadow-md">
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('# ')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Heading 1"
                >
                  <Heading1 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('## ')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('1. ')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> ')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Quote"
                >
                  <Quote className="w-4 h-4" />
                </button>

                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#1E5E3A] hover:bg-[#287547] text-[#A3E635] border border-[#A3E635]/30 transition-colors flex items-center gap-1.5 text-xs font-bold" title="Upload Image File directly to InsForge Storage">
                  <UploadCloud className="w-4 h-4 text-[#A3E635]" />
                  <span>{isUploadingInline ? 'Uploading Image...' : 'Insert Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploadingInline}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setIsUploadingInline(true);
                        const res = await uploadToInsForgeStorage(file);
                        setIsUploadingInline(false);
                        if (res.url) {
                          insertFormatting(`\n![${file.name.split('.')[0]}](${res.url})\n`);
                          setEditorError(null);
                        } else {
                          setEditorError('Upload failed: ' + (res.error || 'Unknown error'));
                        }
                      }
                    }}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => insertFormatting('`', '`')}
                  className="p-2 rounded-lg bg-black/30 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                  title="Code Snippet"
                >
                  <Code className="w-4 h-4" />
                </button>
              </div>

              <textarea
                ref={textareaRef}
                rows={12}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article in rich text or markdown format... Add headings (# or ##), quotes (>), lists, or images."
                className="w-full p-5 rounded-2xl bg-black/60 border border-[#1E5E3A] text-white text-sm font-mono placeholder-slate-500 focus:outline-none focus:border-[#A3E635] leading-relaxed"
              />
            </div>

            {/* Tags & Visibility Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              {/* Tags Input */}
              <div className="md:col-span-7 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Topic Tags</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="e.g. Maize, Irrigation, Sustainable"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-[#1E5E3A] text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#A3E635]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2.5 rounded-xl bg-[#1E5E3A] text-white text-xs font-bold hover:bg-[#287547]"
                  >
                    Add Tag
                  </button>
                </div>
                {/* Active Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-[#1E5E3A]/60 border border-[#A3E635]/30 text-[#A3E635] text-[11px] font-bold flex items-center gap-1.5"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-red-400 font-bold ml-1"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Publish / Draft Switch */}
              <div className="md:col-span-5 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-200/80 block">
                  Publishing Status
                </label>
                <div className="p-3 rounded-2xl bg-[#0B2518] border border-[#1E5E3A] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {isPublished ? 'Publicly Published' : 'Saved as Draft'}
                    </span>
                    <span className="text-[10px] text-emerald-200/70">
                      {isPublished ? 'Visible on Insights feed immediately' : 'Only visible in your dashboard'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPublished(!isPublished)}
                    className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                      isPublished ? 'bg-[#A3E635] justify-end' : 'bg-slate-700 justify-start'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${isPublished ? 'bg-[#0B2B1B]' : 'bg-slate-300'}`} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Live Article Preview */
          <div className="p-8 rounded-3xl bg-[#092215] border border-[#1E5E3A] space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="px-3 py-1 rounded-full bg-[#A3E635] text-[#0B2B1B] text-[11px] font-extrabold uppercase tracking-wider">
                {category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {calculateReadTime(content)} • Preview Mode
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white">
              {title || 'Untitled Article Headline'}
            </h1>

            {summary && (
              <p className="text-base text-emerald-100/90 font-light italic border-l-2 border-[#A3E635] pl-4 py-1">
                {summary}
              </p>
            )}

            {coverImage && (
              <div className="rounded-2xl overflow-hidden h-72 sm:h-96 w-full border border-[#A3E635]/20">
                <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div
              className="prose-custom pt-4"
              dangerouslySetInnerHTML={{ __html: formatPreviewHtml(content || 'Start typing in editor...') }}
            />

            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
              {tags.map((t) => (
                <span key={t} className="text-xs text-[#A3E635] font-semibold">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#1E5E3A]/30">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="px-8 py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] text-xs font-extrabold flex items-center gap-2 shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            {isPublished ? <Send className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSubmitting ? 'Saving Article...' : isPublished ? 'Publish Article Now' : 'Save Draft'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
