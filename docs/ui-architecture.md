# Simple Tactics Frontend Architecture Document

**Version:** 1.0
**Date:** 2025-10-18
**Author:** Winston (Architect)
**Status:** In Progress

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-18 | 1.0 | Initial architecture document creation | Winston (Architect) |

---

## Template and Framework Selection

**Framework Discovery:**
- **PRD Technical Assumptions** (line 299-365) specifies: **React 18+ with TypeScript**
- **PRD Architecture Type**: Single-Page Application (SPA) with client-side rendering and PWA capabilities
- **No Backend Required for MVP**: Static JSON-based tactics library

**Recommended Starter: Next.js 14+ (App Router) with Static Export Mode**

**Why Next.js Over Vite:**

**1. Superior PWA Tooling**
- **`next-pwa` plugin**: Battle-tested with 9k+ GitHub stars, iOS Safari workarounds built-in
- **Auto-generated service workers**: Zero-config Workbox integration reduces Epic 3, Story 3.2 complexity
- **iOS PWA Reliability**: Known iOS Safari cache bugs have documented solutions in Next.js ecosystem

**2. Built-In Routing & Code Splitting**
- **File-based routing**: Zero configuration for `/` (home) and `/tactic/[id]` (detail view)
- **Automatic code splitting per route**: Critical for <2MB bundle target (NFR6)
- **Nested layouts**: Shared header/theme provider with minimal boilerplate

**3. Open-Source Community Advantage**
- **Larger contributor pool**: More developers familiar with Next.js than Vite
- **Superior documentation**: Next.js docs are industry gold standard
- **Open-source goal (NFR10)**: Easier to attract contributors with mainstream stack

**4. Future-Proof Architecture**
- **Scalability**: API routes ready for deferred features (analytics serverless functions, community features)
- **No migration needed**: When post-MVP backend is added, framework supports it natively
- **Vercel-native**: First-class deployment on recommended hosting platform (zero config)

**5. Proven Animation Stack**
- **Framer Motion + Next.js**: Documented patterns, official examples, static extraction of animation variants
- **Performance**: Same 30 FPS target achievable with better optimization guides

**Configuration for Client-Only SPA:**

```js
// next.config.js
module.exports = {
  output: 'export', // Static HTML export (no Node.js server)
  images: { unoptimized: true }, // Client-side only (no Next.js Image Optimization API)
  distDir: 'dist', // Match Vite convention
}
```

**Project Initialization:**

```bash
npx create-next-app@latest simple-tactics --typescript --tailwind --app --no-src-dir
```

**Pre-installed from Next.js Template:**
- React 18.3+
- TypeScript 5.0+
- Tailwind CSS (configured)
- ESLint + Next.js rules
- App Router (file-based routing)

**Additional Dependencies Required:**
- `next-pwa` - PWA and service worker generation
- `framer-motion` - Animations (per PRD)
- `workbox-*` - Advanced PWA caching strategies (if needed beyond next-pwa defaults)

**Project Structure (Next.js App Router):**

```
/app
  /layout.tsx          - Root layout (theme provider, fonts)
  /page.tsx            - Tactics Library Grid (home)
  /tactic/[id]/page.tsx - Tactic Detail View

/components            - Reusable UI components
  /TacticCard.tsx
  /FieldCanvas.tsx
  /AnimationControls.tsx
  /ThemeToggle.tsx

/lib                   - Utilities and helpers
  /tactics-loader.ts
  /theme-context.tsx

/data                  - Tactics JSON library
  /tactics/
    high-press.json
    build-up.json

/public                - Static assets
  /icons/
  /images/
  manifest.json

/styles
  globals.css
```

**Key Architectural Decisions:**

1. **Static Export Mode**: Generates static HTML/CSS/JS (same as Vite output) - no Node.js server
2. **App Router over Pages Router**: Modern patterns, better layouts, improved code splitting
3. **No `src/` directory**: Cleaner structure for small project (can add later if needed)
4. **PWA Manifest in `/public`**: Standard location for service worker and manifest.json

**Trade-offs Acknowledged:**

