import type { Book, ReadRegistry } from '@read-quill/database';
import { isYesterday, differenceInDays } from 'date-fns';

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
  let currentStreak = 0;
  let maxStreak = 0;

  for (let i = 1; i < readRegistries.length; i++) {
    const prevRegistry = readRegistries[i - 1];
    const currentRegistry = readRegistries[i];

    const isConsecutive =
      isYesterday(prevRegistry.createdAt) && differenceInDays(currentRegistry.createdAt, prevRegistry.createdAt) <= 1;

    if (isConsecutive) {
      currentStreak += 1;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 0;
    }
  }
  maxStreak = Math.max(maxStreak, currentStreak);

  return maxStreak;
};

/**
 * Function that calculates the criterias needed for achievements.
 * @param books - Books data.
 * @param readRegistries - Read registries data.
 * @returns Achievement criterias.
 */
export const calculateCriterias = (books: Book[], readRegistries: ReadRegistry[]): Record<string, number> => {
  const pagesRead = calculatePagesRead(readRegistries);
  const booksPagesRead = calculateBookPagesRead(readRegistries);
  const booksRead = calculateBooksRead(books, booksPagesRead);
  const readDaysStreak = calculateReadDaysStreak(readRegistries);

  return { pagesRead, booksRead, readDaysStreak };
};
