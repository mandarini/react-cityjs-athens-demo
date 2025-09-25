# React Component Testing Conventions & Best Practices

This document outlines the specific testing conventions and best practices for the React task management demo application, designed for use with Claude Code's specialized testing subagent.

## File Structure & Naming

### Test File Naming
- **Component**: `ComponentName.tsx`
- **Test File**: `ComponentName.test.tsx`
- **Placement**: Test files are placed alongside their corresponding component files

### Directory Structure
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
│   ├── setup.ts           # Test environment setup
│   ├── utils.tsx          # Custom render helpers
│   └── mocks/
│       └── taskData.ts    # Mock data and factories
└── types/
    └── Task.ts            # Shared type definitions
```

## Test Organization Structure

### Standard Test Structure
```typescript
import { render, screen } from '../test/utils'
import userEvent from '@testing-library/user-event'
import ComponentName from './ComponentName'
import { mockData, createMockHandlers } from '../test/mocks/taskData'

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    // Tests for component rendering scenarios
  })

  describe('User Interactions', () => {
    // Tests for user interaction handling
  })

  describe('Props Handling', () => {
    // Tests for prop variations and validation
  })

  describe('State Management', () => {
    // Tests for internal state behavior (if applicable)
  })

  describe('Accessibility', () => {
    // Tests for accessibility features
  })

  describe('Edge Cases', () => {
    // Tests for error scenarios and edge cases
  })
})
```

## Test Naming Conventions

### Descriptive Test Names
Use the pattern: "should [expected behavior] when [condition]"

**Good Examples**:
```typescript
it('should render task title correctly', () => {})
it('should call onToggle when button is clicked', () => {})
it('should show completed badge when task is completed', () => {})
it('should handle empty task list gracefully', () => {})
```

**Avoid**:
```typescript
it('renders', () => {}) // Too vague
it('test click', () => {}) // Not descriptive
it('works', () => {}) // Not specific
```

### Group Related Tests
Use nested `describe` blocks to organize related test scenarios:

```typescript
describe('TaskItem', () => {
  describe('Rendering', () => {
    describe('when task is completed', () => {
      it('should show checkmark icon', () => {})
      it('should apply strike-through style to title', () => {})
      it('should show completed badge', () => {})
    })

    describe('when task is pending', () => {
      it('should show circle icon', () => {})
      it('should not show strike-through style', () => {})
      it('should not show completed badge', () => {})
    })
  })
})
```

## Query Strategies

### Query Priority (React Testing Library)
Follow this priority order when selecting elements:

1. **Accessible by everyone**: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`
2. **Semantic queries**: `getByAltText`, `getByTitle`
3. **Test IDs**: `getByTestId` (use sparingly, only when other queries fail)

### Examples
```typescript
// ✅ Preferred - Accessible to screen readers
const button = screen.getByRole('button')
const link = screen.getByRole('link', { name: /home/i })
const heading = screen.getByRole('heading', { level: 1 })

// ✅ Good - Text content visible to users
const text = screen.getByText('Task completed')
const label = screen.getByLabelText('Task title')

// ❌ Avoid - Implementation details
const element = screen.getByTestId('task-item')
const div = screen.getByClassName('task-container')
```

## Async Testing Patterns

### User Events
Always use `@testing-library/user-event` for realistic user interactions:

```typescript
const user = userEvent.setup()

// ✅ Correct - Realistic user interaction
await user.click(button)
await user.type(input, 'test text')
await user.keyboard('{Enter}')

// ❌ Avoid - Less realistic
fireEvent.click(button)
fireEvent.change(input, { target: { value: 'test text' } })
```

### Waiting for Changes
```typescript
// Wait for element to appear
const element = await screen.findByText('Loading complete')

// Wait for assertion to pass
await waitFor(() => {
  expect(screen.getByText('Updated content')).toBeInTheDocument()
})

// Wait for element to disappear
await waitFor(() => {
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})
```

## Mock Data Conventions

### Consistent Mock Data
```typescript
// Use factory functions for flexible mock creation
export const createMockTask = (overrides: Partial<Task> = {}): Task => ({
  id: Date.now() + Math.random(),
  title: 'Default test task',
  completed: false,
  ...overrides,
})

// Pre-defined common scenarios
export const testScenarios = {
  allCompleted: mockTasks.map(task => ({ ...task, completed: true })),
  allPending: mockTasks.map(task => ({ ...task, completed: false })),
  mixedState: mockTasks,
  singleTask: [mockPendingTask],
  emptyList: [],
}
```

### Mock Function Patterns
```typescript
// Factory for consistent mock handlers
export const createMockHandlers = () => ({
  onToggle: vi.fn(),
  onClick: vi.fn(),
  onSubmit: vi.fn(),
  onChange: vi.fn(),
})

// In tests
beforeEach(() => {
  vi.clearAllMocks()
})

// Use destructuring for clarity
const { onToggle } = createMockHandlers()
render(<TaskItem task={mockTask} onToggle={onToggle} />)
```

