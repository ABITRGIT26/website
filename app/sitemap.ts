import type { MetadataRoute } from 'next';
import { events } from './data/events';

const SITE_URL = 'https://rgitabit.in';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface RouteDef {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}

// Static routes — keep in sync with app/**/page.tsx
const staticRoutes: RouteDef[] = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/events', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/synergy', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/codeastra', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/sharkathon', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/team', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/gallery', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/sponsors', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/join', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: e.upcoming ? 0.8 : 0.6,
  }));

  return [...staticEntries, ...eventEntries];
}
