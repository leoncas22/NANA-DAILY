'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, CheckCircle, Calendar as CalendarIcon, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import TaskCard from '@/components/TaskCard';
import EventCard from '@/components/EventCard';
import Modal from '@/components/Modal';
import TaskForm from '@/components/TaskForm';
import EventForm from '@/components/EventForm';
import { getUser, getTasks, getEvents, updateTask, deleteTask, addTask, deleteEvent, addEvent, updateEvent } from '@/lib/storage';
import { getGreeting, isDueToday, isUpcoming, sortByDate } from '@/lib/utils';

interface User {
    name: string;
    email: string;
}

interface Task {
    id?: string;
    title?: string;
    date: string;
    completed?: boolean;
    priority?: string;
}

interface Event {
    id?: string;
    title?: string;
    date: string;
    time?: string;
    description?: string;
    type?: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    useEffect(() => {
        const currentUser = getUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }

        setUser(currentUser);
        loadData();
    }, [router]);

    const loadData = () => {
        setTasks(getTasks());
        setEvents(getEvents());
    };

    const handleTaskToggle = (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            updateTask(id, { completed: !task.completed });
            loadData();
        }
    };

    const handleTaskSubmit = (formData: Task) => {
        if (editingTask) {
            updateTask(editingTask.id, formData);
        } else {
            addTask(formData);
        }
        setShowTaskModal(false);
        setEditingTask(null);
        loadData();
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

    const handleDeleteTask = (id: string) => {
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTask(id);
            loadData();
        }
    };

    const handleDeleteEvent = (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            deleteEvent(id);
            loadData();
        }
    };

    const tasksDueToday = tasks.filter(t => isDueToday(t.date) && !t.completed);
    const upcomingEvents = events.filter(e => isUpcoming(e.date)).slice(0, 3);
    const completedThisWeek = tasks.filter(t => t.completed).length;
    const recentTasks = sortByDate(tasks).slice(0, 3);

    if (!user) return null;

    return (
        <div className="flex h-screen bg-soft-gray">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Greeting */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h1 className="text-3xl sm:text-4xl font-bold text-text-black mb-2">
                                {getGreeting()}, {user.name}! 👋
                            </h1>
                            <p className="text-gray-600">{"Here's what's happening today"}</p>
                        </motion.div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl shadow-soft p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">Due Today</p>
                                        <p className="text-3xl font-bold text-text-black">{tasksDueToday.length}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-soft-blue/20 rounded-xl flex items-center justify-center">
                                        <CalendarIcon className="w-6 h-6 text-soft-blue" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-soft p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">Upcoming Events</p>
                                        <p className="text-3xl font-bold text-text-black">{upcomingEvents.length}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-light-purple/20 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-soft p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">Completed</p>
                                        <p className="text-3xl font-bold text-text-black">{completedThisWeek}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowTaskModal(true)}
                                className="bg-gradient-to-r from-soft-blue to-light-purple text-white rounded-2xl p-6 flex items-center justify-center gap-3 shadow-soft hover:shadow-soft-lg transition-all"
                            >
                                <Plus className="w-6 h-6" />
                                <span className="font-semibold text-lg">Add Task</span>
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowEventModal(true)}
                                className="bg-white border-2 border-soft-blue text-soft-blue rounded-2xl p-6 flex items-center justify-center gap-3 shadow-soft hover:shadow-soft-lg transition-all"
                            >
                                <Plus className="w-6 h-6" />
                                <span className="font-semibold text-lg">Add Event</span>
                            </motion.button>
                        </div>

                        {/* Recent Tasks & Upcoming Events */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Tasks */}
                            <div>
                                <h2 className="text-xl font-semibold text-text-black mb-4">Recent Tasks</h2>
                                <div className="space-y-3">
                                    {recentTasks.length > 0 ? (
                                        recentTasks.map((task: Task) => (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                                onToggle={handleTaskToggle}
                                                onEdit={(t: Task) => { setEditingTask(t); setShowTaskModal(true); }}
                                                onDelete={handleDeleteTask}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-8">No tasks yet. Create one to get started!</p>
                                    )}
                                </div>
                            </div>

                            {/* Upcoming Events */}
                            <div>
                                <h2 className="text-xl font-semibold text-text-black mb-4">Upcoming Events</h2>
                                <div className="space-y-3">
                                    {upcomingEvents.length > 0 ? (
                                        upcomingEvents.map((event: Event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                                onEdit={(e: Event) => { setEditingEvent(e); setShowEventModal(true); }}
                                                onDelete={handleDeleteEvent}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-8">No upcoming events.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals */}
            <Modal
                isOpen={showTaskModal}
                onClose={() => { setShowTaskModal(false); setEditingTask(null); }}
                title={editingTask ? 'Edit Task' : 'Add New Task'}
            >
                <TaskForm
                    task={editingTask}
                    onSubmit={handleTaskSubmit}
                    onCancel={() => { setShowTaskModal(false); setEditingTask(null); }}
                />
            </Modal>

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
