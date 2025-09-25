# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React task management demo application built with Vite, TypeScript, and TailwindCSS. It's designed to showcase modern React development practices and interactive state management.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with React plugin
- **Styling**: TailwindCSS with PostCSS
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Database Ready**: Supabase client configured

### Project Structure
- `src/main.tsx` - Application entry point with React root
- `src/App.tsx` - Main app component with router setup
- `src/pages/` - Route components (Home, Tasks)
- `src/components/` - Reusable components (Navbar, TaskList, TaskItem)
- `src/types/` - TypeScript type definitions
- Configuration files for Vite, TypeScript, TailwindCSS, and ESLint

### Key Patterns
- Component-based architecture with clear separation of concerns
- TypeScript interfaces for type safety (e.g., Task interface)
- React hooks for state management (useState for local state)
- Prop drilling for simple state passing
- Responsive design with TailwindCSS utility classes
- Client-side routing with React Router

### Task Management Features
- Dynamic task creation with random task templates
- Task completion toggling
- Progress tracking with visual progress bars
- Statistics dashboard showing completed/remaining tasks
- Sample data with development-focused tasks

## Supabase Integration

The project includes `@supabase/supabase-js` as a dependency, indicating preparation for backend integration, though current implementation uses local state.

## GitHub Information

  - **GitHub Username**: mandarini
  - **Repository Owner**: mandarini (same as username)
  - **Preferred Method**: Use GitHub CLI (`gh` commands via Bash tool) for issue/PR operations if
  MCP tools fail