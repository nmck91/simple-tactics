import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ThemeProvider } from '@/lib/theme-context'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear()
  })

  const renderWithThemeProvider = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>)
  }

  it('renders toggle button', () => {
    renderWithThemeProvider(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('displays superhero icon by default', () => {
    renderWithThemeProvider(<ThemeToggle />)

    const button = screen.getByRole('button')
    // Default theme is superhero
    expect(button.textContent).toContain('🦸')
  })

  it('toggles to professional theme when clicked', () => {
    renderWithThemeProvider(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Should now show professional icon
    expect(button.textContent).toContain('👔')
  })

  it('toggles back to superhero theme on second click', () => {
    renderWithThemeProvider(<ThemeToggle />)

    const button = screen.getByRole('button')

    // First click - to professional
    fireEvent.click(button)
    expect(button.textContent).toContain('👔')

    // Second click - back to superhero
    fireEvent.click(button)
    expect(button.textContent).toContain('🦸')
  })

  it('persists theme to localStorage', () => {
    renderWithThemeProvider(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(localStorage.getItem('simple-tactics-theme')).toBe('professional')
  })

  it('loads saved theme from localStorage on mount', () => {
    // Pre-set localStorage to professional theme
    localStorage.setItem('simple-tactics-theme', 'professional')

    renderWithThemeProvider(<ThemeToggle />)

    const button = screen.getByRole('button')
    // Should load professional theme
    expect(button.textContent).toContain('👔')
  })

  it('updates document data-theme attribute on toggle', () => {
    renderWithThemeProvider(<ThemeToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Check if data-theme attribute is set
    expect(document.documentElement.getAttribute('data-theme')).toBe('professional')
  })

  describe('Accessibility', () => {
    it('has aria-label describing the action', () => {
      renderWithThemeProvider(<ThemeToggle />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', expect.stringContaining('theme'))
    })

    it('is keyboard accessible', () => {
      renderWithThemeProvider(<ThemeToggle />)

      const button = screen.getByRole('button')
      button.focus()

      expect(button).toHaveFocus()
    })

    it('responds to Enter key', () => {
      renderWithThemeProvider(<ThemeToggle />)

      const button = screen.getByRole('button')
      const initialText = button.textContent

      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })

      // Theme should toggle (button handles Enter natively)
      expect(button.textContent).not.toBe(initialText)
    })
  })

  describe('Theme context integration', () => {
    it('updates all consumers when theme changes', () => {
      const TestConsumer = () => {
        const { theme } = useTheme()
        return <div data-testid="consumer">{theme}</div>
      }

      render(
        <ThemeProvider>
          <ThemeToggle />
          <TestConsumer />
        </ThemeProvider>
      )

      const button = screen.getByRole('button')
      const consumer = screen.getByTestId('consumer')

      expect(consumer).toHaveTextContent('superhero')

      fireEvent.click(button)

      expect(consumer).toHaveTextContent('professional')
    })
  })

  describe('Edge cases', () => {
    it('handles corrupted localStorage data gracefully', () => {
      localStorage.setItem('simple-tactics-theme', 'invalid-theme')

      renderWithThemeProvider(<ThemeToggle />)

      const button = screen.getByRole('button')
      // Should fallback to default (superhero)
      expect(button.textContent).toContain('🦸')
    })

    it('applies custom className when provided', () => {
      renderWithThemeProvider(<ThemeToggle className="custom-toggle" />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-toggle')
    })

    it('maintains state across rapid toggles', () => {
      renderWithThemeProvider(<ThemeToggle />)

      const button = screen.getByRole('button')

      // Rapid toggles
      fireEvent.click(button) // to professional
      fireEvent.click(button) // to superhero
      fireEvent.click(button) // to professional
      fireEvent.click(button) // to superhero

      expect(button.textContent).toContain('🦸')
      expect(localStorage.getItem('simple-tactics-theme')).toBe('superhero')
    })
  })
})

// Helper function (would normally be in a test utils file)
function useTheme() {
  const { useContext } = require('react')
  const { ThemeContext } = require('@/lib/theme-context')
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
