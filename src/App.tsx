import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { UserProfile, getStoredAuthUser } from './lib/insforge';
import { Preloader } from './components/animations/Preloader';
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname || '/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredAuthUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getStoredAuthUser());
    };

    window.addEventListener('auth-state-changed', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    // Exact route matching & parameterized slug matching
    if (currentRoute === '/' || currentRoute === '') {
      return <Home onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/about')) {
      return <About onNavigate={navigate} />;
    }

    if (currentRoute === '/agriculture') {
      return <AgricultureOverview onNavigate={navigate} />;
    }
    if (currentRoute === '/agriculture/crops') {
      return <CropsPage onNavigate={navigate} />;
    }
    if (currentRoute === '/agriculture/livestock') {
      return <LivestockPage onNavigate={navigate} />;
    }
    if (currentRoute === '/agriculture/horticulture') {
      return <HorticulturePage onNavigate={navigate} />;
    }
    if (currentRoute === '/agriculture/processing') {
      return <AgroProcessingPage onNavigate={navigate} />;
    }

    if (currentRoute === '/operations') {
      return <OperationsPage onNavigate={navigate} />;
    }
    if (currentRoute === '/operations/farms') {
      return <FarmsPage onNavigate={navigate} />;
    }
    if (currentRoute.startsWith('/operations/farms/')) {
      const slug = currentRoute.replace('/operations/farms/', '');
      return <FarmDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute === '/products') {
      return <ProductsPage onNavigate={navigate} />;
    }
    if (currentRoute.startsWith('/products/')) {
      const slug = currentRoute.replace('/products/', '');
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }

    if (currentRoute === '/technology') {
      return <TechnologyPage onNavigate={navigate} />;
    }

    if (currentRoute === '/sustainability') {
      return <SustainabilityPage onNavigate={navigate} />;
    }

    if (currentRoute === '/african-agriculture') {
      return <AfricanAgriculturePage onNavigate={navigate} />;
    }

    if (currentRoute === '/projects') {
      return <ProjectsPage onNavigate={navigate} />;
    }
    if (currentRoute.startsWith('/projects/')) {
      const slug = currentRoute.replace('/projects/', '');
      return <ProjectDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute === '/gallery') {
      return <GalleryPage />;
    }

    if (currentRoute === '/insights' || currentRoute === '/blog') {
      return <InsightsPage onNavigate={navigate} onOpenAuth={() => setIsAuthModalOpen(true)} currentUser={currentUser} />;
    }
    if (currentRoute.startsWith('/insights/') || currentRoute.startsWith('/blog/')) {
      const slug = currentRoute.replace(/^\/(insights|blog)\//, '');
      return <ArticleDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute === '/dashboard' || currentRoute === '/publish') {
      return <DashboardPage currentUser={currentUser} onNavigate={navigate} onOpenAuth={() => setIsAuthModalOpen(true)} />;
    }

    if (currentRoute === '/careers') {
      return <CareersPage onNavigate={navigate} />;
    }

    if (currentRoute === '/partnerships' || currentRoute === '/investors') {
      return <PartnershipsPage onNavigate={navigate} />;
    }

    if (currentRoute === '/contact') {
      return <ContactPage />;
    }

    if (currentRoute === '/faq') {
      return <FaqPage onNavigate={navigate} />;
    }

    if (currentRoute === '/legal/privacy') {
      return <LegalPages type="privacy" onNavigate={navigate} />;
    }
    if (currentRoute === '/legal/terms') {
      return <LegalPages type="terms" onNavigate={navigate} />;
    }
    if (currentRoute === '/legal/cookies') {
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

      {/* BACK TO TOP */}
      <BackToTop />

      {/* VERCEL WEB ANALYTICS */}
      <Analytics />
    </div>
  );
}