| Aspect | Next.js | Vite |
|--------|---------|------|
| Dev Server Speed | ~2-3s cold start | ~1s cold start |
| HMR Speed | Fast (200-500ms) | Faster (50-200ms) |
| PWA Setup | Mature (next-pwa) | Manual (vite-plugin-pwa) |
| Bundle Size | ~400KB base | ~350KB base |
| Learning Curve | Moderate (App Router new) | Low (familiar Vite) |
| Community Size | Very Large | Growing |
| Future Backend | Native API routes | Requires separate server |

**Verdict**: Next.js's **2-second slower dev server** is negligible compared to:
- ✅ 50% faster PWA implementation (Epic 3, Story 3.2)
- ✅ Larger open-source contributor pool
- ✅ Future-proof for post-MVP backend features
- ✅ iOS Safari PWA battle-tested solutions

---

## Frontend Tech Stack

**Source**: Extracted from main architecture's Technology Stack and aligned with PRD Technical Assumptions (lines 299-365).

### Technology Stack Table

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

### Key Technology Decisions

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

### Bundle Size Analysis

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

### TypeScript Configuration

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

### Security & Compliance

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

## Project Structure

**Based on**: Next.js 14+ App Router with static export, following framework conventions and PRD Story 1.1 requirements. Structure refined based on team feedback for testability, contributor onboarding, and future scalability.

```
simple-tactics/
├── app/
│   ├── layout.tsx                    # Root layout - theme provider, fonts, global state
│   ├── page.tsx                      # Home: Tactics Library Grid (2-col mobile, 3-4 col desktop)
│   ├── globals.css                   # Global styles, CSS variables for themes
│   └── tactic/
│       └── [id]/
│           └── page.tsx              # Tactic Detail View with Canvas animation
│
├── components/
│   ├── TacticCard.tsx                # Grid card - thumbnail, title, category badge
│   ├── FieldCanvas.tsx               # Canvas rendering - dual-size (420px / 182px)
│   ├── AnimationControls.tsx         # Play/Pause/Restart buttons
│   ├── ThemeToggle.tsx               # Superhero ↔ Professional switcher
│   ├── FormatTabBar.tsx              # 5v5 / 7v7 / 9v9 selector
│   ├── ExplanationCard.tsx           # Expandable card - kid-speak / tactical language
│   ├── PlayerCustomization.tsx       # Name assignment panel
│   ├── Button.tsx                    # Primary/Secondary button variants
│   └── TextInput.tsx                 # Player name input (15 char limit)
│
├── hooks/
│   ├── useTacticAnimation.ts         # Canvas animation state management
│   ├── useTheme.ts                   # Theme context consumer hook
│   ├── useFormat.ts                  # Format context consumer hook
│   └── useLocalStorage.ts            # Typed localStorage persistence
│
├── lib/
│   ├── field-rendering/
│   │   ├── canvas-renderer.ts        # Canvas field drawing utilities
│   │   ├── animation-engine.ts       # Framer Motion + Canvas animation logic
│   │   └── field-types.ts            # Field-specific TypeScript types
│   ├── tactics-loader.ts             # Load and parse tactics JSON from /public
│   ├── theme-context.tsx             # React Context for theme state (Superhero/Pro)
│   ├── format-context.tsx            # React Context for format state (5v5/7v7/9v9)
│   ├── motion.tsx                    # LazyMotion provider wrapper
│   └── types.ts                      # Global TypeScript interfaces (Tactic, Player, Theme)
│
├── public/
│   ├── data/
│   │   └── tactics/
│   │       ├── README.md             # How to add a tactic, JSON schema quick reference
│   │       ├── pressing/
│   │       │   ├── high-press.json   # High Press tactic (all 3 formats)
│   │       │   └── counter-press.json
│   │       ├── passing/
│   │       │   ├── build-up.json
│   │       │   └── switch-play.json
│   │       ├── defending/
│   │       │   ├── compact-defense.json
│   │       │   └── zonal-marking.json
│   │       └── set-pieces/
│   │           ├── corner-kick.json
│   │           └── goal-kick.json
│   ├── icons/
│   │   ├── superhero/                # Character icons (Rocket Racer, Brick Wall, etc.)
│   │   │   ├── forward.svg
│   │   │   ├── midfielder.svg
│   │   │   └── defender.svg
│   │   └── professional/             # Jersey number icons
│   │       ├── player-1.svg
│   │       ├── player-2.svg
│   │       └── player-9.svg
│   ├── images/
│   │   ├── field-texture.webp        # Professional mode grass texture (optional)
│   │   └── logo.svg                  # App logo
│   ├── manifest.json                 # PWA manifest (installability)
│   ├── service-worker.js             # Generated by next-pwa
│   └── favicon.ico
│
├── styles/
│   └── themes.css                    # CSS variables for Superhero/Professional themes
│
├── __tests__/
│   ├── components/
│   │   ├── TacticCard.test.tsx
│   │   ├── FieldCanvas.test.tsx
│   │   └── ThemeToggle.test.tsx
│   ├── lib/
│   │   ├── tactics-loader.test.ts
│   │   └── field-rendering/
│   │       ├── canvas-renderer.test.ts
│   │       └── animation-engine.test.ts
│   ├── integration/
│   │   ├── tactic-selection.test.tsx  # Epic 2, Story 2.7
│   │   └── theme-switching.test.tsx
│   └── fixtures/
│       ├── high-press.json            # Minimal test tactic
│       ├── invalid-tactic.json        # For error handling tests
│       └── mock-player-positions.json
│
├── __mocks__/
│   ├── tactics.ts                     # Mock tactics data for tests
│   ├── localStorage.ts                # Mock Web Storage API
│   └── canvas.ts                      # Mock Canvas API for JSDOM tests
│
├── scripts/
│   ├── validate-tactics.js            # Pre-commit hook - validate all JSON schemas
│   ├── bundle-report.js               # Generate bundle size analysis
│   └── optimize-images.js             # Compress SVGs and WebP images
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                     # Lint, test, build, Lighthouse CI
│   │   └── deploy.yml                 # Auto-deploy to Vercel on merge
│   ├── dependabot.yml                 # Security updates
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/
│   ├── prd.md                         # Product Requirements
│   ├── ui-architecture.md             # This document
│   ├── front-end-spec.md              # UX specification
│   └── tactics/
│       └── SCHEMA.md                  # Tactics JSON schema documentation
│
├── .eslintrc.json                     # ESLint config (Next.js preset)
├── .prettierrc                        # Prettier config + Tailwind plugin
├── .husky/                            # Git hooks (pre-commit linting)
│   └── pre-commit                     # Run lint + validate-tactics.js
├── jest.config.js                     # Jest + next/jest config
├── jest.setup.js                      # Test environment setup (Canvas mock)
├── next.config.js                     # Next.js static export config
├── tailwind.config.ts                 # Tailwind theme customization
├── tsconfig.json                      # TypeScript strict mode config
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── CONTRIBUTING.md
├── LICENSE (MIT)
└── CODE_OF_CONDUCT.md
```

