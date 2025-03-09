import { prisma } from '../..';
import { BOOK_READ_ACHIEVEMENTS } from './book-read-achievements';
import { BOOKS_READ_PAGES_READ_ACHIEVEMENTS } from './books-read-pages-read-achievements';
import { BOOKS_REVIEWED_ACHIEVEMENTS } from './books-reviewed-achievements';
import { PAGES_READ_ACHIEVEMENTS } from './pages-read-achievements';
import { READ_STREAK_ACHIEVEMENTS } from './read-streak-achievements';

void (async () => {
  try {
    const ACHIEVEMENTS = [
      ...READ_STREAK_ACHIEVEMENTS,
      ...BOOKS_READ_PAGES_READ_ACHIEVEMENTS,
      ...BOOK_READ_ACHIEVEMENTS,
      ...PAGES_READ_ACHIEVEMENTS,
      ...BOOKS_REVIEWED_ACHIEVEMENTS,
    ];

    await prisma.achievement.createMany({ data: ACHIEVEMENTS });
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
