import { prisma } from '.';

void (async () => {
  try {
    const achievementsData = [
      {
        name: 'Novice Reader',
        criteria: { pagesRead: 100 },
      },
      {
        name: 'Avid Reader',
        criteria: { pagesRead: 500 },
      },
      {
        name: 'Bookworm',
        criteria: { booksRead: 5 },
      },
      {
        name: 'Bibliophile',
        criteria: { booksRead: 10 },
      },
      {
        name: 'Prolific Reader',
        criteria: { pagesRead: 1000 },
      },
      {
        name: 'Literate Explorer',
        criteria: { booksRead: 15 },
      },
      {
        name: 'Master Librarian',
        criteria: { booksRead: 20 },
      },
      {
        name: 'Page Conqueror',
        criteria: { pagesRead: 2000 },
      },
      {
        name: 'Book Connoisseur',
        criteria: { booksRead: 25 },
      },
      {
        name: 'Literary Virtuoso',
        criteria: { pagesRead: 5000 },
      },
      {
        name: 'Book Voyager',
        criteria: { pagesRead: 100, booksRead: 3 },
      },
      {
        name: 'Reading Explorer',
        criteria: { pagesRead: 750, booksRead: 8 },
      },
      {
        name: 'Book Marathoner',
        criteria: { pagesRead: 1500, booksRead: 12 },
      },
      {
        name: 'Bookworm Extraordinaire',
        criteria: { pagesRead: 3000, booksRead: 18 },
      },
    ];

    await prisma.achievement.createMany({ data: achievementsData });
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
