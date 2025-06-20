import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextAuthOptions, User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const prisma = new PrismaClient();

interface UserWithRole extends User {
  role?: string | null;
}

interface TokenWithRole extends JWT {
  role?: string | null;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const u = user as UserWithRole | undefined;
      if (u?.role) {
        (token as TokenWithRole).role = u.role;
      }
      return token as TokenWithRole;
    },
    async session({ session, token }) {
      const t = token as TokenWithRole;
      if (session.user) {
        (session.user as UserWithRole).role = t.role;
      }
      return session as Session & { user: UserWithRole };
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
