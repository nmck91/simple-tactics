import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/lib/theme-context'
import { FormatProvider } from '@/lib/format-context'
import MotionProvider from '@/lib/motion'
import { Tactic, TacticIndex } from '@/lib/types'

/**
 * Test Utilities
 *
 * Shared utilities and helpers for testing Simple Tactics components
 */

// ============================================================================
// Custom Render Functions
// ============================================================================

/**
 * Render with all app providers (Theme, Format, Motion)
 * Use this for most component tests
 */
interface AllProvidersProps {
  children: ReactNode
}

const AllProviders = ({ children }: AllProvidersProps) => {
  return (
    <ThemeProvider>
      <FormatProvider>
        <MotionProvider>{children}</MotionProvider>
      </FormatProvider>
    </ThemeProvider>
  )
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options })
}

/**
 * Render with only ThemeProvider
 * Use for theme-specific component tests
 */
export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: ThemeProvider, ...options })
}

/**
 * Render with only FormatProvider
 * Use for format-specific component tests
 */
export function renderWithFormat(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: FormatProvider, ...options })
}

// ============================================================================
// Mock Data Factories
// ============================================================================

/**
 * Create a mock Tactic for testing
 */
export function createMockTactic(overrides?: Partial<Tactic>): Tactic {
  return {
    id: 'test-tactic',
    title: 'Test Tactic',
    category: 'pressing',
    description: {
      kidSpeak: 'Test kid explanation',
      tactical: 'Test tactical explanation',
    },
    formats: {
      '5v5': {
        players: [
          { id: 'player-1', position: { x: 50, y: 10 }, role: 'goalkeeper' },
          { id: 'player-2', position: { x: 30, y: 35 }, role: 'defender' },
          { id: 'player-3', position: { x: 70, y: 35 }, role: 'defender' },
          { id: 'player-4', position: { x: 35, y: 65 }, role: 'forward' },
          { id: 'player-5', position: { x: 65, y: 65 }, role: 'forward' },
        ],
      },
      '7v7': {
        players: [{ id: 'player-1', position: { x: 50, y: 10 }, role: 'goalkeeper' }],
      },
      '9v9': {
        players: [{ id: 'player-1', position: { x: 50, y: 10 }, role: 'goalkeeper' }],
      },
    },
    ...overrides,
  }
}

/**
 * Create a mock TacticIndex entry for testing
 */
export function createMockTacticIndex(overrides?: Partial<TacticIndex>): TacticIndex {
  return {
    id: 'test-tactic',
    title: 'Test Tactic',
    category: 'pressing',
    thumbnail: '/images/tactics/test-thumb.svg',
    difficulty: 'beginner',
    ...overrides,
  }
}

/**
 * Create multiple mock tactics
 */
export function createMockTactics(count: number): Tactic[] {
  return Array.from({ length: count }, (_, i) =>
    createMockTactic({
      id: `tactic-${i + 1}`,
      title: `Tactic ${i + 1}`,
    })
  )
}

// ============================================================================
// Mock API Helpers
// ============================================================================

/**
 * Mock fetch for tactics loading
 */
export function mockFetchTactics(tactics: TacticIndex[]) {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => tactics,
  })
}

/**
 * Mock fetch for single tactic
 */
export function mockFetchTactic(tactic: Tactic) {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => tactic,
  })
}

/**
 * Mock fetch failure
 */
export function mockFetchError(status = 404) {
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status,
  })
}

// ============================================================================
// LocalStorage Helpers
// ============================================================================

/**
 * Set theme in localStorage
 */
export function setStoredTheme(theme: 'superhero' | 'professional') {
  localStorage.setItem('simple-tactics-theme', theme)
}

/**
 * Set format in localStorage
 */
export function setStoredFormat(format: '5v5' | '7v7' | '9v9') {
  localStorage.setItem('simple-tactics-format', format)
}

/**
 * Set player names in localStorage
 */
export function setStoredPlayerNames(tacticId: string, names: Record<string, string>) {
  localStorage.setItem(`simple-tactics-player-names-${tacticId}`, JSON.stringify(names))
}

/**
 * Clear all app localStorage
 */
export function clearAppStorage() {
  localStorage.removeItem('simple-tactics-theme')
  localStorage.removeItem('simple-tactics-format')
  // Clear all player names
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('simple-tactics-player-names-')) {
      localStorage.removeItem(key)
    }
  })
}

// ============================================================================
// Accessibility Helpers
// ============================================================================

/**
 * Check if element meets minimum touch target size (44x44px)
 */
export function hasMinimumTouchTarget(element: HTMLElement): boolean {
  const { width, height } = element.getBoundingClientRect()
  return width >= 44 && height >= 44
}

/**
 * Check if element has visible focus indicator
 */
export function hasVisibleFocus(element: HTMLElement): boolean {
  const styles = window.getComputedStyle(element)
  return styles.outline !== 'none' || styles.boxShadow !== 'none'
}

// ============================================================================
// Animation Helpers
// ============================================================================

/**
 * Wait for animation to complete
 */
export function waitForAnimation(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

/**
 * Mock requestAnimationFrame for testing animations
 */
export function mockAnimationFrame() {
  let frameId = 0
  const callbacks = new Map<number, FrameRequestCallback>()

  global.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
    frameId += 1
    callbacks.set(frameId, callback)
    return frameId
  })

  global.cancelAnimationFrame = jest.fn((id: number) => {
    callbacks.delete(id)
  })

  return {
    triggerFrame: (timestamp = performance.now()) => {
      callbacks.forEach((callback) => callback(timestamp))
      callbacks.clear()
    },
    restore: () => {
      jest.restoreAllMocks()
    },
  }
}

// ============================================================================
// Re-export Testing Library utilities
// ============================================================================

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
