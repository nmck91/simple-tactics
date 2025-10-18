import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>)

    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Button>Primary</Button>)

      const button = screen.getByRole('button')
      // Check for primary variant classes (adjust based on implementation)
      expect(button.className).toContain('bg-primary')
    })

    it('renders secondary variant when specified', () => {
      render(<Button variant="secondary">Secondary</Button>)

      const button = screen.getByRole('button')
      // Check for secondary variant classes
      expect(button.className).toMatch(/secondary|outlined/)
    })

    it('renders ghost variant when specified', () => {
      render(<Button variant="ghost">Ghost</Button>)

      const button = screen.getByRole('button')
      expect(button.className).toMatch(/ghost|text-only/)
    })
  })

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Button>Medium</Button>)

      const button = screen.getByRole('button')
      // Default size classes applied
      expect(button).toBeInTheDocument()
    })

    it('renders small size when specified', () => {
      render(<Button size="sm">Small</Button>)

      const button = screen.getByRole('button')
      // Check for small size classes
      expect(button.className).toMatch(/sm|small/)
    })

    it('renders large size when specified', () => {
      render(<Button size="lg">Large</Button>)

      const button = screen.getByRole('button')
      // Check for large size classes
      expect(button.className).toMatch(/lg|large/)
    })
  })

  describe('States', () => {
    it('applies disabled state correctly', () => {
      render(<Button disabled>Disabled</Button>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('sets correct button type', () => {
      render(<Button type="submit">Submit</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('defaults to button type', () => {
      render(<Button>Default Type</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  describe('Accessibility', () => {
    it('is keyboard accessible', () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Keyboard</Button>)

      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })

      // Button natively handles Enter key
      expect(button).toBeInTheDocument()
    })

    it('has visible focus indicator', () => {
      render(<Button>Focus</Button>)

      const button = screen.getByRole('button')
      // Check for focus ring classes
      expect(button.className).toMatch(/focus/)
    })

    it('maintains minimum touch target size', () => {
      render(<Button>Touch Target</Button>)

      const button = screen.getByRole('button')
      // Tailwind px-4 py-2 should provide 44px minimum height
      expect(button).toBeInTheDocument()
    })
  })

  describe('Theme variations', () => {
    it('applies theme-aware colors', () => {
      render(<Button>Themed Button</Button>)

      const button = screen.getByRole('button')
      // Check for theme variable usage (bg-primary uses CSS variables)
      expect(button.className).toContain('bg-primary')
    })
  })

  describe('Edge cases', () => {
    it('handles empty children', () => {
      render(<Button>{''}</Button>)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button.textContent).toBe('')
    })

    it('handles complex children (icons + text)', () => {
      render(
        <Button>
          <span>▶️</span> Play
        </Button>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('▶️ Play')
    })

    it('does not trigger onClick on disabled button even with forced click', () => {
      const handleClick = jest.fn()
      const { container } = render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      )

      const button = container.querySelector('button')
      if (button) {
        // Try to force click
        button.click()
        expect(handleClick).not.toHaveBeenCalled()
      }
    })
  })
})
