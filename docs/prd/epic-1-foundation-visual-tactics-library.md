# Epic 1: Foundation & Visual Tactics Library

**Epic Goal:** Establish a production-ready project foundation with React, TypeScript, and CI/CD pipeline while delivering immediate user value through a mobile-responsive tactics browser displaying 3-4 core tactical concepts on a visual field canvas. This epic enables coaches to discover, browse, and view static tactical diagrams on their mobile devices, validating the core navigation and visualization approach before adding animations and themes.

---

## Story 1.1: Initialize Project with React, TypeScript, and Tailwind CSS

As a developer,
I want a modern React project with TypeScript and Tailwind CSS configured,
so that I have a solid foundation with type safety and rapid styling capabilities.

**Acceptance Criteria:**

1. React 18+ project initialized using Vite with TypeScript template
2. Tailwind CSS installed and configured with mobile-first breakpoints (sm, md, lg, xl)
3. ESLint and Prettier configured with recommended rules for React/TypeScript
4. Basic folder structure created: `/src/components`, `/src/features`, `/src/lib`, `/src/data`, `/src/assets`, `/src/styles`
5. Development server runs successfully with hot module replacement (HMR)
6. `package.json` includes scripts for `dev`, `build`, `lint`, and `preview`
7. `.gitignore` configured to exclude `node_modules`, `dist`, and IDE-specific files
8. **Dual-theme CSS variable system established in Tailwind config** with placeholder color tokens for `superhero` and `professional` themes (validates theme architecture early, visual assets defer to Epic 2)
9. **Theme provider skeleton created** (`lib/theme-context.tsx`) with basic theme switching logic using CSS classes (validates state management approach before Epic 2 visual implementation)

---

## Story 1.2: Set Up CI/CD Pipeline with GitHub Actions and Vercel Deployment

As a developer,
I want automated testing and deployment on every commit,
so that code quality is maintained and changes are immediately available for testing.

**Prerequisites:**

Before starting this story, ensure the following are completed:

