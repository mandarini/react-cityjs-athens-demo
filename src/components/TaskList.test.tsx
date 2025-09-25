import { render, screen } from '../test/utils'
import userEvent from '@testing-library/user-event'
import TaskList from './TaskList'
import { mockTasks, mockEmptyTasks, createMockTasks, createMockHandlers } from '../test/mocks/taskData'

describe('TaskList', () => {
  const defaultProps = {
    tasks: mockTasks,
    onToggleTask: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render list of tasks when tasks are provided', () => {
      render(<TaskList {...defaultProps} />)

      // Check that all task titles are rendered
      mockTasks.forEach(task => {
        expect(screen.getByText(task.title)).toBeInTheDocument()
      })
    })

    it('should render correct number of task items', () => {
      render(<TaskList {...defaultProps} />)

      const taskButtons = screen.getAllByRole('button')
      expect(taskButtons).toHaveLength(mockTasks.length)
    })

    it('should render empty state when no tasks are provided', () => {
      render(<TaskList tasks={mockEmptyTasks} onToggleTask={vi.fn()} />)

      expect(screen.getByText('No tasks yet')).toBeInTheDocument()
      expect(screen.getByText('Add your first task to get started!')).toBeInTheDocument()
      expect(screen.getByText('📝')).toBeInTheDocument()
    })

    it('should not render task items when tasks array is empty', () => {
      render(<TaskList tasks={mockEmptyTasks} onToggleTask={vi.fn()} />)

      const taskButtons = screen.queryAllByRole('button')
      expect(taskButtons).toHaveLength(0)
    })
  })

  describe('Data Handling', () => {
    it('should handle single task correctly', () => {
      const singleTask = [mockTasks[0]]
      render(<TaskList tasks={singleTask} onToggleTask={vi.fn()} />)

      expect(screen.getByText(singleTask[0].title)).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(1)
    })

    it('should handle large number of tasks', () => {
      const manyTasks = createMockTasks(50)
      render(<TaskList tasks={manyTasks} onToggleTask={vi.fn()} />)

      const taskButtons = screen.getAllByRole('button')
      expect(taskButtons).toHaveLength(50)
    })

    it('should maintain task order from props', () => {
      const orderedTasks = [
        { id: 3, title: 'Third task', completed: false },
        { id: 1, title: 'First task', completed: true },
        { id: 2, title: 'Second task', completed: false },
      ]

      render(<TaskList tasks={orderedTasks} onToggleTask={vi.fn()} />)

      const taskElements = screen.getAllByText(/task/)
      expect(taskElements[0]).toHaveTextContent('Third task')
      expect(taskElements[1]).toHaveTextContent('First task')
      expect(taskElements[2]).toHaveTextContent('Second task')
    })
  })

  describe('Props Passing', () => {
    it('should pass task data to TaskItem components', () => {
      render(<TaskList {...defaultProps} />)

      // Verify that both completed and pending tasks are rendered with correct styles
      const completedTasks = mockTasks.filter(task => task.completed)
      const pendingTasks = mockTasks.filter(task => !task.completed)

      completedTasks.forEach(task => {
        const titleElement = screen.getByText(task.title)
        expect(titleElement).toHaveClass('line-through')
      })

      pendingTasks.forEach(task => {
        const titleElement = screen.getByText(task.title)
        expect(titleElement).not.toHaveClass('line-through')
      })
    })

    it('should pass onToggleTask callback to TaskItem components', async () => {
      const { onToggle } = createMockHandlers()
      const user = userEvent.setup()

      render(<TaskList tasks={mockTasks} onToggleTask={onToggle} />)

      const firstTaskButton = screen.getAllByRole('button')[0]
      await user.click(firstTaskButton)

      expect(onToggle).toHaveBeenCalledWith(mockTasks[0].id)
    })

    it('should handle callback execution for multiple tasks', async () => {
      const { onToggle } = createMockHandlers()
      const user = userEvent.setup()

      render(<TaskList tasks={mockTasks} onToggleTask={onToggle} />)

      const taskButtons = screen.getAllByRole('button')

      // Click on different tasks
      await user.click(taskButtons[0])
      await user.click(taskButtons[1])
      await user.click(taskButtons[2])

      expect(onToggle).toHaveBeenCalledTimes(3)
      expect(onToggle).toHaveBeenNthCalledWith(1, mockTasks[0].id)
      expect(onToggle).toHaveBeenNthCalledWith(2, mockTasks[1].id)
      expect(onToggle).toHaveBeenNthCalledWith(3, mockTasks[2].id)
    })
  })

  describe('User Interactions', () => {
    it('should allow interaction with all task items', async () => {
      const { onToggle } = createMockHandlers()
      const user = userEvent.setup()

      render(<TaskList tasks={mockTasks} onToggleTask={onToggle} />)

      const taskButtons = screen.getAllByRole('button')

      for (let i = 0; i < taskButtons.length; i++) {
        await user.click(taskButtons[i])
        expect(onToggle).toHaveBeenCalledWith(mockTasks[i].id)
      }

      expect(onToggle).toHaveBeenCalledTimes(mockTasks.length)
    })

    it('should support keyboard navigation between tasks', async () => {
      const user = userEvent.setup()
      render(<TaskList {...defaultProps} />)

      // Tab through all task buttons
      const taskButtons = screen.getAllByRole('button')

      await user.tab()
      expect(taskButtons[0]).toHaveFocus()

      await user.tab()
      expect(taskButtons[1]).toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined tasks gracefully', () => {
      // TaskList component should handle undefined by showing empty state
      render(<TaskList tasks={undefined as any} onToggleTask={vi.fn()} />)

      // Should show empty state when tasks is undefined
      expect(screen.getByText('No tasks yet')).toBeInTheDocument()
    })

    it('should handle tasks with missing properties', () => {
      const invalidTasks = [
        { id: 1, title: '', completed: false },
        { id: 2, title: 'Valid task', completed: true },
      ] as any

      expect(() =>
        render(<TaskList tasks={invalidTasks} onToggleTask={vi.fn()} />)
      ).not.toThrow()
    })

    it('should handle null onToggleTask callback', () => {
      expect(() =>
        render(<TaskList tasks={mockTasks} onToggleTask={null as any} />)
      ).not.toThrow()
    })
  })

  describe('Performance', () => {
    it('should use task IDs as keys for React reconciliation', () => {
      // This is tested implicitly through React's behavior
      // If keys are missing, React would show warnings in development
      const { rerender } = render(<TaskList {...defaultProps} />)

      const reorderedTasks = [...mockTasks].reverse()
      rerender(<TaskList tasks={reorderedTasks} onToggleTask={vi.fn()} />)

      // Should not cause any errors or warnings
      expect(screen.getAllByRole('button')).toHaveLength(reorderedTasks.length)
    })
  })

  describe('Accessibility', () => {
    it('should provide accessible structure for screen readers', () => {
      render(<TaskList {...defaultProps} />)

      // All task buttons should be accessible
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)

      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })

    it('should show meaningful empty state for screen readers', () => {
      render(<TaskList tasks={mockEmptyTasks} onToggleTask={vi.fn()} />)

      expect(screen.getByText('No tasks yet')).toBeInTheDocument()
      expect(screen.getByText('Add your first task to get started!')).toBeInTheDocument()
    })
  })
})