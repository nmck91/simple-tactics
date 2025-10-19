# Component Standards

**Purpose**: Define exact patterns for component creation following Next.js and React best practices. These standards ensure consistency across the codebase and make the project accessible to open-source contributors.

## Component Template

**Standard Functional Component with TypeScript:**

```tsx
// components/TacticCard.tsx
import { FC } from 'react'
import Link from 'next/link'
import { Tactic } from '@/lib/types'

interface TacticCardProps {
  tactic: Tactic
  className?: string
}

/**
 * TacticCard displays a tactic in the grid with thumbnail and metadata.
 * Used on the home page tactics library grid.
 */
export const TacticCard: FC<TacticCardProps> = ({ tactic, className = '' }) => {
  return (
    <Link
      href={`/tactic/${tactic.id}`}
      className={`block rounded-lg border p-4 hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="aspect-square bg-gray-100 rounded mb-2">
        {/* Thumbnail preview would go here */}
      </div>
      <h3 className="font-bold text-lg">{tactic.title}</h3>
      <span className="text-sm text-gray-600">{tactic.category}</span>
    </Link>
  )
}
```

**Key Patterns:**
1. **Named exports** (not default) - `export const TacticCard` enables tree-shaking
2. **TypeScript FC type** - Explicit functional component typing
3. **Props interface** - Always define interface above component
4. **JSDoc comment** - Brief description of component purpose
5. **className prop** - Allow style overrides from parent
6. **Destructure props** - With default values where applicable

---

## Client vs Server Components

**Next.js App Router Rule:** Components are **Server Components by default** unless they use:
- State (`useState`, `useReducer`)
- Effects (`useEffect`, `useLayoutEffect`)
- Browser APIs (`window`, `localStorage`)
- Event handlers (`onClick`, `onChange`)

**Mark Client Components with `'use client'` directive:**

```tsx
// components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/hooks/useTheme'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'superhero' ? 'professional' : 'superhero')}>
      {theme === 'superhero' ? '🦸' : '👔'}
    </button>
  )
}
```

**Components Requiring `'use client'`:**
- `ThemeToggle` - Uses context and onClick
- `FormatTabBar` - Uses context and onClick
- `FieldCanvas` - Uses useRef, useEffect for Canvas rendering
- `AnimationControls` - Uses state for play/pause
- `PlayerCustomization` - Uses forms and state
- `ExplanationCard` - Uses state for expand/collapse

**Server Components (No directive needed):**
- `TacticCard` - Pure presentational, uses Link
- Layout components - Wrappers for providers

---

## Naming Conventions

**Files and Components:**

| Type | Pattern | Example |
|------|---------|---------|
| Component file | `PascalCase.tsx` | `TacticCard.tsx` |
| Component name | `PascalCase` | `export const TacticCard` |
| Hook file | `usePascalCase.ts` | `useTheme.ts` |
| Hook name | `usePascalCase` | `export function useTheme()` |
| Utility file | `kebab-case.ts` | `tactics-loader.ts` |
| Utility function | `camelCase` | `export function loadTactics()` |
| Context file | `kebab-case.tsx` | `theme-context.tsx` |
| Context name | `PascalCaseContext` | `export const ThemeContext` |
| Type/Interface | `PascalCase` | `interface TacticCardProps` |
| Type file | `types.ts` or `kebab-case-types.ts` | `lib/types.ts`, `field-types.ts` |

**Props Naming:**
- Component props interface: `{ComponentName}Props`
- Boolean props: `is*`, `has*`, `should*` (e.g., `isPlaying`, `hasError`)
- Event handlers: `on*` (e.g., `onPlay`, `onThemeChange`)
- Render props: `render*` (e.g., `renderHeader`)

**CSS Class Naming:**
- Use Tailwind utility classes (no custom class names in most cases)
- If custom classes needed: `kebab-case` (e.g., `field-container`)
- BEM convention for complex components: `block__element--modifier`

---

## Component Organization Patterns

**1. Import Order (Enforced by ESLint):**

```tsx
// 1. React and Next.js imports
import { FC, useState } from 'react'
import Link from 'next/link'

// 2. Third-party libraries
import { motion } from 'framer-motion'

// 3. Internal hooks
import { useTheme } from '@/hooks/useTheme'

// 4. Internal components
import { Button } from '@/components/Button'

// 5. Internal utilities
import { formatDate } from '@/lib/utils'

// 6. Types
import { Tactic } from '@/lib/types'

// 7. Styles (if any)
import './styles.css'
```

**2. Component Structure Order:**

```tsx
// 1. Interfaces and types
interface TacticCardProps {
  tactic: Tactic
}

// 2. Constants (outside component)
const DEFAULT_THUMBNAIL = '/images/default-tactic.png'

// 3. Component definition
export const TacticCard: FC<TacticCardProps> = ({ tactic }) => {
  // 4. Hooks (in order: context, state, refs, effects)
  const { theme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Effect logic
  }, [])

  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  }

  // 6. Derived values
  const thumbnailUrl = tactic.thumbnail || DEFAULT_THUMBNAIL

  // 7. Render
  return (
    <div ref={cardRef}>
      {/* JSX */}
    </div>
  )
}
```

---

## Props Validation and Defaults

**Use TypeScript for validation, defaults for optional props:**

```tsx
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',    // Default value
  size = 'md',
  disabled = false,
  onClick,
}) => {
  // Component logic
}
```

**For required props, no default needed:**

```tsx
interface TacticCardProps {
  tactic: Tactic  // Required - no default
  className?: string  // Optional - default to empty string in usage
}
```

---

## Accessibility Standards

**All components must meet WCAG 2.1 AA:**

**1. Semantic HTML:**
```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```

**2. ARIA Labels:**
```tsx
<button aria-label="Toggle theme between Superhero and Professional modes">
  {theme === 'superhero' ? '🦸' : '👔'}
</button>
```

**3. Keyboard Navigation:**
```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleToggle()
  }
}

<div role="button" tabIndex={0} onKeyDown={handleKeyDown} onClick={handleToggle}>
  Toggle
</div>
```

**4. Focus Indicators:**
```tsx
// Use Tailwind focus utilities
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500">
  Click me
</button>
```

**5. Color Contrast:**
- Text on background: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Verified via Lighthouse CI in every build

---

## Performance Optimization Patterns

**1. Memoization for Expensive Components:**

```tsx
import { memo } from 'react'

export const FieldCanvas = memo(({ tactic }: FieldCanvasProps) => {
  // Expensive Canvas rendering
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if tactic.id changes
  return prevProps.tactic.id === nextProps.tactic.id
})
```

**2. Lazy Loading for Code Splitting:**

```tsx
import dynamic from 'next/dynamic'

// Lazy load PlayerCustomization (only loads when opened)
const PlayerCustomization = dynamic(
  () => import('@/components/PlayerCustomization'),
  { ssr: false } // Disable SSR for client-only components
)
```

**3. Image Optimization:**

```tsx
// ❌ Don't use Next.js Image in static export mode (disabled)
// ✅ Use native img with manual optimization

<img
  src="/icons/forward.svg"
  alt="Forward player icon"
  width={32}
  height={32}
  loading="lazy"
/>
```

---
