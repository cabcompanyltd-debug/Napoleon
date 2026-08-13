import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User, Heart, Share2, Sparkles, Clock, Globe, ShieldCheck, Copy, Check, MessageCircle, Send, Mail } from 'lucide-react';
import { NEWS_DATA } from '../data/companyData';
import { getPublishedBlogPosts, BlogPostData, incrementBlogPostLike } from '../lib/insforge';

interface Props {
  slug: string;
  onNavigate: (route: string) => void;
}

const cleanSummary = (text?: string): string => {
  if (!text) return '';
  if (text.toLowerCase().includes('testing upsert') || text.toLowerCase().includes('updated excerpt')) {
    return '';
  }
  return text.trim();
};

export const ArticleDetailPage: React.FC<Props> = ({ slug, onNavigate }) => {
  const [firestorePost, setFirestorePost] = useState<BlogPostData | null>(null);
  const [newsArticle, setNewsArticle] = useState<any>(null);
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);

      // Check InsForge published blog posts first
      try {
        const posts = await getPublishedBlogPosts();
        const found = posts.find(
          (p) =>
            p.slug === slug ||
            p.id === slug ||
            (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
        );
        if (found) {
          setFirestorePost(found);
          setLikes(found.likes || 0);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error finding article in InsForge:', err);
      }

      // Fallback to preset news data if not in InsForge database
      const local = NEWS_DATA.find(
        (n) =>
          n.slug === slug ||
          n.id === slug ||
          (n.title && n.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
      );
      if (local) {
        setNewsArticle(local);
      } else {
        setNewsArticle(NEWS_DATA[0]);
      }
      setIsLoading(false);
    };

    loadArticle();
  }, [slug]);

  const isUserPost = !!firestorePost;
  const title = isUserPost ? firestorePost?.title : newsArticle?.title;
  const category = isUserPost ? firestorePost?.category : newsArticle?.category;
  const date = isUserPost 
    ? (firestorePost?.date || (firestorePost?.publishedAt ? (isNaN(Date.parse(firestorePost.publishedAt)) ? firestorePost.publishedAt : new Date(firestorePost.publishedAt).toLocaleDateString()) : 'Recent')) 
    : newsArticle?.date;
  const readTime = isUserPost ? firestorePost?.readTime : newsArticle?.readTime;
  const coverImage = isUserPost ? firestorePost?.coverImage : newsArticle?.image;
  const authorName = isUserPost ? firestorePost?.authorName : newsArticle?.author;
  const authorRole = isUserPost ? 'Verified Community Author' : newsArticle?.authorRole;
  const authorPhoto = isUserPost ? firestorePost?.authorPhoto : null;
  const rawSummary = isUserPost ? firestorePost?.summary : newsArticle?.summary;
  const summary = cleanSummary(rawSummary);

  const cleanShareUrl = `${window.location.origin}/insights/${slug}`;

  // Update document title and Open Graph social card meta tags dynamically
  useEffect(() => {
    if (isLoading || !title) return;

    document.title = `${title} | Napoleon Steadings Ltd.`;

    const metaSummary = summary || `${title} — Agricultural Insights by Napoleon Steadings Ltd., Volta Region, Ghana.`;
    const metaCover = coverImage || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80';

    const setOrUpdateMeta = (attr: 'name' | 'property', nameVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attr}="${nameVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    setOrUpdateMeta('name', 'description', metaSummary);
    setOrUpdateMeta('property', 'og:title', title);
    setOrUpdateMeta('property', 'og:description', metaSummary);
    setOrUpdateMeta('property', 'og:image', metaCover);
    setOrUpdateMeta('property', 'og:url', cleanShareUrl);
    setOrUpdateMeta('property', 'og:type', 'article');
    setOrUpdateMeta('name', 'twitter:card', 'summary_large_image');
    setOrUpdateMeta('name', 'twitter:title', title);
    setOrUpdateMeta('name', 'twitter:description', metaSummary);
    setOrUpdateMeta('name', 'twitter:image', metaCover);
  }, [isLoading, title, summary, coverImage, cleanShareUrl]);

  const handleLike = async () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikes(likes + 1);
    if (firestorePost?.id) {
      await incrementBlogPostLike(firestorePost.id);
    }
  };

  const handleShare = async () => {
    const shareTitle = title || 'Napoleon Steadings Insights';
    const shareText = summary ? `${shareTitle} — ${summary}` : shareTitle;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: cleanShareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(cleanShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Format content for user posts vs preset news
  const formatContentHtml = (raw: string) => {
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
    <div className="w-full pt-20 bg-[#071910] text-white min-h-screen">
      {/* Article Header Banner */}
      <section className="bg-slanted-dual py-16 border-b border-[#1E5E3A]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <button
            onClick={() => onNavigate('/insights')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3E635] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights & Articles</span>
          </button>

          <div className="flex items-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-full bg-[#A3E635] text-[#0B2B1B] text-[10px] font-extrabold uppercase tracking-widest">
              {category}
            </span>
            <span className="text-xs font-mono text-emerald-200/80">
              {date} • {readTime}
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>

          {summary && (
            <p className="text-base text-emerald-100/90 font-light italic border-l-2 border-[#A3E635] pl-4 py-1">
              {summary}
            </p>
          )}

          {/* Author Badge */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              {authorPhoto ? (
                <img src={authorPhoto} alt={authorName} className="w-10 h-10 rounded-full object-cover border-2 border-[#A3E635]" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#1E5E3A] border-2 border-[#A3E635] flex items-center justify-center text-[#A3E635] font-bold">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="font-bold text-sm text-white block">{authorName}</span>
                <span className="text-[10px] uppercase font-mono text-[#A3E635]">{authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isUserPost && (
                <button
                  onClick={handleLike}
                  disabled={hasLiked}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                    hasLiked
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : 'bg-black/40 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] border-white/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-red-400 text-red-400' : ''}`} />
                  <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
                </button>
              )}

              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border bg-[#1E5E3A] hover:bg-[#287547] text-[#A3E635] border-[#A3E635]/30 transition-all shadow-md active:scale-95"
                title="Share this independent blog URL"
              >
                <Share2 className="w-4 h-4 text-[#A3E635]" />
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-[#071910]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {coverImage && (
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#A3E635]/30 w-full h-72 sm:h-96 md:h-[420px]">
              <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            </div>
          )}

          {isUserPost ? (
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: formatContentHtml(firestorePost.content) }}
            />
          ) : (
            <div className="space-y-6 text-slate-200 leading-relaxed text-base sm:text-lg">
              {newsArticle?.content?.map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* Tags */}
          {isUserPost && firestorePost?.tags && firestorePost.tags.length > 0 && (
            <div className="pt-8 border-t border-white/10 flex flex-wrap gap-2">
              {firestorePost.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-[#1E5E3A]/50 border border-[#A3E635]/30 text-[#A3E635] text-xs font-semibold">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Dedicated Social Share Bar */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B2B1B] via-[#1E5E3A]/60 to-[#0B2B1B] border border-[#A3E635]/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#A3E635]" />
                  <span>Share This Article</span>
                </h4>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  Spread organic agriculture insights across social platforms with clean links and cover previews.
                </p>
              </div>

              <button
                onClick={copyToClipboard}
                className="px-3.5 py-2 rounded-xl bg-black/50 hover:bg-[#1E5E3A] border border-[#A3E635]/40 text-[#A3E635] text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#A3E635]" />}
                <span>{copied ? 'Copied Clean Link' : 'Copy Link'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-white/10">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title || ''}\n${cleanShareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title || '')}&url=${encodeURIComponent(cleanShareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cleanShareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cleanShareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(title || '')}&body=${encodeURIComponent(`${title || ''}\n\nRead article: ${cleanShareUrl}`)}`}
                className="px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
