import type { Book, ReadRegistry, Review } from '@read-quill/database';
import { differenceInDays, isToday } from 'date-fns';
import { AchievementCriterias } from './achievement.constants';

/**
 * Function that calculates a mapping of book ids and pages read.
 * @param readRegistries - Read registries data.
 * @returns Book pages read.
 */
const calculateBookPagesRead = (readRegistries: ReadRegistry[]): Record<string, number> => {
  const booksPagesRead = readRegistries.reduce<Record<string, number>>((acc, curr) => {
    const key = curr.bookId;
    acc[key] = (acc[key] || 0) + curr.pagesRead;
    return acc;
  }, {});

  return booksPagesRead;
};

/**
 * Function that calculates the count of books read.
 * @param books - Books data.
 * @param booksPagesRead - Books pages read.
 * @returns Books read.
 */
const calculateBooksRead = (books: Book[], booksPagesRead: Record<string, number>): number => {
  return books.reduce((acc, curr) => (booksPagesRead[curr.id] >= curr.pageCount ? acc + 1 : acc), 0);
};

/**
 * Function that calculates the pages read.
 * @param readRegistries - Read registries data.
 * @returns Pages read.
 */
const calculatePagesRead = (readRegistries: ReadRegistry[]): number => {
  return readRegistries.reduce((acc, curr) => acc + curr.pagesRead, 0);
};

/**
 * Function that calculates the max read days in streak.
 * @param readRegistries - Read registries data.
 * @returns Read days streak.
 */
const calculateReadDaysStreak = (readRegistries: ReadRegistry[]): number => {
  if (readRegistries.length === 0) return 0;

  let streakCount = 0;
  const currentDate = new Date();
  const firstRegistryDate = readRegistries[0].createdAt;

  // Check if there's a gap of more than 1 day between today and the first registry
  if (differenceInDays(currentDate, firstRegistryDate) > 1) {
    return 0;
  }

  streakCount++;

  for (let i = 1; i < readRegistries.length; i++) {
    const currentRegistryDate = readRegistries[i].createdAt;
    const previousRegistryDate = readRegistries[i - 1].createdAt;

    // Check if the current date is within 1 day of the previous date
    const daysDifference = differenceInDays(previousRegistryDate, currentRegistryDate);

    if (daysDifference <= 1) {
      streakCount++;
    } else {
      break;
    }
  }

  return streakCount;
};

const calculateBooksReviewed = (bookReviews: Review[]) => {
  return bookReviews.length;
};

/**
 * Function that calculates the criterias needed for achievements.
 * @param books - Books data.
 * @param readRegistries - Read registries data.
 * @returns Achievement criterias.
 */
export const calculateCriterias = (
  books: Book[],
  readRegistries: ReadRegistry[],
  bookReviews: Review[]
): Record<AchievementCriterias, number> => {
  const pagesRead = calculatePagesRead(readRegistries);
  const booksPagesRead = calculateBookPagesRead(readRegistries);
  const booksRead = calculateBooksRead(books, booksPagesRead);
  const readDaysStreak = calculateReadDaysStreak(readRegistries);
  const booksReviewed = calculateBooksReviewed(bookReviews);

  return { pagesRead, booksRead, readDaysStreak, booksReviewed };
};
