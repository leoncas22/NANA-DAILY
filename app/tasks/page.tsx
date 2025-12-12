'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import TaskCard from '@/components/TaskCard';
import Modal from '@/components/Modal';
import TaskForm from '@/components/TaskForm';
import { getUser, getTasks, addTask, updateTask, deleteTask } from '@/lib/storage';
import { filterBySearch } from '@/lib/utils';

export default function TasksPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, completed
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const currentUser = getUser();
        if (!currentUser) {
            router.push('/login');
            return;
        }

        loadData();
    }, [router]);

    useEffect(() => {
        // Apply filters
        let result = tasks;

        // Filter by status
        if (filter === 'active') {
            result = result.filter(t => !t.completed);
        } else if (filter === 'completed') {
            result = result.filter(t => t.completed);
        }

        // Search filter
        if (searchQuery) {
            result = filterBySearch(result, searchQuery, ['title', 'description']);
        }

        setFilteredTasks(result);
    }, [tasks, filter, searchQuery]);

    const loadData = () => {
        setTasks(getTasks());
    };

    const handleTaskToggle = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            updateTask(id, { completed: !task.completed });
            loadData();
        }
    };

    const handleTaskSubmit = (formData) => {
        if (editingTask) {
            updateTask(editingTask.id, formData);
        } else {
            addTask(formData);
        }
        setShowTaskModal(false);
        setEditingTask(null);
        loadData();
    };

    const handleDeleteTask = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTask(id);
            loadData();
        }
    };

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
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-text-black mb-2">
                                        Tasks
                                    </h1>
                                    <p className="text-gray-600">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowTaskModal(true)}
                                    className="px-4 sm:px-6 py-3 bg-gradient-to-r from-soft-blue to-light-purple text-white rounded-xl font-semibold flex items-center gap-2 shadow-soft hover:shadow-soft-lg transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span className="hidden sm:inline">Add Task</span>
                                </motion.button>
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex gap-2">
                                {['all', 'active', 'completed'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === f
                                                ? 'bg-soft-blue text-white'
                                                : 'bg-white text-gray-600 hover:bg-soft-gray'
                                            }`}
                                    >
                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tasks List */}
                        <div className="space-y-3">
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((task, index) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <TaskCard
                                            task={task}
                                            onToggle={handleTaskToggle}
                                            onEdit={(t) => { setEditingTask(t); setShowTaskModal(true); }}
                                            onDelete={handleDeleteTask}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <p className="text-gray-500 text-lg mb-4">
                                        {searchQuery ? 'No tasks found matching your search' : 'No tasks yet'}
                                    </p>
                                    {!searchQuery && (
                                        <button
                                            onClick={() => setShowTaskModal(true)}
                                            className="px-6 py-3 bg-soft-blue text-white rounded-xl font-medium hover:bg-blue-400 transition-colors"
                                        >
                                            Create Your First Task
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
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
        </div>
    );
}
