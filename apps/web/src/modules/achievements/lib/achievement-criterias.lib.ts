import type { Book, ReadRegistry } from '@read-quill/database';
import { differenceInDays } from 'date-fns';

/**
 * Function that calculates a mapping of book ids and pages read.
 * @param readRegistries - Read registries data.
 * @returns Book pages read.
 */
const calculateBookPagesRead = (
  readRegistries: Pick<ReadRegistry, 'bookId' | 'pagesRead' | 'createdAt'>[]
): Record<string, number> => {
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
const calculatePagesRead = (readRegistries: Pick<ReadRegistry, 'bookId' | 'pagesRead' | 'createdAt'>[]): number => {
  return readRegistries.reduce((acc, curr) => acc + curr.pagesRead, 0);
};

/**
 * Function that calculates the max read days in streak.
 * @param readRegistries - Read registries data.
 * @returns Read days streak.
 */
const calculateReadDaysStreak = (
  readRegistries: Pick<ReadRegistry, 'bookId' | 'pagesRead' | 'createdAt'>[]
): number => {
  if (readRegistries.length === 0) return 0;

  let streakCount = 1;

  for (let i = 1; i < readRegistries.length; i++) {
    const currentDate = readRegistries[i].createdAt;
    const previousDate = readRegistries[i - 1].createdAt;

    // Check if the current date is the day before the previous date
    const daysDifference = differenceInDays(previousDate, currentDate);
    if (daysDifference <= 1) {
      streakCount++;
    } else {
      break;
    }
  }

  return streakCount;
};

/**
 * Function that calculates the criterias needed for achievements.
 * @param books - Books data.
 * @param readRegistries - Read registries data.
 * @returns Achievement criterias.
 */
export const calculateCriterias = (
  books: Book[],
  readRegistries: Pick<ReadRegistry, 'bookId' | 'pagesRead' | 'createdAt'>[]
): Record<string, number> => {
  const pagesRead = calculatePagesRead(readRegistries);
  const booksPagesRead = calculateBookPagesRead(readRegistries);
  const booksRead = calculateBooksRead(books, booksPagesRead);
  const readDaysStreak = calculateReadDaysStreak(readRegistries);

  return { pagesRead, booksRead, readDaysStreak };
};
