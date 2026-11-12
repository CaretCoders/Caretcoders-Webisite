import { JobPosition } from '../types';

export const jobPositionsData: JobPosition[] = [
  {
    id: 'job-cofounder',
    title: 'Co-Founder',
    department: 'Executive & Strategy',
    location: 'Remote / Hybrid (Global)',
    type: 'Full-time / Equity Partner',
    experience: '5+ Years Leadership',
    description: 'Partner with CaretCoders core founders to drive strategic vision, enterprise partnerships, product roadmap expansion, and operational scaling across our AI tools, SaaS platforms, and digital engineering services.',
    requirements: [
      'Proven track record in technology startup leadership, product strategy, or venture scaling',
      'Strong vision for AI-driven software engineering, developer tools, and enterprise technology',
      'Deep expertise in business strategy, client acquisition, and scaling technical teams',
      'High autonomy, founder mindset, and passion for engineering excellence'
    ],
    responsibilities: [
      'Co-lead strategic direction, revenue models, and venture growth initiatives',
      'Build high-value enterprise partnerships and investor relationships',
      'Oversee cross-functional alignment between engineering, product design, and business operations'
    ],
    perks: ['Significant Co-Founder Equity Stake', 'Executive decision-making authority', 'Flexible global work setup', 'Annual executive retreats']
  },
  {
    id: 'job-bde',
    title: 'Business Development Executive',
    department: 'Business Growth & Partnerships',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Drive client acquisition, B2B sales pipelines, consultative tech sales, and strategic client partnerships for CaretCoders custom software development services, AI products, and SaaS suites.',
    requirements: [
      '2+ years experience in B2B tech sales, SaaS business development, or IT consulting sales',
      'Ability to understand technical solutions (AI tools, SaaS, cloud architectures) and present value to decision-makers',
      'Demonstrated success in lead generation, sales pipeline management, and closing software engineering deals',
      'Exceptional communication, proposal writing, and relationship-building skills'
    ],
    responsibilities: [
      'Identify, qualify, and convert enterprise leads for custom software & AI builds',
      'Manage end-to-end sales pipelines, client proposals, and commercial agreements',
      'Collaborate with engineering leads to scope technical proposals and consultation meetings'
    ],
    perks: ['Competitive base salary + uncapped commission structure', 'Flexible remote work hours', 'Health & learning stipends', 'Career growth path to Sales Leadership']
  }
];

export const cultureValues = [
  {
    title: 'Relentless Engineering Craftsmanship',
    tagline: 'Code as Art & System Precision',
    description: 'We treat software engineering as both an exact science and a creative discipline. Clean syntax, sub-millisecond execution, and retro cyberpunk visual polish define everything we ship.'
  },
  {
    title: 'Async-First & Deep Work Focus',
    tagline: 'Fewer Meetings, More Flow State',
    description: 'We protect maker time religiously. No endless status syncs or mandatory camera-on meetings. Communication is written, clear, and asynchronous by default.'
  },
  {
    title: 'Direct Client Impact',
    tagline: 'Zero Layers Between Devs and Real World',
    description: 'Whether you are tuning zk-proofs for DetailMint or testing LoRaWAN nodes on farms, every engineer sees the direct real-world impact of their code.'
  },
  {
    title: 'Continuous AI Sandbox R&D',
    tagline: 'Always Experimenting on the Bleeding Edge',
    description: 'Every team member receives unlimited compute budgets, AI API access, and dedicated Friday hack hours to prototype crazy ideas that could become our next flagship product.'
  }
];

export const internshipProgramInfo = {
  title: 'CaretCoders Cyber-Fellowship Internship Program',
  duration: '12 to 16 Weeks (Paid)',
  stipend: '$4,500 - $6,000 / month',
  eligibility: 'Undergraduate, Master, PhD students or self-taught developers with strong GitHub portfolios.',
  highlights: [
    'Mentorship from senior leads in Cryptography, AgriTech AI, and Developer Tooling',
    'Direct code contributions merged into production platforms (DetailMint, Precision Farming, InkSquirel)',
    '100% remote with sponsored home office hardware setup',
    'High conversion rate to full-time roles upon graduation'
  ]
};