1. **GitHub repository created** for the project
2. **Vercel account created** (free tier: https://vercel.com/signup)
3. **Vercel CLI installed globally:** `npm install -g vercel`
4. **Vercel authenticated locally:** `vercel login` (confirms authentication successful)

**Acceptance Criteria:**

1. GitHub Actions workflow created (`.github/workflows/ci.yml`) that runs on push to `main` and pull requests
2. CI workflow executes linting (`npm run lint`) and build (`npm run build`) steps
3. CI workflow fails if lint errors or build errors are detected
4. **Vercel project connected to GitHub repository with automatic deployments:**
   - Vercel account authenticated to GitHub
   - Repository selected in Vercel dashboard
   - Build settings configured (Framework Preset: Next.js, Build Command: `npm run build`, Output Directory: `out`)
5. Successful builds on `main` branch automatically deploy to production URL
6. Pull requests generate preview deployment URLs visible in GitHub PR comments
7. Vercel environment configured with appropriate build settings:
   - Node version: 18.x or 20.x
   - Build command: `npm run build`
   - Output directory: `out` (Next.js static export)
   - Environment variables (if any): documented in `.env.example`
8. **Manual deployment tested:** Run `vercel` command locally to verify project deploys successfully before configuring GitHub Actions
9. **Production URL documented:** Production URL (e.g., `simple-tactics.vercel.app`) recorded in README.md for reference

**Definition of Done:**

- [ ] All acceptance criteria met
- [ ] CI workflow runs successfully on a test PR
- [ ] Vercel preview deployment URL appears in test PR comments
- [ ] Production deployment accessible at Vercel URL
- [ ] Team members can access deployment URLs

---

## Story 1.3: Create Responsive Tactics Grid Layout with Mobile Navigation

As a volunteer coach,
I want to see a grid of available tactics when I open the app on my phone,
so that I can quickly browse and select the tactic I want to show my team.

**Acceptance Criteria:**

1. Home page displays a responsive grid of tactic cards (2 columns on mobile, 3-4 on tablet/desktop)
2. Each tactic card shows a placeholder title (e.g., "High Press," "Build-Up Play")
3. Each tactic card shows a placeholder thumbnail image or colored background
4. Tactic cards have large touch targets (minimum 44x44px) suitable for thumb interaction
5. Grid scrolls vertically on mobile devices with smooth scroll behavior
6. Header displays app title "Simple Tactics" with appropriate branding typography
7. Layout is responsive and renders correctly on viewport widths from 375px to 1280px
8. Basic navigation to tactic detail view on card tap (can be placeholder route initially)

---

## Story 1.4: Design Tactics Data Schema and Load First 3 Tactics from JSON

As a developer,
I want a well-structured JSON schema for tactical content,
so that tactics data is maintainable, version-controlled, and easy for contributors to add to.

**Acceptance Criteria:**

1. JSON schema defined for tactics including fields: `id`, `title`, `category`, `description`, `positions` (array of player coordinates), `metadata` (format, theme)
2. Three tactical JSON files created in `/src/data/tactics/` directory representing: one Pressing tactic, one Passing tactic, one Defending tactic
3. Each JSON file includes placeholder player positions for 5v5 format
4. Each JSON file includes kid-friendly description and professional description
5. Data loader utility function created to import and parse JSON tactics files
6. Tactics data successfully loaded and displayed in the tactics grid (replacing placeholder cards)
7. TypeScript interfaces/types defined for Tactic, Position, and Metadata objects
8. JSON schema documented in `/src/data/tactics/README.md` with example

---

## Story 1.5: Implement Canvas-Based Field Rendering with Player Positions and Animation Prototype

As a volunteer coach,
I want to see a visual soccer field with player positions when I select a tactic,
so that I can understand the positional setup before showing it to my team.

**Acceptance Criteria:**

1. Tactic detail view created with full-screen Canvas element for field rendering
2. Canvas renders a soccer field with proper proportions (green background, white lines, center circle, penalty areas)
3. Player positions from JSON data rendered as circles or icons on the field at correct coordinates
4. Field auto-scales to fit mobile viewport while maintaining aspect ratio
5. Field rendering adapts to portrait and landscape orientations
6. Visual contrast is sufficient for outdoor readability (bright colors, thick lines)
7. Touch-friendly back button navigates from detail view to tactics grid
8. Selected tactic title and description displayed above or below field canvas
9. **Framer Motion library installed and integrated into project** (early technical risk validation)
10. **Prototype animation created showing at least 2 players moving between positions** to validate animation approach and performance
11. **Frame rate measured on target devices** (iPhone 8 / Samsung Galaxy A-series or equivalent emulator) confirming ≥30 FPS is achievable with current architecture

---

## Story 1.6: Add Unit Tests for Tactics Data Loading and Validation

As a developer,
I want automated tests for tactics data loading,
so that I can catch data schema errors and regressions early.

**Acceptance Criteria:**

1. Jest or Vitest configured for unit testing with TypeScript support
2. Tests written for tactics data loader utility covering: successful JSON parsing, valid schema validation, error handling for malformed JSON
3. Tests verify that all required fields (id, title, category, positions, descriptions) are present in loaded tactics
4. Tests verify that position coordinates are valid numbers within expected ranges
5. Test coverage for data loading utilities reaches at least 80%
6. Tests run successfully in CI pipeline (GitHub Actions)
7. `package.json` includes `test` script to run test suite

---

## Story 1.7: Optimize Mobile Performance and Lighthouse Score

As a volunteer coach,
I want the app to load quickly on my phone even on 4G connection,
so that I can access tactics instantly on the sideline without frustration.

**Acceptance Criteria:**

1. Lighthouse CI configured in GitHub Actions workflow to run on every build
2. Mobile Lighthouse score achieves: Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥80
3. Initial bundle size is <500KB (well under 2MB target, leaving room for animations/themes in future epics)
4. Time to Interactive (TTI) is <3 seconds on simulated 4G throttled connection
5. Images and assets optimized (compressed, appropriate formats)
6. Lazy loading implemented for tactic detail views (only load when navigated to)
7. Lighthouse CI fails PR if scores drop below thresholds

---
