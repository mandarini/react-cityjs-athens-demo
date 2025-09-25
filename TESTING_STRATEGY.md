# React Component Testing Strategy

This document outlines the comprehensive testing strategy for the React task management demo application, designed specifically for use with Claude Code's specialized testing subagent.

## Testing Framework Setup

- **Test Runner**: Vitest (optimized for Vite projects)
- **Testing Library**: React Testing Library (user-centric testing approach)
- **DOM Environment**: jsdom (Node.js DOM simulation)
- **Assertion Library**: Vitest's built-in assertions + @testing-library/jest-dom matchers
- **User Interaction**: @testing-library/user-event (realistic user interactions)

## Testing Philosophy

1. **User-Centric Testing**: Focus on testing behavior users will experience
2. **Implementation Independence**: Test what components do, not how they do it
3. **Accessibility Focus**: Ensure components work for all users
4. **Confidence Over Coverage**: Meaningful tests over percentage targets

## Component Testing Categories

### 1. Component Rendering Tests
Test that components render correctly with different props and states.

**Areas to Cover**:
- Initial render with default props
- Render with different prop combinations
- Conditional rendering based on props/state
- Error boundary scenarios

### 2. User Interaction Tests
Test user interactions and their effects on component behavior.

**Areas to Cover**:
- Click events (buttons, links, toggles)
- Form interactions (input, submit, validation)
- Keyboard navigation and accessibility
- Hover and focus states

### 3. Props Testing
Verify components handle props correctly and pass data appropriately.

**Areas to Cover**:
- Required vs optional props
- Default prop values
- Prop validation and type safety
- Callback prop execution

### 4. State Management Testing
Test internal state changes and their effects on rendering.

**Areas to Cover**:
- useState hook behavior
- State updates and re-renders
- Derived state calculations
- State synchronization between components

### 5. Integration Tests
Test component integration within the application context.

**Areas to Cover**:
- Router integration and navigation
- Context provider interactions
- Component composition and data flow
- Task management workflow end-to-end

## Testing Patterns by Component

### TaskItem Component
- **Rendering**: Test with completed/incomplete tasks
- **Interactions**: Click to toggle completion
- **Visual States**: Different styles for completed tasks
- **Accessibility**: Proper ARIA labels and keyboard navigation

### TaskList Component
- **Rendering**: Empty state vs populated list
- **Data Handling**: Correct task mapping and keys
- **Props Passing**: Task data and callbacks to TaskItem
- **Edge Cases**: Empty arrays, single items

### Tasks Page (Container)
- **State Management**: Task CRUD operations
- **Business Logic**: Task completion calculations
- **User Interactions**: Add task, toggle tasks
- **Data Flow**: Props passing to child components

### Navbar Component
- **Navigation**: Link functionality and active states
- **Router Integration**: useLocation hook behavior
- **Responsive Design**: Different screen sizes
- **Visual Feedback**: Active link highlighting

## Test File Organization

```
src/
├── components/
│   ├── TaskItem.tsx
│   ├── TaskItem.test.tsx
│   ├── TaskList.tsx
│   ├── TaskList.test.tsx
│   └── Navbar.tsx
│   └── Navbar.test.tsx
├── pages/
│   ├── Tasks.tsx
│   ├── Tasks.test.tsx
│   └── Home.tsx
│   └── Home.test.tsx
├── test/
│   ├── setup.ts
│   ├── utils.tsx (test utilities)
│   └── mocks/ (mock data and functions)
└── types/
    └── Task.ts (shared with test files)
```

## Testing Utilities

### Custom Render Function
Create a custom render function that includes necessary providers:

```typescript
// src/test/utils.tsx
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

### Mock Data
Create reusable mock data for consistent testing:

```typescript
// src/test/mocks/taskData.ts
import { Task } from '../../types/Task'

export const mockTasks: Task[] = [
  { id: 1, title: 'Test task 1', completed: false },
  { id: 2, title: 'Test task 2', completed: true },
  { id: 3, title: 'Test task 3', completed: false },
]

export const mockCompletedTask: Task = {
  id: 1,
  title: 'Completed task',
  completed: true,
}

export const mockPendingTask: Task = {
  id: 2,
  title: 'Pending task',
  completed: false,
}
```

## Testing Commands

- `npm run test` - Run tests in watch mode (development)
- `npm run test:run` - Run tests once (CI/CD)
- `npm run test:ui` - Open Vitest UI for interactive testing
- `npm run coverage` - Generate test coverage report

## Best Practices

### 1. Query Priority
Follow React Testing Library's query priority:
1. Accessible by everyone: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`
2. Semantic queries: `getByAltText`, `getByTitle`
3. Test IDs: `getByTestId` (last resort)

### 2. Async Testing
Use `waitFor` and `findBy` queries for async operations:
```typescript
await waitFor(() => {
  expect(screen.getByText('Loading...')).not.toBeInTheDocument()
})
```

### 3. User Events
Use `@testing-library/user-event` for realistic interactions:
```typescript
const user = userEvent.setup()
await user.click(button)
await user.type(input, 'test text')
```

### 4. Accessibility Testing
Test ARIA attributes and keyboard navigation:
```typescript
expect(button).toHaveAttribute('aria-pressed', 'true')
await user.keyboard('{Tab}')
expect(nextElement).toHaveFocus()
```

## Coverage Goals

- **Statement Coverage**: 85%+ for critical components
- **Branch Coverage**: 80%+ for conditional logic
- **Function Coverage**: 90%+ for public component APIs
- **Line Coverage**: 85%+ overall

## Continuous Integration

Tests should run on:
- Pre-commit hooks (critical tests only)
- Pull request validation (full test suite)
- Main branch builds (full suite + coverage)
- Release builds (full suite + integration tests)

This strategy provides a solid foundation for comprehensive React component testing while maintaining focus on user experience and code reliability.