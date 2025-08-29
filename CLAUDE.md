# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pomodoro Timer web application built with Next.js and React. It's a productivity tool implementing the Pomodoro Technique (25 minutes work + 5 minutes break cycles) with modern web technologies.

## Tech Stack

- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Context API** - State management
- **Local Storage** - Settings persistence

## Project Structure

```
pomodoro-timer/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── PomodoroTimer.tsx  # Main timer component
│   └── SettingsModal.tsx  # Settings configuration
├── contexts/              # React Context providers
│   └── SettingsContext.tsx # Settings state management
├── hooks/                 # Custom React hooks
│   └── useLocalStorage.ts # LocalStorage hook
├── public/                # Static assets
├── planejamento/          # Project documentation (Portuguese)
└── [config files]         # TypeScript, Next.js, ESLint configs
```

## Core Features

- **Timer System**: Work (25 min), Short Break (5 min), Long Break (15 min)
- **Customizable Durations**: User can adjust all timer durations
- **Session Management**: Automatic transitions between work/break cycles
- **Progress Tracking**: Visual indicators and cycle counter
- **Settings Persistence**: Saves user preferences in browser
- **Responsive Design**: Works on desktop and mobile devices

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Key Components

### PomodoroTimer.tsx
Main timer component handling:
- Countdown logic with useEffect and setInterval
- Session state management (work/break/long break)
- Audio notifications on timer completion
- Visual progress indicators

### SettingsContext.tsx
Global settings management:
- Timer durations (work, short break, long break)
- Auto-start preferences
- Notification settings
- Persistence with localStorage

### SettingsModal.tsx
UI for configuration:
- Duration inputs for each session type
- Toggle switches for features
- Save/cancel functionality

## Testing Approach

Manual testing checklist:
1. Timer countdown accuracy
2. Session transitions work → break → work
3. Settings persistence across page reloads
4. Responsive design on different screen sizes
5. Audio notifications trigger correctly

## Future Enhancements

Based on planejamento/plano-desenvolvimento.md:
- Task list integration
- Statistics and history tracking
- Dark/light theme toggle
- Keyboard shortcuts
- Export data functionality

## Important Notes

- Uses Next.js App Router (not Pages Router)
- TypeScript strict mode enabled
- Tailwind CSS v4 with PostCSS
- No external UI component libraries
- Focus on performance and accessibility