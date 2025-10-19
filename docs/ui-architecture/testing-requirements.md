# Testing Requirements

**Strategy**: Unit tests for utilities/hooks, integration tests for user flows, manual E2E testing on real devices.

## Component Test Template

**Example: TacticCard.test.tsx**

```tsx
import { render, screen } from '@testing-library/react'
import { TacticCard } from '@/components/TacticCard'
import { Tactic } from '@/lib/types'

const mockTactic: Tactic = {
  id: 'high-press',
  title: 'High Press',
  category: 'pressing',
  description: 'Press high up the field',
  formats: {
    '5v5': { positions: [] },
    '7v7': { positions: [] },
    '9v9': { positions: [] },
  },
}

describe('TacticCard', () => {
  it('renders tactic title and category', () => {
    render(<TacticCard tactic={mockTactic} />)

    expect(screen.getByText('High Press')).toBeInTheDocument()
    expect(screen.getByText('pressing')).toBeInTheDocument()
  })

  it('links to tactic detail page', () => {
    render(<TacticCard tactic={mockTactic} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/tactic/high-press')
  })
})
```

---

## Testing Best Practices

**Per PRD Epic 1, Story 1.6 and Epic 2, Story 2.7:**

1. **Unit Tests**: Test individual components in isolation
   - All utility functions (tactics-loader, canvas-renderer)
   - Custom hooks (useTheme, useFormat, useTacticAnimation)
   - Pure components (Button, TacticCard)

2. **Integration Tests**: Test component interactions
   - Tactic selection → Navigation → Detail view
   - Theme switching → Visual update
   - Format selection → Field re-render
   - Animation controls → Play/pause behavior

3. **E2E Tests (Manual)**: Test on real devices (iPhone 8, Samsung Galaxy A-series)
   - Animation performance (30 FPS minimum)
   - Offline PWA functionality
   - Touch interactions
   - Outdoor readability (high contrast)

4. **Coverage Goals**: Aim for 80% code coverage
   - Utilities: 90%+
   - Components: 70%+
   - Integration: Critical flows only

5. **Test Structure**: Arrange-Act-Assert pattern
   ```tsx
   it('updates theme when toggle clicked', () => {
     // Arrange
     render(<ThemeToggle />)

     // Act
     const button = screen.getByRole('button')
     fireEvent.click(button)

     // Assert
     expect(button).toHaveTextContent('👔')
   })
   ```

6. **Mock External Dependencies**:
   - Canvas API (via jest.setup.js)
   - localStorage (via __mocks__/localStorage.ts)
   - fetch (for tactics loading)

---
