import { faker } from '@faker-js/faker';
import { prisma } from '..';
import { SEED_USER_CONFIG } from './seed-constants';

void (async () => {
  try {
    Array.from({ length: SEED_USER_CONFIG.COUNT }).map(async () => {
      await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          image: faker.image.avatar(),
        },
      });
    });
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
