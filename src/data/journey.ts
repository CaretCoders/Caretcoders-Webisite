import { Milestone } from '../types';

export interface StoryLevel {
  level: string;
  badge: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
  achievement?: string;
  xp?: string;
  bossEncounter?: string;
  type: 'start' | 'side-quest' | 'party' | 'boss' | 'new-quest';
}

export interface PartyMember {
  name: string;
  role: string;
  designation: string;
  specialization?: string;
  education?: string[];
  interests?: string[];
  funFact?: string;
  email?: string;
}

export const storyLevelsData: StoryLevel[] = [
  {
    level: 'LEVEL 01',
    badge: 'PRESS START',
    title: 'Caretcoders Initialized',
    date: '23 July 2025',
    description: 'What began as client work soon became something bigger. Rahil realized that creating impactful software requires a collaborative community of innovators who work together to solve real-world problems through creativity, critical thinking, and disciplined execution.',
    achievement: 'Caretcoders Initialized',
    type: 'start'
  },
  {
    level: 'LEVEL 02',
    badge: 'SIDE QUEST',
    title: 'Finding the First Mission',
    subtitle: 'DetailMint Discovery',
    description: 'Before Caretcoders, Rahil worked as an accountant in a car detailing company. Conversations with owners and technicians exposed everyday operational struggles that software could solve. That observation became the first mission: DetailMint. Not an idea born in a meeting room—but from listening to people doing real work.',
    achievement: 'Problem Discovered',
    xp: '+250 XP',
    type: 'side-quest'
  },
  {
    level: 'LEVEL 03',
    badge: 'PARTY ASSEMBLED',
    title: 'The Party Grows',
    subtitle: 'Great adventures aren’t played solo. As the vision grew, so did the team.',
    description: 'Different paths. One mission. Bringing together expertise across software development, robotics, architecture, geoinformatics, and machine learning.',
    achievement: 'The Party Grows',
    type: 'party'
  },
  {
    level: 'LEVEL 04',
    badge: 'BOSS BATTLE',
    title: 'Reality Encounter',
    subtitle: '12 Pilots & Startup India Recognition vs. Market Reality',
    description: 'DetailMint reached MVP stage. Twelve businesses agreed to pilot the platform, and the product earned appreciation through Startup India interactions. Then came the reality check. Funding applications were declined because the market was considered too narrow. At the same time, changes in the automotive industry and market conditions made expansion significantly harder. Instead of forcing a launch, the team chose to pause. Not every battle is won by charging forward. Sometimes the smartest move is to regroup.',
    bossEncounter: 'Reality',
    type: 'boss'
  },
  {
    level: 'LEVEL 05',
    badge: 'NEW QUEST ACCEPTED',
    title: 'Chemical-Reduced Precision Farming',
    subtitle: 'Expanding Vision Beyond Software',
    description: 'Every setback unlocked a new direction. Rather than giving up, Caretcoders expanded its vision beyond software. Today, the team is researching and developing a Chemical-Reduced Precision Farming Initiative, combining technology, research, and innovation to help address one of humanity’s oldest challenges—how to grow more while using fewer chemicals.',
    achievement: 'New Mission Accepted',
    type: 'new-quest'
  }
];

export const partyMembersData: PartyMember[] = [
  {
    name: 'Rahil Shrivas',
    role: 'Founder & Managing Partner',
    designation: 'Founder & Managing Partner',
    specialization: 'Accounts Analyst & Software Developer',
    education: [
      'Bachelor of Commerce (B.Com) with Computer Applications',
      'Master of Computer Applications (MCA)'
    ],
    interests: [
      'Motorcycling',
      'Computer Hardware Enthusiast',
      'Coffee Lover'
    ],
    funFact: "Known for being the team’s chatterbox—there’s always a story, idea, or conversation brewing."
  },
  {
    name: 'Harepriya A G',
    role: 'Co-Founder & Partner',
    designation: 'Co-Founder & Partner',
    specialization: 'Software Developer & Robotics enthusiast',
    interests: [
      'Robotics & Embedded Systems',
      'Software Architecture',
      'Robotics & Automation Research'
    ],
    funFact: 'Passionate about integrating robotics intelligence and hardware mechanics with modern software stacks.'
  },
  {
    name: 'Garnisha Shree',
    role: 'Co-Founder & Partner',
    designation: 'Co-Founder & Partner',
    specialization: 'Architect & Geoinformatics',
    interests: [
      'Architectural Systems',
      'Geoinformatics & Spatial Mapping',
      'Sustainable Urban Analytics'
    ],
    funFact: 'Bridges spatial geographical telemetry and architectural design thinking into scalable software solutions.'
  },
  {
    name: 'Arin Mudgal',
    role: 'AI & ML Engineer (Backend-Focused)',
    designation: 'AI & ML Engineer (Backend-Focused)',
    specialization: 'AI & ML Engineer (Backend-Focused)',
    education: [
      'Bachelor of Technology (B.Tech) – Lovely Professional University'
    ],
    interests: [
      'Tea & Caffeine',
      'Dancer',
      'Loves Camping',
      'Exploring New Technologies'
    ],
    funFact: 'A tea enthusiast with a sharp hairstyle, he starts each day with style and caffeine'
  }
];

