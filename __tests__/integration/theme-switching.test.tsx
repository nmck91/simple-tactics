import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@/lib/theme-context'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TacticCard } from '@/components/TacticCard'
import { Tactic } from '@/lib/types'

/**
 * Integration Test: Theme Switching Flow
 *
 * Tests the complete user journey of switching themes and seeing
 * the visual changes propagate across all components.
 *
 * Epic 2, Story 2.7: Integration tests for tactical animations
 * (includes theme switching as part of integration testing)
 */

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Integration: Theme Switching Flow', () => {
  const mockTactic: Tactic = {
    id: 'high-press',
    title: 'High Press Attack',
    category: 'pressing',
    description: {
      kidSpeak: 'The Rocket Racers sprint super fast!',
      tactical: 'Aggressive pressing in the final third',
    },
    characterRoles: {
      forward: 'Rocket Racers',
      midfielder: 'Busy Bees',
      defender: 'Brick Walls',
    },
    formats: {
      '5v5': { players: [] },
      '7v7': { players: [] },
      '9v9': { players: [] },
    },
  }

  beforeEach(() => {
    localStorage.clear()
    // Reset document data-theme attribute
    document.documentElement.removeAttribute('data-theme')
  })

  it('complete theme switching user journey', async () => {
    // Render the app with theme provider
    render(
      <ThemeProvider>
        <div>
          <ThemeToggle />
          <TacticCard tactic={mockTactic} />
          <div data-testid="description">{mockTactic.description.kidSpeak}</div>
        </div>
      </ThemeProvider>
    )

    // 1. Initial state - Superhero theme
    const toggleButton = screen.getByRole('button', { name: /theme/i })
    expect(toggleButton.textContent).toContain('🦸')
    expect(document.documentElement.getAttribute('data-theme')).toBeNull() // Default

    // 2. User clicks theme toggle
    fireEvent.click(toggleButton)

    // 3. Verify theme switches to Professional
    await waitFor(() => {
      expect(toggleButton.textContent).toContain('👔')
    })

    // 4. Verify localStorage is updated
    expect(localStorage.getItem('simple-tactics-theme')).toBe('professional')

    // 5. Verify data-theme attribute updated
    expect(document.documentElement.getAttribute('data-theme')).toBe('professional')

    // 6. Verify components reflect theme change
    const tacticCard = screen.getByText('High Press Attack')
    expect(tacticCard).toBeInTheDocument()

    // 7. User toggles back to Superhero
    fireEvent.click(toggleButton)

    await waitFor(() => {
      expect(toggleButton.textContent).toContain('🦸')
    })

    expect(localStorage.getItem('simple-tactics-theme')).toBe('superhero')
    expect(document.documentElement.getAttribute('data-theme')).toBe('superhero')
  })

  it('persists theme across page reload', async () => {
    // Set theme to professional in localStorage
    localStorage.setItem('simple-tactics-theme', 'professional')

    // Simulate page reload by rendering with fresh provider
    const { unmount } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    // Should load professional theme from localStorage
    const toggleButton = screen.getByRole('button')
    await waitFor(() => {
      expect(toggleButton.textContent).toContain('👔')
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('professional')

    // Unmount and remount to simulate another page load
    unmount()

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    // Should still be professional theme
    const newToggleButton = screen.getByRole('button')
    await waitFor(() => {
      expect(newToggleButton.textContent).toContain('👔')
    })
  })

  it('multiple components sync theme state', async () => {
    const ThemeIndicator = () => {
      const { useContext } = require('react')
      const { ThemeContext } = require('@/lib/theme-context')
      const { theme } = useContext(ThemeContext)
      return <div data-testid="theme-indicator">{theme}</div>
    }

    render(
      <ThemeProvider>
        <ThemeToggle />
        <ThemeIndicator />
        <TacticCard tactic={mockTactic} />
      </ThemeProvider>
    )

    const toggleButton = screen.getByRole('button')
    const indicator = screen.getByTestId('theme-indicator')

    // Initial state
    expect(indicator).toHaveTextContent('superhero')

    // Toggle theme
    fireEvent.click(toggleButton)

    // All consumers update
    await waitFor(() => {
      expect(indicator).toHaveTextContent('professional')
      expect(toggleButton.textContent).toContain('👔')
    })
  })

  it('handles rapid theme switching without state conflicts', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const toggleButton = screen.getByRole('button')

    // Rapid clicks
    fireEvent.click(toggleButton) // → professional
    fireEvent.click(toggleButton) // → superhero
    fireEvent.click(toggleButton) // → professional
    fireEvent.click(toggleButton) // → superhero
    fireEvent.click(toggleButton) // → professional

    // Final state should be professional
    await waitFor(() => {
      expect(toggleButton.textContent).toContain('👔')
      expect(localStorage.getItem('simple-tactics-theme')).toBe('professional')
      expect(document.documentElement.getAttribute('data-theme')).toBe('professional')
    })
  })

  it('CSS variables update when theme changes', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const toggleButton = screen.getByRole('button')

    // Initial superhero theme
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()

    // Switch to professional
    fireEvent.click(toggleButton)

    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('professional')
    })

    // In actual browser, CSS variables would update via styles/themes.css
    // [data-theme="professional"] { --color-primary: #1976D2; }
    // This would be tested in E2E tests or visual regression tests
  })

  describe('Accessibility during theme switching', () => {
    it('maintains focus on toggle button after switching', async () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      )

      const toggleButton = screen.getByRole('button')

      // Focus the button
      toggleButton.focus()
      expect(toggleButton).toHaveFocus()

      // Click to switch theme
      fireEvent.click(toggleButton)

      // Focus should remain on button
      await waitFor(() => {
        expect(toggleButton).toHaveFocus()
      })
    })

    it('announces theme change to screen readers', async () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      )

      const toggleButton = screen.getByRole('button')

      // Check for aria-label
      expect(toggleButton).toHaveAttribute('aria-label', expect.stringContaining('theme'))

      fireEvent.click(toggleButton)

      // After switch, aria-label might update (depending on implementation)
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-label')
      })
    })
  })

  describe('Error recovery', () => {
    it('recovers from corrupted localStorage theme data', async () => {
      // Set invalid theme in localStorage
      localStorage.setItem('simple-tactics-theme', 'invalid-theme')

      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      )

      const toggleButton = screen.getByRole('button')

      // Should fallback to default superhero theme
      await waitFor(() => {
        expect(toggleButton.textContent).toContain('🦸')
      })

      // User can still switch themes normally
      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(toggleButton.textContent).toContain('👔')
        expect(localStorage.getItem('simple-tactics-theme')).toBe('professional')
      })
    })

    it('handles localStorage unavailable gracefully', async () => {
      // Mock localStorage to throw errors
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = jest.fn(() => {
        throw new Error('localStorage unavailable')
      })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      )

      const toggleButton = screen.getByRole('button')
      fireEvent.click(toggleButton)

      // Theme should still switch in memory
      await waitFor(() => {
        expect(toggleButton.textContent).toContain('👔')
      })

      // Error should be logged
      expect(consoleSpy).toHaveBeenCalled()

      // Restore
      Storage.prototype.setItem = originalSetItem
      consoleSpy.mockRestore()
    })
  })
})
