import { ClientEntry, BlogPost, JobPosition } from '../types';
import { jobPositionsData } from '../data/careers';

// 1. Build-time dynamic loader for Clients
export function loadClients(): ClientEntry[] {
  const clientFiles = import.meta.glob<any>('/src/data/content/clients/*.json', { eager: true });
  const loadedClients: ClientEntry[] = [];

  for (const path in clientFiles) {
    const mod = clientFiles[path];
    const data = mod.default || mod;
    if (data && data.name) {
      loadedClients.push({
        id: data.id || path.replace(/.*\/([^/]+)\.json$/, '$1'),
        name: data.name,
        logo: data.logo || '',
        category: data.category || 'Engineering Systems',
        description: data.description || '',
        websiteUrl: data.websiteUrl || '',
        featured: data.featured !== undefined ? data.featured : true
      });
    }
  }

  // Pre-seeded baseline fallback if no CMS files yet
  if (loadedClients.length === 0) {
    return [
      {
        id: 'agrotech-systems',
        name: 'AgriCore Technologies',
        category: 'IoT & Telemetry',
        description: 'Architected low-latency sensor telemetry pipelines handling 4.2M daily agricultural metric data points with edge validation and automated fault alerts.',
        websiteUrl: 'https://agricore.io',
        featured: true
      },
      {
        id: 'cloudscale-infra',
        name: 'CloudScale Grid',
        category: 'Cloud Architecture',
        description: 'Engineered multi-region failover topology and zero-downtime database replication reducing global p99 query latency from 320ms to 42ms.',
        websiteUrl: 'https://cloudscale.net',
        featured: true
      },
      {
        id: 'detailmint-studios',
        name: 'DetailMint Visuals',
        category: 'Developer Tooling',
        description: 'Constructed high-speed browser-based asset optimization engine delivering automated lossless SVG compression and component scaffolding for product teams.',
        websiteUrl: 'https://detailmint.com',
        featured: true
      }
    ];
  }

  return loadedClients;
}

// 2. Build-time dynamic loader for Publications & Research
export function loadPublications(): BlogPost[] {
  const pubFiles = import.meta.glob<any>('/src/data/content/publications/*.json', { eager: true });
  const loadedPubs: BlogPost[] = [];

  for (const path in pubFiles) {
    const mod = pubFiles[path];
    const data = mod.default || mod;
    if (data && data.title) {
      loadedPubs.push({
        id: data.id || path.replace(/.*\/([^/]+)\.json$/, '$1'),
        title: data.title,
        slug: data.slug || data.id,
        summary: data.summary || '',
        content: data.content || '',
        publishDate: data.publishDate || '2026-03-01',
        category: data.category || 'Software Engineering',
        readTime: data.readTime || '6 min read',
        tags: Array.isArray(data.tags) ? data.tags : ['Architecture', 'Engineering'],
        featured: data.featured || false,
        image: data.image || '',
        referenceUrl: data.referenceUrl || '',
        author: data.author || {
          name: 'CaretCoders Research',
          role: 'Systems Architecture Group',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
        }
      });
    }
  }

  // Sort descending by publish date
  return loadedPubs.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

// 3. Build-time dynamic loader for Careers & Vacancies
export function loadCareers(): JobPosition[] {
  const careerFiles = import.meta.glob<any>('/src/data/content/careers/*.json', { eager: true });
  const cmsCareers: JobPosition[] = [];

  for (const path in careerFiles) {
    const mod = careerFiles[path];
    const data = mod.default || mod;
    if (data && data.title) {
      cmsCareers.push({
        id: data.id || path.replace(/.*\/([^/]+)\.json$/, '$1'),
        title: data.title,
        department: data.department || 'Engineering',
        location: data.location || 'Hybrid · Hyderabad / Remote',
        type: data.type || 'Full-time',
        experience: data.experience || '3+ Years',
        description: data.description || '',
        requirements: Array.isArray(data.requirements) ? data.requirements : [],
        responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
        perks: Array.isArray(data.perks) ? data.perks : []
      });
    }
  }

  // Merge CMS entries with existing static baseline positions
  const existingIds = new Set(cmsCareers.map(c => c.id));
  const fallback = jobPositionsData.filter(j => !existingIds.has(j.id));

  return [...cmsCareers, ...fallback];
}
