'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import EventCard from '@/components/EventCard';
import Modal from '@/components/Modal';
import EventForm from '@/components/EventForm';
import { getUser, getEvents, addEvent, updateEvent, deleteEvent } from '@/lib/storage';
import { filterBySearch, groupByDate, sortByDate } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface Event {
    id?: string;
    title?: string;
    date: string;
    time?: string;
    location?: string;
    notes?: string;
    description?: string;
    type?: string;
}

export default function SchedulePage() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    useEffect(() => {
        const currentUser = getUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }

        loadData();
    }, [router]);

    useEffect(() => {
        // Apply search filter
        let result = events;

        if (searchQuery) {
            result = filterBySearch(result, searchQuery, ['title', 'location', 'notes']);
        }

        setFilteredEvents(sortByDate(result));
    }, [events, searchQuery]);

    const loadData = () => {
        setEvents(getEvents());
    };

    const handleEventSubmit = (formData: Event) => {
        if (editingEvent) {
            updateEvent(editingEvent.id, formData);
        } else {
            addEvent(formData);
        }
        setShowEventModal(false);
        setEditingEvent(null);
        loadData();
    };

    const handleDeleteEvent = (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            deleteEvent(id);
            loadData();
        }
    };

    // Group events by date
    const groupedEvents = groupByDate(filteredEvents) as Record<string, Event[]>;
    const dateKeys = Object.keys(groupedEvents).sort();

    return (
        <div className="flex h-screen bg-soft-gray">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar
                    showSearch={true}
                    searchValue={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-text-black mb-2">
                                        Schedule
                                    </h1>
                                    <p className="text-gray-600">{filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}</p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowEventModal(true)}
                                    className="px-4 sm:px-6 py-3 bg-gradient-to-r from-soft-blue to-light-purple text-white rounded-xl font-semibold flex items-center gap-2 shadow-soft hover:shadow-soft-lg transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span className="hidden sm:inline">Add Event</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Events List (Grouped by Date) */}
                        {dateKeys.length > 0 ? (
                            <div className="space-y-8">
                                {dateKeys.map((dateKey) => {
                                    const dateEvents = groupedEvents[dateKey];

                                    return (
                                        <div key={dateKey}>
                                            {/* Date Header */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="mb-4"
                                            >
                                                <h2 className="text-xl font-semibold text-text-black">
                                                    {format(parseISO(dateKey), 'EEEE, MMMM dd, yyyy')}
                                                </h2>
                                                <div className="h-0.5 bg-gradient-to-r from-soft-blue to-light-purple mt-2 rounded-full"></div>
                                            </motion.div>

                                            {/* Events for this date */}
                                            <div className="space-y-3">
                                                {dateEvents.map((event: Event, index: number) => (
                                                    <motion.div
                                                        key={event.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                    >
                                                        <EventCard
                                                            event={event}
                                                            onEdit={(e: Event) => { setEditingEvent(e); setShowEventModal(true); }}
                                                            onDelete={handleDeleteEvent}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <p className="text-gray-500 text-lg mb-4">
                                    {searchQuery ? 'No events found matching your search' : 'No events scheduled yet'}
                                </p>
                                {!searchQuery && (
                                    <button
                                        onClick={() => setShowEventModal(true)}
                                        className="px-6 py-3 bg-soft-blue text-white rounded-xl font-medium hover:bg-blue-400 transition-colors"
                                    >
                                        Create Your First Event
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modal */}
            <Modal
                isOpen={showEventModal}
                onClose={() => { setShowEventModal(false); setEditingEvent(null); }}
                title={editingEvent ? 'Edit Event' : 'Add New Event'}
            >
                <EventForm
                    event={editingEvent}
                    onSubmit={handleEventSubmit}
                    onCancel={() => { setShowEventModal(false); setEditingEvent(null); }}
                />
            </Modal>
        </div>
    );
}