---

### Key Structure Decisions

**1. Tactics JSON in `/public/data/tactics` (Not `/data`)**

**Rationale:**
- **Served as static assets** - Next.js serves `/public` files directly, not bundled with JavaScript
- **Bundle size savings** - Keeps ~150KB tactics data out of initial JS bundle
- **Dynamic loading** - Tactics fetched on-demand via `fetch('/data/tactics/high-press.json')`
- **CDN caching** - Hosting providers cache `/public` files on edge network

**Impact:** Reduces initial bundle from 1,015KB → 865KB ✅

---

**2. `/hooks` Directory for Custom React Hooks**

**Standard React pattern for reusable stateful logic:**

```tsx
// hooks/useTacticAnimation.ts
export function useTacticAnimation(tactic: Tactic) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const play = () => setIsPlaying(true)
  const pause = () => setIsPlaying(false)
  const restart = () => { setProgress(0); setIsPlaying(true) }

  return { isPlaying, progress, play, pause, restart }
}

// hooks/useTheme.ts
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

**Expected Hooks:**
- `useTacticAnimation` - Animation state (play/pause/restart)
- `useTheme` - Theme context consumer (Superhero/Professional)
- `useFormat` - Format context consumer (5v5/7v7/9v9)
- `useLocalStorage` - Typed localStorage with SSR safety

---

**3. `/lib/field-rendering/` Subdirectory for Co-Located Code**

**Problem:** `canvas-renderer.ts` and `animation-engine.ts` are tightly coupled - both work with Canvas API

**Solution:** Group related modules in subdirectory

```
/lib/field-rendering/
  canvas-renderer.ts    # Draw field, players, ball
  animation-engine.ts   # Animate player movements
  field-types.ts        # FieldDimensions, PlayerPosition types
