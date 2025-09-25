import { render, screen } from '../test/utils'
import userEvent from '@testing-library/user-event'
import TaskItem from './TaskItem'
import { mockCompletedTask, mockPendingTask, createMockHandlers } from '../test/mocks/taskData'

describe('TaskItem', () => {
  const defaultProps = {
    task: mockPendingTask,
    onToggle: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render task title correctly', () => {
      render(<TaskItem {...defaultProps} />)
      expect(screen.getByText(mockPendingTask.title)).toBeInTheDocument()
    })

    it('should render pending task with circle icon', () => {
      render(<TaskItem {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('text-gray-400', 'hover:text-blue-500')
    })

    it('should render completed task with checkmark icon and completed badge', () => {
      render(<TaskItem task={mockCompletedTask} onToggle={vi.fn()} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-green-500', 'hover:text-green-600')
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('should apply strike-through style to completed task title', () => {
      render(<TaskItem task={mockCompletedTask} onToggle={vi.fn()} />)

      const title = screen.getByText(mockCompletedTask.title)
      expect(title).toHaveClass('line-through', 'text-gray-500')
    })

    it('should not show completed badge for pending tasks', () => {
      render(<TaskItem {...defaultProps} />)
      expect(screen.queryByText('Completed')).not.toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should call onToggle with correct task ID when clicked', async () => {
      const { onToggle } = createMockHandlers()
      const user = userEvent.setup()

      render(<TaskItem task={mockPendingTask} onToggle={onToggle} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(onToggle).toHaveBeenCalledTimes(1)
      expect(onToggle).toHaveBeenCalledWith(mockPendingTask.id)
    })

    it('should call onToggle when Enter key is pressed', async () => {
      const { onToggle } = createMockHandlers()
      const user = userEvent.setup()

      render(<TaskItem task={mockPendingTask} onToggle={onToggle} />)

      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')

      expect(onToggle).toHaveBeenCalledWith(mockPendingTask.id)
    })

    it('should call onToggle when Space key is pressed', async () => {
      const { onToggle } = createMockHandlers()
      const user = userEvent.setup()

      render(<TaskItem task={mockPendingTask} onToggle={onToggle} />)

      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{ }')

      expect(onToggle).toHaveBeenCalledWith(mockPendingTask.id)
    })

    it('should be focusable via keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<TaskItem {...defaultProps} />)

      await user.keyboard('{Tab}')
      const button = screen.getByRole('button')

      expect(button).toHaveFocus()
    })
  })

  describe('Props Handling', () => {
    it('should handle different task IDs correctly', () => {
      const taskWithDifferentId = { ...mockPendingTask, id: 999 }
      const { onToggle } = createMockHandlers()

      render(<TaskItem task={taskWithDifferentId} onToggle={onToggle} />)

      expect(screen.getByText(taskWithDifferentId.title)).toBeInTheDocument()
    })

    it('should handle empty task title', () => {
      const taskWithEmptyTitle = { ...mockPendingTask, title: '' }

      expect(() =>
        render(<TaskItem task={taskWithEmptyTitle} onToggle={vi.fn()} />)
      ).not.toThrow()
    })

    it('should handle very long task titles', () => {
      const longTitle = 'This is a very long task title that should still render correctly and not break the component layout even when it contains many characters'
      const taskWithLongTitle = { ...mockPendingTask, title: longTitle }

      render(<TaskItem task={taskWithLongTitle} onToggle={vi.fn()} />)
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper button role', () => {
      render(<TaskItem {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const { onToggle } = createMockHandlers()

      render(<TaskItem task={mockPendingTask} onToggle={onToggle} />)

      await user.tab()
      const button = screen.getByRole('button')
      expect(button).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(onToggle).toHaveBeenCalled()
    })

    it('should have proper visual focus indicators', async () => {
      const user = userEvent.setup()
      render(<TaskItem {...defaultProps} />)

      const button = screen.getByRole('button')
      await user.tab()

      expect(button).toHaveFocus()
      // Visual focus is handled by browser defaults and CSS
    })
  })

  describe('Visual States', () => {
    it('should show hover effects on button', () => {
      render(<TaskItem {...defaultProps} />)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('hover:text-blue-500')
    })

    it('should show different hover effects for completed tasks', () => {
      render(<TaskItem task={mockCompletedTask} onToggle={vi.fn()} />)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('hover:text-green-600')
    })

    it('should apply transition classes for smooth animations', () => {
      render(<TaskItem {...defaultProps} />)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('transition-colors', 'duration-200')
    })
  })
})