import { faker } from '@faker-js/faker';
import { prisma } from '..';
import { SEED_BOOKS_CONFIG } from './seed-constants';

void (async () => {
  try {
    const users = await prisma.user.findMany();

    await Promise.all(
      users.map((user) =>
        Array.from({ length: SEED_BOOKS_CONFIG.COUNT }).map(async () => {
          const startedAt = faker.date.between({ from: faker.date.recent({ days: 365 }), to: new Date() });
          const finishedAt = faker.date.between({ from: startedAt, to: new Date() });

          const image = await prisma.image.findFirst({
            where: {
              id: 'clwmneu7i00003l8vz8wp4q8y',
            },
          });
          if (!image) return;

          const book = await prisma.book.create({
            data: {
              id: faker.string.uuid(),
              name: faker.lorem.words(),
              author: faker.person.fullName(),
              language: faker.helpers.arrayElement(['English', 'Spanish', 'French']),
              pageCount: faker.number.int({
                min: SEED_BOOKS_CONFIG.PAGE_COUNT.MIN,
                max: SEED_BOOKS_CONFIG.PAGE_COUNT.MAX,
              }),
              startedAt,
              finishedAt,
              isFavourite: faker.datatype.boolean(),
              rating: faker.number.int({ min: 1, max: 5 }),
              readerId: user.id,
              imageId: image.id,
              review: {
                create: {
                  content: faker.lorem.paragraph(),
                },
              },
            },
            include: { review: true },
          });

          const readRegistries = Array.from({
            length: faker.number.int({
              min: SEED_BOOKS_CONFIG.READ_REGISTRIES.MIN,
              max: SEED_BOOKS_CONFIG.READ_REGISTRIES.MAX,
            }),
          }).map(() => {
            return {
              id: faker.string.uuid(),
              pagesRead: faker.number.int({ min: 5, max: 35 }),
              bookId: book.id,
              createdAt: faker.date.between({
                from: book.startedAt ?? new Date(),
                to: book.finishedAt ?? new Date(),
              }),
            };
          });

          const bookAnnotations = Array.from({
            length: faker.number.int({
              min: SEED_BOOKS_CONFIG.ANNOTATIONS.MIN,
              max: SEED_BOOKS_CONFIG.ANNOTATIONS.MAX,
            }),
          }).map(() => {
            return {
              title: faker.lorem.words(),
              chapter: `Chapter ${faker.number.int({ min: 0, max: 25 })}`,
              content: faker.lorem.paragraph(),
              bookId: book.id,
            };
          });

          const reviewLikes = Array.from({
            length: faker.number.int({
              min: SEED_BOOKS_CONFIG.REVIEW_LIKES.MIN,
              max: SEED_BOOKS_CONFIG.REVIEW_LIKES.MAX,
            }),
          }).map(() => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            return {
              reviewId: book.review?.id!,
              isLike: Boolean(faker.number.int({ min: 0, max: 1 })),
              userId: randomUser.id,
            };
          });

          await prisma.readRegistry.createMany({ data: readRegistries });
          await prisma.annotation.createMany({ data: bookAnnotations });
          await prisma.reviewLike.createMany({ data: reviewLikes });

          return book;
        })
      )
    );
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
