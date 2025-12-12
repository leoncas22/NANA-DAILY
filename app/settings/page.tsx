'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { User, LogOut, Trash2, Save } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { getUser, setUser, clearUser, getTasks, setTasks, getEvents, setEvents } from '@/lib/storage';

export default function SettingsPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [user, setUserState] = useState<{
        name: string;
        email: string;
        avatar: string;
        userId: string;
    } | null>(null);
    const [displayName, setDisplayName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Check NextAuth session first
        if (session?.user) {
            const sessionUser = {
                name: session.user.name || 'User',
                email: session.user.email || '',
                avatar: session.user.image || '/demo.png',
                userId: session.user.email || 'user-id',
            };
            setUserState(sessionUser);
            setDisplayName(sessionUser.name);
            setUser(sessionUser); // Also save to localStorage for consistency
            return;
        }

        // Fallback to localStorage user
        const currentUser = getUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }

        setUserState(currentUser);
        setDisplayName(currentUser.name);
    }, [session, router]);

    const handleSaveName = () => {
        if (!user) return;

        setIsSaving(true);

        const updatedUser = {
            ...user,
            name: displayName,
        };

        setUser(updatedUser);
        setUserState(updatedUser);

        setTimeout(() => {
            setIsSaving(false);
        }, 500);
    };

    const handleClearData = () => {
        if (confirm('Are you sure you want to delete all tasks and events? This cannot be undone.')) {
            setTasks([]);
            setEvents([]);
            alert('All data has been cleared!');
        }
    };

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            clearUser();

            // Sign out from NextAuth if session exists
            if (session) {
                await signOut({ callbackUrl: '/login' });
            } else {
                router.push('/login');
            }
        }
    };

    if (!user) return null;

    return (
        <div className="flex h-screen bg-soft-gray">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h1 className="text-3xl sm:text-4xl font-bold text-text-black mb-2">
                                Settings
                            </h1>
                            <p className="text-gray-600">Manage your account and preferences</p>
                        </motion.div>

                        {/* Profile Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-6"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                {user?.avatar && user.avatar.startsWith('http') ? (
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gradient-to-br from-light-purple to-soft-blue rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-white" />
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold text-text-black">{user.name}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                    {session && (
                                        <p className="text-xs text-soft-blue mt-1">Signed in with Google</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-black mb-2">
                                        Display Name
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="flex-1 px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none"
                                            placeholder="Enter your name"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSaveName}
                                            disabled={isSaving || displayName === user.name}
                                            className="px-6 py-3 bg-soft-blue text-white rounded-xl font-medium hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            {isSaving ? 'Saving...' : 'Save'}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Data Management */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-soft p-6 sm:p-8 mb-6"
                        >
                            <h2 className="text-xl font-semibold text-text-black mb-4">
                                Data Management
                            </h2>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-soft-gray rounded-xl">
                                    <div>
                                        <p className="font-medium text-text-black">Clear All Data</p>
                                        <p className="text-sm text-gray-600">Delete all tasks and events</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleClearData}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Clear
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Account Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-soft p-6 sm:p-8"
                        >
                            <h2 className="text-xl font-semibold text-text-black mb-4">
                                Account
                            </h2>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleLogout}
                                className="w-full px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </motion.button>
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 text-center text-sm text-gray-500"
                        >
                            <p>Nana Daily v1.0.0</p>
                            <p className="mt-1">All data is stored locally in your browser</p>
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
