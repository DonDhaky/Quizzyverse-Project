import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import MySQLAdapter from '../../../lib/next-auth-mysql-adapter';
import bcrypt from "bcrypt";


export const authHandler = {
  adapter: MySQLAdapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const user = await MySQLAdapter.getUserByEmail(credentials.email);
        if (user) {
          console.log('User found:', user);
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            console.log('Dans le authorize, user de la DB : ', user.id);
            return user;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        console.log('Dans le callback jwt, user.id et token.id : ', user.id, token.id);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
       console.log('Dans le callback session, token.id et session.user.id : ', token.id, session.user.id);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authHandler);
export { handler as GET, handler as POST }