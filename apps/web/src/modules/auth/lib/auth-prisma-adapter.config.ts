import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@read-quill/database';

export const authPrismaAdapterConfig = {
  adapter: PrismaAdapter(prisma),
};
