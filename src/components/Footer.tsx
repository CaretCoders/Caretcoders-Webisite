import React from 'react';
import { NavigationPage, HomeSection } from '../types';
import { ChevronRight, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';
import logoImg from '../assets/images/caretcoders_logo.png';

interface FooterProps {
  onNavigatePage: (page: NavigationPage) => void;
  onScrollSection: (sectionId: HomeSection) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onScrollSection
}) => {
  const handleNav = (page: NavigationPage) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSec = (sec: HomeSection) => {
    onScrollSection(sec);
  };

  return (
    <footer className="bg-[#EBEFEE] border-t border-[#DED8D0] text-[#4A413C] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid: Brand & Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-white border border-[#DED8D0] p-1 flex items-center justify-center">
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
              <span className="font-semibold text-base tracking-tight text-[#4A413C]">
                CaretCoders
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#746860] max-w-sm leading-relaxed">
              Software research & venture engineering studio. Building precision agricultural sensing, operational meshes, and creator provenance systems.
            </p>

            <div className="pt-2 text-xs font-mono text-[#948880]">
              HYDERABAD · EST. 2025
            </div>
          </div>

          {/* Directory: Systems */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block">
              Systems
            </span>
            <ul className="space-y-2 text-xs text-[#746860]">
              <li>
                <button onClick={() => handleSec('products')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  KrishiSetu
                </button>
              </li>
              <li>
                <button onClick={() => handleSec('products')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  InkSquirrel
                </button>
              </li>
              <li>
                <button onClick={() => handleSec('products')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  DetailMint
                </button>
              </li>
            </ul>
          </div>

          {/* Directory: Organization */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block">
              Organization
            </span>
            <ul className="space-y-2 text-xs text-[#746860]">
              <li>
                <button onClick={() => handleSec('why-us')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  Operating Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleSec('journey')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  Venture Chronicle
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  Publications
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  Careers & Roster
                </button>
              </li>
            </ul>
          </div>

          {/* Directory: Developers & Access */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block">
              Documentation
            </span>
            <ul className="space-y-2 text-xs text-[#746860]">
              <li>
                <button onClick={() => handleNav('docs')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  API Reference
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('docs')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  Client SDKs
                </button>
              </li>
              <li>
                <button onClick={() => handleSec('contact')} className="hover:text-[#BB6C43] transition-colors cursor-pointer">
                  Direct Inquiries
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#DED8D0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#948880]">
          <p className="font-mono text-[11px]">
            © {new Date().getFullYear()} CaretCoders LLP. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <button onClick={() => handleSec('contact')} className="hover:text-[#4A413C] transition-colors cursor-pointer">
              Privacy Notice
            </button>
            <button onClick={() => handleSec('contact')} className="hover:text-[#4A413C] transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button onClick={() => handleSec('contact')} className="hover:text-[#4A413C] transition-colors cursor-pointer">
              Security Compliance
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