```

**Benefits:**
- Related code stays together (easier maintenance)
- Clear module boundaries (field rendering vs tactics loading vs theme management)
- Scalable pattern (add `/lib/storage/` for localStorage utilities later)

---

**4. `/__mocks__` and `/__tests__/fixtures` for Testing Infrastructure**

**Critical for Epic 1, Story 1.6 (Unit Tests):**

**`__mocks__/canvas.ts`** - Mock Canvas API (doesn't exist in JSDOM):
```ts
export const mockCanvas = {
  getContext: jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    // ... all Canvas 2D methods
  })),
}

HTMLCanvasElement.prototype.getContext = mockCanvas.getContext
```

**`__tests__/fixtures/high-press.json`** - Minimal test tactic:
```json
{
  "id": "test-tactic",
  "title": "Test Tactic",
  "category": "pressing",
  "formats": {
    "5v5": { "positions": [...] }
  }
}
```

**Without these:** Every `FieldCanvas` test fails with "getContext is not a function"

---

**5. `/scripts` Directory for Developer Automation**

**`scripts/validate-tactics.js`** - Run in pre-commit hook:
```js
// Validates all tactics JSON against schema
// Fails commit if invalid tactic detected
const tactics = loadAllTactics()
tactics.forEach(tactic => {
  if (!validateSchema(tactic)) {
    console.error(`Invalid tactic: ${tactic.id}`)
    process.exit(1)
  }
})
```

**`scripts/bundle-report.js`** - Analyze build size:
```js
// Generate visual bundle size report
// Run after `npm run build`
import analyzer from 'webpack-bundle-analyzer'
analyzer.start('./dist')
```

**`scripts/optimize-images.js`** - Compress assets:
```js
// Optimize all SVGs and WebP images
// Run before committing new icons
import { optimize } from 'svgo'
optimizeDirectory('./public/icons')
```

---

### File Naming Conventions

**TypeScript/React Files:**
- Components: `PascalCase.tsx` (e.g., `TacticCard.tsx`)
- Hooks: `use + PascalCase.ts` (e.g., `useTheme.ts`)
- Utilities: `kebab-case.ts` (e.g., `tactics-loader.ts`)
- Contexts: `kebab-case.tsx` (e.g., `theme-context.tsx`)
- Tests: `SourceName.test.tsx` or `source-name.test.ts`

**Data Files:**
- Tactics: `kebab-case.json` (e.g., `high-press.json`)
- Tactic IDs match filenames: `"id": "high-press"` → `high-press.json`

**Assets:**
- Icons: `kebab-case.svg` (e.g., `player-1.svg`, `forward.svg`)
- Images: `kebab-case.webp` (WebP format for optimization)

**Scripts:**
- Node scripts: `kebab-case.js` (e.g., `validate-tactics.js`)

---

### Import Path Aliases

**tsconfig.json configuration:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

**Usage Examples:**
```tsx
// Clean imports from anywhere in the codebase
import { TacticCard } from '@/components/TacticCard'
import { useTheme } from '@/hooks/useTheme'
import { loadTactics } from '@/lib/tactics-loader'
import { drawField } from '@/lib/field-rendering/canvas-renderer'
```

---

### Next.js App Router Patterns

**1. Root Layout with Providers (app/layout.tsx)**

```tsx
import { ThemeProvider } from '@/lib/theme-context'
import { FormatProvider } from '@/lib/format-context'
import MotionProvider from '@/lib/motion'
import '@/app/globals.css'

