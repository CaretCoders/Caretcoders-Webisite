import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send, Globe, Clock, Shield, Github, Linkedin, Twitter } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Research Partnership',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#EBEFEE] border-b border-[#DED8D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
            05 · Direct Communication
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#4A413C]">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-[#746860] leading-relaxed">
            Direct channels for venture collaborations, enterprise system integrations, precision agritech audits, and creator protection platforms.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Office Info & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="studio-surface rounded-lg p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#DED8D0] pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#948880] block">
                  Studio Channels
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-[#4A413C] mt-1">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#4A413C]">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded bg-[#F8F6F3] border border-[#DED8D0] flex items-center justify-center flex-shrink-0 text-[#BB6C43]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#948880] uppercase font-mono">Location</span>
                    <span className="font-medium text-[#4A413C]">Hyderabad, India</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded bg-[#F8F6F3] border border-[#DED8D0] flex items-center justify-center flex-shrink-0 text-[#BB6C43]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#948880] uppercase font-mono">Email</span>
                    <a href="mailto:contact@caretcoders.com" className="hover:underline font-medium text-[#4A413C]">
                      contact@caretcoders.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded bg-[#F8F6F3] border border-[#DED8D0] flex items-center justify-center flex-shrink-0 text-[#BB6C43]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#948880] uppercase font-mono">Domain</span>
                    <a href="https://caretcoders.com" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-[#4A413C]">
                      caretcoders.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded bg-[#F8F6F3] border border-[#DED8D0] flex items-center justify-center flex-shrink-0 text-[#BB6C43]">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#948880] uppercase font-mono">GitHub</span>
                    <a href="https://github.com/CaretCoders" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-[#4A413C]">
                      github.com/CaretCoders
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded bg-[#F8F6F3] border border-[#DED8D0] flex items-center justify-center flex-shrink-0 text-[#BB6C43]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#948880] uppercase font-mono">LinkedIn</span>
                    <a href="https://www.linkedin.com/company/caretcoders-llp/" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-[#4A413C]">
                      linkedin.com/company/caretcoders-llp
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-8 h-8 rounded bg-[#F8F6F3] border border-[#DED8D0] flex items-center justify-center flex-shrink-0 text-[#BB6C43]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#948880] uppercase font-mono">Hours</span>
                    <span className="text-[#746860] font-mono text-xs">Mon–Fri: 09:00–22:00 (IST)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7 studio-surface rounded-lg p-6 sm:p-10 space-y-6">
            <div className="border-b border-[#DED8D0] pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
                Inquiry Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#4A413C] mt-1">
                Send a Message
              </h3>
            </div>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#948880] mb-1.5">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Jane Doe"
                      className="w-full bg-[#F8F6F3] border border-[#DED8D0] rounded-md px-3.5 py-2.5 text-[#4A413C] focus:outline-none focus:border-[#BB6C43] transition-colors placeholder:text-[#948880]/60"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#948880] mb-1.5">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="jane@company.com"
                      className="w-full bg-[#F8F6F3] border border-[#DED8D0] rounded-md px-3.5 py-2.5 text-[#4A413C] focus:outline-none focus:border-[#BB6C43] transition-colors placeholder:text-[#948880]/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#948880] mb-1.5">
                      Organization
                    </label>
                    <input 
                      type="text" 
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      placeholder="Organization Name"
                      className="w-full bg-[#F8F6F3] border border-[#DED8D0] rounded-md px-3.5 py-2.5 text-[#4A413C] focus:outline-none focus:border-[#BB6C43] transition-colors placeholder:text-[#948880]/60"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#948880] mb-1.5">
                      Subject Matter
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                      className="w-full bg-[#F8F6F3] border border-[#DED8D0] rounded-md px-3.5 py-2.5 text-[#4A413C] focus:outline-none focus:border-[#BB6C43] transition-colors cursor-pointer"
                    >
                      <option value="Research Partnership">Research & Development</option>
                      <option value="DetailMint Enterprise">DetailMint Integration</option>
                      <option value="Agritech Telemetry">Agritech Telemetry</option>
                      <option value="InkSquirel Creator">InkSquirrel Platform</option>
                      <option value="General Engineering">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#948880] mb-1.5">
                    Message *
                  </label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your project requirements, operational scope, or collaboration inquiry..."
                    className="w-full bg-[#F8F6F3] border border-[#DED8D0] rounded-md p-3.5 text-[#4A413C] focus:outline-none focus:border-[#BB6C43] transition-colors placeholder:text-[#948880]/60"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full studio-btn-primary py-3 text-xs sm:text-sm font-medium cursor-pointer"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="p-8 bg-[#F3EFEA] rounded-md border border-[#DED8D0] space-y-3 text-center">
                <div className="w-10 h-10 rounded-full bg-[#BB6C43] text-white mx-auto flex items-center justify-center shadow-sm">
                  <Check className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-[#4A413C]">Message Sent</h4>
                  <p className="text-xs sm:text-sm text-[#746860]">
                    Thank you, <strong className="text-[#4A413C]">{formData.name}</strong>. Your message regarding <strong className="text-[#4A413C]">{formData.inquiryType}</strong> has been received.
                  </p>
                </div>
                <p className="text-xs font-mono text-[#948880]">
                  Typical response time: within 24 business hours.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
