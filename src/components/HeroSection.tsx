import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationPage, HomeSection } from '../types';
import { ChevronRight, ArrowUpRight, ShieldCheck, Sprout, FileText, Cpu, Sparkles, Layers } from 'lucide-react';
import { BirdFlockCanvas } from './BirdFlockCanvas';

interface HeroSectionProps {
  onNavigatePage: (page: NavigationPage) => void;
  onScrollSection: (sectionId: HomeSection) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigatePage,
  onScrollSection
}) => {
  const [activeTab, setActiveTab] = useState<'agritech' | 'inksquirel' | 'detailmint'>('agritech');

  const productsPreview: Record<'agritech' | 'inksquirel' | 'detailmint', {
    name: string;
    badge: string;
    tagline: string;
    url?: string;
    description: string;
    stats: { label: string; value: string }[];
    icon: typeof ShieldCheck;
    accent: string;
  }> = {
    agritech: {
      name: 'Vashudha',
      badge: 'Machine Learning & IoT',
      tagline: 'Cultivating Tomorrow with Telemetry',
      url: 'https://vashudha.in/',
      description: 'Combining custom IoT mesh sensors with machine learning to help agricultural producers achieve identical yields with over 60% reduced chemical inputs.',
      stats: [
        { label: 'Technology', value: 'IoT Mesh + PyTorch' },
        { label: 'Target', value: '60%+ Less Chemical Inputs' },
        { label: 'Status', value: 'Experimental 2027-28' }
      ],
      icon: Sprout,
      accent: '#2D6A4F'
    },
    inksquirel: {
      name: 'InkSquirel',
      badge: 'Creator Protection Platform',
      tagline: 'Where Ideas Find Ink',
      url: '/inksquirrel.html',
      description: 'Affordable web platform enabling independent creators to anchor immutable proof of creation, organize project vaults, and share controlled pitch decks securely.',
      stats: [
        { label: 'Platform', value: 'Web Application' },
        { label: 'Core Mechanism', value: 'Proof of Creation' },
        { label: 'Status', value: '2028 - 2029' }
      ],
      icon: FileText,
      accent: '#C25E38'
    },
    detailmint: {
      name: 'Detail mint',
      badge: 'Multi-Location Platform',
      tagline: 'Because Every Detailer Needs Detailing',
      description: 'Streamlined multi-platform operations for automotive care businesses: automated employee scheduling, material processing, and real-time multi-branch revenue tracking.',
      stats: [
        { label: 'Architecture', value: 'Multi-Platform App' },
        { label: 'Scope', value: 'Multi-Location Operations' },
        { label: 'Status', value: '2027 Planned' }
      ],
      icon: ShieldCheck,
      accent: '#1D1D1F'
    }
  };

  const currentPreview = productsPreview[activeTab];
  const IconComponent = currentPreview.icon;

  return (
    <section id="hero" className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden bg-[#EBEFEE] border-b border-[#DED8D0]">
      {/* Subdued Ambient Murmuration Canvas Texture */}
      <BirdFlockCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Keynote-Grade Hero Introduction */}
        <div className="text-center max-w-4xl mx-auto space-y-6">

          {/* Clean Editorial Title - Semi-transparent Glass Design & Strictly Enforced Single Line */}
          <div className="flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center max-w-full px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full bg-white/75 backdrop-blur-md border border-[#DED8D0] shadow-[0_2px_12px_rgba(74,65,60,0.04)]"
            >
              <h1 className="text-[1.35rem] min-[380px]:text-[1.65rem] min-[480px]:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#4A413C] leading-[1.1] select-none whitespace-nowrap">
                Somehow it works!
              </h1>
            </motion.div>
          </div>

          {/* Subheading - Authentic Human Prose */}
          <p className="text-base sm:text-lg md:text-xl text-[#746860] font-normal max-w-2xl mx-auto leading-relaxed tracking-tight text-balance">
            CaretCoders is a software research and venture engineering studio. We build mission-critical systems across precision agriculture, creator rights, and operational intelligence.
          </p>

          {/* Action Buttons - Clean Single-Line Controls */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm font-medium">
            <button
              onClick={() => onScrollSection('products')}
              className="studio-btn-primary px-5 py-2.5 text-sm"
            >
              <span>Explore Systems</span>
              <ChevronRight className="w-4 h-4 ml-1 opacity-80" />
            </button>

            <button
              onClick={() => onNavigatePage('blog')}
              className="studio-btn-secondary px-5 py-2.5 text-sm"
            >
              <span>Read Publications</span>
            </button>

            <button
              onClick={() => onNavigatePage('docs')}
              className="studio-link text-sm px-2 py-2"
            >
              <span>API Reference</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Engineering Spec Surface */}
        <div className="mt-14 sm:mt-18 max-w-5xl mx-auto">
          {/* Segmented Control Bar */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 rounded-md bg-[#F3EFEA] border border-[#DED8D0]">
              {(['agritech', 'inksquirel', 'detailmint'] as const).map((key) => {
                const isSelected = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 sm:px-5 py-1.5 text-xs sm:text-[13px] font-medium rounded transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#4A413C] shadow-sm border border-[#DED8D0]'
                        : 'text-[#746860] hover:text-[#4A413C]'
                    }`}
                  >
                    {productsPreview[key].name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean Studio Spec Surface */}
          <div className="studio-surface rounded-lg p-6 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Left Information Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[#948880]">
                      <span>System Architecture</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span className="text-[#C8906D] font-medium">{currentPreview.badge}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#4A413C]">
                      {currentPreview.name}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-[#746860]">
                      {currentPreview.tagline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#746860] leading-relaxed">
                    {currentPreview.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#DED8D0]">
                    {currentPreview.stats.map((stat, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[11px] text-[#948880] block">{stat.label}</span>
                        <span className="text-xs sm:text-sm font-semibold text-[#4A413C] block tabular-nums">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center space-x-4">
                    {currentPreview.url ? (
                      <a
                        href={currentPreview.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="studio-btn-primary px-4 py-2 text-xs inline-flex items-center space-x-1.5"
                      >
                        <span>Launch Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                    <button
                      onClick={() => onScrollSection('products')}
                      className="studio-link text-xs sm:text-sm"
                    >
                      <span>View Full Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Right Technical Specification Panel */}
                <div className="lg:col-span-5 bg-[#F3EFEA] rounded-md p-6 space-y-5 border border-[#DED8D0]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DED8D0]">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded bg-white border border-[#DED8D0] flex items-center justify-center text-[#4A413C]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[#4A413C]">{currentPreview.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#948880]">SPECS</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-[#DED8D0]/60">
                      <span className="text-[#948880]">Core Stack</span>
                      <span className="font-mono text-[#4A413C]">
                        {activeTab === 'detailmint' ? 'React Native · Node' : activeTab === 'agritech' ? 'PyTorch · LoRaWAN' : 'TypeScript · Gemini'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-[#DED8D0]/60">
                      <span className="text-[#948880]">Data Persistence</span>
                      <span className="font-mono text-[#4A413C]">PostgreSQL · TimeSeries</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-[#DED8D0]/60">
                      <span className="text-[#948880]">Deployment Tier</span>
                      <span className="font-mono text-[#4A413C]">Edge & Cloud Hybrid</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#948880] leading-relaxed pt-1">
                    Audited for production reliability, memory safety, and verifiable domain constraints.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Three Value Pillars Summary Strip */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-[#DED8D0] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A413C] block">Multi-Location Mesh</span>
            <p className="text-xs sm:text-sm text-[#746860] leading-relaxed">
              Unified resource telemetry, employee scheduling, and revenue synchronization for distributed enterprise locations.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A413C] block">Agritech Sensing</span>
            <p className="text-xs sm:text-sm text-[#746860] leading-relaxed">
              Continuous soil microbiome monitoring with computer vision to drastically reduce agricultural chemical inputs.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A413C] block">Provenance & Rights</span>
            <p className="text-xs sm:text-sm text-[#746860] leading-relaxed">
              Immutable cryptographic proof of creation and access-controlled deck sharing engineered for creators.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
