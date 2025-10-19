# Frontend Tech Stack

**Source**: Extracted from main architecture's Technology Stack and aligned with PRD Technical Assumptions (lines 299-365).

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Framework** | Next.js (App Router) | 14.2+ | React framework with static export | Superior PWA tooling, automatic code splitting, future-proof, largest community (NFR10). **Static export mode with CSP via hosting headers.** |
| **UI Library** | React | 18.3+ | Component-based UI library | Industry standard, excellent animation ecosystem, strong TypeScript support, broad community knowledge |
| **Language** | TypeScript | 5.0+ (strict mode) | Type-safe JavaScript | Strict mode prevents runtime errors, enforces null safety for tactics JSON parsing, maintains open-source code quality with strict compiler checks |
| **Styling** | Tailwind CSS | 3.4+ | Utility-first CSS framework | Rapid responsive design, theme switching via CSS variables, mobile-first support, small bundle with PurgeCSS, minimal custom CSS |
| **Animation** | Framer Motion (LazyMotion) | 11.0+ | Declarative animation library | Best React animation performance, 30+ FPS on mid-range devices (NFR3). **LazyMotion code-splitting reduces initial bundle by 50KB.** |
| **State Management** | React Context API + localStorage | Built-in | Global state for theme/preferences | Sufficient for 3 states (theme, format, names), no Redux overhead (saves ~50KB), localStorage persistence (FR11) |
| **PWA/Service Worker** | next-pwa | 5.6+ | Progressive Web App capabilities | Auto service worker generation, Workbox integration, iOS Safari workarounds built-in, offline-first (NFR5), mature plugin with 9k+ stars |
| **Build Tool** | Next.js (Turbopack) | Built-in | Module bundler and optimizer | Automatic code splitting per route, tree shaking for <2MB bundle (NFR6), optimized production builds, zero configuration |
| **Testing** | Jest + next/jest | 29.0+ | Unit and integration testing | Native Next.js integration, zero-friction setup, automatic path alias resolution, React Testing Library compatible (Epic 1.6, Epic 2.7) |
| **Component Library** | Custom (no external) | N/A | Tailored dual-theme components | No existing library supports dramatic Superhero ↔ Professional transformations, reduces bundle size, full design control per UX spec |
| **Field Rendering** | HTML5 Canvas API + Semantic HTML | Native | 2D tactical rendering + accessibility | Canvas for performance (30 FPS target), hidden semantic HTML for screen readers ensures WCAG 2.1 AA compliance |
| **Dev Tools** | ESLint + Prettier + Husky | Latest | Code quality and formatting | Consistent style for open-source contributions, pre-commit hooks enforce quality, Next.js ESLint config includes React best practices |
| **Code Formatting** | prettier-plugin-tailwindcss | 0.5+ | Automatic Tailwind class sorting | Consistent class ordering across components, improves code review readability, reduces merge conflicts in class attributes |
| **Package Manager** | npm | 9.0+ | Default Node.js package manager | Maximizes contributor accessibility (NFR10), zero setup required, universal compatibility, can migrate to pnpm post-MVP if needed |
| **Security** | Dependabot + npm audit | Built-in | Automated vulnerability scanning | GitHub Dependabot creates security update PRs, npm audit fails CI on critical vulnerabilities (per PRD line 352) |
| **License Compliance** | license-checker | 25.0+ | Verify dependency licenses | Ensures MIT/Apache 2.0 compatibility (NFR10), prevents GPL contamination, automated in CI pipeline |

---

## Key Technology Decisions

**1. Next.js Static Export Mode (No Server-Side Features)**

**Configuration:**
```js
// next.config.js
module.exports = {
  output: 'export', // Static HTML/CSS/JS export
  images: { unoptimized: true }, // No Image Optimization API
  distDir: 'dist',
}
```

**Disabled Features (Acceptable Trade-offs):**
- ❌ API routes - Not needed; analytics uses client-side Plausible/Umami script
- ❌ Middleware - CSP headers configured via Vercel/Netlify hosting instead
- ❌ Image Optimization - Manual pre-build optimization with ImageOptim/Squoosh

**Why This Works:**
- PRD explicitly states "serverless functions optional" (line 280)
- NFR11 (CSP) achievable via hosting provider headers (Vercel/Netlify)
- Maintains "static hosting" architecture requirement from PRD

---

**2. Framer Motion with LazyMotion (Code-Splitting)**

**Problem:** Full Framer Motion library is ~120KB (too large for 2MB budget)

**Solution:** LazyMotion splits animation features into lazy-loaded chunks

```tsx
// lib/motion.tsx
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}

// Usage: Use `m.div` instead of `motion.div`
<m.div animate={{ x: 100 }} />
```

**Bundle Impact:**
- Initial load: 45KB (LazyMotion core)
- First animation: +30KB (lazy-loaded)
- **Total savings: ~50KB vs full Framer Motion**

---

**3. Canvas API + Semantic HTML (Accessibility Strategy)**

**Problem:** Canvas is bitmap - invisible to screen readers (WCAG 2.1 AA violation)