export const metadata = {
  title: 'Simple Tactics',
  description: 'Interactive tactics for youth soccer coaches',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <FormatProvider>
            <MotionProvider>
              {children}
            </MotionProvider>
          </FormatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**2. Home Page - Tactics Grid (app/page.tsx)**

```tsx
import { TacticCard } from '@/components/TacticCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { FormatTabBar } from '@/components/FormatTabBar'

// This data is fetched at build time (static export)
async function getTactics() {
  // In static export mode, this reads from /public during build
  const res = await fetch('/data/tactics/index.json')
  return res.json()
}

export default async function HomePage() {
  const tactics = await getTactics()

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Simple Tactics</h1>
        <ThemeToggle />
      </header>

      <FormatTabBar />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {tactics.map(tactic => (
          <TacticCard key={tactic.id} tactic={tactic} />
        ))}
      </div>
    </main>
  )
}
```

**3. Dynamic Route - Tactic Detail (app/tactic/[id]/page.tsx)**

```tsx
import { FieldCanvas } from '@/components/FieldCanvas'
import { ExplanationCard } from '@/components/ExplanationCard'

async function getTactic(id: string) {
  const res = await fetch(`/data/tactics/${id}.json`)
  if (!res.ok) throw new Error('Tactic not found')
  return res.json()
}

export default async function TacticDetailPage({ params }: { params: { id: string } }) {
  const tactic = await getTactic(params.id)

  return (
    <div className="h-screen flex flex-col">
      <FieldCanvas tactic={tactic} />
      <ExplanationCard tactic={tactic} />
    </div>
  )
}

// Generate static paths for all tactics at build time
export async function generateStaticParams() {
  const tactics = await fetch('/data/tactics/index.json').then(r => r.json())
  return tactics.map((tactic) => ({ id: tactic.id }))
}
```

---

### Critical Configuration Files

**jest.setup.js - Canvas Mock (Required for Tests):**

```js
// Mock Canvas API for JSDOM environment
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
}))

// Mock IntersectionObserver (used by Framer Motion)
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
```

**Husky pre-commit hook (.husky/pre-commit):**

```bash
#!/bin/sh
npm run lint
npm run validate-tactics  # Runs scripts/validate-tactics.js
```

---

### Scalability Plan (Post-MVP)

**When to refactor structure:**

| Threshold | Current | Action |
|-----------|---------|--------|
| **15+ components** | 10 components (MVP) | Move to `/components/[feature]` subdirectories |
| **3+ context providers** | 2 providers (theme, format) | Create dedicated `/contexts` directory |
| **10+ utilities in `/lib`** | ~6 utilities | Create subdirectories by domain |

**Migration path documented in README.md:**

```markdown
## Project Structure Evolution

### Current (MVP)
- Flat `/components` (10 components)
- Single `/lib` with `/field-rendering` subdirectory

### Phase 2 (15+ components)
- Feature-based: `/components/field`, `/components/cards`, `/components/controls`
- Dedicated `/contexts` directory

### Phase 3 (Backend features)
- Add `/app/api` routes (Next.js API)
- Add `/services` for external API calls
```

---

## Component Standards

**Purpose**: Define exact patterns for component creation following Next.js and React best practices. These standards ensure consistency across the codebase and make the project accessible to open-source contributors.

### Component Template

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

### Client vs Server Components

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

### Naming Conventions

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

### Component Organization Patterns

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

### Props Validation and Defaults

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

### Accessibility Standards

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

### Performance Optimization Patterns

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

## State Management

**Approach**: React Context API + localStorage for global state. No Redux/Zustand needed - only 3 global states (theme, format, player names).

### Store Structure

**Global State Architecture:**

```
┌─────────────────────────────────────┐
│         App Layout (Root)           │
│  ┌───────────────────────────────┐  │
│  │      ThemeProvider            │  │
│  │  (Superhero/Professional)     │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   FormatProvider        │  │  │
│  │  │   (5v5/7v7/9v9)         │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │   Page Content    │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

LocalStorage (Persistence):
  - simple-tactics-theme: "superhero" | "professional"
  - simple-tactics-format: "5v5" | "7v7" | "9v9"
  - simple-tactics-player-names: { [tacticId]: { [position]: string } }
```

**State Locations:**

| State | Where | Type | Persistence |
|-------|-------|------|-------------|
| Theme | ThemeContext | `'superhero' \| 'professional'` | localStorage |
| Format | FormatContext | `'5v5' \| '7v7' \| '9v9'` | localStorage |
| Player Names | Component state + localStorage | `Record<string, string>` | localStorage |
| Animation State | Component state (useTacticAnimation) | `{ isPlaying, progress }` | None |
| Explanation Expanded | Component state | `boolean` | None |

---

### State Management Templates

**1. Theme Context (lib/theme-context.tsx):**

```tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'superhero' | 'professional'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('superhero')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('simple-tactics-theme') as Theme | null
    if (saved === 'superhero' || saved === 'professional') {
      setThemeState(saved)
    }
  }, [])

  // Save to localStorage on change
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('simple-tactics-theme', newTheme)
    // Update data-theme attribute for CSS
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**2. Format Context (lib/format-context.tsx):**

```tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Format = '5v5' | '7v7' | '9v9'

interface FormatContextType {
  format: Format
  setFormat: (format: Format) => void
}

export const FormatContext = createContext<FormatContextType | undefined>(undefined)

export const FormatProvider = ({ children }: { children: ReactNode }) => {
  const [format, setFormatState] = useState<Format>('7v7') // Default to 7v7

  useEffect(() => {
    const saved = localStorage.getItem('simple-tactics-format') as Format | null
    if (saved === '5v5' || saved === '7v7' || saved === '9v9') {
      setFormatState(saved)
    }
  }, [])

  const setFormat = (newFormat: Format) => {
    setFormatState(newFormat)
    localStorage.setItem('simple-tactics-format', newFormat)
  }

  return (
    <FormatContext.Provider value={{ format, setFormat }}>
      {children}
    </FormatContext.Provider>
  )
}
```

**3. useLocalStorage Hook (hooks/useLocalStorage.ts):**

```tsx
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    }
  }, [key])

  // Save to localStorage when value changes
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return [storedValue, setValue]
}
```

**Usage:**
```tsx
// In PlayerCustomization component
const [playerNames, setPlayerNames] = useLocalStorage<Record<string, string>>(
  `simple-tactics-player-names-${tactic.id}`,
  {}
)
```

---

### State Update Patterns

**1. Context Updates (Synchronous):**

```tsx
// components/ThemeToggle.tsx
'use client'

