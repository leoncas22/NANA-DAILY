import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // You can add custom logic here if needed
            return true;
        },
        async session({ session, token }) {
            // Add user ID to session
            if (session.user) {
                // @ts-ignore - id is added via module augmentation
                session.user.id = token.sub || '';
            }
            return session;
        },
        async jwt({ token, user, account }) {
            // User object is only available on first sign in
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