## Accessibility Testing

### ARIA Testing
```typescript
// Test proper roles
expect(screen.getByRole('button')).toBeInTheDocument()
expect(screen.getByRole('navigation')).toBeInTheDocument()
expect(screen.getByRole('list')).toBeInTheDocument()

// Test ARIA attributes
expect(button).toHaveAttribute('aria-pressed', 'false')
expect(input).toHaveAttribute('aria-label', 'Task title')
expect(region).toHaveAttribute('aria-live', 'polite')

// Test accessible names
expect(screen.getByRole('button', { name: /toggle task/i })).toBeInTheDocument()
```

### Keyboard Navigation
```typescript
// Test focus management
await user.tab()
expect(firstElement).toHaveFocus()

await user.tab()
expect(secondElement).toHaveFocus()

// Test keyboard interactions
await user.keyboard('{Enter}')
expect(mockCallback).toHaveBeenCalled()

await user.keyboard('{Escape}')
expect(modal).not.toBeInTheDocument()
```

## Error Handling & Edge Cases

### Graceful Degradation
```typescript
describe('Edge Cases', () => {
  it('should handle undefined props gracefully', () => {
    expect(() =>
      render(<TaskList tasks={undefined as any} onToggleTask={vi.fn()} />)
    ).not.toThrow()
  })

  it('should handle empty data correctly', () => {
    render(<TaskList tasks={[]} onToggleTask={vi.fn()} />)
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
  })

  it('should handle missing callback functions', () => {
    expect(() =>
      render(<TaskItem task={mockTask} onToggle={null as any} />)
    ).not.toThrow()
  })
})
```

### Error Boundaries (if implemented)
```typescript
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

it('should catch and handle component errors', () => {
  render(
    <ErrorBoundary>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  )

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
})
```

## Performance Testing

### React Keys and Reconciliation
```typescript
it('should use proper keys for list reconciliation', () => {
  const { rerender } = render(<TaskList tasks={mockTasks} onToggleTask={vi.fn()} />)

  const reorderedTasks = [...mockTasks].reverse()
  rerender(<TaskList tasks={reorderedTasks} onToggleTask={vi.fn()} />)

  // Should not cause errors or warnings in development
  expect(screen.getAllByRole('button')).toHaveLength(reorderedTasks.length)
})
```

## Test Organization Best Practices

### DRY Principle
```typescript
// ✅ Extract common setup
const defaultProps = {
  task: mockPendingTask,
  onToggle: vi.fn(),
}

beforeEach(() => {
  vi.clearAllMocks()
})

// ✅ Reusable test helper
const renderTaskItem = (props = {}) => {
  return render(<TaskItem {...defaultProps} {...props} />)
}
```

### Clear Test Isolation
```typescript
// ✅ Each test is independent
describe('TaskList', () => {
  it('should render empty state', () => {
    render(<TaskList tasks={[]} onToggleTask={vi.fn()} />)
    // Test assertions...
  })

  it('should render with tasks', () => {
    render(<TaskList tasks={mockTasks} onToggleTask={vi.fn()} />)
    // Test assertions...
  })
})
```

### Meaningful Assertions
```typescript
// ✅ Specific assertions
expect(screen.getByText('Task completed')).toBeInTheDocument()
expect(mockCallback).toHaveBeenCalledWith(expectedValue)
expect(element).toHaveClass('expected-class')

// ❌ Vague assertions
expect(screen.getByText('Task completed')).toBeTruthy()
expect(mockCallback).toHaveBeenCalled() // Without checking parameters
```

## Coverage Guidelines

### What to Test
- **User interactions** and their effects
- **Different prop combinations** and states
- **Conditional rendering** logic
- **Error handling** and edge cases
- **Accessibility features**
- **Integration points** between components

### What NOT to Test
- **Implementation details** (specific function names, internal state structure)
- **Third-party library behavior** (React Router, UI libraries)
- **Styling details** (specific CSS values, unless functionally important)
- **Complex business logic** (should be tested in separate unit tests)

## Common Patterns Summary

### Component Rendering Test
```typescript
it('should render with required props', () => {
  render(<Component {...requiredProps} />)
  expect(screen.getByText(expectedText)).toBeInTheDocument()
})
```

### User Interaction Test
```typescript
it('should handle user action correctly', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<Component onAction={mockHandler} />)
  await user.click(screen.getByRole('button'))

  expect(mockHandler).toHaveBeenCalledWith(expectedValue)
})
```

### Conditional Rendering Test
```typescript
it('should show different states based on props', () => {
  const { rerender } = render(<Component condition={false} />)
  expect(screen.queryByText('Conditional content')).not.toBeInTheDocument()

  rerender(<Component condition={true} />)
  expect(screen.getByText('Conditional content')).toBeInTheDocument()
})
```

These conventions ensure consistent, maintainable, and comprehensive test coverage across the entire React application while following modern testing best practices.