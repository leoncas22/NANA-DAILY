'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Search, LogOut, User } from 'lucide-react';
import { getUser, clearUser } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar({ showSearch = false, searchValue = '', onSearchChange = () => { } }) {
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        // Prioritize NextAuth session user over localStorage user
        if (session?.user) {
            setUser({
                name: session.user.name || 'User',
                email: session.user.email || '',
                avatar: session.user.image || '/demo.png',
            });
        } else {
            setUser(getUser());
        }
    }, [session]);

    const handleLogout = async () => {
        // Clear localStorage
        clearUser();

        // Sign out from NextAuth if session exists
        if (session) {
            await signOut({ callbackUrl: '/login' });
        } else {
            router.push('/login');
        }
    };

    return (
        <nav className="bg-white border-b border-soft-gray sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-soft-blue to-light-purple rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">N</span>
                        </div>
                        <span className="font-poppins font-semibold text-xl text-text-black hidden sm:block">
                            Nana Daily
                        </span>
                    </Link>

                    {/* Search Bar (Desktop) */}
                    {showSearch && (
                        <div className="hidden md:block flex-1 max-w-md mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 bg-soft-gray rounded-lg border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none text-sm"
                                />
                            </div>
                        </div>
                    )}

                    {/* User Menu */}
                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 p-2 hover:bg-soft-gray rounded-lg transition-colors"
                                >
                                    {user?.avatar && user.avatar.startsWith('http') ? (
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-gradient-to-br from-light-purple to-soft-blue rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <span className="hidden sm:block text-sm font-medium text-text-black">
                                        {user.name}
                                    </span>
                                </button>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft-lg py-2 border border-soft-gray"
                                        >
                                            <Link
                                                href="/settings"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-soft-gray transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                <span>Settings</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 hover:bg-soft-gray rounded-lg transition-colors"
                        >
                            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Search Bar (Mobile) */}
                {showSearch && (
                    <div className="md:hidden pb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 bg-soft-gray rounded-lg border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none text-sm"
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
