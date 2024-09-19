import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@read-quill/database';
import { NextAuthConfig } from 'next-auth';

const CustomPrismaAdapter = (p: typeof prisma): NextAuthConfig['adapter'] => {
  return {
    ...PrismaAdapter(p),
    createUser: async (data) => {
      const { image, ...rest } = data;
      return await p.user.create({
        data: {
          ...rest,
        },
      });
    },
  };
};

export const authPrismaAdapterConfig = {
  adapter: CustomPrismaAdapter(prisma),
};
