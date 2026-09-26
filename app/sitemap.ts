import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/practice', '/criminal-law', '/bail', '/cybercrime', '/other-matters', '/insights', '/contact', '/disclaimer', '/privacy'];
  const now = new Date();
  return [
    ...routes.map(r => ({ url: `${site.url}${r}`, lastModified: now })),
    // Draft articles are excluded until published.
    ...articles.filter(a => a.status === 'published').map(a => ({ url: `${site.url}/insights/${a.slug}`, lastModified: now }))
  ];
}
