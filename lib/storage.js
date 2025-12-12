// LocalStorage utilities for Nana Daily

// User Management
export const getUser = () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('nana_user');
    return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nana_user', JSON.stringify(user));
};

export const clearUser = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('nana_user');
};

// Task Management
export const getTasks = () => {
    if (typeof window === 'undefined') return [];
    const tasks = localStorage.getItem('nana_tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const setTasks = (tasks) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nana_tasks', JSON.stringify(tasks));
};

export const addTask = (task) => {
    const tasks = getTasks();
    const newTask = {
        ...task,
        id: generateId(),
        completed: false,
        createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    setTasks(tasks);
    return newTask;
};

export const updateTask = (id, updates) => {
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updates };
        setTasks(tasks);
        return tasks[index];
    }
    return null;
};

export const deleteTask = (id) => {
    const tasks = getTasks();
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
};

// Event/Schedule Management
export const getEvents = () => {
    if (typeof window === 'undefined') return [];
    const events = localStorage.getItem('nana_events');
    return events ? JSON.parse(events) : [];
};

export const setEvents = (events) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nana_events', JSON.stringify(events));
};

export const addEvent = (event) => {
    const events = getEvents();
    const newEvent = {
        ...event,
        id: generateId(),
        createdAt: new Date().toISOString(),
    };
    events.push(newEvent);
    setEvents(events);
    return newEvent;
};

export const updateEvent = (id, updates) => {
    const events = getEvents();
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
        events[index] = { ...events[index], ...updates };
        setEvents(events);
        return events[index];
    }
    return null;
};

export const deleteEvent = (id) => {
    const events = getEvents();
    const filtered = events.filter(e => e.id !== id);
    setEvents(filtered);
};

// Generate unique ID
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Seed demo data
export const seedData = () => {
    if (typeof window === 'undefined') return;

    // Check if data already exists
    const existingTasks = getTasks();
    const existingEvents = getEvents();

    if (existingTasks.length === 0) {
        const demoTasks = [
            {
                id: generateId(),
                title: 'Welcome to Nana Daily!',
                description: 'This is a demo task. Feel free to edit or delete it.',
                date: new Date().toISOString().split('T')[0],
                completed: false,
                createdAt: new Date().toISOString(),
            },
            {
                id: generateId(),
                title: 'Complete project proposal',
                description: 'Finish the Q1 project proposal and send it to the team',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
                completed: false,
                createdAt: new Date().toISOString(),
            },
            {
                id: generateId(),
                title: 'Buy groceries',
                description: 'Milk, eggs, bread, vegetables',
                date: new Date().toISOString().split('T')[0],
                completed: true,
                createdAt: new Date().toISOString(),
            },
        ];
        setTasks(demoTasks);
    }

    if (existingEvents.length === 0) {
        const demoEvents = [
            {
                id: generateId(),
                title: 'Team Meeting',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                location: 'Conference Room A',
                notes: 'Discuss Q1 goals and project updates',
                createdAt: new Date().toISOString(),
            },
            {
                id: generateId(),
                title: 'Lunch with Sarah',
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                time: '12:30',
                location: 'Cafe Downtown',
                notes: 'Catch up and discuss collaboration',
                createdAt: new Date().toISOString(),
            },
            {
                id: generateId(),
                title: 'Gym Session',
                date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
                time: '18:00',
                location: 'FitLife Gym',
                notes: 'Leg day workout',
                createdAt: new Date().toISOString(),
            },
        ];
        setEvents(demoEvents);
    }
};
