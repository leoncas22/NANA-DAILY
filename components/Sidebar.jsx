'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Calendar, CheckSquare, Clock, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Schedule', href: '/schedule', icon: Clock },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-soft-gray min-h-screen">
                <div className="flex-1 py-6">
                    <nav className="px-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                                ? 'bg-gradient-to-r from-soft-blue to-light-purple text-white shadow-soft'
                                                : 'text-gray-600 hover:bg-soft-gray'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-soft-gray z-50">
                <nav className="flex justify-around items-center h-16 px-2">
                    {navItems.slice(0, 4).map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${isActive
                                            ? 'text-soft-blue'
                                            : 'text-gray-400'
                                        }`}
                                >
                                    <Icon className={`w-6 h-6 ${isActive ? 'stroke-2' : 'stroke-1'}`} />
                                    <span className="text-xs font-medium">{item.name}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
