import React, { useState, useEffect } from 'react';
import { Sprout, Search, User, Menu, ChevronDown, Phone, ShieldCheck, PenTool, LayoutDashboard } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenMobileMenu: () => void;
  currentUser: FirebaseUser | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
  onOpenMobileMenu,
  currentUser
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'agriculture' | 'operations' | 'products' | 'technology' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', route: '/' },
    { name: 'About', route: '/about' },
    { name: 'Agriculture', route: '/agriculture', hasMega: true, megaKey: 'agriculture' as const },
    { name: 'Operations', route: '/operations', hasMega: true, megaKey: 'operations' as const },
    { name: 'Products', route: '/products', hasMega: true, megaKey: 'products' as const },
    { name: 'Technology', route: '/technology', hasMega: true, megaKey: 'technology' as const },
    { name: 'Projects', route: '/projects' },
    { name: 'Insights', route: '/insights' },
    { name: 'Dashboard', route: '/dashboard' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slanted-dual backdrop-blur-xl border-b border-[#A3E635]/30 py-2.5 shadow-2xl'
          : 'bg-gradient-to-r from-[#071D12]/95 via-[#0A291A]/90 to-[#0B1F17]/95 backdrop-blur-md py-4 border-b border-[#1E5E3A]/30'
      }`}
    >
      {/* Decorative Diagonal Seam Highlight Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1E5E3A] via-[#A3E635] to-[#1E5E3A] opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E5E3A] to-[#0B2E1D] border border-[#A3E635]/50 flex items-center justify-center text-[#A3E635] shadow-xl group-hover:scale-105 group-hover:border-[#A3E635] transition-all overflow-hidden p-1">
            <img
              src="/logo.png"
              alt="Napoleon Steadings"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-lg sm:text-xl font-extrabold tracking-tight text-white leading-none uppercase group-hover:text-[#A3E635] transition-colors">
              Napoleon Steadings
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#A3E635] font-bold mt-0.5">
              Volta Region • Ghana
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  if (item.hasMega && item.megaKey) setActiveMegaMenu(item.megaKey);
                }}
              >
                <button
                  onClick={() => {
                    onNavigate(item.route);
                    setActiveMegaMenu(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1 relative ${
                    isActive
                      ? 'text-[#A3E635] bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner'
                      : 'text-white/90 hover:text-[#A3E635] hover:bg-white/10'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasMega && <ChevronDown className="w-3 h-3 text-[#A3E635]/80" />}

                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635]" />
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right Action Icons & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dashboard Quick Creator Button */}
          <button
            onClick={() => onNavigate('/dashboard')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E5E3A]/70 hover:bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/30 text-xs font-bold transition-all hover:scale-105"
            title="Publisher Dashboard"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Publish Blog</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-xl bg-black/40 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] transition-colors border border-white/10"
            title="Search"
            aria-label="Search site"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Auth Portal */}
          <button
            onClick={onOpenAuth}
            className={`p-2 rounded-xl transition-all duration-200 border flex items-center gap-2 ${
              currentUser
                ? 'bg-[#1E5E3A] border-[#A3E635] text-[#A3E635] shadow-lg'
                : 'bg-black/40 hover:bg-[#1E5E3A] text-white hover:text-[#A3E635] border-white/10'
            }`}
            title={currentUser ? `Account: ${currentUser.email}` : 'Sign In'}
            aria-label="User Account"
          >
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="User" className="w-5 h-5 rounded-full object-cover border border-[#A3E635]" />
            ) : (
              <User className="w-4 h-4" />
            )}
            {currentUser && <ShieldCheck className="w-3.5 h-3.5 text-[#A3E635] hidden xl:inline" />}
          </button>

          {/* Contact CTA */}
          <button
            onClick={() => onNavigate('/contact')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] font-extrabold text-xs shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2.5 rounded-xl bg-[#1E5E3A] text-white hover:text-[#A3E635] border border-[#A3E635]/30 focus:outline-none"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <MegaMenu
        isOpen={!!activeMegaMenu}
        activeMenu={activeMegaMenu}
        onClose={() => setActiveMegaMenu(null)}
        onNavigate={onNavigate}
      />
    </header>
  );
};

