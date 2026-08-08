import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [], // Add directories to disallow crawling here (e.g., admin or private panels if added)
    },
    sitemap: 'https://www.ceyralabs.com/sitemap.xml',
  };
}
