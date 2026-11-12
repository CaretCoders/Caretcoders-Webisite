import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cultureValues, internshipProgramInfo } from '../data/careers';
import { loadCareers } from '../utils/contentLoader';
import { JobPosition } from '../types';
import { MapPin, Briefcase, Clock, ChevronRight, X, Check, Send, Award, Sparkles, Heart } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const jobPositions = loadCareers();
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    portfolio: '',
    coverNote: ''
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#EBEFEE] py-16 sm:py-24 text-[#4A413C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C8906D]">
            Engineering Roster & Fellowships
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-[#4A413C]">
            Careers & Technical Roster
          </h1>
          <p className="text-sm sm:text-base text-[#746860] leading-relaxed">
            Join a lean, high-autonomy research and engineering group solving systemic operational challenges across high-throughput platforms, agriculture, and developer tooling.
          </p>
        </div>

        {/* Culture & Operating Principles */}
        <div className="space-y-6">
          <div className="border-b border-[#DED8D0] pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
              Team Operational Values
            </span>
            <span className="text-xs font-mono text-[#948880]">STANDARDS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((val, idx) => (
              <div key={idx} className="studio-surface rounded-md p-6 space-y-3">
                <span className="font-mono text-xs text-[#C8906D] font-semibold block">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <h3 className="font-semibold text-base text-[#4A413C] tracking-tight">{val.title}</h3>
                <p className="text-xs font-medium text-[#746860]">{val.tagline}</p>
                <p className="text-xs text-[#746860] leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="space-y-6">
          <div className="border-b border-[#DED8D0] pb-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
              Open Positions ({jobPositions.length})
            </span>
            <span className="text-xs font-mono text-[#948880]">HYBRID · HYDERABAD / REMOTE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {jobPositions.map((job) => (
              <div
                key={job.id}
                onClick={() => {
                  setSelectedJob(job);
                  setApplicationSubmitted(false);
                }}
                className="studio-surface rounded-md p-6 sm:p-8 flex flex-col justify-between space-y-6 group cursor-pointer hover:border-[#BB6C43] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#948880] border-b border-[#DED8D0] pb-3">
                    <span className="text-[#4A413C] font-semibold">{job.department}</span>
                    <span className="flex items-center gap-1 text-[#746860]"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold tracking-tight text-[#4A413C] group-hover:text-[#BB6C43] transition-colors">
                      {job.title}
                    </h3>
                    <div className="text-xs font-mono text-[#948880] flex items-center gap-2">
                      <span>{job.type}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#746860] leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#DED8D0] text-xs">
                  <span className="text-[11px] font-mono text-[#948880]">
                    {job.perks[0]}
                  </span>
                  <span className="studio-link text-xs">
                    <span>View Role & Apply</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Fellowship Banner */}
        <div className="studio-surface rounded-md p-8 sm:p-10 space-y-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#948880]">
            <span className="font-semibold text-[#4A413C]">ANNUAL FELLOWSHIP</span>
            <span aria-hidden="true">·</span>
            <span>{internshipProgramInfo.duration}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#BB6C43] font-semibold">{internshipProgramInfo.stipend}</span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#4A413C]">
              {internshipProgramInfo.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#746860] leading-relaxed">
              {internshipProgramInfo.eligibility}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {internshipProgramInfo.highlights.map((h, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-[#4A413C]">
                <Check className="w-4 h-4 text-[#BB6C43] mt-0.5 flex-shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Job Details & Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-[#4A413C]/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-md border border-[#DED8D0] max-w-2xl w-full p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto shadow-xl text-[#4A413C]"
            >
              <div className="flex items-start justify-between border-b border-[#DED8D0] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#C8906D] block">{selectedJob.department} • {selectedJob.location}</span>
                  <h3 className="text-2xl font-semibold tracking-tight mt-1 text-[#4A413C]">{selectedJob.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded hover:bg-[#F3EFEA] text-[#948880] hover:text-[#4A413C] transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!applicationSubmitted ? (
                <div className="space-y-6 text-xs sm:text-sm text-[#746860]">
                  <p className="leading-relaxed text-[#4A413C]">
                    {selectedJob.description}
                  </p>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block font-semibold">
                      Core Prerequisites
                    </span>
                    <div className="space-y-1.5">
                      {selectedJob.requirements.map((req, i) => (
                        <div key={i} className="flex items-start space-x-2 text-[#4A413C]">
                          <Check className="w-3.5 h-3.5 text-[#BB6C43] mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block font-semibold">
                      Primary Responsibilities
                    </span>
                    <div className="space-y-1.5">
                      {selectedJob.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start space-x-2 text-[#4A413C]">
                          <ChevronRight className="w-3.5 h-3.5 text-[#C8906D] mt-0.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Application Form */}
                  <form onSubmit={handleApply} className="p-5 bg-[#F8F6F3] rounded-md border border-[#DED8D0] space-y-3 pt-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#4A413C] block font-semibold">
                      Submit Candidacy
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        required
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white border border-[#DED8D0] rounded px-3 py-2 text-xs text-[#4A413C] placeholder:text-[#948880] focus:outline-none focus:border-[#BB6C43]"
                      />
                      <input 
                        type="email" 
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-white border border-[#DED8D0] rounded px-3 py-2 text-xs text-[#4A413C] placeholder:text-[#948880] focus:outline-none focus:border-[#BB6C43]"
                      />
                    </div>

                    <input 
                      type="text" 
                      placeholder="GitHub / Portfolio URL"
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                      className="w-full bg-white border border-[#DED8D0] rounded px-3 py-2 text-xs text-[#4A413C] placeholder:text-[#948880] focus:outline-none focus:border-[#BB6C43]"
                    />

                    <textarea 
                      rows={2}
                      placeholder="Brief note on your work and alignment..."
                      value={formData.coverNote}
                      onChange={(e) => setFormData({...formData, coverNote: e.target.value})}
                      className="w-full bg-white border border-[#DED8D0] rounded p-3 text-xs text-[#4A413C] placeholder:text-[#948880] focus:outline-none focus:border-[#BB6C43]"
                    />

                    <button
                      type="submit"
                      className="w-full studio-btn-primary py-2.5 text-xs font-medium cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      <span>Transmit Application</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-8 bg-[#F8F6F3] rounded-md border border-[#DED8D0] space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#CCB499]/30 text-[#BB6C43] mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-semibold text-[#4A413C]">Application Transmitted</h4>
                    <p className="text-xs sm:text-sm text-[#746860]">
                      Thank you, <strong className="text-[#4A413C]">{formData.name}</strong>. Your dossier for <strong className="text-[#4A413C]">{selectedJob.title}</strong> has been placed in our review queue.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="studio-btn-primary px-5 py-2 text-xs cursor-pointer"
                  >
                    Close Dialog
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
