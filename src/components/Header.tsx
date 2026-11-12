import React, { useState, useEffect } from 'react';
import { NavigationPage, HomeSection } from '../types';
import { Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';
import logoImg from '../assets/images/caretcoders_logo.png';

interface HeaderProps {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  activeHomeSection: HomeSection;
  scrollToHomeSection: (sectionId: HomeSection) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  activeHomeSection,
  scrollToHomeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: NavigationPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (section: HomeSection) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => scrollToHomeSection(section), 100);
    } else {
      scrollToHomeSection(section);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 border-b border-[#DED8D0] ${
        scrolled 
          ? 'bg-[#EBEFEE]/95 backdrop-blur-md shadow-[0_1px_3px_rgba(74,65,60,0.03)]' 
          : 'bg-[#EBEFEE]/85 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single-Element Brand Wordmark */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2.5 group text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-[#BB6C43] shrink-0"
        >
          <div className="w-8 h-8 rounded-md overflow-hidden bg-white border border-[#DED8D0] p-1 flex items-center justify-center transition-transform group-hover:scale-102">
            <img 
              src={logoImg} 
              onError={(e) => {
                e.currentTarget.src = '/caretcoders_logo.svg';
              }}
              alt="CaretCoders Logo" 
              className="w-full h-full object-contain block"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-semibold text-base tracking-[-0.02em] text-[#4A413C] whitespace-nowrap">
            CaretCoders
          </span>
        </button>

        {/* Zone 2: 4–5 Clean Single-Line Text Navigation Links (No Pills) */}
        <nav className="hidden lg:flex items-center space-x-7 font-normal text-[13.5px] text-[#746860]">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#4A413C] cursor-pointer py-1 ${
              currentPage === 'home' && activeHomeSection === 'hero' 
                ? 'text-[#4A413C] font-medium border-b-2 border-[#BB6C43]' 
                : 'border-b-2 border-transparent'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => handleSectionClick('products')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#4A413C] cursor-pointer py-1 ${
              currentPage === 'home' && activeHomeSection === 'products' 
                ? 'text-[#4A413C] font-medium border-b-2 border-[#BB6C43]' 
                : 'border-b-2 border-transparent'
            }`}
          >
            Systems
          </button>

          <button
            onClick={() => handleSectionClick('why-us')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#4A413C] cursor-pointer py-1 ${
              currentPage === 'home' && activeHomeSection === 'why-us' 
                ? 'text-[#4A413C] font-medium border-b-2 border-[#BB6C43]' 
                : 'border-b-2 border-transparent'
            }`}
          >
            Philosophy
          </button>

          <button
            onClick={() => handleSectionClick('journey')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#4A413C] cursor-pointer py-1 ${
              currentPage === 'home' && activeHomeSection === 'journey' 
                ? 'text-[#4A413C] font-medium border-b-2 border-[#BB6C43]' 
                : 'border-b-2 border-transparent'
            }`}
          >
            Chronicle
          </button>

          <button
            onClick={() => handleNavClick('blog')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#4A413C] cursor-pointer py-1 ${
              currentPage === 'blog' 
                ? 'text-[#4A413C] font-medium border-b-2 border-[#BB6C43]' 
                : 'border-b-2 border-transparent'
            }`}
          >
            Publications
          </button>

          <button
            onClick={() => handleNavClick('careers')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#4A413C] cursor-pointer py-1 ${
              currentPage === 'careers' 
                ? 'text-[#4A413C] font-medium border-b-2 border-[#BB6C43]' 
                : 'border-b-2 border-transparent'
            }`}
          >
            Careers
          </button>

          <button
            onClick={() => handleNavClick('docs')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#4A413C] cursor-pointer py-1 ${
              currentPage === 'docs' 
                ? 'text-[#4A413C] font-medium border-b-2 border-[#BB6C43]' 
                : 'border-b-2 border-transparent'
            }`}
          >
            Docs
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => handleSectionClick('contact')}
            className="studio-btn-primary whitespace-nowrap shrink-0"
          >
            <span>Inquire</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1 opacity-80" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md text-[#4A413C] hover:bg-[#F3EFEA] transition-colors focus-visible:ring-2 focus-visible:ring-[#BB6C43]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#EBEFEE] border-b border-[#DED8D0] px-6 py-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium text-[#4A413C]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-2.5 rounded-md hover:bg-[#CCB499]/20 transition-colors flex items-center justify-between text-[#4A413C]"
            >
              <span>Overview</span>
              <ChevronRight className="w-4 h-4 text-[#948880]" />
            </button>
            <button
              onClick={() => handleSectionClick('products')}
              className="text-left py-2 px-2.5 rounded-md hover:bg-[#CCB499]/20 transition-colors flex items-center justify-between text-[#4A413C]"
            >
              <span>Systems & Architecture</span>
              <ChevronRight className="w-4 h-4 text-[#948880]" />
            </button>
            <button
              onClick={() => handleSectionClick('why-us')}
              className="text-left py-2 px-2.5 rounded-md hover:bg-[#CCB499]/20 transition-colors flex items-center justify-between text-[#4A413C]"
            >
              <span>Engineering Philosophy</span>
              <ChevronRight className="w-4 h-4 text-[#948880]" />
            </button>
            <button
              onClick={() => handleSectionClick('journey')}
              className="text-left py-2 px-2.5 rounded-md hover:bg-[#CCB499]/20 transition-colors flex items-center justify-between text-[#4A413C]"
            >
              <span>Chronicle</span>
              <ChevronRight className="w-4 h-4 text-[#948880]" />
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left py-2 px-2.5 rounded-md hover:bg-[#CCB499]/20 transition-colors flex items-center justify-between text-[#4A413C]"
            >
              <span>Publications</span>
              <ChevronRight className="w-4 h-4 text-[#948880]" />
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className="text-left py-2 px-2.5 rounded-md hover:bg-[#CCB499]/20 transition-colors flex items-center justify-between text-[#4A413C]"
            >
              <span>Careers</span>
              <ChevronRight className="w-4 h-4 text-[#948880]" />
            </button>
            <button
              onClick={() => handleNavClick('docs')}
              className="text-left py-2 px-2.5 rounded-md hover:bg-[#CCB499]/20 transition-colors flex items-center justify-between text-[#4A413C]"
            >
              <span>Docs</span>
              <ChevronRight className="w-4 h-4 text-[#948880]" />
            </button>
          </div>

          <div className="pt-3 border-t border-[#DED8D0]">
            <button
              onClick={() => handleSectionClick('contact')}
              className="w-full studio-btn-primary py-2.5 text-xs font-medium justify-center"
            >
              <span>Get in Touch</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