export const finalMissionData = {
  quoteQuestion: '"How are these young people solving problems like this?"',
  quoteAnswer: 'Because they never stopped learning.',
  declaration: `Caretcoders isn't trying to become the biggest software company. We're building a generation of engineers, designers, researchers, and creators who refuse to accept "that's how it's always been."`
};

export const milestonesData: Milestone[] = [
  {
    year: '2025',
    quarter: '23 July',
    title: 'Level 01: Caretcoders Initialized',
    description: 'Founded by Rahil Shrivas as a collaborative community of innovators solving real-world challenges.',
    type: 'Company',
    completed: true
  },
  {
    year: '2026',
    quarter: 'Side Quest',
    title: 'Level 02: DetailMint Discovered',
    description: 'Born from real floor operational struggles observed while Rahil worked in automotive detailing.',
    type: 'Product',
    completed: true
  },
  {
    year: '2026',
    quarter: 'Party Assembled',
    title: 'Level 03: Team Guild Assembled',
    description: 'Rahil Shrivas, Harepriya A G, Garnisha Shree, and Arin Mudgal form the multidisciplinary core team.',
    type: 'Achievement',
    completed: true
  },
  {
    year: '2027',
    quarter: 'Boss Encounter',
    title: 'Level 04: Market Reality Pause',
    description: '12 pilot partners & Startup India appreciation met funding decline. Team chose to regroup strategically.',
    type: 'Company',
    completed: true
  },
  {
    year: '2027-2028',
    quarter: 'New Quest',
    title: 'Level 05: Chemical-Reduced Farming',
    description: 'Pivoted to IoT precision agritech to solve humanity’s challenge: high crop yield with reduced chemicals.',
    type: 'Future',
    completed: false
  }
];

export const visionMission = {
  about: `Caretcoders is a community of young, curious innovators who work together to solve real-world problems through creativity, critical thinking, and collaboration.`,
  vision: `Building a generation of engineers, designers, researchers, and creators who refuse to accept "that's how it's always been."`,
  mission: `To solve real-world challenges—from automotive management to chemical-reduced precision farming—by never stopping learning.`
};

export const roadmapItems = [
  {
    id: 'road-1',
    title: 'Chemical-Reduced Precision Farming IoT Nodes',
    status: 'Active R&D',
    eta: '2027-2028',
    votes: 524,
    desc: 'Combining soil sensors with AI models to deliver the same crop yield with significantly fewer chemical inputs.'
  },
  {
    id: 'road-2',
    title: 'InkSquirel Creator Protection Vault',
    status: 'In Development',
    eta: '2028-2029',
    votes: 418,
    desc: 'Affordable web platform enabling independent creators to validate and pitch original ideas with proof of creation.'
  },
  {
    id: 'road-3',
    title: 'DetailMint Multi-Location Operational Engine',
    status: 'On Strategic Pause',
    eta: '2027 Planned',
    votes: 382,
    desc: 'Streamlining fleet scheduling, material usage, and revenue tracking across automotive care branches.'
  },
  {
    id: 'road-4',
    title: 'Gen Z Open Innovation & Learning Guild',
    status: 'Active',
    eta: 'Ongoing',
    votes: 610,
    desc: 'Mentorship and open project incubation for young creators bridging commerce, music, AI, and code.'
  }
];
