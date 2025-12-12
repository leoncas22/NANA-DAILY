'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { setUser, getUser, seedData } from '@/lib/storage';

export default function LoginPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if user already logged in via NextAuth
        if (session?.user) {
            // Save NextAuth user to localStorage
            const user = {
                name: session.user.name || 'User',
                email: session.user.email || '',
                avatar: session.user.image || '/demo.png',
                userId: session.user.email || 'user-id',
            };
            setUser(user);
            seedData();
            router.push('/dashboard');
            return;
        }

        // Check if user logged in via demo
        const existingUser = getUser();
        if (existingUser && !session) {
            router.push('/dashboard');
        }
    }, [session, router]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            console.error('Sign in error:', error);
            setIsLoading(false);
        }
    };

    const handleDemoLogin = () => {
        const demoUser = {
            name: 'Demo User',
            email: 'demo@nana.com',
            avatar: '/demo.png',
            userId: 'demo-123',
        };

        setUser(demoUser);
        seedData();
        router.push('/dashboard');
    };

    if (status === 'loading') {
        return (
            <main className="min-h-screen bg-gradient-to-br from-soft-blue via-white to-light-purple flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-blue mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-soft-blue via-white to-light-purple flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-soft-lg p-8 sm:p-12 max-w-md w-full"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-soft-blue to-light-purple rounded-2xl mb-4">
                        <span className="text-white font-bold text-2xl">N</span>
                    </div>
                    <h1 className="font-poppins text-3xl font-bold text-text-black mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">Sign in to continue to Nana Daily</p>
                </div>

                {/* Login Buttons */}
                <div className="space-y-4">
                    {/* Google Sign-In Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 text-text-black rounded-xl font-semibold flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        {isLoading ? 'Signing in...' : 'Sign in with Google'}
                    </motion.button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or</span>
                        </div>
                    </div>

                    {/* Demo Login Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDemoLogin}
                        className="w-full px-6 py-4 bg-gradient-to-r from-soft-blue to-light-purple text-white rounded-xl font-semibold flex items-center justify-center gap-3 shadow-soft hover:shadow-soft-lg transition-all"
                    >
                        <LogIn className="w-5 h-5" />
                        Demo Login
                    </motion.button>
                </div>

                {/* Info Text */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Demo login works without Google credentials. All data is stored locally in your browser.
                </p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-soft-blue/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-light-purple/20 rounded-full blur-3xl"></div>
        </main>
    );
}
