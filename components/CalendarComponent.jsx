'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { getEventsForDate } from '@/lib/utils';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent({ events, onDateClick }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (onDateClick) {
            onDateClick(date);
        }
    };

    // Check if a date has events
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = format(date, 'yyyy-MM-dd');
            const dayEvents = getEventsForDate(events, dateString);

            if (dayEvents.length > 0) {
                return (
                    <div className="flex justify-center mt-1">
                        <div className="w-1.5 h-1.5 bg-soft-blue rounded-full"></div>
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className="calendar-wrapper">
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
                className="border-none"
            />
        </div>
    );
}
