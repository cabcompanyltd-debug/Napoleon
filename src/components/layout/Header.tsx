import React, { useState, useEffect } from 'react';
import { Search, User, Menu, ChevronDown, Phone, ShieldCheck, PenTool, FolderKanban, BookOpen, Briefcase, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MegaMenu } from './MegaMenu';
import { UserProfile } from '../../lib/insforge';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenMobileMenu: () => void;
  currentUser: UserProfile | null;
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
  const [activeMegaMenu, setActiveMegaMenu] = useState<'agriculture' | 'operations' | 'products' | null>(null);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);

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

  const mediaSublinks = [
    { name: 'Commercial Projects', route: '/projects', desc: 'Silos, cold storage & solar irrigation', icon: FolderKanban },
    { name: 'News & Insights', route: '/insights', desc: 'Industry analysis & operational updates', icon: BookOpen },
    { name: 'Careers & Team', route: '/careers', desc: 'Join agricultural leaders in Ghana', icon: Briefcase },
    { name: 'Photo & Video Gallery', route: '/gallery', desc: 'High-res visuals from Volta farms', icon: Camera }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#061A10]/95 backdrop-blur-xl border-b border-[#A3E635]/30 py-2.5 shadow-2xl'
          : 'bg-slanted-dual backdrop-blur-md py-3.5 border-b border-[#1E5E3A]/40'
      }`}
    >
      {/* Decorative Seam Highlight Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1E5E3A] via-[#A3E635] to-[#1E5E3A] opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo - Reloads Home Page on Click */}
        <button
          onClick={() => {
            if (window.location.pathname === '/' || currentRoute === '/') {
              window.location.reload();
            } else {
              onNavigate('/');
            }
          }}
          className="flex items-center group text-left focus:outline-none shrink-0"
          aria-label="Napoleon Steadings - Home (Click to reload)"
        >
          <BrandLogo size="md" />
        </button>

        {/* Desktop Nav Items - Clean & Spacious Submenus */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Home */}
          <button
            onClick={() => {
              onNavigate('/');
              setActiveMegaMenu(null);
              setIsMediaDropdownOpen(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              currentRoute === '/'
                ? 'text-[#A3E635] bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner'
                : 'text-white/90 hover:text-[#A3E635] hover:bg-white/10'
            }`}
          >
            Home
          </button>

          {/* About */}
          <button
            onClick={() => {
              onNavigate('/about');
              setActiveMegaMenu(null);
              setIsMediaDropdownOpen(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              currentRoute === '/about'
                ? 'text-[#A3E635] bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner'
                : 'text-white/90 hover:text-[#A3E635] hover:bg-white/10'
            }`}
          >
            About
          </button>

          {/* Agriculture (Mega Menu) */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveMegaMenu('agriculture');
              setIsMediaDropdownOpen(false);
            }}
          >
            <button
              onClick={() => {
                onNavigate('/agriculture');
                setActiveMegaMenu(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1 ${
                currentRoute.startsWith('/agriculture')
                  ? 'text-[#A3E635] bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner'
                  : 'text-white/90 hover:text-[#A3E635] hover:bg-white/10'
              }`}
            >
              <span>Agriculture</span>
              <ChevronDown className="w-3 h-3 text-[#A3E635]/80" />
            </button>
          </div>

          {/* Operations & Tech (Mega Menu) */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveMegaMenu('operations');
              setIsMediaDropdownOpen(false);
            }}
          >
            <button
              onClick={() => {
                onNavigate('/operations');
                setActiveMegaMenu(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1 ${
                currentRoute.startsWith('/operations') || currentRoute === '/technology'
                  ? 'text-[#A3E635] bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner'
                  : 'text-white/90 hover:text-[#A3E635] hover:bg-white/10'
              }`}
            >
              <span>Operations & Tech</span>
              <ChevronDown className="w-3 h-3 text-[#A3E635]/80" />
            </button>
          </div>

          {/* Products (Mega Menu) */}
          <div
            className="relative"
            onMouseEnter={() => {
              setActiveMegaMenu('products');
              setIsMediaDropdownOpen(false);
            }}
          >
            <button
              onClick={() => {
                onNavigate('/products');
                setActiveMegaMenu(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1 ${
                currentRoute.startsWith('/products')
                  ? 'text-[#A3E635] bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner'
                  : 'text-white/90 hover:text-[#A3E635] hover:bg-white/10'
              }`}
            >
              <span>Products</span>
              <ChevronDown className="w-3 h-3 text-[#A3E635]/80" />
            </button>
          </div>

          {/* Media & Projects (Submenu Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => {
              setIsMediaDropdownOpen(true);
              setActiveMegaMenu(null);
            }}
            onMouseLeave={() => setIsMediaDropdownOpen(false)}
          >
            <button
              onClick={() => {
                onNavigate('/insights');
                setIsMediaDropdownOpen(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1 ${
                ['/projects', '/insights', '/careers', '/gallery'].includes(currentRoute)
                  ? 'text-[#A3E635] bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner'
                  : 'text-white/90 hover:text-[#A3E635] hover:bg-white/10'
              }`}
            >
              <span>Media & Projects</span>
              <ChevronDown className={`w-3 h-3 text-[#A3E635]/80 transition-transform ${isMediaDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMediaDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-0 mt-2 w-64 bg-[#0B2B1B] border border-[#A3E635]/30 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                  <div className="px-3 py-1.5 border-b border-[#1E5E3A]/40 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3E635]">
                      Explore Media & Projects
                    </span>
                  </div>
                  {mediaSublinks.map((sub) => {
                    const IconComp = sub.icon;
                    return (
                      <button
                        key={sub.name}
                        onClick={() => {
                          onNavigate(sub.route);
                          setIsMediaDropdownOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#1E5E3A] transition-colors flex items-start gap-3 group"
                      >
                        <div className="p-2 rounded-lg bg-[#062114] group-hover:bg-[#A3E635] text-[#A3E635] group-hover:text-[#0B2B1B] transition-colors shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#A3E635] transition-colors">
                            {sub.name}
                          </div>
                          <div className="text-[11px] text-emerald-200/70 mt-0.5">
                            {sub.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dashboard */}
          <button
            onClick={() => {
              onNavigate('/dashboard');
              setActiveMegaMenu(null);
              setIsMediaDropdownOpen(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              currentRoute === '/dashboard'
                ? 'text-[#A3E635] bg-[#1E5E3A]/80 border border-[#A3E635]/40 shadow-inner'
                : 'text-white/90 hover:text-[#A3E635] hover:bg-white/10'
            }`}
          >
            Dashboard
          </button>
        </nav>

        {/* Right Action Icons & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dashboard Quick Creator Button */}
          <button
            onClick={() => onNavigate('/dashboard')}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E5E3A]/70 hover:bg-[#1E5E3A] text-[#A3E635] border border-[#A3E635]/30 text-xs font-bold transition-all hover:scale-105"
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
            {currentUser?.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="User" className="w-5 h-5 rounded-full object-cover border border-[#A3E635]" />
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


