import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  Users,
  Handshake,
  Send,
  Plus,
  Settings,
  UploadCloud,
  Key,
  AlertCircle,
  Copy,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { 
  UserProfile,
  BlogPostData,
  ProductData,
  ContactInquiry,
  PartnerInquiry,
  NewsletterSubscriber,
  getAllBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  getProducts,
  saveProduct,
  deleteProduct,
  getContactInquiries,
  updateInquiryStatus,
  deleteContactInquiry,
  getPartnerInquiries,
  updatePartnerInquiryStatus,
  deletePartnerInquiry,
  getNewsletterSubscribers,
  deleteSubscriber,
  logoutUser,
  signInWithInsForge,
  uploadToInsForgeStorage,
  updateUserProfileAvatar
} from '../lib/insforge';
import { RichBlogEditor } from '../components/dashboard/RichBlogEditor';

interface DashboardPageProps {
  currentUser: UserProfile | null;
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  onNavigate,
  onOpenAuth
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'all_posts' | 'products' | 'inquiries' | 'partners' | 'subscribers' | 'create' | 'settings'>('overview');
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [productsList, setProductsList] = useState<ProductData[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [partners, setPartners] = useState<PartnerInquiry[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostData | null>(null);
  
  // Product Form State
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [prodFormName, setProdFormName] = useState('');
  const [prodFormCategory, setProdFormCategory] = useState('Fresh Produce');
  const [prodFormTagline, setProdFormTagline] = useState('');
  const [prodFormDescription, setProdFormDescription] = useState('');
  const [prodFormHarvest, setProdFormHarvest] = useState('Year-Round');
  const [prodFormMinOrder, setProdFormMinOrder] = useState('1 Ton');
  const [prodFormImage, setProdFormImage] = useState('');
  const [prodFormFeatured, setProdFormFeatured] = useState(true);
  const [isUploadingProdImage, setIsUploadingProdImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Gate Form State
  const [gateEmail, setGateEmail] = useState('admin@napoleonsteadings.com');
  const [gatePassword, setGatePassword] = useState('');
  const [gateError, setGateError] = useState<string | null>(null);
  const [isGateLoading, setIsGateLoading] = useState(false);

  // Profile / Settings State
  const [adminNameInput, setAdminNameInput] = useState(currentUser?.fullName || 'Napoleon Administrator');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const posts = await getAllBlogPosts();
      setBlogPosts(posts);

      const prods = await getProducts();
      setProductsList(prods);

      const inq = await getContactInquiries();
      setInquiries(inq);

      const part = await getPartnerInquiries();
      setPartners(part);

      const sub = await getNewsletterSubscribers();
      setSubscribers(sub);
    } catch (err) {
      console.error('Error loading InsForge dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenProductModal = (prod?: ProductData) => {
    if (prod) {
      setEditingProduct(prod);
      setProdFormName(prod.name);
      setProdFormCategory(prod.category);
      setProdFormTagline(prod.tagline || '');
      setProdFormDescription(prod.description || '');
      setProdFormHarvest(prod.harvestSeason || 'Year-Round');
      setProdFormMinOrder(prod.minOrderQuantity || '1 Ton');
      setProdFormImage(prod.image || '');
      setProdFormFeatured(prod.isFeatured ?? true);
    } else {
      setEditingProduct(null);
      setProdFormName('');
      setProdFormCategory('Fresh Produce');
      setProdFormTagline('');
      setProdFormDescription('');
      setProdFormHarvest('Year-Round');
      setProdFormMinOrder('1 Ton');
      setProdFormImage('https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=800');
      setProdFormFeatured(true);
    }
    setShowProductModal(true);
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingProdImage(true);
    try {
      const res = await uploadToInsForgeStorage(file);
      if (res.url) {
        setProdFormImage(res.url);
      } else {
        alert(res.error || 'Failed to upload product image to InsForge storage');
      }
    } catch (err: any) {
      alert(err.message || 'Image upload error');
    } finally {
      setIsUploadingProdImage(false);
    }
  };

  const handleSaveProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodFormName) return;
    setIsSubmitting(true);
    try {
      await saveProduct({
        id: editingProduct ? editingProduct.id : undefined,
        name: prodFormName,
        category: prodFormCategory,
        tagline: prodFormTagline,
        description: prodFormDescription,
        harvestSeason: prodFormHarvest,
        minOrderQuantity: prodFormMinOrder,
        image: prodFormImage,
        isFeatured: prodFormFeatured,
      });
      setSuccessMessage(editingProduct ? 'Product specifications updated!' : 'New product created in InsForge database!');
      setShowProductModal(false);
      setEditingProduct(null);
      await loadDashboardData();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProductItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product from InsForge database?')) return;
    try {
      await deleteProduct(id);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDashboardData();
    if (currentUser?.fullName) {
      setAdminNameInput(currentUser.fullName);
    }
  }, [currentUser]);

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateEmail || !gatePassword) {
      setGateError('Please provide your admin email and password.');
      return;
    }

    setIsGateLoading(true);
    setGateError(null);

    try {
      const res = await signInWithInsForge(gateEmail, gatePassword, 'admin');
      if (res.error) {
        setGateError(res.error);
      } else {
        await loadDashboardData();
      }
    } catch (err: any) {
      setGateError(err.message || 'Authentication error.');
    } finally {
      setIsGateLoading(false);
    }
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="w-full pt-32 pb-24 min-h-[85vh] flex items-center justify-center bg-[#07110C] text-white px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0B2518] border border-[#1E5E3A] space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A3E635]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#1E5E3A] text-[#A3E635] flex items-center justify-center mx-auto border border-[#A3E635]/30 shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="font-editorial text-2xl font-bold text-white">Executive Admin Portal</h2>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                Sign in with your InsForge admin credentials to access full platform controls, publish articles & review partner inquiries.
              </p>
            </div>
          </div>

          {gateError && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{gateError}</span>
            </div>
          )}

