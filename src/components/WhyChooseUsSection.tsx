import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Layers, 
  Hammer, 
  FlaskConical, 
  Lightbulb, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const principles = [
    {
      id: '01',
      title: 'Problem First, Technology Second',
      icon: Target,
      content: [
        'We don’t begin by asking, "What technology should we use?"',
        'We begin by understanding the problem, the people, and the workflow behind it. Then we build technology that actually fits.'
      ]
    },
    {
      id: '02',
      title: 'Ideas Into Working Products',
      icon: Layers,
      content: [
        'An idea is only valuable when it can be tested in the real world.',
        'We take concepts beyond discussions and prototypes, turning them into usable products that can be experienced, tested, and improved.'
      ]
    },
    {
      id: '03',
      title: 'Learn by Building',
      icon: Hammer,
      content: [
        'We are a team of young builders who believe experience comes from doing.',
        'Every project is an opportunity to experiment, learn something new, and improve how we build.'
      ]
    },
    {
      id: '04',
      title: 'Built Through Experimentation',
      icon: FlaskConical,
      content: [
        'Not every idea works on the first attempt.',
        'We embrace experimentation, test assumptions, learn from failures, and continuously improve until we find what works.'
      ]
    },
    {
      id: '05',
      title: 'Technology With Purpose',
      icon: Lightbulb,
      content: [
        'We use technology as a tool to solve problems, not as the solution itself.',
        'From software to AI and emerging technologies, we choose what makes sense for the problem.'
      ]
    },
    {
      id: '06',
      title: 'Building What Comes Next',
      icon: TrendingUp,
      content: [
        'Caretcoders is not just focused on delivering projects.',
        'We are building products, exploring new ideas, and creating a team capable of turning difficult problems into meaningful solutions.'
      ]
    }
  ];

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#EBEFEE] border-b border-[#DED8D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header & Manifesto Intro */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
            02 · Operating Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#4A413C] leading-[1.12]">
            We Learn by Building. <br className="hidden sm:inline" />
            We Build to Solve.
          </h2>
          <p className="text-base sm:text-lg text-[#746860] leading-relaxed pt-2">
            CaretCoders is built around a singular engineering conviction: the fastest, truest path to deep domain mastery is building functional systems for real human operators.
          </p>
        </div>

        {/* 6 Core Principles - Editorial Hairline 2-Column Grid */}
        <div className="border-t border-[#DED8D0] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#DED8D0]">
          
          {/* Column 1 (Principles 01, 02, 03) */}
          <div className="divide-y divide-[#DED8D0]">
            {principles.slice(0, 3).map((item) => (
              <div key={item.id} className="py-8 sm:py-10 pr-0 md:pr-10 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-semibold text-[#C8906D]">
                    {item.id}
                  </span>
                  <div className="h-px w-6 bg-[#DED8D0]" />
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#4A413C]">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-2 text-sm text-[#746860] leading-relaxed pl-8">
                  {item.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Principles 04, 05, 06) */}
          <div className="divide-y divide-[#DED8D0]">
            {principles.slice(3, 6).map((item) => (
              <div key={item.id} className="py-8 sm:py-10 pl-0 md:pl-10 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-semibold text-[#C8906D]">
                    {item.id}
                  </span>
                  <div className="h-px w-6 bg-[#DED8D0]" />
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#4A413C]">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-2 text-sm text-[#746860] leading-relaxed pl-8">
                  {item.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Quiet Editorial Manifesto Summary */}
        <div className="p-8 sm:p-10 rounded-lg bg-white border border-[#DED8D0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#948880]">
              PRACTICE STANDARD
            </span>
            <p className="text-base sm:text-lg font-medium text-[#4A413C] leading-snug">
              We don't just write code. We explore, experiment, build, and learn—one real problem at a time.
            </p>
          </div>
          <span className="font-mono text-xs text-[#948880] whitespace-nowrap">
            EST. CARETSYSTEMS
          </span>
        </div>

      </div>
    </section>
  );
};

