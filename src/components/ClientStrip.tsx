import React from 'react';
import { loadClients } from '../utils/contentLoader';
import { ExternalLink, ShieldCheck, Building2 } from 'lucide-react';

export const ClientStrip: React.FC = () => {
  const clients = loadClients();

  if (!clients || clients.length === 0) return null;

  return (
    <section id="clients" className="py-14 sm:py-20 bg-[#EBEFEE] border-b border-[#DED8D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DED8D0] pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[#C8906D]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Served Organizations & Client Advisory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#4A413C]">
              Enterprise Systems & Client Deployments
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#746860] max-w-md">
            Production software engineering and technical architecture delivered across enterprise IoT, cloud infrastructure, and developer platforms.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, idx) => (
            <div
              key={client.id || idx}
              className="bg-white rounded-md border border-[#DED8D0] p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-[#BB6C43] transition-all duration-150 shadow-sm group"
            >
              <div className="space-y-4">
                {/* Header: Logo / Emblem & Category */}
                <div className="flex items-start justify-between gap-3 border-b border-[#DED8D0]/60 pb-3.5">
                  <div className="flex items-center space-x-3">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-10 h-10 object-contain rounded bg-[#F8F6F3] p-1 border border-[#DED8D0]"
                        onError={(e) => {
                          // Fallback to text monogram if logo fails to load
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-[#F3EFEA] border border-[#DED8D0] flex items-center justify-center text-[#BB6C43] font-mono font-semibold text-sm">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-base text-[#4A413C] tracking-tight group-hover:text-[#BB6C43] transition-colors">
                        {client.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#948880] block">
                        {client.category}
                      </span>
                    </div>
                  </div>

                  {client.websiteUrl && (
                    <a
                      href={client.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded hover:bg-[#F3EFEA] text-[#948880] hover:text-[#4A413C] transition-colors"
                      aria-label={`Visit ${client.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Service Provided Description (Strictly under 50 words) */}
                <p className="text-xs sm:text-sm text-[#746860] leading-relaxed">
                  {client.description}
                </p>
              </div>

              {/* Footer status / telemetry */}
              <div className="pt-3 border-t border-[#DED8D0]/60 flex items-center justify-between text-[11px] font-mono text-[#948880]">
                <span>ENGAGEMENT ARCHITECTURE</span>
                <span className="text-[#C8906D] font-medium">PRODUCTION DEPLOYED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
