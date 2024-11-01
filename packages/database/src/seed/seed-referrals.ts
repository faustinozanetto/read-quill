import { prisma } from '..';

void (async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: 'clx40tz660000bsh5eky04e0w' },
      },
    });

    const referralOwner = await prisma.user.findUnique({
      where: {
        id: 'clx40tz660000bsh5eky04e0w',
      },
    });
    if (!referralOwner) return;

    await Promise.all(
      users.map((user) => () => {
        return prisma.referral.create({
          data: {
            ownerId: referralOwner.id,
            referredId: user.id,
          },
        });
      })
    );
  } catch (error) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
