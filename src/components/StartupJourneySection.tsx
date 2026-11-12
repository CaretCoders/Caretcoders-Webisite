import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { storyLevelsData, partyMembersData, StoryLevel } from '../data/journey';
import { Calendar, ChevronRight, X, Award, Check } from 'lucide-react';

export const StartupJourneySection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<StoryLevel | null>(null);

  const formatPhaseLabel = (level: string) => {
    switch (level) {
      case 'LEVEL 01': return 'Phase 01 · Inception';
      case 'LEVEL 02': return 'Phase 02 · Field Research';
      case 'LEVEL 03': return 'Phase 03 · Team Assembly';
      case 'LEVEL 04': return 'Phase 04 · Market Validation';
      case 'LEVEL 05': return 'Phase 05 · Venture Expansion';
      default: return level;
    }
  };

  return (
    <section id="journey" className="py-20 sm:py-28 bg-[#EBEFEE] border-b border-[#DED8D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#DED8D0]">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
              04 · Venture Chronicle
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#4A413C]">
              Origins & Verified Milestones
            </h2>
            <p className="text-sm sm:text-base text-[#746860] leading-relaxed">
              From accounting operational observations in automotive detailing to 12 commercial pilots, Startup India recognition, and precision agritech research.
            </p>
          </div>

          <div className="text-xs font-mono text-[#948880] self-start md:self-end">
            <span>FOUNDED 2025 · ACTIVE PROGRESSION</span>
          </div>
        </div>

        {/* Editorial Vertical Milestone Chronicle */}
        <div className="relative border-l border-[#DED8D0] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {storyLevelsData.map((story) => (
            <div 
              key={story.level}
              className="relative group cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              {/* Timeline Bullet Node with Amber Accent */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-4 w-3.5 h-3.5 bg-white border-2 border-[#BB6C43] rounded-full group-hover:scale-125 transition-transform shadow-sm" />

              <div className="studio-surface rounded-lg p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#948880] border-b border-[#DED8D0] pb-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#C8906D]">{formatPhaseLabel(story.level)}</span>
                  </div>
                  {story.date && (
                    <div className="flex items-center space-x-1.5 text-[#948880]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{story.date}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#4A413C] group-hover:text-[#BB6C43] transition-colors">
                    {story.title}
                  </h3>
                  {story.subtitle && (
                    <p className="text-xs sm:text-sm text-[#746860] font-medium">
                      {story.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#746860] leading-relaxed line-clamp-3">
                  {story.description}
                </p>

                {/* Team Roster in Milestone 03 */}
                {story.level === 'LEVEL 03' && partyMembersData.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#DED8D0]">
                    {partyMembersData.slice(0, 4).map((member, i) => (
                      <div key={i} className="p-3 bg-[#F8F6F3] rounded border border-[#DED8D0] space-y-0.5">
                        <span className="font-semibold text-xs text-[#4A413C] block">{member.name}</span>
                        <span className="text-[11px] text-[#948880] block">
                          {member.role || member.designation}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-medium pt-3 border-t border-[#DED8D0]">
                  <span className="studio-link text-xs">
                    <span>Inspect Full Chronicle</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                  <span className="font-mono text-[11px] text-[#948880]">
                    {story.achievement || 'DOCUMENTED'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Milestone Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-lg border border-[#DED8D0] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-xl text-[#4A413C]"
            >
              <div className="flex items-start justify-between border-b border-[#DED8D0] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#C8906D] font-medium block">{formatPhaseLabel(selectedStory.level)}</span>
                  <h3 className="text-2xl font-semibold tracking-tight mt-1 text-[#4A413C]">{selectedStory.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="p-1.5 rounded hover:bg-black/[0.05] text-[#948880] hover:text-[#4A413C] transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-[#746860]">
                {selectedStory.subtitle && (
                  <p className="text-base font-medium text-[#4A413C]">{selectedStory.subtitle}</p>
                )}
                <p className="leading-relaxed text-[#4A413C]">{selectedStory.description}</p>

                {selectedStory.level === 'LEVEL 03' && partyMembersData.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block">
                      Core Technical Roster
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {partyMembersData.map((member, i) => (
                        <div key={i} className="p-3 bg-[#F8F6F3] rounded border border-[#DED8D0] space-y-1">
                          <span className="font-semibold text-xs text-[#4A413C] block">{member.name}</span>
                          <div className="text-xs space-y-0.5">
                            <div className="text-[#4A413C]">
                              <span className="text-[#948880]">Role: </span>{member.role || member.designation}
                            </div>
                            {member.specialization && (
                              <div className="text-[#746860]">
                                {member.specialization}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStory.bossEncounter && (
                  <div className="p-4 bg-[#F3EFEA] rounded border border-[#DED8D0] space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#4A413C] block font-semibold">
                      Market Reality & Strategic Independence
                    </span>
                    <p className="text-xs text-[#746860] leading-relaxed">
                      Maintained technical independence to focus on multi-domain engineering across precision agriculture, creator tools, and real-world industrial software.
                    </p>
                  </div>
                )}

                {selectedStory.achievement && (
                  <div className="p-3.5 bg-[#F3EFEA] rounded border border-[#DED8D0] flex items-center space-x-3 text-xs text-[#4A413C] font-medium font-mono">
                    <Award className="w-4 h-4 text-[#BB6C43] flex-shrink-0" />
                    <span>MILESTONE: {selectedStory.achievement}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#DED8D0] flex justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="studio-btn-primary px-4 py-2 text-xs"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
