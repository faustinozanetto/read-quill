import { prisma } from '@read-quill/database';
import { MetadataRoute } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const createSitemapXml = (routes: MetadataRoute.Sitemap) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map((route) => {
          return `
        <url>
          <loc>${route.url}</loc>
          <lastmod>${route.lastModified}</lastmod>
        </url>`;
        })
        .join('')}
    </urlset>`;
};

// /api/sitemap GET : Retrieves the sitemap.xml
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const [books, threads, users] = await Promise.all([
      prisma.book.findMany({ select: { id: true } }),
      prisma.thread.findMany({ select: { id: true } }),
      prisma.user.findMany({ select: { id: true } }),
    ]);

    const bookIds = books.map((book) => book.id);
    const threadIds = threads.map((thread) => thread.id);
    const userIds = users.map((user) => user.id);

    const SRC_URL = process.env.NEXT_PUBLIC_URL!;

    // Common Routes
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
      url: `${SRC_URL}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }));

    // Book routes
    const bookRoutes = bookIds.reduce<MetadataRoute.Sitemap>((acc, curr) => {
      const bookPage = {
        url: `${SRC_URL}/books/${curr}`,
        lastModified: new Date().toISOString().split('T')[0],
      };
      const bookReviewDetailsPage = {
        url: `${SRC_URL}/books/${curr}/review-details`,
        lastModified: new Date().toISOString().split('T')[0],
      };

      return [...acc, bookPage, bookReviewDetailsPage];
    }, []);

    // Thread routes
    const threadRoutes = threadIds.reduce<MetadataRoute.Sitemap>((acc, curr) => {
      const threadPage = {
        url: `${SRC_URL}/community/threads/${curr}`,
        lastModified: new Date().toISOString().split('T')[0],
      };

      return [...acc, threadPage];
    }, []);

    // User routes
    const userRoutes = userIds.reduce<MetadataRoute.Sitemap>((acc, curr) => {
      const userPage = {
        url: `${SRC_URL}/users/${curr}`,
        lastModified: new Date().toISOString().split('T')[0],
      };

      const userBooksPage = {
        url: `${SRC_URL}/users/${curr}/books`,
        lastModified: new Date().toISOString().split('T')[0],
      };

      const userAchievementsPage = {
        url: `${SRC_URL}/users/${curr}/achievements`,
        lastModified: new Date().toISOString().split('T')[0],
      };

      return [...acc, userPage, userBooksPage, userAchievementsPage];
    }, []);

    const sitemap = [...routes, ...bookRoutes, ...threadRoutes, ...userRoutes];

    const xmlSitemap = createSitemapXml(sitemap);

    return new NextResponse(xmlSitemap, { headers: { 'Content-Type': 'text/xml' } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
