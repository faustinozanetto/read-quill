import { faker } from '@faker-js/faker';
import { prisma } from '.';

void (async () => {
  try {
    const users = await prisma.user.findMany();

    await Promise.all(
      Array.from({ length: 20 }).map(async () => {
        const user = users[Math.floor(Math.random() * users.length)]; // Pick a random user
        const createdAt = faker.date.between({ from: faker.date.recent(120), to: new Date() });
        const numKeywords = Math.floor(Math.random() * 5) + 2; // Generate a random number of keywords (2 to 6)

        const keywords = Array.from({ length: numKeywords })
          .map(() => faker.random.word())
          .join(', ');

        const thread = await prisma.thread.create({
          data: {
            title: faker.lorem.words(5),
            content: faker.lorem.paragraphs(3),
            author: { connect: { id: user.id } },
            createdAt,
            keywords,
          },
        });

        // Create comments for the thread
        await Promise.all(
          Array.from({ length: Math.floor(Math.random() * 10) }).map(async () => {
            await prisma.threadComment.create({
              data: {
                content: faker.lorem.paragraph(),
                author: { connect: { id: user.id } },
                thread: { connect: { id: thread.id } },
              },
            });
          })
        );
      })
    );
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
