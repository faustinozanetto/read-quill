import { PrismaClient } from '@prisma/client';
import { withOptimize } from '@prisma/extension-optimize';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as { prisma: PrismaClientWithExtension };

type PrismaClientWithExtension = ReturnType<typeof getExtendedPrismaClient>;

const getExtendedPrismaClient = () =>
  new PrismaClient({
    log: ['query'],
  })
    .$extends(withAccelerate())
    .$extends(withOptimize());

export const prisma = globalForPrisma.prisma || getExtendedPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from '@prisma/client';
