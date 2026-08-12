import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, User, Heart, Sparkles, PlusCircle, Globe, ShieldCheck } from 'lucide-react';
import { NEWS_DATA } from '../data/companyData';
import { Reveal } from '../components/animations/Reveal';
import { getPublishedBlogPosts, BlogPostData } from '../lib/insforge';

interface Props {
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
  currentUser: any;
}

export const InsightsPage: React.FC<Props> = ({ onNavigate, onOpenAuth, currentUser }) => {
  const [firestorePosts, setFirestorePosts] = useState<BlogPostData[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'corporate' | 'community'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPublishedBlogPosts();
        setFirestorePosts(posts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full pt-20 bg-[#071910] text-white min-h-screen">
      {/* Header Banner with Slanted Meeting Background */}
      <section className="bg-slanted-dual text-white py-24 relative overflow-hidden border-b border-[#1E5E3A]/40">
        <div className="absolute inset-0 bg-mesh-emerald opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#A3E635] bg-[#1E5E3A]/60 px-3 py-1 rounded-full border border-[#A3E635]/30 inline-block mb-3">
              Knowledge & Research Desk
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white leading-tight">
              Agricultural Insights & Press
            </h1>
            <p className="mt-4 text-emerald-100/90 text-base sm:text-lg font-light leading-relaxed">
              Explore agronomic research, market analyses, corporate announcements, and community-contributed insights driving commercial agriculture across West Africa.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#092215]/80 border border-[#A3E635]/30 shadow-2xl backdrop-blur-md max-w-sm w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#1E5E3A] text-[#A3E635]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Have an Agricultural Insight?</h4>
                <p className="text-[11px] text-emerald-200/80">Publish articles & research directly on our platform.</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (currentUser) {
                  onNavigate('/dashboard');
                } else {
                  onOpenAuth();
                }
              }}
              className="w-full py-3 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{currentUser ? 'Go to Creator Dashboard' : 'Sign In to Publish Blog'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Insights Feed */}
      <section className="py-16 bg-[#071910]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Feed Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E5E3A]/30 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#A3E635] text-[#0B2B1B] shadow-md'
                    : 'bg-black/30 text-white hover:bg-white/10'
                }`}
              >
                All Articles ({NEWS_DATA.length + firestorePosts.length})
              </button>

              <button
                onClick={() => setActiveTab('community')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'community'
                    ? 'bg-[#A3E635] text-[#0B2B1B] shadow-md'
                    : 'bg-black/30 text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>User Published ({firestorePosts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('corporate')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'corporate'
                    ? 'bg-[#A3E635] text-[#0B2B1B] shadow-md'
                    : 'bg-black/30 text-white hover:bg-white/10'
                }`}
              >
                Corporate Press ({NEWS_DATA.length})
              </button>
            </div>
          </div>

          {/* User Published Community Posts Section */}
          {(activeTab === 'all' || activeTab === 'community') && firestorePosts.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-2xl font-bold text-[#A3E635] flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#A3E635]" />
                  <span>Community & Author Contributions</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Live Firestore Feed</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {firestorePosts.map((post) => (
                  <Reveal key={post.id || post.slug} variant="fadeUp">
                    <div className="group rounded-3xl overflow-hidden bg-[#0B2518] border border-[#1E5E3A]/40 shadow-xl flex flex-col h-full hover:border-[#A3E635]/60 hover:-translate-y-1.5 transition-all">
                      {post.coverImage && (
                        <div className="relative aspect-16/10 overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 bg-[#A3E635] text-[#0B2B1B] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                            {post.category}
                          </div>
                        </div>
                      )}

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-200/70 mb-2">
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h3 className="font-editorial text-xl font-bold text-white group-hover:text-[#A3E635] transition-colors leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-xs text-emerald-100/70 line-clamp-3 mt-2 leading-relaxed">
                            {post.summary}
                          </p>

                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {post.tags.slice(0, 4).map((t) => (
                                <span key={t} className="text-[10px] font-mono font-semibold text-[#A3E635] bg-[#1E5E3A]/50 border border-[#A3E635]/20 px-2 py-0.5 rounded-full">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {post.authorPhoto ? (
                              <img src={post.authorPhoto} alt={post.authorName} className="w-6 h-6 rounded-full object-cover border border-[#A3E635]" />
                            ) : (
                              <User className="w-4 h-4 text-[#A3E635]" />
                            )}
                            <span className="text-xs text-slate-300 font-semibold line-clamp-1">{post.authorName}</span>
                          </div>

                          <button
                            onClick={() => onNavigate(`/insights/${post.slug}`)}
                            className="text-xs font-bold text-[#A3E635] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Read Insight</span> &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* Corporate Press Section */}
          {(activeTab === 'all' || activeTab === 'corporate') && (
            <div className="space-y-6 pt-6">
              <h3 className="font-editorial text-2xl font-bold text-white">
                Official Corporate Releases & Research
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {NEWS_DATA.map((article) => (
                  <Reveal key={article.id} variant="fadeUp">
                    <div className="group rounded-3xl overflow-hidden bg-[#0B2518] border border-[#1E5E3A]/40 shadow-xl flex flex-col h-full hover:border-[#A3E635]/60 hover:-translate-y-1.5 transition-all">
                      <div className="relative aspect-16/10 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-[#0B2B1B] text-[#A3E635] border border-[#A3E635]/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {article.category}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-[11px] font-mono text-emerald-200/70 block mb-2">{article.date} • {article.readTime}</span>
                          <h3 className="font-editorial text-xl font-bold text-white group-hover:text-[#A3E635] transition-colors leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-xs text-emerald-100/70 line-clamp-3 mt-2 leading-relaxed">
                            {article.summary}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-semibold">{article.author}</span>
                          <button
                            onClick={() => onNavigate(`/insights/${article.slug}`)}
                            className="text-xs font-bold text-[#A3E635] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Read Press</span> &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
