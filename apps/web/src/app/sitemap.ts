import { siteConfig } from '@config/config';

export default function sitemap(): {
  url: string;
  lastModified: string;
}[] {
  const routes = ['/'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
