import { NextAuthConfig } from 'next-auth';

export const authCallbackConfig = {
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;

      return session;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },
  },
  providers: [],
} satisfies NextAuthConfig;
