import { faker } from '@faker-js/faker';
import { prisma } from '.';

void (async () => {
  try {
    Array.from({ length: 10 }).map(async () => {
      const user = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          image: faker.image.avatar(),
        },
      });

      await Promise.all(
        Array.from({ length: 8 }).map(async () => {
          const startedAt = faker.date.between({ from: faker.date.recent(120), to: new Date() });
          const finishedAt = faker.date.between({ from: startedAt, to: new Date() });

          const book = await prisma.book.create({
            data: {
              id: faker.string.uuid(),
              name: faker.lorem.words(),
              author: faker.person.fullName(),
              coverImage: faker.image.url(),
              language: faker.helpers.arrayElement(['English', 'Spanish', 'French']),
              pageCount: faker.number.int({ min: 50, max: 400 }),
              startedAt,
              finishedAt,
              isFavourite: faker.datatype.boolean(),
              review: faker.lorem.paragraph(),
              rating: faker.number.int({ min: 1, max: 5 }),
              readerId: user.id,
            },
          });

          // Create between 1 to 5 ReadRegistry entries for each book with different dates
          const readRegistries = Array.from({ length: faker.number.int({ min: 2, max: 10 }) }).map(() => {
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

          const bookAnnotations = Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => {
            return {
              title: faker.lorem.words(),
              chapter: `Chapter ${faker.number.int({ min: 0, max: 25 })}`,
              content: faker.lorem.paragraph(),
              bookId: book.id,
            };
          });

          await prisma.readRegistry.createMany({ data: readRegistries });
          await prisma.annotation.createMany({ data: bookAnnotations });

          return book;
        })
      );
    });
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
