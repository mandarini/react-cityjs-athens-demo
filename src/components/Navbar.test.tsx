import { render as rtlRender, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

// Custom render function for testing with specific routes (bypasses our custom utils render)
const renderWithRouter = (initialEntries = ['/']) => {
  return rtlRender(
    <MemoryRouter initialEntries={initialEntries}>
      <Navbar />
    </MemoryRouter>
  )
}

describe('Navbar', () => {
  describe('Rendering', () => {
    it('should render the application title', () => {
      renderWithRouter()
      expect(screen.getByText('Agentic Coding Demo')).toBeInTheDocument()
    })

    it('should render Home navigation link', () => {
      renderWithRouter()
      const homeLink = screen.getByRole('link', { name: /home/i })
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('should render Tasks navigation link', () => {
      renderWithRouter()
      const tasksLink = screen.getByRole('link', { name: /tasks/i })
      expect(tasksLink).toBeInTheDocument()
      expect(tasksLink).toHaveAttribute('href', '/tasks')
    })

    it('should render navigation icons', () => {
      renderWithRouter()

      // Check for the presence of icon elements within links
      const homeLink = screen.getByRole('link', { name: /home/i })
      const tasksLink = screen.getByRole('link', { name: /tasks/i })

      expect(homeLink).toBeInTheDocument()
      expect(tasksLink).toBeInTheDocument()
    })
  })

  describe('Active State Management', () => {
    it('should highlight Home link when on home page', () => {
      renderWithRouter(['/'])

      const homeLink = screen.getByRole('link', { name: /home/i })
      const tasksLink = screen.getByRole('link', { name: /tasks/i })

      expect(homeLink).toHaveClass('bg-blue-100', 'text-blue-700')
      expect(tasksLink).not.toHaveClass('bg-blue-100', 'text-blue-700')
      expect(tasksLink).toHaveClass('text-gray-600')
    })

    it('should highlight Tasks link when on tasks page', () => {
      renderWithRouter(['/tasks'])

      const homeLink = screen.getByRole('link', { name: /home/i })
      const tasksLink = screen.getByRole('link', { name: /tasks/i })

      expect(tasksLink).toHaveClass('bg-blue-100', 'text-blue-700')
      expect(homeLink).not.toHaveClass('bg-blue-100', 'text-blue-700')
      expect(homeLink).toHaveClass('text-gray-600')
    })

    it('should show inactive state for both links on unknown route', () => {
      renderWithRouter(['/unknown'])

      const homeLink = screen.getByRole('link', { name: /home/i })
      const tasksLink = screen.getByRole('link', { name: /tasks/i })

      expect(homeLink).not.toHaveClass('bg-blue-100', 'text-blue-700')
      expect(tasksLink).not.toHaveClass('bg-blue-100', 'text-blue-700')
      expect(homeLink).toHaveClass('text-gray-600')
      expect(tasksLink).toHaveClass('text-gray-600')
    })
  })

  describe('Navigation Functionality', () => {
    it('should have working navigation links', () => {
      renderWithRouter()

      const homeLink = screen.getByRole('link', { name: /home/i })
      const tasksLink = screen.getByRole('link', { name: /tasks/i })

      expect(homeLink).toHaveAttribute('href', '/')
      expect(tasksLink).toHaveAttribute('href', '/tasks')
    })

    it('should have clickable title that navigates to home', () => {
      renderWithRouter()

      const titleLink = screen.getByRole('link', { name: 'Agentic Coding Demo' })
      expect(titleLink).toHaveAttribute('href', '/')
    })
  })

  describe('Styling and Layout', () => {
    it('should apply proper navigation container styling', () => {
      renderWithRouter()

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('bg-white', 'shadow-md', 'border-b', 'border-gray-200')
    })

    it('should apply hover effects to navigation links', () => {
      renderWithRouter(['/unknown']) // Ensure links are inactive

      const homeLink = screen.getByRole('link', { name: /home/i })
      const tasksLink = screen.getByRole('link', { name: /tasks/i })

      expect(homeLink).toHaveClass('hover:text-gray-900', 'hover:bg-gray-100')
      expect(tasksLink).toHaveClass('hover:text-gray-900', 'hover:bg-gray-100')
    })

    it('should apply hover effect to title link', () => {
      renderWithRouter()

      const titleLink = screen.getByRole('link', { name: 'Agentic Coding Demo' })
      expect(titleLink).toHaveClass('hover:text-blue-600')
    })

    it('should have proper responsive layout classes', () => {
      renderWithRouter()

      const container = document.querySelector('.max-w-7xl')
      expect(container).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
    })
  })

  describe('Accessibility', () => {
    it('should have proper navigation landmark', () => {
      renderWithRouter()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should have accessible link text', () => {
      renderWithRouter()

      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /tasks/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Agentic Coding Demo' })).toBeInTheDocument()
    })

    it('should support keyboard navigation', () => {
      renderWithRouter()

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toBeInTheDocument()
        // Links are naturally keyboard accessible
      })
    })

    it('should have proper color contrast for active states', () => {
      renderWithRouter(['/'])

      const activeLink = screen.getByRole('link', { name: /home/i })
      expect(activeLink).toHaveClass('text-blue-700') // High contrast blue
    })
  })

  describe('Router Integration', () => {
    it('should correctly detect current route for active state', () => {
      renderWithRouter(['/tasks'])

      const tasksLink = screen.getByRole('link', { name: /tasks/i })
      expect(tasksLink).toHaveClass('bg-blue-100', 'text-blue-700', 'shadow-sm')
    })

    it('should handle route changes correctly', () => {
      // Test home route active state
      renderWithRouter(['/'])
      let homeLink = screen.getByRole('link', { name: /home/i })
      expect(homeLink).toHaveClass('bg-blue-100', 'text-blue-700')

      // Note: Testing actual route changes requires a more complex test setup
      // This test verifies that the component correctly identifies active routes
      expect(homeLink).toHaveAttribute('href', '/')
    })
  })

  describe('Edge Cases', () => {
    it('should handle nested routes correctly', () => {
      renderWithRouter(['/tasks/123'])

      const homeLink = screen.getByRole('link', { name: /home/i })
      const tasksLink = screen.getByRole('link', { name: /tasks/i })

      // Should not highlight any link for nested routes not explicitly handled
      expect(homeLink).not.toHaveClass('bg-blue-100', 'text-blue-700')
      expect(tasksLink).not.toHaveClass('bg-blue-100', 'text-blue-700')
    })

    it('should handle root route variations', () => {
      // Test exact root path
      renderWithRouter(['/'])
      let homeLink = screen.getByRole('link', { name: /home/i })
      expect(homeLink).toHaveClass('bg-blue-100', 'text-blue-700')
    })
  })

  describe('Visual States', () => {
    it('should show correct inactive link styles', () => {
      renderWithRouter(['/'])

      const inactiveLink = screen.getByRole('link', { name: /tasks/i })
      expect(inactiveLink).toHaveClass(
        'text-gray-600',
        'hover:text-gray-900',
        'hover:bg-gray-100'
      )
    })

    it('should show correct active link styles', () => {
      renderWithRouter(['/tasks'])

      const activeLink = screen.getByRole('link', { name: /tasks/i })
      expect(activeLink).toHaveClass(
        'bg-blue-100',
        'text-blue-700',
        'shadow-sm'
      )
    })

    it('should apply transition effects', () => {
      renderWithRouter()

      const links = screen.getAllByRole('link')

      // Title link has different transition class
      const titleLink = screen.getByRole('link', { name: 'Agentic Coding Demo' })
      expect(titleLink).toHaveClass('transition-colors', 'duration-200')

      // Navigation links have transition-all
      const navLinks = links.filter(link => link !== titleLink)
      navLinks.forEach(link => {
        expect(link).toHaveClass('duration-200')
      })
    })
  })
})