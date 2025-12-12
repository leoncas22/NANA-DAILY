'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Home() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/login');
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-soft-blue via-white to-light-purple flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl"
            >
                {/* Logo/Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-soft-lg mb-8"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-soft-blue to-light-purple rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-poppins text-4xl sm:text-5xl font-bold text-text-black mb-4"
                >
                    Welcome to <span className="bg-gradient-to-r from-soft-blue to-light-purple bg-clip-text text-transparent">Nana Daily</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl text-gray-600 mb-12"
                >
                    Make Your Day Organized
                </motion.p>

                {/* Get Started Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetStarted}
                    className="px-8 py-4 bg-gradient-to-r from-soft-blue to-light-purple text-white rounded-2xl font-semibold text-lg shadow-soft-lg hover:shadow-xl transition-all"
                >
                    Get Started
                </motion.button>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-soft-blue/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-light-purple/20 rounded-full blur-3xl"></div>
            </motion.div>
        </main>
    );
}
