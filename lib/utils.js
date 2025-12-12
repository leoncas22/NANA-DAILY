// Utility functions for Nana Daily

import { format, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';

// Get greeting based on current time
export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
};

// Format date consistently
export const formatDate = (dateString) => {
    if (!dateString) return '';

    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;

        if (isToday(date)) {
            return 'Today';
        } else if (isTomorrow(date)) {
            return 'Tomorrow';
        } else {
            return format(date, 'MMM dd, yyyy');
        }
    } catch (error) {
        return dateString;
    }
};

// Format time
export const formatTime = (timeString) => {
    if (!timeString) return '';

    try {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
        return timeString;
    }
};

// Filter items by search query
export const filterBySearch = (items, query, fields = ['title', 'description']) => {
    if (!query || query.trim() === '') return items;

    const lowerQuery = query.toLowerCase();

    return items.filter(item => {
        return fields.some(field => {
            const value = item[field];
            return value && value.toLowerCase().includes(lowerQuery);
        });
    });
};

// Check if event is upcoming (within next 7 days)
export const isUpcoming = (dateString) => {
    if (!dateString) return false;

    try {
        const date = parseISO(dateString);
        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        return date >= now && date <= weekFromNow;
    } catch (error) {
        return false;
    }
};

// Check if task is due today
export const isDueToday = (dateString) => {
    if (!dateString) return false;

    try {
        const date = parseISO(dateString);
        return isToday(date);
    } catch (error) {
        return false;
    }
};

// Sort tasks by date
export const sortByDate = (items) => {
    return [...items].sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt);
        const dateB = new Date(b.date || b.createdAt);
        return dateA - dateB;
    });
};

// Group events by date
export const groupByDate = (events) => {
    const grouped = {};

    events.forEach(event => {
        const date = event.date;
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(event);
    });

    return grouped;
};

// Get events for a specific date
export const getEventsForDate = (events, date) => {
    const dateString = typeof date === 'string' ? date : format(date, 'yyyy-MM-dd');
    return events.filter(event => event.date === dateString);
};