          <form onSubmit={handleGateSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-200/80 block">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                  placeholder="admin@napoleonsteadings.com"
                  className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-200/80 block">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={gatePassword}
                  onChange={(e) => setGatePassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isGateLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isGateLoading ? 'Authenticating via InsForge...' : 'Authenticate & Open Executive Dashboard'}</span>
            </button>
          </form>

          <div className="p-3 rounded-xl bg-black/40 border border-[#1E5E3A] text-[10px] text-emerald-100/70 text-center leading-relaxed">
            <span className="font-bold text-[#A3E635]">InsForge BaaS Authentication:</span> Connected to Postgres backend (<code className="text-emerald-300">82qu5ey7.us-east.insforge.app</code>).
          </div>
        </div>
      </div>
    );
  }

  const handleSavePost = async (data: {
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
      await saveBlogPost({
        id: editingPost ? editingPost.id : undefined,
        title: data.title,
        excerpt: data.summary,
        content: data.content,
        category: data.category,
        imageUrl: data.coverImage,
        status: data.isPublished ? 'published' : 'draft',
        author: currentUser.fullName || 'Napoleon Editorial',
        readTime: data.readTime,
      });

      setSuccessMessage(editingPost ? 'Article updated successfully!' : 'New article published successfully!');
      setEditingPost(null);
      setActiveTab('all_posts');
      await loadDashboardData();

      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error saving article:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteBlogPost(id);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInquiryStatus = async (id: string, status: ContactInquiry['status']) => {
    try {
      await updateInquiryStatus(id, status);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Delete this contact inquiry record?')) return;
    try {
      await deleteContactInquiry(id);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePartnerStatus = async (id: string, status: PartnerInquiry['status']) => {
    try {
      await updatePartnerInquiryStatus(id, status);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!window.confirm('Delete this partner proposal?')) return;
    try {
      await deletePartnerInquiry(id);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!window.confirm('Remove this newsletter subscriber?')) return;
    try {
      await deleteSubscriber(id);
      await loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full pt-28 pb-24 min-h-screen bg-[#06170E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0C3520] via-[#092B19] to-[#082214] border border-[#1E5E3A] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3E635]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E5E3A]/80 border border-[#A3E635]/40 text-[#A3E635] text-[11px] font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              <span>InsForge Backend Connected</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Executive Management Desk
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl">
              Welcome back, <span className="font-bold text-white">{currentUser.fullName}</span>. Manage publications, review corporate inquiries, and monitor agribusiness performance.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={() => {
                setEditingPost(null);
                setActiveTab('create');
              }}
              className="px-4 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Compose Article</span>
            </button>

            <button
              onClick={loadDashboardData}
              className="p-2.5 rounded-xl bg-black/40 hover:bg-[#1E5E3A] text-[#A3E635] border border-white/10 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => logoutUser()}
              className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="p-4 rounded-2xl bg-[#A3E635]/20 border border-[#A3E635] text-[#A3E635] font-bold text-xs flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1E5E3A]/60">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/40 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('all_posts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'all_posts'
                ? 'bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/40 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles ({blogPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/40 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Products ({productsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/40 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'partners'
                ? 'bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/40 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>Partnerships ({partners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'subscribers'
                ? 'bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/40 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/40 shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile & Media Storage</span>
          </button>

          <button
            onClick={() => {
              setEditingPost(null);
              setActiveTab('create');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ml-auto ${
              activeTab === 'create'
                ? 'bg-[#A3E635] text-[#0B2B1B] font-extrabold'
                : 'bg-[#1E5E3A]/60 text-[#A3E635] hover:bg-[#1E5E3A]'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Composer</span>
          </button>
        </div>

        {/* TAB CONTENTS */}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0B2518] border border-[#1E5E3A] space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Articles</span>
                  <FileText className="w-5 h-5 text-[#A3E635]" />
                </div>
                <div className="font-editorial text-3xl font-bold text-white">{blogPosts.length}</div>
                <p className="text-[11px] text-emerald-300">
                  {blogPosts.filter(p => p.status === 'published').length} published, {blogPosts.filter(p => p.status === 'draft').length} drafts
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B2518] border border-[#1E5E3A] space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Customer Inquiries</span>
                  <Inbox className="w-5 h-5 text-[#A3E635]" />
                </div>
                <div className="font-editorial text-3xl font-bold text-white">{inquiries.length}</div>
                <p className="text-[11px] text-emerald-300">
                  {inquiries.filter(i => i.status === 'pending').length} pending review
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B2518] border border-[#1E5E3A] space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Partner Proposals</span>
                  <Handshake className="w-5 h-5 text-[#A3E635]" />
                </div>
                <div className="font-editorial text-3xl font-bold text-white">{partners.length}</div>
                <p className="text-[11px] text-emerald-300">
                  {partners.filter(p => p.status === 'pending').length} requiring executive approval
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B2518] border border-[#1E5E3A] space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Newsletter Network</span>
                  <Users className="w-5 h-5 text-[#A3E635]" />
                </div>
                <div className="font-editorial text-3xl font-bold text-white">{subscribers.length}</div>
                <p className="text-[11px] text-emerald-300">Subscribed active contacts</p>
              </div>
            </div>

            {/* Recent Inquiries Quick Table */}
            <div className="p-6 rounded-3xl bg-[#082114] border border-[#1E5E3A] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white">Recent Customer & Corporate Inquiries</h3>
                  <p className="text-xs text-emerald-200/70">Incoming wholesale requests and farm tour inquiries</p>
                </div>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-bold text-[#A3E635] hover:underline"
                >
                  View All Inquiries →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1E5E3A] text-emerald-200/70 uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Sender</th>
                      <th className="py-3 px-3">Subject</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E5E3A]/40">
                    {inquiries.slice(0, 4).map((inq) => (
                      <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{inq.name}</div>
                          <div className="text-[10px] text-emerald-300 font-mono">{inq.email}</div>
                        </td>
                        <td className="py-3 px-3 max-w-xs truncate text-slate-200">
                          {inq.subject || inq.message}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inq.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleInquiryStatus(inq.id, inq.status === 'pending' ? 'reviewed' : 'pending')}
                            className="text-[11px] font-bold text-[#A3E635] hover:underline"
                          >
                            Mark {inq.status === 'pending' ? 'Reviewed' : 'Pending'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ALL POSTS TAB */}
        {activeTab === 'all_posts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-white">InsForge Published & Draft Publications</h3>
                <p className="text-xs text-emerald-200/70">Articles synced directly with InsForge Database</p>
              </div>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setActiveTab('create');
                }}
                className="px-4 py-2 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="rounded-2xl bg-[#092416] border border-[#1E5E3A] overflow-hidden flex flex-col justify-between shadow-xl hover:border-[#A3E635]/50 transition-all">
                  <div>
                    <div className="relative h-44 overflow-hidden bg-black/40">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#A3E635] text-[10px] font-bold uppercase border border-[#A3E635]/30">
                        {post.category}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border border-white/20 text-white bg-black/60">
                        {post.status}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="font-bold text-base text-white line-clamp-2 leading-snug">{post.title}</h4>
                      <p className="text-xs text-emerald-200/70 line-clamp-3">{post.excerpt}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#1E5E3A]/40 flex items-center justify-between text-xs mt-3">
                    <div className="flex items-center gap-3 text-emerald-300">
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400" /> {post.likes}</span>
                      <span className="text-[10px]">{post.readTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setActiveTab('create');
                        }}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-xl text-white">InsForge Commercial Produce & Inputs Catalog</h3>
                <p className="text-xs text-emerald-200/70">Manage agricultural produce, grains, inputs & livestock in InsForge Database</p>
              </div>
              <button
                onClick={() => handleOpenProductModal()}
                className="px-4 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs flex items-center gap-2 shadow-lg"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsList.map((prod) => (
                <div key={prod.id} className="rounded-2xl bg-[#092416] border border-[#1E5E3A] overflow-hidden flex flex-col justify-between shadow-xl hover:border-[#A3E635]/50 transition-all">
                  <div>
                    <div className="relative h-48 overflow-hidden bg-black/40">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#A3E635] text-[10px] font-bold uppercase border border-[#A3E635]/30">
                        {prod.category}
                      </div>
                      {prod.isFeatured && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#A3E635] text-[#0B2B1B]">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="font-bold text-base text-white leading-snug">{prod.name}</h4>
                      <p className="text-xs text-emerald-200/80 line-clamp-2">{prod.tagline}</p>
                      
                      <div className="pt-2 text-[11px] text-slate-300 space-y-1">
                        <div><span className="text-emerald-400 font-bold">Min Order:</span> {prod.minOrderQuantity}</div>
                        <div><span className="text-emerald-400 font-bold">Harvest:</span> {prod.harvestSeason}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#1E5E3A]/40 flex items-center justify-between text-xs mt-3">
                    <button
                      onClick={() => onNavigate(`/products/${prod.slug}`)}
                      className="text-[11px] font-bold text-emerald-300 hover:text-white flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Public Page</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenProductModal(prod)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteProductItem(prod.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-xl text-white">Contact & Sales Inquiries</h3>
              <p className="text-xs text-emerald-200/70">Manage incoming product orders, farm visits and customer inquiries</p>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-5 rounded-2xl bg-[#092416] border border-[#1E5E3A] space-y-3 shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#1E5E3A]/40 pb-3">
                    <div>
                      <h4 className="font-bold text-base text-white">{inq.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-emerald-300 mt-0.5">
                        <span className="font-mono">{inq.email}</span>
                        {inq.phone && <span>• {inq.phone}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => handleInquiryStatus(inq.id, e.target.value as any)}
                        className="bg-black/40 border border-[#1E5E3A] rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                      </select>

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {inq.subject && <div className="text-xs font-bold text-[#A3E635]">{inq.subject}</div>}
                    <p className="text-xs text-slate-200 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                      {inq.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PARTNERS TAB */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-xl text-white">Partnership Proposals</h3>
              <p className="text-xs text-emerald-200/70">Co-investment, outgrower union, and clean energy co-development proposals</p>
            </div>

            <div className="space-y-4">
              {partners.map((part) => (
                <div key={part.id} className="p-5 rounded-2xl bg-[#092416] border border-[#1E5E3A] space-y-3 shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#1E5E3A]/40 pb-3">
                    <div>
                      <h4 className="font-bold text-base text-white">{part.companyName}</h4>
                      <div className="text-xs text-emerald-300 font-mono mt-0.5">
                        Contact: {part.contactPerson} ({part.email}) {part.phone && `• ${part.phone}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={part.status}
                        onChange={(e) => handlePartnerStatus(part.id, e.target.value as any)}
                        className="bg-black/40 border border-[#1E5E3A] rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                      </select>

                      <button
                        onClick={() => handleDeletePartner(part.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 transition-colors"
                        title="Delete Proposal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#A3E635]">Type: {part.partnershipType}</div>
                    <p className="text-xs text-slate-200 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                      {part.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBSCRIBERS TAB */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-white">Newsletter Contacts</h3>
                <p className="text-xs text-emerald-200/70">Active subscriber mailing network</p>
              </div>

              <button
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," + subscribers.map(s => s.email).join("\n");
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", "subscribers.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#1E5E3A] hover:bg-[#184B2E] text-[#A3E635] font-bold text-xs border border-[#A3E635]/30"
              >
                Export CSV
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-[#092416] border border-[#1E5E3A]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1E5E3A] text-emerald-200/70 uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Subscriber Email</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E5E3A]/40">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-mono text-white">{sub.email}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="text-[11px] font-bold text-red-400 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS / PROFILE / MEDIA STORAGE TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-white">Administrator Profile & InsForge Storage</h3>
                <p className="text-xs text-emerald-200/70">Manage admin identity, avatars, and upload media assets directly to InsForge Storage bucket</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile & Avatar Manager */}
              <div className="p-6 rounded-3xl bg-[#092416] border border-[#1E5E3A] space-y-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#1E5E3A] text-[#A3E635]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">Administrator Identity</h4>
                    <p className="text-xs text-emerald-200/70">Stored in InsForge Auth profile metadata</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-[#1E5E3A] border-2 border-[#A3E635]/50 overflow-hidden flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                      {currentUser?.avatarUrl ? (
                        <img src={currentUser.avatarUrl} alt="Admin Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{currentUser?.fullName?.[0] || 'A'}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] text-xs font-extrabold shadow-md transition-all">
                      <UploadCloud className="w-4 h-4" />
                      <span>{isUploadingAvatar ? 'Uploading to Bucket...' : 'Upload New Avatar Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingAvatar}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setIsUploadingAvatar(true);
                            const res = await uploadToInsForgeStorage(file);
                            if (res.url) {
                              await updateUserProfileAvatar(res.url, adminNameInput);
                              setSuccessMessage('Admin profile avatar updated in InsForge Storage!');
                              setTimeout(() => setSuccessMessage(null), 4000);
                            } else {
                              alert('Avatar upload failed: ' + (res.error || 'Error'));
                            }
                            setIsUploadingAvatar(false);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-emerald-200/60">Uploads directly to InsForge Storage bucket <code className="text-[#A3E635]">napoleon-media</code></p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-200/80 block">
                      Admin Display Name
                    </label>
                    <input
                      type="text"
                      value={adminNameInput}
                      onChange={(e) => setAdminNameInput(e.target.value)}
                      className="w-full bg-black/60 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-200/80 block">
                      Admin Email
                    </label>
                    <input
                      type="text"
                      disabled
                      value={currentUser?.email || ''}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-400 cursor-not-allowed"
                    />
                  </div>

                  <button
                    onClick={async () => {
                      await updateUserProfileAvatar(currentUser?.avatarUrl, adminNameInput);
                      setSuccessMessage('Admin profile name saved successfully!');
                      setTimeout(() => setSuccessMessage(null), 4000);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#1E5E3A] hover:bg-[#184B2E] text-[#A3E635] font-bold text-xs border border-[#A3E635]/30 transition-colors"
                  >
                    Save Identity Changes
                  </button>
                </div>
              </div>

              {/* InsForge Media Storage CDN Uploader */}
              <div className="p-6 rounded-3xl bg-[#092416] border border-[#1E5E3A] space-y-6 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#1E5E3A] text-[#A3E635]">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white">InsForge Media Storage Bucket</h4>
                      <p className="text-xs text-emerald-200/70">Upload images & assets for instant public CDN URLs</p>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    Upload photos for farm products, executive bios, or blog inline images. All files are permanently hosted on the InsForge media storage network.
                  </p>

                  <div className="p-6 rounded-2xl border-2 border-dashed border-[#1E5E3A] bg-black/30 text-center space-y-3">
                    <UploadCloud className="w-10 h-10 text-[#A3E635] mx-auto opacity-80" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-white">Select image file from computer</p>
                      <p className="text-[10px] text-emerald-200/60">Supports JPG, PNG, WEBP, SVG up to 10MB</p>
                    </div>

                    <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] text-xs font-extrabold shadow-lg transition-transform hover:scale-105">
                      <span>{isUploadingMedia ? 'Uploading File...' : 'Choose File & Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingMedia}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setIsUploadingMedia(true);
                            const res = await uploadToInsForgeStorage(file);
                            setIsUploadingMedia(false);
                            if (res.url) {
                              setUploadedMediaUrl(res.url);
                              setSuccessMessage('File uploaded to InsForge Storage!');
                              setTimeout(() => setSuccessMessage(null), 4000);
                            } else {
                              alert('Media upload failed: ' + (res.error || 'Error'));
                            }
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {uploadedMediaUrl && (
                    <div className="p-4 rounded-2xl bg-black/60 border border-[#A3E635]/50 space-y-2 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635]">Public InsForge CDN Link:</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(uploadedMediaUrl);
                            alert('URL copied to clipboard!');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#1E5E3A] text-[#A3E635] text-[10px] font-bold flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        readOnly
                        value={uploadedMediaUrl}
                        className="w-full bg-black border border-white/10 rounded-lg px-3 py-1.5 text-[11px] font-mono text-emerald-300 focus:outline-none"
                      />
                      <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-black">
                        <img src={uploadedMediaUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Technical Specs Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-[#1E5E3A] text-xs space-y-2">
                  <div className="flex items-center justify-between text-emerald-200/80 text-[11px]">
                    <span>InsForge Host API:</span>
                    <span className="font-mono text-white">82qu5ey7.us-east.insforge.app</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-200/80 text-[11px]">
                    <span>Storage Bucket Name:</span>
                    <span className="font-mono text-[#A3E635]">napoleon-media</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-200/80 text-[11px]">
                    <span>Database Engine:</span>
                    <span className="font-mono text-white">InsForge Postgres SQL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATE / COMPOSER TAB */}
        {activeTab === 'create' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-white">
                  {editingPost ? 'Edit Article' : 'Compose New Agribusiness Article'}
                </h3>
                <p className="text-xs text-emerald-200/70">
                  Rich formatting & direct InsForge Database sync
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPost(null);
                  setActiveTab('all_posts');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <RichBlogEditor
              initialTitle={editingPost?.title}
              initialSummary={editingPost?.excerpt}
              initialContent={editingPost?.content}
              initialCategory={editingPost?.category}
              initialCoverImage={editingPost?.imageUrl}
              initialIsPublished={editingPost?.status === 'published'}
              onSave={handleSavePost}
            />
          </div>
        )}

        {/* PRODUCT EDIT / CREATE MODAL */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0B2518] border border-[#1E5E3A] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
              <div className="flex items-center justify-between border-b border-[#1E5E3A] pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#A3E635]" />
                  <h3 className="font-bold text-lg text-white">
                    {editingProduct ? 'Edit Product Specifications' : 'Add New Commercial Product'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProductSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-emerald-200/80">Product Name</label>
                  <input
                    type="text"
                    required
                    value={prodFormName}
                    onChange={(e) => setProdFormName(e.target.value)}
                    placeholder="e.g. Premium Golden Maize Grain"
                    className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-emerald-200/80">Category</label>
                    <select
                      value={prodFormCategory}
                      onChange={(e) => setProdFormCategory(e.target.value)}
                      className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                    >
                      <option value="Grains & Cereals">Grains & Cereals</option>
                      <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                      <option value="Fresh Produce">Fresh Produce</option>
                      <option value="Livestock & Poultry">Livestock & Poultry</option>
                      <option value="Processed Goods">Processed Goods</option>
                      <option value="Seeds & Inputs">Seeds & Inputs</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-emerald-200/80">Minimum Order Quantity</label>
                    <input
                      type="text"
                      required
                      value={prodFormMinOrder}
                      onChange={(e) => setProdFormMinOrder(e.target.value)}
                      placeholder="e.g. 5 Metric Tons"
                      className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-emerald-200/80">Tagline / Short Summary</label>
                  <input
                    type="text"
                    value={prodFormTagline}
                    onChange={(e) => setProdFormTagline(e.target.value)}
                    placeholder="Brief description for product cards..."
                    className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-emerald-200/80">Full Description & Specifications</label>
                  <textarea
                    rows={4}
                    value={prodFormDescription}
                    onChange={(e) => setProdFormDescription(e.target.value)}
                    placeholder="Detailed agronomic specs, processing notes..."
                    className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-emerald-200/80">Harvest Season / Availability</label>
                    <input
                      type="text"
                      value={prodFormHarvest}
                      onChange={(e) => setProdFormHarvest(e.target.value)}
                      placeholder="e.g. Year-Round / July Harvest"
                      className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-emerald-200/80">Featured Status</label>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="prodFeatured"
                        checked={prodFormFeatured}
                        onChange={(e) => setProdFormFeatured(e.target.checked)}
                        className="w-4 h-4 accent-[#A3E635] rounded cursor-pointer"
                      />
                      <label htmlFor="prodFeatured" className="text-white cursor-pointer font-bold">Show in Featured Catalog</label>
                    </div>
                  </div>
                </div>

                {/* Product Image Uploader */}
                <div className="space-y-2 pt-2 border-t border-[#1E5E3A]">
                  <label className="font-bold uppercase tracking-wider text-emerald-200/80 block">Product Cover Image (InsForge Storage)</label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      value={prodFormImage}
                      onChange={(e) => setProdFormImage(e.target.value)}
                      placeholder="Image URL or upload file..."
                      className="w-full bg-black/50 border border-[#1E5E3A] focus:border-[#A3E635] rounded-xl px-3.5 py-2.5 text-white focus:outline-none font-mono text-[11px]"
                    />

                    <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#1E5E3A] hover:bg-[#184B2E] text-[#A3E635] border border-[#A3E635]/30 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shadow">
                      <UploadCloud className="w-4 h-4" />
                      <span>{isUploadingProdImage ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingProdImage}
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {prodFormImage && (
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-black border border-[#1E5E3A]">
                      <img src={prodFormImage} alt="Product Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E5E3A]">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold shadow-lg"
                  >
                    {isSubmitting ? 'Saving to InsForge...' : 'Save Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
