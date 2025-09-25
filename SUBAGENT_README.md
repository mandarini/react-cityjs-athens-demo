# React Testing Subagent - Quick Start Guide

This README provides a quick reference for Claude Code's React Testing Specialist subagent when working with this task management application.

## 🎯 Subagent Mission
Generate comprehensive, maintainable unit tests for React components following modern testing best practices.

## 🚀 Quick Setup Verification
To verify the testing environment is working:
```bash
npm run test:run
```
All 60 tests should pass successfully.

## 📁 Key Files Reference

### Configuration Files
- **`vite.config.ts`** - Vitest configuration with jsdom environment
- **`src/test/setup.ts`** - Test environment setup
- **`package.json`** - Test scripts and dependencies

### Documentation
- **`SUBAGENT_TESTING_CONFIG.md`** - Complete subagent configuration
- **`TESTING_STRATEGY.md`** - Comprehensive testing strategy
- **`TESTING_CONVENTIONS.md`** - Detailed conventions and patterns

### Utilities & Mocks
- **`src/test/utils.tsx`** - Custom render function with router
- **`src/test/mocks/taskData.ts`** - Mock data and factory functions

### Example Tests
- **`src/components/TaskItem.test.tsx`** - Component rendering & interaction tests
- **`src/components/TaskList.test.tsx`** - List handling & data flow tests
- **`src/components/Navbar.test.tsx`** - Router integration & navigation tests

## 🧪 Testing Framework Stack

- **Test Runner**: Vitest (optimized for Vite)
- **Testing Library**: React Testing Library (user-centric approach)
- **DOM Environment**: jsdom
- **User Interactions**: @testing-library/user-event
- **Assertions**: Vitest built-in + @testing-library/jest-dom

## 🏗️ Component Architecture

### Components to Test
1. **TaskItem** - Individual task with toggle functionality
2. **TaskList** - Task collection with empty state handling
3. **Navbar** - Navigation with active route highlighting
4. **Tasks Page** - State management and business logic

### Data Types
```typescript
interface Task {
  id: number;
  title: string;
  completed: boolean;
}
```

## 🎨 Test Structure Template

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
    it('should render with default props', () => {
      render(<ComponentName {...defaultProps} />)
      expect(screen.getByText('Expected Text')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should handle click events', async () => {
      const { mockHandler } = createMockHandlers()
      const user = userEvent.setup()

      render(<ComponentName onAction={mockHandler} />)
      await user.click(screen.getByRole('button'))

      expect(mockHandler).toHaveBeenCalledWith(expectedValue)
    })
  })

  describe('Props Handling', () => {
    // Props variation tests
  })

  describe('Accessibility', () => {
    // A11y and keyboard navigation tests
  })

  describe('Edge Cases', () => {
    // Error handling and edge case tests
  })
})
```

## 🔍 Query Priority Checklist

1. ✅ **`getByRole`** - Buttons, links, headings, inputs
2. ✅ **`getByLabelText`** - Form fields with labels
3. ✅ **`getByText`** - Visible text content
4. ⚠️ **`getByTestId`** - Use sparingly, only when other queries fail

## 🎭 Mock Data Usage

```typescript
// Factory functions
const task = createMockTask({ title: 'Custom task', completed: true })
const tasks = createMockTasks(5) // Generate 5 test tasks

// Predefined scenarios
const { mixedState, emptyList, allCompleted } = testScenarios

// Mock handlers
const { onToggle, onClick } = createMockHandlers()
```

## ⚡ Commands Reference

```bash
npm run test          # Watch mode (development)
npm run test:run      # Single run (CI/CD)
npm run test:ui       # Interactive UI
npm run coverage      # Coverage report
```

## 🎯 Test Categories Checklist

For each component, ensure tests cover:

- [ ] **Rendering** - Different props and states
- [ ] **User Interactions** - Click, keyboard, form events
- [ ] **Props Handling** - Required/optional props, validation
- [ ] **State Management** - Internal state changes (if applicable)
- [ ] **Accessibility** - ARIA attributes, keyboard navigation
- [ ] **Integration** - Router/context interactions (if applicable)
- [ ] **Edge Cases** - Error scenarios, empty data

## 🚨 Common Pitfalls to Avoid

❌ Testing implementation details (internal state, function names)
❌ Using `getByTestId` as primary query method
❌ Not using `userEvent.setup()` for interactions
❌ Testing third-party library behavior
❌ Forgetting to clear mocks between tests
❌ Not testing accessibility features

## ✅ Success Criteria

A good test suite should:
- ✅ All tests pass (`npm run test:run`)
- ✅ Follow naming convention: `ComponentName.test.tsx`
- ✅ Use descriptive test names with "should...when..." pattern
- ✅ Cover user-visible behavior, not implementation
- ✅ Include accessibility testing where applicable
- ✅ Handle edge cases and error scenarios
- ✅ Use consistent mock data and patterns

## 🔄 Workflow for New Components

1. **Analyze** the component's props, state, and behavior
2. **Create** `ComponentName.test.tsx` alongside the component
3. **Import** testing utilities and relevant mocks
4. **Structure** tests using the standard describe blocks
5. **Write** tests covering all categories in the checklist
6. **Run** tests to ensure they pass: `npm run test:run`
7. **Verify** the component works as expected

## 📋 Component Test Status

- ✅ **TaskItem** - Complete (18 tests)
- ✅ **TaskList** - Complete (18 tests)
- ✅ **Navbar** - Complete (24 tests)
- 🟡 **Tasks Page** - Pending
- 🟡 **Home Page** - Pending

Total: **60/60 tests passing** ✅

## 🆘 Troubleshooting

**Router conflicts?** Use direct `rtlRender` from `@testing-library/react` for router components instead of custom `render`

**Async operations?** Use `waitFor()` or `findBy*` queries for elements that appear asynchronously

**Mock data issues?** Check `src/test/mocks/taskData.ts` for available mock objects and factories

**Type errors?** Ensure TypeScript types match the component's interface requirements

---

**Ready to write tests!** Follow the configuration in `SUBAGENT_TESTING_CONFIG.md` and patterns in the example test files to create comprehensive test coverage for React components.