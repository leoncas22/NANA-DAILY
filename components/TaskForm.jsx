'use client';

import { useState } from 'react';

export default function TaskForm({ task, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        date: task?.date || new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-text-black mb-2">
                    Task Title *
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none"
                    placeholder="Enter task title"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-black mb-2">
                    Description
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none resize-none"
                    placeholder="Enter task description (optional)"
                    rows="3"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-black mb-2">
                    Due Date *
                </label>
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none"
                    required
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-6 py-3 bg-soft-gray text-text-black rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-soft-blue text-white rounded-xl font-medium hover:bg-blue-400 transition-colors"
                >
                    {task ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
}
