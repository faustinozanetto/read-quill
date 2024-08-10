import { siteConfig } from '@config/config';
import { prisma } from '@read-quill/database';
import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

const getBookIds = async () => {
  const bookIds = await prisma.book.findMany({ select: { id: true } });
  return bookIds.map((book) => book.id);
};

const getThreadIds = async () => {
  const threadIds = await prisma.thread.findMany({ select: { id: true } });
  return threadIds.map((thread) => thread.id);
};

const getUserIds = async () => {
  const userIds = await prisma.user.findMany({ select: { id: true } });
  return userIds.map((user) => user.id);
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    '/',
    '/dashboard',
    '/achievements',
    '/library',
    '/community',
    '/settings',
    '/community/post-thread',
    '/sign-in',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // Book routes
  const bookIds = await getBookIds();
  const bookRoutes = bookIds.reduce<MetadataRoute.Sitemap>((acc, curr) => {
    const bookPage = {
      url: `${siteConfig.url}/books/${curr}`,
      lastModified: new Date().toISOString().split('T')[0],
    };
    const bookReviewDetailsPage = {
      url: `${siteConfig.url}/books/${curr}/review-details`,
      lastModified: new Date().toISOString().split('T')[0],
    };

    return [...acc, bookPage, bookReviewDetailsPage];
  }, []);

  // Thread routes
  const threadIds = await getThreadIds();
  const threadRoutes = threadIds.reduce<MetadataRoute.Sitemap>((acc, curr) => {
    const threadPage = {
      url: `${siteConfig.url}/community/threads/${curr}`,
      lastModified: new Date().toISOString().split('T')[0],
    };

    return [...acc, threadPage];
  }, []);

  // User routes
  const userIds = await getUserIds();
  const userRoutes = userIds.reduce<MetadataRoute.Sitemap>((acc, curr) => {
    const userPage = {
      url: `${siteConfig.url}/users/${curr}`,
      lastModified: new Date().toISOString().split('T')[0],
    };

    const userBooksPage = {
      url: `${siteConfig.url}/users/${curr}/books`,
      lastModified: new Date().toISOString().split('T')[0],
    };

    const userAchievementsPage = {
      url: `${siteConfig.url}/users/${curr}/achievements`,
      lastModified: new Date().toISOString().split('T')[0],
    };

    return [...acc, userPage, userBooksPage, userAchievementsPage];
  }, []);

  return [...routes, ...bookRoutes, ...threadRoutes, ...userRoutes];
}
