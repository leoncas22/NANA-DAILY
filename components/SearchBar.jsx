'use client';

import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
    return (
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none text-text-black placeholder-gray-400"
            />
        </div>
    );
}
