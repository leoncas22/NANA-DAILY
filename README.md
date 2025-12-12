# Nana Daily

A beautiful and minimalistic daily planner web application for managing tasks, schedules, and events.

## Features

✨ **Clean & Modern UI** - Soft colors, smooth animations, and minimalistic design  
🔐 **Google Sign-In** - Real authentication with NextAuth.js (or use Demo Login)  
📅 **Calendar View** - Interactive calendar with event indicators  
✅ **Task Management** - Create, edit, complete, and delete tasks  
🗓️ **Schedule Management** - Manage events with dates, times, and locations  
🔍 **Search** - Real-time search across tasks and events  
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  
💾 **Local Storage** - All data stored in your browser  

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Calendar**: react-calendar
- **Icons**: Lucide React
- **Storage**: LocalStorage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- (Optional) Google OAuth credentials for real authentication

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "NANA DAILY"
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up Google OAuth:
   - See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed instructions
   - Copy `.env.example` to `.env.local`
   - Fill in your Google OAuth credentials
   - Or skip this step and use Demo Login!

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### First Time Setup

1. Open the app and click "Get Started" on the splash screen
2. Choose your sign-in method:
   - **Google Sign-In**: Real authentication (requires setup)
   - **Demo Login**: Instant access without credentials
3. The app will automatically seed demo data on first login

### Features Guide

- **Dashboard**: View summary stats, quick actions, and recent items
- **Calendar**: Click dates to add events, view events by date
- **Tasks**: Create and manage your to-do list with filters
- **Schedule**: View all events organized by date
- **Settings**: Edit your profile name, clear data, or logout

### Data Persistence

All data is stored in your browser's localStorage. This means:
- Data persists across browser sessions
- Data is device-specific (doesn't sync across devices)
- Clearing browser data will delete all your information

## Project Structure

```
NANA DAILY/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Splash screen
│   ├── login/             # Login page
│   ├── dashboard/         # Dashboard page
│   ├── calendar/          # Calendar page
│   ├── tasks/             # Tasks page
│   ├── schedule/          # Schedule page
│   └── settings/          # Settings page
├── components/            # Reusable UI components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Modal.jsx
│   ├── TaskCard.jsx
│   ├── EventCard.jsx
│   ├── TaskForm.jsx
│   ├── EventForm.jsx
│   ├── SearchBar.jsx
│   └── CalendarComponent.jsx
├── lib/                   # Utility functions
│   ├── storage.js        # localStorage operations
│   └── utils.js          # Helper functions
└── public/               # Static assets
```

## Color Palette

- **Soft Blue**: #A5D8FF
- **Light Purple**: #DCD6F7
- **Soft Gray**: #F5F7FA
- **Text Black**: #1A1A1A

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Built with Next.js and TailwindCSS
- Icons from Lucide React
- Fonts from Google Fonts (Inter, Poppins)
