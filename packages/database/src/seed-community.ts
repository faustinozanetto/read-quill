import { faker } from '@faker-js/faker';
import { prisma } from '.';

void (async () => {
  try {
    const user = await prisma.user.findUnique({ where: { email: 'faustizanetto@gmail.com' } });
    if (!user) return;

    await Promise.all(
      Array.from({ length: 20 }).map(async () => {
        const createdAt = faker.date.between({ from: faker.date.recent(120), to: new Date() });

        const thread = await prisma.thread.create({
          data: {
            title: faker.lorem.words(5),
            content: faker.lorem.paragraphs(3),
            author: { connect: { id: user.id } },
            createdAt,
          },
        });

        return thread;
      })
    );
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
