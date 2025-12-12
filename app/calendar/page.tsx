'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CalendarComponent from '@/components/CalendarComponent';
import EventCard from '@/components/EventCard';
import Modal from '@/components/Modal';
import EventForm from '@/components/EventForm';
import { getUser, getEvents, addEvent, updateEvent, deleteEvent } from '@/lib/storage';
import { getEventsForDate } from '@/lib/utils';

interface Event {
    id?: string;
    title?: string;
    date: string;
    time?: string;
    description?: string;
    type?: string;
}

export default function CalendarPage() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);

    useEffect(() => {
        const currentUser = getUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }

        loadData();
    }, [router]);

    useEffect(() => {
        // Update events for selected date
        const dateEvents = getEventsForDate(events, selectedDate);
        setSelectedDateEvents(dateEvents);
    }, [selectedDate, events]);

    const loadData = () => {
        setEvents(getEvents());
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setEditingEvent({
            date: format(date, 'yyyy-MM-dd'),
        });
        setShowEventModal(true);
    };

    const handleEventSubmit = (formData: Event) => {
        if (editingEvent && editingEvent.id) {
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

    return (
        <div className="flex h-screen bg-soft-gray">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h1 className="text-3xl sm:text-4xl font-bold text-text-black mb-2">
                                Calendar
                            </h1>
                            <p className="text-gray-600">View and manage your events</p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Calendar */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="lg:col-span-2"
                            >
                                <CalendarComponent events={events} onDateClick={handleDateClick} />
                            </motion.div>

                            {/* Selected Date Events */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <div className="bg-white rounded-2xl shadow-soft p-6">
                                    <h2 className="text-xl font-semibold text-text-black mb-4">
                                        {format(selectedDate, 'MMMM dd, yyyy')}
                                    </h2>

                                    <div className="space-y-3">
                                        {selectedDateEvents.length > 0 ? (
                                            selectedDateEvents.map((event: Event) => (
                                                <EventCard
                                                    key={event.id}
                                                    event={event}
                                                    onEdit={(e: Event) => { setEditingEvent(e); setShowEventModal(true); }}
                                                    onDelete={handleDeleteEvent}
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-gray-500 mb-4">No events for this date</p>
                                                <button
                                                    onClick={() => handleDateClick(selectedDate)}
                                                    className="px-4 py-2 bg-soft-blue text-white rounded-xl font-medium hover:bg-blue-400 transition-colors"
                                                >
                                                    Add Event
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            <Modal
                isOpen={showEventModal}
                onClose={() => { setShowEventModal(false); setEditingEvent(null); }}
                title={editingEvent?.id ? 'Edit Event' : 'Add New Event'}
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
