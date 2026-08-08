import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { 
  PlusCircle, 
  FileText, 
  TrendingUp, 
  Heart, 
  Trash2, 
  Edit, 
  Globe, 
  Lock, 
  CheckCircle, 
  Sparkles, 
  LogOut, 
  ShieldCheck, 
  ArrowLeft, 
  Clock, 
  Eye,
  Layers,
  Inbox,
  Mail,
  Phone,
  User,
  ShieldAlert,
  MessageSquare,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { 
  BlogPostData, 
  getUserBlogPosts, 
  getPublishedBlogPosts,
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  logoutUser,
  getContactInquiries,
  updateContactInquiryStatus,
  getUserRole,
  saveUserProfileWithRole
} from '../lib/firebase';
import { RichBlogEditor } from '../components/dashboard/RichBlogEditor';

interface DashboardPageProps {
  currentUser: FirebaseUser | null;
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  onNavigate,
  onOpenAuth
}) => {
  const [activeTab, setActiveTab] = useState<'my_posts' | 'all_posts' | 'inquiries' | 'create'>('my_posts');
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');
  const [userPosts, setUserPosts] = useState<BlogPostData[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPostData[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch posts and role for logged in user
  const loadDashboardData = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const role = await getUserRole(currentUser.uid);
      setUserRole(role);

      const posts = await getUserBlogPosts(currentUser.uid);
      setUserPosts(posts);

      if (role === 'admin') {
        const pub = await getPublishedBlogPosts();
        setAllPosts(pub);
        const inq = await getContactInquiries();
        setInquiries(inq);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadDashboardData();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="w-full pt-32 pb-24 min-h-[80vh] flex items-center justify-center bg-[#07110C] text-white px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0B2518] border border-[#1E5E3A] text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center mx-auto border border-[#A3E635]/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="font-editorial text-3xl font-bold text-white">
            Publisher & Admin Portal
          </h2>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            Please sign in with your Google Account to access the Napoleon Steadings blog publisher and executive desk.
          </p>
          <button
            onClick={onOpenAuth}
            className="w-full py-4 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-sm shadow-xl transition-all"
          >
            Sign In with Google Account
          </button>
        </div>
      </div>
    );
  }

  const handleRoleToggle = async (newRole: 'admin' | 'user') => {
    setIsLoading(true);
    try {
      await saveUserProfileWithRole(currentUser, newRole);
      setUserRole(newRole);
      if (newRole === 'admin') {
        const inq = await getContactInquiries();
        setInquiries(inq);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdatePost = async (data: {
    title: string;
    summary: string;
    content: string;
    category: string;
    coverImage: string;
    tags: string[];
    isPublished: boolean;
    readTime: string;
  }) => {
    setIsSubmitting(true);
    try {
      // Create slug from title
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

      if (editingPost && editingPost.id) {
        await updateBlogPost(editingPost.id, {
          ...data,
          slug: editingPost.slug || slug
        });
        setSuccessMessage('Article updated successfully!');
      } else {
        await createBlogPost({
          ...data,
          slug,
          authorName: currentUser.displayName || 'Napoleon Steadings Contributor',
          authorEmail: currentUser.email || 'author@napoleonsteadings.com',
          authorUid: currentUser.uid,
          authorPhoto: currentUser.photoURL || '',
          publishedAt: new Date().toISOString()
        });
        setSuccessMessage('Article published successfully!');
      }

      await loadDashboardData();
      setEditingPost(null);
      setActiveTab('my_posts');

      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error saving blog post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteBlogPost(postId);
      setUserPosts(userPosts.filter((p) => p.id !== postId));
      setAllPosts(allPosts.filter((p) => p.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleTogglePublish = async (post: BlogPostData) => {
    if (!post.id) return;
    try {
      await updateBlogPost(post.id, { isPublished: !post.isPublished });
      setUserPosts(
        userPosts.map((p) => (p.id === post.id ? { ...p, isPublished: !p.isPublished } : p))
      );
    } catch (err) {
      console.error('Error toggling publish status:', err);
    }
  };

  const handleInquiryStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateContactInquiryStatus(id, newStatus);
      setInquiries(
        inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const totalLikes = userPosts.reduce((acc, curr) => acc + (curr.likesCount || 0), 0);
  const totalPublished = userPosts.filter((p) => p.isPublished).length;

  return (
    <div className="w-full pt-24 pb-24 bg-[#070E0A] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* User / Admin Header Profile Card */}
        <div className="p-8 rounded-3xl bg-slanted-dual border border-[#1E5E3A]/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'User'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#A3E635] shadow-xl"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1E5E3A] border-2 border-[#A3E635] flex items-center justify-center text-[#A3E635] font-bold text-2xl">
                {currentUser.displayName?.charAt(0) || 'A'}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A3E635] bg-[#1E5E3A]/70 px-3 py-0.5 rounded-full border border-[#A3E635]/40 inline-flex items-center gap-1">
                  {userRole === 'admin' ? <ShieldAlert className="w-3 h-3 text-amber-300" /> : <ShieldCheck className="w-3 h-3" />}
                  <span>{userRole === 'admin' ? 'Executive Admin Desk' : 'Verified Author Desk'}</span>
                </span>
              </div>
              <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                {currentUser.displayName || 'Napoleon Contributor'}
              </h1>
              <p className="text-xs text-emerald-200/80 font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>

          {/* Role Toggle Switch & Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative z-10">
            <div className="p-1 rounded-2xl bg-black/60 border border-[#1E5E3A] flex items-center gap-1">
              <button
                onClick={() => handleRoleToggle('user')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  userRole === 'user'
                    ? 'bg-[#1E5E3A] text-[#A3E635]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Author View
              </button>
              <button
                onClick={() => handleRoleToggle('admin')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  userRole === 'admin'
                    ? 'bg-[#A3E635] text-[#0B2B1B]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin Desk
              </button>
            </div>

            <button
              onClick={() => loadDashboardData()}
              className="p-3 rounded-2xl bg-black/40 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] border border-white/10 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => logoutUser()}
              className="p-3 rounded-2xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-[#1E5E3A] border border-[#A3E635] text-[#A3E635] text-sm font-bold flex items-center gap-3 shadow-lg">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E5E3A]/30 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setEditingPost(null);
                setActiveTab('my_posts');
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'my_posts' && !editingPost
                  ? 'bg-[#A3E635] text-[#0B2B1B] shadow-lg'
                  : 'bg-black/40 text-white hover:bg-white/10'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>My Published Articles ({userPosts.length})</span>
            </button>

            <button
              onClick={() => {
                setEditingPost(null);
                setActiveTab('create');
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'create' || editingPost
                  ? 'bg-[#A3E635] text-[#0B2B1B] shadow-lg'
                  : 'bg-black/40 text-white hover:bg-white/10'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{editingPost ? 'Editing Article' : 'Write & Publish Blog'}</span>
            </button>

            {userRole === 'admin' && (
              <button
                onClick={() => {
                  setEditingPost(null);
                  setActiveTab('inquiries');
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'inquiries'
                    ? 'bg-[#A3E635] text-[#0B2B1B] shadow-lg'
                    : 'bg-black/40 text-white hover:bg-white/10'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Contact Inquiries ({inquiries.length})</span>
              </button>
            )}
          </div>

          <button
            onClick={() => onNavigate('/insights')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/10"
          >
            <Globe className="w-4 h-4 text-[#A3E635]" />
            <span>Public Website Blog Page</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' || editingPost ? (
          <RichBlogEditor
            initialTitle={editingPost?.title || ''}
            initialSummary={editingPost?.summary || ''}
            initialContent={editingPost?.content || ''}
            initialCategory={editingPost?.category || 'Agricultural Innovation'}
            initialCoverImage={editingPost?.coverImage}
            initialTags={editingPost?.tags || ['GhanaAgri', 'VoltaRegion']}
            initialIsPublished={editingPost?.isPublished ?? true}
            onSave={handleCreateOrUpdatePost}
            isSubmitting={isSubmitting}
            onCancel={() => {
              setEditingPost(null);
              setActiveTab('my_posts');
            }}
          />
        ) : activeTab === 'inquiries' && userRole === 'admin' ? (
          /* Admin Contact Inquiries Panel */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-white">
                  Headquarters Direct Inquiries
                </h3>
                <p className="text-xs text-emerald-200/70 mt-1">
                  Messages submitted by clients, commercial partners & growers via the Contact Page.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#1E5E3A] text-[#A3E635] text-xs font-bold">
                {inquiries.filter((i) => i.status === 'new').length} New Unread Messages
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#081F13] border border-[#1E5E3A]/40 text-center space-y-3">
                <Inbox className="w-12 h-12 text-[#A3E635] mx-auto opacity-70" />
                <h4 className="font-editorial text-xl font-bold text-white">No Inquiries Logged Yet</h4>
                <p className="text-xs text-emerald-200/70">When users submit messages on the Contact Page, they will appear here in real-time.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-6 rounded-3xl border transition-all ${
                      inq.status === 'new'
                        ? 'bg-[#0A291A] border-[#A3E635]/60 shadow-xl'
                        : 'bg-[#081910] border-[#1E5E3A]/40 opacity-80'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-base text-white">{inq.fullName}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#1E5E3A] text-[#A3E635] text-[10px] font-extrabold uppercase">
                            {inq.inquiryType}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-emerald-200/80">
                          <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#A3E635]" /> {inq.email}</span>
                          {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#A3E635]" /> {inq.phone}</span>}
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(inq.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleInquiryStatusChange(inq.id, inq.status === 'replied' ? 'new' : 'replied')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                            inq.status === 'replied'
                              ? 'bg-[#A3E635] text-[#0B2B1B] border-[#A3E635]'
                              : 'bg-black/40 text-emerald-300 border-[#1E5E3A] hover:bg-[#1E5E3A]'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{inq.status === 'replied' ? 'Marked Replied' : 'Mark as Replied'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-bold text-sm text-[#A3E635]">Subject: {inq.subject || 'General Inquiry'}</h5>
                      <p className="text-xs text-slate-200 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5 font-sans">
                        {inq.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* User / Author Posts Grid */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl font-bold text-white">
                Your Published & Draft Insights
              </h3>
              <button
                onClick={() => setActiveTab('create')}
                className="px-4 py-2.5 rounded-xl bg-[#1E5E3A] hover:bg-[#287547] text-[#A3E635] text-xs font-bold flex items-center gap-2 border border-[#A3E635]/30"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Write Article</span>
              </button>
            </div>

            {isLoading ? (
              <div className="p-12 text-center text-slate-400 font-mono text-xs">
                Fetching your articles from Firestore...
              </div>
            ) : userPosts.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#092215] border border-[#1E5E3A]/40 text-center space-y-4">
                <FileText className="w-12 h-12 text-[#A3E635] mx-auto opacity-80" />
                <h4 className="font-editorial text-xl font-bold text-white">No Articles Published Yet</h4>
                <p className="text-xs text-emerald-200/70 max-w-md mx-auto">
                  You haven't created any blog articles yet. Share your agricultural expertise, farming research, or company updates!
                </p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-6 py-3 rounded-xl bg-[#A3E635] text-[#0B2B1B] font-extrabold text-xs shadow-lg inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Your First Post</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userPosts.map((post) => (
                  <div
                    key={post.id || post.slug}
                    className="p-6 rounded-3xl bg-[#082215] border border-[#1E5E3A]/50 hover:border-[#A3E635]/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                  >
                    <div className="space-y-3">
                      {post.coverImage && (
                        <div className="rounded-2xl overflow-hidden h-44 w-full">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-[#1E5E3A] text-[#A3E635] text-[10px] font-bold uppercase tracking-wider">
                          {post.category}
                        </span>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                            post.isPublished
                              ? 'bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {post.isPublished ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          <span>{post.isPublished ? 'Published' : 'Draft'}</span>
                        </span>
                      </div>

                      <h4 className="font-editorial text-xl font-bold text-white line-clamp-2">
                        {post.title}
                      </h4>

                      <p className="text-xs text-emerald-100/70 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-red-400" />
                          <span>{post.likesCount || 0}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#A3E635]" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className="p-2 rounded-xl bg-black/40 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors border border-white/10"
                          title={post.isPublished ? 'Unpublish to Draft' : 'Publish to Live Feed'}
                        >
                          {post.isPublished ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => {
                            setEditingPost(post);
                            setActiveTab('create');
                          }}
                          className="p-2 rounded-xl bg-black/40 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors border border-white/10"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => post.id && handleDelete(post.id)}
                          className="p-2 rounded-xl bg-red-950/50 hover:bg-red-900 text-red-300 transition-colors border border-red-500/30"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

