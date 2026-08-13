import React, { useState, useEffect } from 'react';
import { UserProfile, getStoredAuthUser } from './lib/insforge';
import { Preloader } from './components/animations/Preloader';
import { LiveChatWidget } from './components/chat/LiveChatWidget';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/layout/CustomCursor';
import { Header } from './components/layout/Header';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';
import { AuthModal } from './components/layout/AuthModal';
import { SearchOverlay } from './components/layout/SearchOverlay';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { AgricultureOverview } from './pages/AgricultureOverview';
import { CropsPage } from './pages/CropsPage';
import { LivestockPage } from './pages/LivestockPage';
import { HorticulturePage } from './pages/HorticulturePage';
import { AgroProcessingPage } from './pages/AgroProcessingPage';
import { OperationsPage } from './pages/OperationsPage';
import { FarmsPage } from './pages/FarmsPage';
import { FarmDetailPage } from './pages/FarmDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { AfricanAgriculturePage } from './pages/AfricanAgriculturePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { InsightsPage } from './pages/InsightsPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { DashboardPage } from './pages/DashboardPage';
import { CareersPage } from './pages/CareersPage';
import { PartnershipsPage } from './pages/PartnershipsPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPages } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';

const getCleanRoute = (): string => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const articleParam = searchParams.get('article') || searchParams.get('blog') || searchParams.get('slug');
    if (articleParam) {
      return `/insights/${articleParam}`;
    }
  } catch {}

  const hash = window.location.hash;
  if (hash && (hash.startsWith('#/') || hash.startsWith('#'))) {
    const hashPath = hash.replace(/^#/, '');
    if (hashPath.startsWith('/')) return hashPath;
  }
  let path = window.location.pathname || '/';
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path || '/';
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<string>(() => getCleanRoute());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredAuthUser());

  useEffect(() => {
    const handleAuthChange = () => {
      const user = getStoredAuthUser();
      setCurrentUser(user);
      if (!user) {
        navigate('/');
      }
    };

    window.addEventListener('auth-state-changed', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  // Sync route on popstate or hashchange (browser back/forward & reload)
  useEffect(() => {
    const handleRouteSync = () => {
      setCurrentRoute(getCleanRoute());
    };
    window.addEventListener('popstate', handleRouteSync);
    window.addEventListener('hashchange', handleRouteSync);
    return () => {
      window.removeEventListener('popstate', handleRouteSync);
      window.removeEventListener('hashchange', handleRouteSync);
    };
  }, []);

  const navigate = (route: string) => {
    let cleanRoute = route;
    if (cleanRoute.length > 1 && cleanRoute.endsWith('/')) {
      cleanRoute = cleanRoute.slice(0, -1);
    }
    window.history.pushState({}, '', cleanRoute);
    setCurrentRoute(cleanRoute);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    // Exact route matching & parameterized slug matching using clean basePath
    const basePath = currentRoute.split('?')[0].split('#')[0];

    if (basePath === '/' || basePath === '') {
      return <Home onNavigate={navigate} />;
    }

    if (basePath.startsWith('/about')) {
      return <About onNavigate={navigate} />;
    }

    if (basePath === '/agriculture') {
      return <AgricultureOverview onNavigate={navigate} />;
    }
    if (basePath === '/agriculture/crops') {
      return <CropsPage onNavigate={navigate} />;
    }
    if (basePath === '/agriculture/livestock') {
      return <LivestockPage onNavigate={navigate} />;
    }
    if (basePath === '/agriculture/horticulture') {
      return <HorticulturePage onNavigate={navigate} />;
    }
    if (basePath === '/agriculture/processing') {
      return <AgroProcessingPage onNavigate={navigate} />;
    }

    if (basePath === '/operations') {
      return <OperationsPage onNavigate={navigate} />;
    }
    if (basePath === '/operations/farms') {
      return <FarmsPage onNavigate={navigate} />;
    }
    if (basePath.startsWith('/operations/farms/')) {
      const slug = basePath.replace('/operations/farms/', '');
      return <FarmDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (basePath === '/products') {
      return <ProductsPage onNavigate={navigate} />;
    }
    if (basePath.startsWith('/products/')) {
      const slug = basePath.replace('/products/', '');
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (basePath === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }

    if (basePath === '/technology') {
      return <TechnologyPage onNavigate={navigate} />;
    }

    if (basePath === '/sustainability') {
      return <SustainabilityPage onNavigate={navigate} />;
    }

    if (basePath === '/african-agriculture') {
      return <AfricanAgriculturePage onNavigate={navigate} />;
    }

    if (basePath === '/projects') {
      return <ProjectsPage onNavigate={navigate} />;
    }
    if (basePath.startsWith('/projects/')) {
      const slug = basePath.replace('/projects/', '');
      return <ProjectDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (basePath === '/gallery') {
      return <GalleryPage />;
    }

    if (basePath === '/insights' || basePath === '/blog') {
      return <InsightsPage onNavigate={navigate} onOpenAuth={() => setIsAuthModalOpen(true)} currentUser={currentUser} />;
    }
    if (basePath.startsWith('/insights/') || basePath.startsWith('/blog/')) {
      const slug = basePath.replace(/^\/(insights|blog)\//, '');
      return <ArticleDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (basePath === '/dashboard' || basePath === '/publish') {
      return <DashboardPage currentUser={currentUser} onNavigate={navigate} onOpenAuth={() => setIsAuthModalOpen(true)} />;
    }

    if (basePath === '/careers') {
      return <CareersPage onNavigate={navigate} />;
    }

    if (basePath === '/partnerships' || basePath === '/investors' || basePath === '/investment') {
      return <PartnershipsPage onNavigate={navigate} />;
    }

    if (basePath === '/contact') {
      return <ContactPage />;
    }

    if (basePath === '/faq') {
      return <FaqPage onNavigate={navigate} />;
    }

    if (basePath === '/legal/privacy' || basePath === '/privacy') {
      return <LegalPages type="privacy" onNavigate={navigate} />;
    }
    if (basePath === '/legal/terms' || basePath === '/terms') {
      return <LegalPages type="terms" onNavigate={navigate} />;
    }
    if (basePath === '/legal/cookies' || basePath === '/cookies') {
      return <LegalPages type="cookies" onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-[#F9F8F3] text-[#132A13] font-sans antialiased selection:bg-[#A3E635] selection:text-[#0B2B1B] relative">
      {/* PRELOADER */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* PROGRESS & CURSOR */}
      <ScrollProgress />
      <CustomCursor />

      {/* HEADER */}
      <Header
        onNavigate={navigate}
        currentRoute={currentRoute}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        currentUser={currentUser}
      />

      {/* MOBILE DRAWER */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={navigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onNavigate={navigate}
      />

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />

      {/* MAIN CONTENT AREA */}
      <main className="w-full overflow-hidden">{renderPage()}</main>

      {/* FOOTER */}
      <Footer onNavigate={navigate} />

      {/* BACK TO TOP & LIVE CHAT */}
      <BackToTop />
      <LiveChatWidget />
    </div>
  );
}
