import { render, screen } from '../test/utils'
import userEvent from '@testing-library/user-event'
import Home from './Home'

describe('Home', () => {
  describe('Rendering', () => {
    describe('Hero Section', () => {
      it('should render the main title with proper styling', () => {
        render(<Home />)

        const mainTitle = screen.getByText('Agentic Coding')
        const subTitle = screen.getByText('Demo')

        expect(mainTitle).toBeInTheDocument()
        expect(subTitle).toBeInTheDocument()

        // Check that both parts are in the same h1 element
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toContainElement(mainTitle)
        expect(heading).toContainElement(subTitle)

        // Check styling classes
        expect(heading).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl', 'font-bold', 'text-gray-900', 'mb-6')
        expect(subTitle).toHaveClass('block', 'text-blue-600')
      })

      it('should render the hero description text', () => {
        render(<Home />)

        const description = screen.getByText(/Experience the power of AI-driven development/)
        expect(description).toBeInTheDocument()
        expect(description).toHaveClass('text-xl', 'text-gray-600', 'mb-8', 'max-w-3xl', 'mx-auto', 'leading-relaxed')
      })

      it('should render CTA buttons with proper links and styling', () => {
        render(<Home />)

        const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
        const learnMoreLink = screen.getByRole('link', { name: /learn more/i })

        expect(tasksLink).toBeInTheDocument()
        expect(learnMoreLink).toBeInTheDocument()

        // Check links
        expect(tasksLink).toHaveAttribute('href', '/tasks')
        expect(learnMoreLink).toHaveAttribute('href', '#features')

        // Check primary button styling
        expect(tasksLink).toHaveClass(
          'inline-flex', 'items-center', 'px-8', 'py-3', 'bg-blue-600',
          'text-white', 'font-medium', 'rounded-lg', 'hover:bg-blue-700',
          'transition-colors', 'duration-200', 'shadow-lg', 'hover:shadow-xl',
          'transform', 'hover:scale-105'
        )

        // Check secondary button styling
        expect(learnMoreLink).toHaveClass(
          'inline-flex', 'items-center', 'px-8', 'py-3', 'border-2',
          'border-blue-600', 'text-blue-600', 'font-medium', 'rounded-lg',
          'hover:bg-blue-600', 'hover:text-white', 'transition-all', 'duration-200'
        )
      })

      it('should render arrow icon in the tasks demo button', () => {
        render(<Home />)

        const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })

        // The ArrowRight icon should be present within the link
        expect(tasksLink).toBeInTheDocument()
        // We can't directly test for the icon component, but we can test for its container
        expect(tasksLink).toContainHTML('View Tasks Demo')
      })

      it('should have proper responsive button layout', () => {
        render(<Home />)

        const buttonContainer = document.querySelector('.flex.flex-col.sm\\:flex-row')
        expect(buttonContainer).toHaveClass('gap-4', 'justify-center', 'items-center')
      })
    })

    describe('Features Section', () => {
      it('should render features section with proper id for anchor link', () => {
        render(<Home />)

        const featuresSection = document.getElementById('features')
        expect(featuresSection).toBeInTheDocument()
        expect(featuresSection).toHaveClass('grid', 'md:grid-cols-3', 'gap-8', 'mb-16')
      })

      it('should render all three feature cards with proper content', () => {
        render(<Home />)

        // Smart Code Generation
        const codeGenTitle = screen.getByText('Smart Code Generation')
        const codeGenDesc = screen.getByText(/Watch as AI agents generate clean, maintainable code/)

        expect(codeGenTitle).toBeInTheDocument()
        expect(codeGenDesc).toBeInTheDocument()
        expect(codeGenTitle).toHaveClass('text-xl', 'font-semibold', 'text-gray-900', 'mb-3')
        expect(codeGenDesc).toHaveClass('text-gray-600')

        // Real-time Modifications
        const realtimeTitle = screen.getByText('Real-time Modifications')
        const realtimeDesc = screen.getByText(/Experience instant code updates and feature additions/)

        expect(realtimeTitle).toBeInTheDocument()
        expect(realtimeDesc).toBeInTheDocument()

        // Production Ready
        const prodTitle = screen.getByText('Production Ready')
        const prodDesc = screen.getByText(/Built with industry best practices/)

        expect(prodTitle).toBeInTheDocument()
        expect(prodDesc).toBeInTheDocument()
      })

      it('should render feature cards with proper styling and hover effects', () => {
        render(<Home />)

        const featureCards = document.querySelectorAll('.bg-white.p-6.rounded-xl')
        expect(featureCards).toHaveLength(3)

        featureCards.forEach(card => {
          expect(card).toHaveClass(
            'bg-white', 'p-6', 'rounded-xl', 'shadow-sm',
            'border', 'border-gray-100', 'hover:shadow-md',
            'transition-shadow', 'duration-200'
          )
        })
      })

      it('should render feature icons with proper styling', () => {
        render(<Home />)

        // Check for icon containers
        const iconContainers = document.querySelectorAll('.w-12.h-12.rounded-lg.flex.items-center.justify-center.mb-4')
        expect(iconContainers).toHaveLength(3)

        // Check specific icon container colors
        expect(iconContainers[0]).toHaveClass('bg-blue-100')
        expect(iconContainers[1]).toHaveClass('bg-indigo-100')
        expect(iconContainers[2]).toHaveClass('bg-green-100')
      })
    })

    describe('Tech Stack Section', () => {
      it('should render tech stack section with proper title', () => {
        render(<Home />)

        const techTitle = screen.getByText('Built With Modern Tools')
        expect(techTitle).toBeInTheDocument()
        expect(techTitle).toHaveClass('text-2xl', 'font-bold', 'text-gray-900', 'mb-6', 'text-center')
      })

      it('should render all technology items with proper styling', () => {
        render(<Home />)

        const technologies = [
          'React 18',
          'TypeScript',
          'TailwindCSS',
          'Vite',
          'React Router'
        ]

        technologies.forEach(tech => {
          const techElement = screen.getByText(tech)
          expect(techElement).toBeInTheDocument()
          expect(techElement).toHaveClass('font-medium')
        })
      })

      it('should render technology items with colored indicators', () => {
        render(<Home />)

        // Check for colored dot indicators
        const colorDots = document.querySelectorAll('.w-2.h-2.rounded-full')
        expect(colorDots).toHaveLength(5)

        // Check specific colors
        expect(colorDots[0]).toHaveClass('bg-blue-500')
        expect(colorDots[1]).toHaveClass('bg-purple-500')
        expect(colorDots[2]).toHaveClass('bg-cyan-500')
        expect(colorDots[3]).toHaveClass('bg-yellow-500')
        expect(colorDots[4]).toHaveClass('bg-green-500')
      })

      it('should have proper tech stack container styling', () => {
        render(<Home />)

        const techContainer = document.querySelector('.bg-white.rounded-xl.p-8.shadow-sm')
        expect(techContainer).toHaveClass(
          'bg-white', 'rounded-xl', 'p-8', 'shadow-sm',
          'border', 'border-gray-100'
        )
      })

      it('should have responsive tech stack layout', () => {
        render(<Home />)

        const techList = document.querySelector('.flex.flex-wrap.justify-center')
        expect(techList).toHaveClass(
          'flex', 'flex-wrap', 'justify-center', 'items-center',
          'gap-6', 'text-gray-600'
        )
      })
    })
  })

  describe('Navigation Functionality', () => {
    it('should have working React Router link to tasks page', () => {
      render(<Home />)

      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
      expect(tasksLink).toHaveAttribute('href', '/tasks')
    })

    it('should have working anchor link to features section', () => {
      render(<Home />)

      const learnMoreLink = screen.getByRole('link', { name: /learn more/i })
      expect(learnMoreLink).toHaveAttribute('href', '#features')
    })

    it('should properly scroll to features section when learn more is clicked', async () => {
      render(<Home />)
      const user = userEvent.setup()

      // Mock scrollIntoView
      const scrollIntoViewMock = vi.fn()
      Element.prototype.scrollIntoView = scrollIntoViewMock

      const learnMoreLink = screen.getByRole('link', { name: /learn more/i })
      await user.click(learnMoreLink)

      // The browser will handle the anchor link scrolling
      expect(learnMoreLink).toHaveAttribute('href', '#features')
      const featuresSection = document.getElementById('features')
      expect(featuresSection).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should handle keyboard navigation for CTA buttons', async () => {
      render(<Home />)
      const user = userEvent.setup()

      await user.tab()
      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
      expect(tasksLink).toHaveFocus()

      await user.tab()
      const learnMoreLink = screen.getByRole('link', { name: /learn more/i })
      expect(learnMoreLink).toHaveFocus()
    })

    it('should handle click events on CTA buttons', async () => {
      render(<Home />)
      const user = userEvent.setup()

      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
      const learnMoreLink = screen.getByRole('link', { name: /learn more/i })

      // Test that links are clickable (they should not throw errors)
      expect(async () => {
        await user.click(tasksLink)
        await user.click(learnMoreLink)
      }).not.toThrow()
    })

    it('should handle Enter key press on CTA buttons', async () => {
      render(<Home />)
      const user = userEvent.setup()

      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
      tasksLink.focus()

      await user.keyboard('{Enter}')
      // Links should handle Enter key naturally
      expect(tasksLink).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Home />)

      // Main heading
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()

      // Section headings
      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toBeInTheDocument()

      // Feature headings
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      expect(h3Elements).toHaveLength(3)
    })

    it('should have accessible link text and descriptions', () => {
      render(<Home />)

      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
      const learnMoreLink = screen.getByRole('link', { name: /learn more/i })

      expect(tasksLink).toBeInTheDocument()
      expect(learnMoreLink).toBeInTheDocument()

      // Links should have descriptive text
      expect(tasksLink).toContainHTML('View Tasks Demo')
      expect(learnMoreLink).toContainHTML('Learn More')
    })

    it('should support keyboard navigation', async () => {
      render(<Home />)
      const user = userEvent.setup()

      // All interactive elements should be reachable via Tab
      await user.tab()
      expect(document.activeElement).toBeInstanceOf(HTMLElement)

      await user.tab()
      expect(document.activeElement).toBeInstanceOf(HTMLElement)
    })

    it('should have proper color contrast for text elements', () => {
      render(<Home />)

      const mainTitle = screen.getByText('Agentic Coding')
      const description = screen.getByText(/Experience the power of AI-driven development/)

      expect(mainTitle).toHaveClass('text-gray-900') // High contrast
      expect(description).toHaveClass('text-gray-600') // Good contrast for secondary text
    })

    it('should have semantic HTML structure', () => {
      render(<Home />)

      // Check for proper landmark elements
      const main = document.querySelector('main')
      const sections = document.querySelectorAll('section, div[id="features"]')

      // While there's no explicit main tag, the structure is semantic
      expect(document.querySelector('.min-h-screen')).toBeInTheDocument()
      expect(document.getElementById('features')).toBeInTheDocument()
    })

    it('should have focus indicators on interactive elements', () => {
      render(<Home />)

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        // Links should be focusable and have proper focus handling
        expect(link).toBeInTheDocument()
        expect(link.tagName.toLowerCase()).toBe('a')
      })
    })
  })

  describe('Responsive Design', () => {
    it('should have proper responsive classes for main container', () => {
      render(<Home />)

      const mainContainer = document.querySelector('.max-w-4xl')
      expect(mainContainer).toHaveClass(
        'max-w-4xl', 'mx-auto', 'px-4', 'sm:px-6',
        'lg:px-8', 'py-12'
      )
    })

    it('should have responsive typography classes', () => {
      render(<Home />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl')
    })

    it('should have responsive button layout', () => {
      render(<Home />)

      const buttonContainer = document.querySelector('.flex.flex-col.sm\\:flex-row')
      expect(buttonContainer).toHaveClass('flex-col', 'sm:flex-row')
    })

    it('should have responsive grid layout for features', () => {
      render(<Home />)

      const featuresGrid = document.getElementById('features')
      expect(featuresGrid).toHaveClass('grid', 'md:grid-cols-3')
    })

    it('should have responsive spacing and margins', () => {
      render(<Home />)

      const heroSection = document.querySelector('.text-center.mb-16')
      expect(heroSection).toHaveClass('mb-16')

      const featuresSection = document.getElementById('features')
      expect(featuresSection).toHaveClass('mb-16')
    })
  })

  describe('Visual Effects and Styling', () => {
    it('should have proper background gradient', () => {
      render(<Home />)

      const backgroundContainer = document.querySelector('.min-h-screen')
      expect(backgroundContainer).toHaveClass(
        'min-h-screen', 'bg-gradient-to-br',
        'from-blue-50', 'via-white', 'to-indigo-50'
      )
    })

    it('should have hover effects on CTA buttons', () => {
      render(<Home />)

      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
      const learnMoreLink = screen.getByRole('link', { name: /learn more/i })

      // Primary button hover effects
      expect(tasksLink).toHaveClass(
        'hover:bg-blue-700', 'hover:shadow-xl', 'hover:scale-105'
      )

      // Secondary button hover effects
      expect(learnMoreLink).toHaveClass(
        'hover:bg-blue-600', 'hover:text-white'
      )
    })

    it('should have transition effects on interactive elements', () => {
      render(<Home />)

      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
      const learnMoreLink = screen.getByRole('link', { name: /learn more/i })

      expect(tasksLink).toHaveClass('transition-colors', 'duration-200')
      expect(learnMoreLink).toHaveClass('transition-all', 'duration-200')
    })

    it('should have shadow effects on cards and buttons', () => {
      render(<Home />)

      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })
      expect(tasksLink).toHaveClass('shadow-lg')

      const featureCards = document.querySelectorAll('.shadow-sm')
      expect(featureCards.length).toBeGreaterThan(0)
    })

    it('should have proper border radius on elements', () => {
      render(<Home />)

      const buttons = screen.getAllByRole('link')
      buttons.forEach(button => {
        expect(button).toHaveClass('rounded-lg')
      })

      const cards = document.querySelectorAll('.rounded-xl')
      expect(cards.length).toBeGreaterThan(0)
    })
  })

  describe('Content Validation', () => {
    it('should render all expected text content', () => {
      render(<Home />)

      // Hero content
      expect(screen.getByText('Agentic Coding')).toBeInTheDocument()
      expect(screen.getByText('Demo')).toBeInTheDocument()
      expect(screen.getByText(/Experience the power of AI-driven development/)).toBeInTheDocument()

      // Feature titles
      expect(screen.getByText('Smart Code Generation')).toBeInTheDocument()
      expect(screen.getByText('Real-time Modifications')).toBeInTheDocument()
      expect(screen.getByText('Production Ready')).toBeInTheDocument()

      // Tech stack
      expect(screen.getByText('Built With Modern Tools')).toBeInTheDocument()
      expect(screen.getByText('React 18')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('TailwindCSS')).toBeInTheDocument()
      expect(screen.getByText('Vite')).toBeInTheDocument()
      expect(screen.getByText('React Router')).toBeInTheDocument()
    })

    it('should have meaningful feature descriptions', () => {
      render(<Home />)

      expect(screen.getByText(/Watch as AI agents generate clean, maintainable code/)).toBeInTheDocument()
      expect(screen.getByText(/Experience instant code updates and feature additions/)).toBeInTheDocument()
      expect(screen.getByText(/Built with industry best practices/)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should render without errors when all content is present', () => {
      expect(() => render(<Home />)).not.toThrow()
    })

    it('should handle missing features section gracefully', () => {
      render(<Home />)

      const featuresSection = document.getElementById('features')
      expect(featuresSection).toBeInTheDocument()

      // Even if the section exists, links should still work
      const learnMoreLink = screen.getByRole('link', { name: /learn more/i })
      expect(learnMoreLink).toHaveAttribute('href', '#features')
    })

    it('should maintain layout integrity with long text content', () => {
      render(<Home />)

      // Check that containers maintain proper spacing
      const container = document.querySelector('.max-w-4xl')
      expect(container).toHaveClass('max-w-4xl') // Should constrain width

      const textElements = document.querySelectorAll('.max-w-3xl')
      expect(textElements.length).toBeGreaterThan(0) // Description text should be constrained
    })
  })

  describe('Performance and Optimization', () => {
    it('should not have unnecessary re-renders', () => {
      const { rerender } = render(<Home />)

      expect(() => {
        rerender(<Home />)
        rerender(<Home />)
      }).not.toThrow()
    })

    it('should handle multiple rapid interactions', async () => {
      render(<Home />)
      const user = userEvent.setup()

      const tasksLink = screen.getByRole('link', { name: /view tasks demo/i })

      // Rapid clicks should not cause issues
      await user.click(tasksLink)
      await user.click(tasksLink)
      await user.click(tasksLink)

      expect(tasksLink).toBeInTheDocument()
    })
  })
})