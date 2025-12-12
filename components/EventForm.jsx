'use client';

import { useState } from 'react';

export default function EventForm({ event, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: event?.title || '',
        date: event?.date || new Date().toISOString().split('T')[0],
        time: event?.time || '09:00',
        location: event?.location || '',
        notes: event?.notes || '',
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
                    Event Title *
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none"
                    placeholder="Enter event title"
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text-black mb-2">
                        Date *
                    </label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-black mb-2">
                        Time
                    </label>
                    <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-black mb-2">
                    Location
                </label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none"
                    placeholder="Enter location (optional)"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-black mb-2">
                    Notes
                </label>
                <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-2 border-transparent focus:border-soft-blue focus:bg-white transition-all outline-none resize-none"
                    placeholder="Enter notes (optional)"
                    rows="3"
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
                    {event ? 'Update Event' : 'Add Event'}
                </button>
            </div>
        </form>
    );
}
