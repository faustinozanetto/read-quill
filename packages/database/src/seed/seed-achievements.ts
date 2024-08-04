import { prisma } from '..';

void (async () => {
  try {
    const READ_STREAK_ACHIEVEMENTS = [
      {
        name: 'Daily Starter',
        criteria: { readDaysStreak: 1 },
      },
      {
        name: 'Consistent Reader',
        criteria: { readDaysStreak: 5 },
      },
      {
        name: 'Weekly Reader',
        criteria: { readDaysStreak: 7 },
      },
      {
        name: 'Dedicated Reader',
        criteria: { readDaysStreak: 10 },
      },
      {
        name: 'Streak Master',
        criteria: { readDaysStreak: 15 },
      },
      {
        name: 'Daily Devotee',
        criteria: { readDaysStreak: 20 },
      },
      {
        name: 'Unbroken Chain',
        criteria: { readDaysStreak: 30 },
      },
      {
        name: 'Half-Year Hero',
        criteria: { readDaysStreak: 182 },
      },
      {
        name: 'Year-Long Enthusiast',
        criteria: { readDaysStreak: 365 },
      },
    ];

    const BOOK_READ_ACHIEVEMENTS = [
      {
        name: 'First Book',
        criteria: { booksRead: 1 },
      },
      {
        name: 'Casual Reader',
        criteria: { booksRead: 5 },
      },
      {
        name: 'Book Enthusiast',
        criteria: { booksRead: 10 },
      },
      {
        name: 'Page Turner',
        criteria: { booksRead: 15 },
      },
      {
        name: 'Literary Lover',
        criteria: { booksRead: 20 },
      },
      {
        name: 'Avid Reader',
        criteria: { booksRead: 30 },
      },
      {
        name: 'Book Collector',
        criteria: { booksRead: 40 },
      },
      {
        name: 'Bibliophile',
        criteria: { booksRead: 50 },
      },
      {
        name: 'Library Legend',
        criteria: { booksRead: 70 },
      },
      {
        name: 'Ultimate Bookworm',
        criteria: { booksRead: 100 },
      },
    ];

    const BOOKS_READ_PAGES_READ_ACHIEVEMENTS = [
      {
        name: 'Reading Initiate',
        criteria: { booksRead: 1, pagesRead: 200 },
      },
      {
        name: 'Book Explorer',
        criteria: { booksRead: 2, pagesRead: 800 },
      },
      {
        name: 'Reading Enthusiast',
        criteria: { booksRead: 5, pagesRead: 1200 },
      },
      {
        name: 'Literary Pathfinder',
        criteria: { booksRead: 10, pagesRead: 2500 },
      },
      {
        name: 'Page Master',
        criteria: { booksRead: 15, pagesRead: 3500 },
      },
      {
        name: 'Book Adventurer',
        criteria: { booksRead: 25, pagesRead: 4500 },
      },
      {
        name: 'Story Seeker',
        criteria: { booksRead: 35, pagesRead: 6000 },
      },
      {
        name: 'Narrative Navigator',
        criteria: { booksRead: 40, pagesRead: 8000 },
      },
      {
        name: 'Tale Traveler',
        criteria: { booksRead: 45, pagesRead: 9000 },
      },
      {
        name: 'Epic Bibliophile',
        criteria: { booksRead: 50, pagesRead: 12000 },
      },
    ];

    const PAGES_READ_ACHIEVEMENTS = [
      {
        name: 'Page Starter',
        criteria: { pagesRead: 50 },
      },
      {
        name: 'Chapter Finisher',
        criteria: { pagesRead: 150 },
      },
      {
        name: 'Page Devotee',
        criteria: { pagesRead: 250 },
      },
      {
        name: 'Story Completer',
        criteria: { pagesRead: 350 },
      },
      {
        name: 'Narrative Conqueror',
        criteria: { pagesRead: 500 },
      },
      {
        name: 'Book Finisher',
        criteria: { pagesRead: 750 },
      },
      {
        name: 'Reading Champ',
        criteria: { pagesRead: 1000 },
      },
      {
        name: 'Literary Leader',
        criteria: { pagesRead: 2000 },
      },
      {
        name: 'Ultimate Reader',
        criteria: { pagesRead: 3000 },
      },
      {
        name: 'Page Titan',
        criteria: { pagesRead: 5000 },
      },
    ];

    const BOOKS_REVIEWED_ACHIEVEMENTS = [
      {
        name: 'First Review',
        criteria: { booksReviewed: 1 },
      },
      {
        name: 'Review Enthusiast',
        criteria: { booksReviewed: 2 },
      },
      {
        name: 'Feedback Contributor',
        criteria: { booksReviewed: 4 },
      },
      {
        name: 'Critical Reviewer',
        criteria: { booksReviewed: 6 },
      },
      {
        name: 'Review Aficionado',
        criteria: { booksReviewed: 15 },
      },
      {
        name: 'Insightful Reviewer',
        criteria: { booksReviewed: 20 },
      },
      {
        name: 'Review Expert',
        criteria: { booksReviewed: 30 },
      },
      {
        name: 'Pro Reviewer',
        criteria: { booksReviewed: 40 },
      },
      {
        name: 'Top Critic',
        criteria: { booksReviewed: 50 },
      },
      {
        name: 'Review Legend',
        criteria: { booksReviewed: 60 },
      },
    ];

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
