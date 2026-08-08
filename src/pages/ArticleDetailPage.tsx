import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User, Heart, Share2, Sparkles, Clock, Globe, ShieldCheck } from 'lucide-react';
import { NEWS_DATA } from '../data/companyData';
import { getPublishedBlogPosts, BlogPostData, incrementBlogPostLike } from '../lib/firebase';

interface Props {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ArticleDetailPage: React.FC<Props> = ({ slug, onNavigate }) => {
  const [firestorePost, setFirestorePost] = useState<BlogPostData | null>(null);
  const [newsArticle, setNewsArticle] = useState<any>(null);
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      // Check preset news data first
      const local = NEWS_DATA.find((n) => n.slug === slug);
      if (local) {
        setNewsArticle(local);
        setIsLoading(false);
        return;
      }

      // Check Firestore published blog posts
      try {
        const posts = await getPublishedBlogPosts();
        const found = posts.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setFirestorePost(found);
          setLikes(found.likesCount || 0);
        } else {
          // Fallback to first article if missing
          setNewsArticle(NEWS_DATA[0]);
        }
      } catch (err) {
        console.error('Error finding article:', err);
        setNewsArticle(NEWS_DATA[0]);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikes(likes + 1);
    if (firestorePost?.id) {
      await incrementBlogPostLike(firestorePost.id);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full pt-32 pb-24 bg-[#071910] text-white text-center font-mono text-xs min-h-screen">
        Loading Insight Article...
      </div>
    );
  }

  const isUserPost = !!firestorePost;
  const title = isUserPost ? firestorePost.title : newsArticle?.title;
  const category = isUserPost ? firestorePost.category : newsArticle?.category;
  const date = isUserPost ? new Date(firestorePost.publishedAt).toLocaleDateString() : newsArticle?.date;
  const readTime = isUserPost ? firestorePost.readTime : newsArticle?.readTime;
  const coverImage = isUserPost ? firestorePost.coverImage : newsArticle?.image;
  const authorName = isUserPost ? firestorePost.authorName : newsArticle?.author;
  const authorRole = isUserPost ? 'Verified Community Author' : newsArticle?.authorRole;
  const authorPhoto = isUserPost ? firestorePost.authorPhoto : null;
  const summary = isUserPost ? firestorePost.summary : newsArticle?.summary;

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
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-[#071910]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {coverImage && (
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#A3E635]/30">
              <img src={coverImage} alt={title} className="w-full h-auto object-cover" />
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
          {isUserPost && firestorePost.tags && firestorePost.tags.length > 0 && (
            <div className="pt-8 border-t border-white/10 flex flex-wrap gap-2">
              {firestorePost.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-[#1E5E3A]/50 border border-[#A3E635]/30 text-[#A3E635] text-xs font-semibold">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
