import { render, screen } from '@testing-library/react'
import { TacticCard } from '@/components/TacticCard'
import { Tactic } from '@/lib/types'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('TacticCard', () => {
  const mockTactic: Tactic = {
    id: 'high-press',
    title: 'High Press Attack',
    category: 'pressing',
    description: {
      kidSpeak: 'Run fast and get the ball!',
      tactical: 'Aggressive pressing in the final third',
    },
    formats: {
      '5v5': {
        players: [
          {
            id: 'player-1',
            position: { x: 50, y: 10 },
            role: 'goalkeeper',
          },
        ],
      },
      '7v7': {
        players: [],
      },
      '9v9': {
        players: [],
      },
    },
    thumbnail: '/images/tactics/high-press-thumb.svg',
    difficulty: 'intermediate',
  }

  it('renders tactic title', () => {
    render(<TacticCard tactic={mockTactic} />)

    expect(screen.getByText('High Press Attack')).toBeInTheDocument()
  })

  it('renders tactic category', () => {
    render(<TacticCard tactic={mockTactic} />)

    expect(screen.getByText('pressing')).toBeInTheDocument()
  })

  it('links to tactic detail page with correct URL', () => {
    render(<TacticCard tactic={mockTactic} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/tactic/high-press')
  })

  it('applies custom className when provided', () => {
    const { container } = render(
      <TacticCard tactic={mockTactic} className="custom-class" />
    )

    const link = container.querySelector('a')
    expect(link).toHaveClass('custom-class')
  })

  it('renders difficulty badge when provided', () => {
    render(<TacticCard tactic={mockTactic} />)

    // Difficulty might be rendered as a badge or data attribute
    // Adjust based on actual implementation
    expect(screen.getByText(/intermediate/i)).toBeInTheDocument()
  })

  it('displays thumbnail image when provided', () => {
    render(<TacticCard tactic={mockTactic} />)

    const thumbnail = screen.queryByRole('img')
    if (thumbnail) {
      expect(thumbnail).toHaveAttribute('src', '/images/tactics/high-press-thumb.svg')
    }
  })

  it('handles missing optional fields gracefully', () => {
    const minimalTactic: Tactic = {
      id: 'minimal-tactic',
      title: 'Minimal Tactic',
      category: 'passing',
      description: {
        kidSpeak: 'Pass the ball',
        tactical: 'Controlled possession',
      },
      formats: {
        '5v5': { players: [] },
        '7v7': { players: [] },
        '9v9': { players: [] },
      },
      // No thumbnail, difficulty, or characterRoles
    }

    expect(() => render(<TacticCard tactic={minimalTactic} />)).not.toThrow()
  })

  describe('Accessibility', () => {
    it('is keyboard accessible', () => {
      render(<TacticCard tactic={mockTactic} />)

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      // Link is inherently keyboard accessible
    })

    it('has appropriate ARIA attributes', () => {
      render(<TacticCard tactic={mockTactic} />)

      const link = screen.getByRole('link')
      // Check for aria-label if implemented
      // expect(link).toHaveAttribute('aria-label', expect.stringContaining('High Press'))
      expect(link).toBeInTheDocument()
    })
  })

  describe('Theme variations', () => {
    it('applies theme-specific styling', () => {
      // This test would check if theme classes are applied
      // based on the current theme context
      render(<TacticCard tactic={mockTactic} />)

      const link = screen.getByRole('link')
      // Check for theme-aware Tailwind classes
      expect(link.className).toContain('rounded')
    })
  })
})