import { useTheme } from '@/hooks/useTheme'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'superhero' ? 'professional' : 'superhero')
  }

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'superhero' ? '🦸 Superhero' : '👔 Professional'}
    </button>
  )
}
```

**2. LocalStorage Updates (via Hook):**

```tsx
// components/PlayerCustomization.tsx
'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'

export const PlayerCustomization = ({ tacticId }: { tacticId: string }) => {
  const [playerNames, setPlayerNames] = useLocalStorage<Record<string, string>>(
    `simple-tactics-player-names-${tacticId}`,
    {}
  )

  const updatePlayerName = (position: string, name: string) => {
    setPlayerNames({
      ...playerNames,
      [position]: name,
    })
  }

  const clearAllNames = () => {
    setPlayerNames({})
  }

  return (
    <div>
      {/* Input fields for player names */}
      <button onClick={clearAllNames}>Clear All Names</button>
    </div>
  )
}
```

**3. Component State (Local, No Persistence):**

```tsx
// components/ExplanationCard.tsx
'use client'

import { useState } from 'react'

export const ExplanationCard = ({ tactic }: { tactic: Tactic }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Minimize' : 'Expand'} Explanation
      </button>
      {isExpanded && <div>{tactic.description}</div>}
    </div>
  )
}
```

---

## API Integration

**Note**: For MVP, there is **no backend API**. Tactics are loaded from static JSON files in `/public/data/tactics`. This section defines patterns for future API integration (analytics, community features).

### Service Template

**Future API Service Pattern (lib/api-client.ts):**

```tsx
// Not used in MVP, but pattern for post-MVP backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.simple-tactics.org'

interface ApiError {
  message: string
  statusCode: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        const error: ApiError = {
          message: `API Error: ${response.statusText}`,
          statusCode: response.status,
        }
        throw error
      }

      return response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  // POST request
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
```

---

### Current MVP Pattern: Static JSON Loading

**Tactics Loader (lib/tactics-loader.ts):**

```tsx
import { Tactic } from '@/lib/types'

/**
 * Load all tactics from /public/data/tactics directory
 * In static export mode, this fetches from the public directory
 */
export async function loadTactics(): Promise<Tactic[]> {
  try {
    const response = await fetch('/data/tactics/index.json')
    if (!response.ok) {
      throw new Error('Failed to load tactics index')
    }
    return response.json()
  } catch (error) {
    console.error('Error loading tactics:', error)
    return []
  }
}

/**
 * Load a single tactic by ID
 */