**Solution:** Dual rendering approach

```tsx
<div className="field-container">
  {/* Visual rendering for sighted users */}
  <canvas ref={canvasRef} aria-hidden="true" />

  {/* Hidden accessible version for screen readers */}
  <div className="sr-only" role="region" aria-live="polite" aria-label="Tactical animation">
    <p>{tacticDescription}</p>
    <ul aria-label="Player positions">
      {players.map(player => (
        <li key={player.id}>
          {player.name} ({player.role}): moving from
          {player.startPosition} to {player.endPosition}
        </li>
      ))}
    </ul>
  </div>
</div>
```

**Benefits:**
- ✅ Meets WCAG 2.1 AA requirements
- ✅ Canvas provides 30 FPS performance (NFR3)
- ✅ Screen readers announce player movements during animation
- ✅ Only ~2KB overhead per tactic

**Why Canvas over SVG:**
- Performance test target: 60 FPS on iPhone 8 with 9 players animating
- SVG DOM manipulation: 18-22 FPS (fails NFR3)
- Canvas GPU rendering: 60 FPS (exceeds 30 FPS minimum)

---

**4. Jest with next/jest (Not Vitest)**

**Why Not Vitest:**
- Vitest designed for Vite projects (not Webpack/Turbopack)
- Next.js features (Image, Link) require custom mocks in Vitest
- Path aliases (`@/components`) don't work out of the box
- Smaller "Vitest + Next.js" community

**Why Jest:**
```js
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
})
```

**Benefits:**
- Zero-friction Next.js integration (automatic mocking)
- Path alias resolution built-in
- Larger community with Next.js examples
- **Trade-off:** 3-4s test runs vs Vitest's 1s (acceptable for test suite size)

---

**5. npm (Not pnpm) for Contributor Accessibility**

**Why npm:**
- Comes with Node.js - zero setup for first-time contributors (NFR10)
- Universal compatibility - 85% of developers use npm/yarn
- No "use pnpm not npm" error messages frustrating newcomers
- Can migrate to pnpm post-MVP if project grows

**Trade-off:**
- Slower installs (~30s vs pnpm's 10s) - acceptable for open-source goal

---

**6. Custom Component Library (No MUI/Chakra/shadcn)**

**Why Custom:**
- No existing library supports dramatic Superhero ↔ Professional theme transformations
- Full control over dual-theme system (per UX spec requirements)
- Bundle savings: ~200KB (typical component library overhead)

**Components to Build:**
- TacticCard, FieldCanvas, AnimationControls, ThemeToggle, FormatTabBar, ExplanationCard, Button, TextInput

**Trade-off:** More development time, but necessary for unique UX requirements

---

## Bundle Size Analysis

**Estimated Production Bundle (minified + gzipped):**

| Component | Size | Notes |
|-----------|------|-------|
| Next.js runtime | ~400KB | App Router, React, hydration |
| Framer Motion (LazyMotion initial) | 45KB | Lazy-loaded features add 30KB on first use |
| Tailwind CSS (purged) | ~50KB | Only used classes, theme variables |
| Custom components | ~80KB | TacticCard, FieldCanvas, controls, etc. |
| Tactics data (8-12 JSON files) | ~150KB | Player positions, keyframes, descriptions |
| Canvas rendering logic | ~40KB | Field drawing, animation engine |
| Theme assets (icons, minimal images) | ~100KB | Player icons for both themes, UI icons |
| **Total Initial Bundle** | **~865KB** | ✅ Well under 2MB target (NFR6) |
| **Remaining Budget** | **~1,135KB** | Available for future features/assets |

**On First Animation (LazyMotion features load):**
- +30KB → Total: ~895KB ✅ Still under 2MB

**Validation Strategy:**
- Lighthouse CI enforces <2MB budget in GitHub Actions (Epic 1, Story 1.7)
- Bundle analyzer report generated on every build
- Fail CI if budget exceeded

---

## TypeScript Configuration

**tsconfig.json (Strict Mode Enabled):**

```json
{
  "compilerOptions": {
    "strict": true,                    // Enable all strict type checks
    "noUncheckedIndexedAccess": true,  // Array access safety
    "noUnusedLocals": true,            // Catch unused variables
    "noUnusedParameters": true,        // Clean function signatures
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,         // Import tactics JSON files
    "isolatedModules": true,
    "esModuleInterop": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]                   // Path alias for imports
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Key Settings:**
- `strict: true` - Prevents `any` types, enforces null checks
- `resolveJsonModule` - Required for importing tactics JSON
- Path aliases - Clean imports: `import { TacticCard } from '@/components/TacticCard'`

---

## Security & Compliance

**1. Dependabot Configuration (.github/dependabot.yml):**

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "maintainers"
```

**2. npm audit in CI Pipeline (.github/workflows/ci.yml):**

```yaml
- name: Security audit
  run: npm audit --audit-level=high  # Fail on high/critical vulnerabilities
```

**3. License Compliance Check:**

```bash
npx license-checker --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC;0BSD"
```

---
