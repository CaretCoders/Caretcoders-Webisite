import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { productsData } from '../data/products';
import { Product } from '../types';
import { 
  ShieldCheck, 
  Sprout, 
  FileText, 
  ChevronRight, 
  Check, 
  X, 
  Layers, 
  Cpu, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const getProductIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Sprout':
      return Sprout;
    case 'FileText':
      return FileText;
    case 'ShieldCheck':
      return ShieldCheck;
    default:
      return Layers;
  }
};

export const ProductsSection: React.FC = () => {
  const [activeProductId, setActiveProductId] = useState<string>(productsData[0]?.id || 'precision-farming');

  const activeProduct = productsData.find(p => p.id === activeProductId) || productsData[0];
  const ActiveIcon = getProductIcon(activeProduct.iconName);

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#EBEFEE] border-b border-[#DED8D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DED8D0]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
              01 · Engineering Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#4A413C]">
              Systems Built with Intent
            </h2>
            <p className="text-sm sm:text-base text-[#746860] leading-relaxed">
              Purpose-built platforms solving systemic operational friction across multi-location commerce, precision agriculture, and creator rights protection.
            </p>
          </div>

          <div className="text-xs font-mono text-[#948880] self-start md:self-end">
            <span>{productsData.length} PRODUCTION DEPLOYMENTS</span>
          </div>
        </div>

        {/* Editorial Split Layout: Featured System Dossier (Left) + Systems Ledger (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Inspection Dossier (8 cols on lg) */}
          <div className="lg:col-span-7 studio-surface rounded-lg p-6 sm:p-10 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#DED8D0]">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded bg-[#F8F6F3] border border-[#DED8D0] flex items-center justify-center text-[#4A413C]">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#4A413C]">
                      {activeProduct.name}
                    </h3>
                    <div className="text-xs font-mono text-[#948880] flex items-center gap-1.5 mt-0.5">
                      <span>{activeProduct.type}</span>
                      <span aria-hidden="true">·</span>
                      <span>Launched {activeProduct.launchYear}</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#C8906D] font-medium px-2 py-0.5 bg-[#F3EFEA] border border-[#DED8D0] rounded">
                  {activeProduct.status}
                </span>
              </div>

              <blockquote className="text-sm sm:text-base italic font-serif text-[#746860] border-l-2 border-[#BB6C43] pl-4 py-0.5">
                "{activeProduct.hook}"
              </blockquote>

              <p className="text-sm text-[#746860] leading-relaxed">
                {activeProduct.fullDesc || activeProduct.shortDesc}
              </p>
            </div>

            {/* Core Architectural Capabilities */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block">
                Architectural Invariants & Capabilities
              </span>
              <div className="grid grid-cols-1 gap-2 border-t border-[#DED8D0] pt-3">
                {(activeProduct.highlights || []).map((highlight: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#4A413C]">
                    <span className="text-[#C8906D] font-mono text-xs mt-0.5 font-medium">{String(idx + 1).padStart(2, '0')}.</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantitative Metrics Strip */}
            {activeProduct.metrics && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block">
                  Measured Production Specifications
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#DED8D0] pt-3">
                  {activeProduct.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 bg-[#F8F6F3] rounded border border-[#DED8D0]">
                      <span className="text-[11px] font-mono text-[#948880] block">{m.label}</span>
                      <span className="text-sm font-semibold text-[#4A413C] block mt-1 tabular-nums">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack Tags */}
            {activeProduct.techStack && (
              <div className="space-y-2 pt-2 border-t border-[#DED8D0]">
                <div className="flex items-center justify-between text-xs font-mono text-[#948880]">
                  <span>CORE STACK COMPOSITION</span>
                  <div className="text-xs text-[#4A413C]">
                    {activeProduct.techStack.join(' · ')}
                  </div>
                </div>
              </div>
            )}

            {/* Direct Action Link */}
            <div className="pt-4 border-t border-[#DED8D0] flex items-center justify-between">
              <span className="text-xs text-[#948880]">
                Source-verified engineering dossier
              </span>
              {activeProduct.url && (
                <a
                  href={activeProduct.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-btn-primary px-4 py-2 text-xs inline-flex items-center space-x-1.5"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Systems Ledger Directory (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
                Select System to Inspect
              </span>
              <span className="text-xs font-mono text-[#948880]">
                INDEX 01–{String(productsData.length).padStart(2, '0')}
              </span>
            </div>

            <div className="space-y-2">
              {productsData.map((product, index) => {
                const isSelected = product.id === activeProductId;
                return (
                  <div
                    key={product.id}
                    onClick={() => setActiveProductId(product.id)}
                    className={`p-4 sm:p-5 rounded-lg border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-white border-[#BB6C43] shadow-sm ring-1 ring-[#BB6C43]/20'
                        : 'bg-[#F8F6F3] border-[#DED8D0] hover:border-[#C4BCB2]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-3">
                        <span className="font-mono text-xs text-[#948880] mt-0.5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-[#4A413C] flex items-center gap-1.5">
                            <span>{product.name}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#BB6C43]" />
                            )}
                          </h4>
                          <p className="text-xs text-[#746860] line-clamp-2">
                            {product.shortDesc}
                          </p>
                          <div className="text-[11px] font-mono text-[#C8906D] font-medium pt-1">
                            {product.category}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 pt-0.5">
                        <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-[#BB6C43]' : 'text-[#948880]'}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Editorial Footer Note */}
            <div className="p-4 rounded-lg bg-[#F3EFEA] border border-[#DED8D0] text-xs text-[#746860] space-y-1">
              <span className="font-semibold text-[#4A413C] block">System Integrity Principle</span>
              <p className="leading-relaxed">
                All listed systems are maintained and iteratively improved by CaretCoders with real production traffic.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
