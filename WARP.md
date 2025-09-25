# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React TypeScript demo application built with Vite, showcasing modern web development practices and AI-assisted coding capabilities. The project demonstrates task management features with a clean, responsive UI using TailwindCSS.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Testing and Debugging
```bash
# Type checking
npx tsc --noEmit

# Check for ESLint issues in specific files
npx eslint src/**/*.tsx

# Build and analyze bundle size
npm run build -- --mode production
```

## Architecture

### Technology Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **TailwindCSS** for utility-first styling
- **React Router** v7 for client-side routing
- **Supabase JS Client** for potential backend integration
- **Lucide React** for consistent iconography

### Project Structure
The application follows a feature-based component architecture:

- **Routing**: Configured in `src/App.tsx` using React Router with two main routes (Home and Tasks)
- **State Management**: Uses React's built-in useState for local component state (no external state management library currently)
- **Component Pattern**: Functional components with TypeScript interfaces for props
- **Styling**: TailwindCSS utility classes with responsive design patterns

### Key Components and Their Responsibilities

1. **App.tsx**: Root component handling routing setup and global layout
2. **Pages**: 
   - `Home.tsx`: Landing page with feature showcase
   - `Tasks.tsx`: Interactive task management demo with state manipulation
3. **Components**:
   - `Navbar.tsx`: Navigation header
   - `TaskList.tsx`: Renders list of tasks
   - `TaskItem.tsx`: Individual task component
4. **Types**: TypeScript interfaces defined in `src/types/` directory

### Build Configuration

- **Vite Config**: Excludes `lucide-react` from dependency optimization for better development experience
- **TypeScript**: Configured with separate configs for app (`tsconfig.app.json`) and node (`tsconfig.node.json`)
- **ESLint**: Uses TypeScript ESLint with React Hooks and React Refresh plugins
- **TailwindCSS**: Configured to scan all TSX/JSX files in src directory

## Supabase Integration Points

The project includes `@supabase/supabase-js` as a dependency, indicating readiness for backend integration. When implementing Supabase features:

1. Create a `src/lib/supabase.ts` file for client initialization
2. Add environment variables for Supabase URL and anon key in `.env.local`
3. Consider implementing authentication in the Navbar component
4. Extend the Task type to include database fields (created_at, user_id, etc.)

## Code Style and Patterns

### Component Structure
- Use functional components with TypeScript FC type
- Destructure props in function parameters
- Keep component files focused and single-purpose

### State Management
- Use hooks for local state management
- Consider implementing custom hooks for shared logic
- Keep state as close to where it's used as possible

### Styling Approach
- Use TailwindCSS utility classes
- Apply responsive modifiers (sm:, md:, lg:) for breakpoints
- Group related utilities for maintainability
- Use consistent spacing and color schemes from Tailwind's default palette

## Development Workflow

When adding new features:
1. Create TypeScript interfaces in `src/types/`
2. Build components in `src/components/`
3. Add pages to `src/pages/` and update routing in App.tsx
4. Ensure responsive design with Tailwind breakpoints
5. Verify TypeScript compilation with `npx tsc --noEmit`
6. Run linting before committing

## Performance Considerations

- Components are not currently memoized - consider React.memo for expensive re-renders
- Routes are not lazy-loaded - implement code splitting for larger applications
- Vite's build optimization handles tree-shaking and minification automatically

## Current Implementation Status

- ✅ Basic routing structure
- ✅ Task management UI with local state
- ✅ Responsive design with TailwindCSS
- ✅ TypeScript type safety
- ⏳ Supabase backend integration (dependency installed, not implemented)
- ⏳ User authentication
- ⏳ Data persistence