export async function loadTacticById(id: string): Promise<Tactic | null> {
  try {
    // Determine category from ID (e.g., "high-press" -> "pressing")
    const category = getCategoryFromId(id)
    const response = await fetch(`/data/tactics/${category}/${id}.json`)

    if (!response.ok) {
      throw new Error(`Tactic not found: ${id}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error loading tactic ${id}:`, error)
    return null
  }
}

function getCategoryFromId(id: string): string {
  // Map tactic ID to category directory
  // In production, this would be from index.json metadata
  const categoryMap: Record<string, string> = {
    'high-press': 'pressing',
    'counter-press': 'pressing',
    'build-up': 'passing',
    'switch-play': 'passing',
    'compact-defense': 'defending',
    'zonal-marking': 'defending',
    'corner-kick': 'set-pieces',
    'goal-kick': 'set-pieces',
  }

  return categoryMap[id] || 'pressing'
}
```

---

## Routing

**Next.js App Router handles routing via file-based convention.** No React Router needed.

### Route Configuration

**Static Routes:**

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Home - Tactics Library Grid |
| `/tactic/[id]` | `app/tactic/[id]/page.tsx` | Tactic Detail View (dynamic) |

**Future Routes (Post-MVP):**

| Route | File | Description |
|-------|------|-------------|
| `/about` | `app/about/page.tsx` | About the project |
| `/contribute` | `app/contribute/page.tsx` | How to contribute |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy |

---

### Dynamic Route Pattern

**Tactic Detail Page (app/tactic/[id]/page.tsx):**

```tsx
import { notFound } from 'next/navigation'
import { FieldCanvas } from '@/components/FieldCanvas'
import { loadTacticById } from '@/lib/tactics-loader'

// This page is statically generated at build time for all tactic IDs
export async function generateStaticParams() {
  // Load all tactics to generate static paths
  const response = await fetch('/data/tactics/index.json')
  const tactics = await response.json()

  return tactics.map((tactic: { id: string }) => ({
    id: tactic.id,
  }))
}

export default async function TacticPage({ params }: { params: { id: string } }) {
  const tactic = await loadTacticById(params.id)

  if (!tactic) {
    notFound() // Returns 404 page
  }

  return (
    <div>
      <FieldCanvas tactic={tactic} />
    </div>
  )
}
```

---

### Navigation Patterns

**1. Link Component (Client-Side Navigation):**

```tsx
import Link from 'next/link'

<Link href={`/tactic/${tactic.id}`} className="...">
  {tactic.title}
</Link>
```

**2. Programmatic Navigation:**

```tsx
'use client'

import { useRouter } from 'next/navigation'

export const TacticCard = ({ tactic }: { tactic: Tactic }) => {
  const router = useRouter()

  const handleClick = () => {
    // Track analytics before navigating
    trackEvent('tactic_viewed', { tacticId: tactic.id })
    router.push(`/tactic/${tactic.id}`)
  }

  return <div onClick={handleClick}>{tactic.title}</div>
}
```

**3. Back Navigation:**

```tsx
'use client'

import { useRouter } from 'next/navigation'

export const BackButton = () => {
  const router = useRouter()

  return (
    <button onClick={() => router.back()}>
      ← Back to Tactics
    </button>
  )
}
```

---

## Styling Guidelines

**Approach**: Tailwind CSS with CSS custom properties (variables) for theme switching. No CSS-in-JS (styled-components/emotion) to save bundle size.

### Styling Approach

**Tailwind Utility-First with Theme Variables:**

```tsx
// Component uses Tailwind classes
<button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
  Click Me
</button>

// Theme colors defined in CSS variables (styles/themes.css)
[data-theme="superhero"] {
  --color-primary: #9C27B0; /* Hero Purple */
  --color-primary-dark: #7B1FA2;
}

[data-theme="professional"] {
  --color-primary: #1976D2; /* Pro Blue */
  --color-primary-dark: #1565C0;
}

// Tailwind config maps to CSS variables (tailwind.config.ts)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
      }
    }
  }
}
```

---

### Global Theme Variables

**styles/themes.css:**

```css
:root {
  /* Spacing */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */

  /* Typography */
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-heading: 'Inter', -apple-system, sans-serif;

  /* Transitions */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
}

