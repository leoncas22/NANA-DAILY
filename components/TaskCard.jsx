'use client';

import { motion } from 'framer-motion';
import { Check, Edit2, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-white rounded-2xl shadow-soft p-4 sm:p-6 transition-all duration-300 hover:shadow-soft-lg ${task.completed ? 'opacity-60' : ''
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                    onClick={() => onToggle(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed
                            ? 'bg-soft-blue border-soft-blue'
                            : 'border-gray-300 hover:border-soft-blue'
                        }`}
                >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3
                        className={`text-lg font-semibold mb-1 ${task.completed ? 'line-through text-gray-400' : 'text-text-black'
                            }`}
                    >
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    )}
                    <p className="text-sm text-soft-blue font-medium">
                        {formatDate(task.date)}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 hover:bg-soft-gray rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
