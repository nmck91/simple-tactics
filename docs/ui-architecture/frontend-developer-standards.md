# Frontend Developer Standards

## Critical Coding Rules

**AI and Human Developers Must Follow:**

1. **Always use TypeScript strict mode** - No `any` types except in rare cases with `// @ts-expect-error` comment explaining why

2. **All components must be accessible (WCAG 2.1 AA)** - Semantic HTML, ARIA labels, keyboard navigation, focus indicators

3. **Never bypass ESLint/Prettier** - Fix warnings, don't disable rules without team discussion

4. **Client components must have `'use client'` directive** - If using hooks, state, effects, or browser APIs

5. **Import path aliases required** - Use `@/components/*` not `../components/*`

6. **Tailwind classes only** - No inline styles except for dynamic Canvas values

7. **Props must have TypeScript interfaces** - Named `{ComponentName}Props`

8. **Test critical paths** - Every user flow needs integration test (Epic 2, Story 2.7)

9. **Bundle budget enforced** - <2MB initial load (Lighthouse CI fails builds that exceed)

10. **Commit message format** - Follow Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`

---

## Quick Reference

**Common Commands:**

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Production build (static export)
npm run start                  # Preview production build locally

# Code Quality
npm run lint                   # ESLint check
npm run lint:fix               # Auto-fix linting issues
npm run format                 # Prettier format all files

# Testing
npm test                       # Run Jest tests
npm run test:watch             # Jest watch mode
npm run test:coverage          # Coverage report

# Validation
npm run validate-tactics       # Validate all tactics JSON
npm run bundle-report          # Analyze bundle size

# Pre-commit (runs automatically)
npm run lint && npm run validate-tactics
```

---

**Key Import Patterns:**

```tsx
// Components
import { TacticCard } from '@/components/TacticCard'

// Hooks
import { useTheme } from '@/hooks/useTheme'
import { useFormat } from '@/hooks/useFormat'

// Utilities
import { loadTactics } from '@/lib/tactics-loader'
import { drawField } from '@/lib/field-rendering/canvas-renderer'

// Types
import { Tactic, Player, Theme, Format } from '@/lib/types'

// Next.js
import Link from 'next/link'
import { useRouter } from 'next/navigation'
```

---

**File Naming Quick Guide:**

- Component: `TacticCard.tsx` → `export const TacticCard`
- Hook: `useTheme.ts` → `export function useTheme()`
- Utility: `tactics-loader.ts` → `export function loadTactics()`
- Test: `TacticCard.test.tsx`
- Type file: `types.ts` or `field-types.ts`

---

**Common Pitfalls to Avoid:**

1. ❌ Using `any` type without comment
2. ❌ Forgetting `'use client'` on components with hooks
3. ❌ Using `../` relative imports instead of `@/` aliases
4. ❌ Adding inline styles instead of Tailwind classes
5. ❌ Bypassing pre-commit hooks with `--no-verify`
6. ❌ Creating components without TypeScript props interface
7. ❌ Forgetting to mock Canvas API in tests
8. ❌ Not testing on real mobile devices (iPhone 8+)

---

**Project-Specific Patterns:**

**1. Loading Tactics:**
```tsx
import { loadTactics, loadTacticById } from '@/lib/tactics-loader'

const tactics = await loadTactics()  // All tactics
const tactic = await loadTacticById('high-press')  // Single tactic
```

**2. Theme Access:**
```tsx
'use client'
import { useTheme } from '@/hooks/useTheme'

const { theme, setTheme } = useTheme()
```

**3. Format Access:**
```tsx
'use client'
import { useFormat } from '@/hooks/useFormat'

const { format, setFormat } = useFormat()
```

**4. localStorage Persistence:**
```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage'

const [value, setValue] = useLocalStorage('key', defaultValue)
```

---

**END OF FRONTEND ARCHITECTURE DOCUMENT**

---
