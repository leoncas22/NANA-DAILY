'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Edit2, Trash2 } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

export default function EventCard({ event, onEdit, onDelete }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 transition-all duration-300 hover:shadow-soft-lg cursor-pointer"
            onClick={() => onEdit(event)}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-black mb-3">
                        {event.title}
                    </h3>

                    <div className="space-y-2">
                        {event.date && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-soft-blue" />
                                <span>{formatDate(event.date)}</span>
                            </div>
                        )}

                        {event.time && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4 text-soft-blue" />
                                <span>{formatTime(event.time)}</span>
                            </div>
                        )}

                        {event.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-soft-blue" />
                                <span>{event.location}</span>
                            </div>
                        )}
                    </div>

                    {event.notes && (
                        <p className="mt-3 text-sm text-gray-500">{event.notes}</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(event);
                        }}
                        className="p-2 hover:bg-soft-gray rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(event.id);
                        }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
