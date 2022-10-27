import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from '../../../lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: '373932287990-l7vgosoq9alvcn3ug2c3nneqo3sudhui.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
};

export default NextAuth(authOptions);