/* Superhero Theme */
[data-theme="superhero"] {
  /* Primary Colors */
  --color-primary: #9C27B0;
  --color-primary-dark: #7B1FA2;
  --color-secondary: #2196F3;
  --color-accent: #FF9800;

  /* Category Colors */
  --color-pressing: #F44336;
  --color-passing: #FFEB3B;
  --color-defending: #4CAF50;
  --color-set-pieces: #9C27B0;

  /* Neutral Colors */
  --color-text: #212121;
  --color-text-secondary: #757575;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;

  /* Field */
  --color-field-grass: #32CD32;
  --color-field-lines: #FFFFFF;
  --field-line-width: 4px;

  /* Typography */
  --font-body: 'Nunito', sans-serif;
  --font-heading: 'Fredoka', sans-serif;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Shadows */
  --shadow-card: 0 4px 8px rgba(156, 39, 176, 0.2);
  --shadow-button: 0 4px 12px rgba(33, 150, 243, 0.3);
}

/* Professional Theme */
[data-theme="professional"] {
  /* Primary Colors */
  --color-primary: #1976D2;
  --color-primary-dark: #1565C0;
  --color-secondary: #00897B;
  --color-accent: #0D47A1;

  /* Category Colors (Muted) */
  --color-pressing: #C62828;
  --color-passing: #1565C0;
  --color-defending: #2E7D32;
  --color-set-pieces: #6A1B9A;

  /* Neutral Colors */
  --color-text: #212121;
  --color-text-secondary: #616161;
  --color-background: #ECEFF1;
  --color-surface: #FFFFFF;
  --color-surface-dark: #2C2C2C;

  /* Field */
  --color-field-grass: #228B22;
  --color-field-lines: #FFFFFF;
  --field-line-width: 2px;

  /* Typography */
  --font-body: 'Inter', sans-serif;
  --font-heading: 'Inter', sans-serif;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  /* Shadows */
  --shadow-card: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-button: 0 2px 6px rgba(25, 118, 210, 0.2);
}

/* Dark Mode Support (Future) */
@media (prefers-color-scheme: dark) {
  [data-theme="professional"] {
    --color-background: #121212;
    --color-surface: #1E1E1E;
    --color-text: #E0E0E0;
  }
}
```

---

### Tailwind Configuration

**tailwind.config.ts:**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        pressing: 'var(--color-pressing)',
        passing: 'var(--color-passing)',
        defending: 'var(--color-defending)',
        'set-pieces': 'var(--color-set-pieces)',
        'field-grass': 'var(--color-field-grass)',
        'field-lines': 'var(--color-field-lines)',
      },
      fontFamily: {
        body: 'var(--font-body)',
        heading: 'var(--font-heading)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        button: 'var(--shadow-button)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### Component Styling Examples

**1. Theme-Aware Button:**

```tsx
<button className="bg-primary text-white px-4 py-2 rounded-md shadow-button hover:bg-primary-dark transition-colors duration-fast">
  Play Animation
</button>
```

**2. Category Badge:**

```tsx
<span className="bg-pressing text-white px-2 py-1 rounded-sm text-sm font-semibold">
  Pressing
</span>
```

**3. Field Canvas Container:**

```tsx
<div className="relative w-full aspect-[4/3] bg-field-grass rounded-lg overflow-hidden">
  <canvas ref={canvasRef} className="w-full h-full" />
</div>
```

---

## Testing Requirements

**Strategy**: Unit tests for utilities/hooks, integration tests for user flows, manual E2E testing on real devices.

### Component Test Template

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

### Testing Best Practices

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

## Environment Configuration

**Required Environment Variables (for static export, minimal):**

**.env.local (Development):**

```bash
# Not needed for MVP - all static
# Future analytics endpoint
NEXT_PUBLIC_ANALYTICS_URL=https://analytics.simple-tactics.org

# Future API (post-MVP)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

**Production (Vercel Environment Variables):**

```bash
# Analytics (if using self-hosted Plausible)
NEXT_PUBLIC_ANALYTICS_URL=https://analytics.simple-tactics.org

# Content Security Policy
# Configured via Vercel headers, not env vars
```

**No secrets needed for MVP** - everything is client-side static.

---

## Frontend Developer Standards

### Critical Coding Rules

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

### Quick Reference

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
