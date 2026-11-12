export type NavigationPage = 'home' | 'blog' | 'careers' | 'docs';

export type HomeSection = 'hero' | 'products' | 'why-us' | 'journey' | 'contact';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  hook: string;
  launchYear: string;
  type: string;
  url?: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  techStack: string[];
  iconName: string;
  status: 'Production' | 'Beta' | 'Active Pilot' | 'Upcoming' | string;
  metrics: { label: string; value: string }[];
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & DevOps' | 'Database' | 'AI & Automation';
  description: string;
  icon: string;
  logoUrls: string[];
  proficiencyLevel: number; // 0 to 100
  sampleCode?: string;
  version: string;
}

export interface Milestone {
  year: string;
  quarter: string;
  title: string;
  description: string;
  type: 'Company' | 'Product' | 'Achievement' | 'Future';
  completed: boolean;
}

export interface ClientEntry {
  id: string;
  name: string;
  logo?: string;
  category: string;
  description: string; // Service description under 50 words
  websiteUrl?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown or rich text string
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: 'Software Engineering' | 'SaaS Development' | 'Mobile Development' | 'AI & Automation' | 'Startup Insights' | string;
  readTime: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  referenceUrl?: string;
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship' | string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  perks: string[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  category: 'Getting Started' | 'Authentication' | 'DetailMint API' | 'AgriTech Telemetry' | 'InkSquirel AI' | 'Webhooks';
  parameters?: { name: string; type: string; required: boolean; desc: string }[];
  requestBody?: string;
  responseBody: string;
  curlExample: string;
}

export interface ChangelogItem {
  version: string;
  date: string;
  title: string;
  changes: {
    type: 'feature' | 'improvement' | 'fix' | 'security';
    description: string;
  }[];
}
