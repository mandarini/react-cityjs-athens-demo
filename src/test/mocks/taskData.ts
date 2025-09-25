import { Task } from '../../types/Task'

/**
 * Mock data for testing Task-related components
 * Use these consistent mock objects across all tests for predictable results
 */

export const mockTasks: Task[] = [
  { id: 1, title: 'Complete project setup', completed: true },
  { id: 2, title: 'Write unit tests', completed: false },
  { id: 3, title: 'Review code changes', completed: false },
  { id: 4, title: 'Deploy to staging', completed: true },
  { id: 5, title: 'User acceptance testing', completed: false },
]

export const mockCompletedTask: Task = {
  id: 1,
  title: 'Completed task example',
  completed: true,
}

export const mockPendingTask: Task = {
  id: 2,
  title: 'Pending task example',
  completed: false,
}

export const mockEmptyTasks: Task[] = []

/**
 * Factory function to create mock tasks with custom properties
 * Useful for testing edge cases and specific scenarios
 */
export const createMockTask = (overrides: Partial<Task> = {}): Task => ({
  id: Date.now() + Math.random(), // Ensure unique IDs
  title: 'Default test task',
  completed: false,
  ...overrides,
})

/**
 * Generate a list of mock tasks for testing list components
 */
export const createMockTasks = (count: number): Task[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockTask({
      id: index + 1,
      title: `Test task ${index + 1}`,
      completed: index % 2 === 0, // Alternate between completed and pending
    })
  )
}

/**
 * Mock callback functions for testing component interactions
 */
export const createMockHandlers = () => ({
  onToggle: vi.fn(),
  onClick: vi.fn(),
  onSubmit: vi.fn(),
  onChange: vi.fn(),
})

/**
 * Common test scenarios with pre-configured data
 */
export const testScenarios = {
  allCompleted: mockTasks.map(task => ({ ...task, completed: true })),
  allPending: mockTasks.map(task => ({ ...task, completed: false })),
  mixedState: mockTasks,
  singleTask: [mockPendingTask],
  emptyList: mockEmptyTasks,
}