import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

/**
 * Custom render function that includes all necessary providers for testing
 * Use this instead of the default render function from @testing-library/react
 */
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

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render method with our custom version
export { customRender as render }