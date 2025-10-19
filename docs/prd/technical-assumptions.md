# Technical Assumptions

## Repository Structure

**Monorepo**

The project shall use a single repository containing all frontend code, tactical content (JSON), assets, documentation, and configuration.

**Rationale:** For an MVP with no backend services and a single web application, a monorepo provides simplicity and ease of contribution for open-source developers. All code, content, and documentation live in one place, reducing onboarding friction. Polyrepo adds unnecessary complexity for a project of this scope.

## Service Architecture

**Single-Page Application (SPA) with Client-Side Rendering and PWA Capabilities**

The application shall be architected as a client-side single-page application with:
- Client-side routing (no server-side rendering for MVP)
- Progressive Web App (PWA) with Service Worker for offline-first operation
- Static JSON-based tactics library (no backend database for MVP)
- Static site hosting (Vercel, Netlify, or Cloudflare Pages)
- Optional serverless functions for analytics (deferred to implementation)

**Rationale:** This architecture maximizes simplicity, minimizes infrastructure costs (free hosting tiers), and enables offline functionality critical for sideline use. SPA architecture with client-side routing provides app-like experience without backend complexity. Service Workers enable the "offline-first" requirement after initial load.

## Testing Requirements

**Unit Testing + Integration Testing with Manual E2E Validation**

The project shall implement:
- **Unit tests** for utility functions, tactical data parsing, and component logic (Jest or Vitest)
- **Integration tests** for critical user flows: tactic selection, theme switching, format changes, animation playback (React Testing Library or similar)
- **Manual end-to-end testing** on physical devices (iPhone 8+, Samsung Galaxy A-series) for performance validation and animation quality
- **Performance testing** using Lighthouse CI for automated performance budgets (load time, TTI, bundle size)
- **No automated E2E framework initially** (Playwright/Cypress deferred to post-MVP to reduce setup complexity)

**Rationale:** Unit and integration tests catch regressions without excessive setup time. Manual E2E testing on real devices is critical given the performance constraints (30 FPS animations, mid-range mobile targets). Automated E2E adds significant maintenance overhead for a small open-source project—better to invest in solid unit/integration coverage and manual device testing initially.

## Additional Technical Assumptions and Requests

**Frontend Framework & Libraries:**
- **Framework:** React 18+ with TypeScript for type safety and developer experience
- **Rationale:** React's ecosystem provides excellent animation libraries (Framer Motion), strong PWA support, and broad community knowledge for open-source contributions
- **Styling:** Tailwind CSS for rapid responsive design and easy theme switching via configuration
- **Animation:** Framer Motion for declarative animations with good mobile performance; fallback to CSS animations for simpler transitions
- **Field Rendering:** Canvas API for tactical animations (better performance than SVG for complex movements)

**State Management:**
- **Context API + localStorage** for user preferences (theme, player names, format selection)
- No Redux or complex state management—app state is simple enough for Context API
- **Rationale:** Minimizes dependencies and bundle size; Context API sufficient for theme provider and user customization

**PWA & Offline Strategy:**
- **Service Worker:** Workbox for service worker management
- **Caching Strategy:** Cache-first for tactical JSON, animations, and static assets; network-first for analytics
- **Offline Capability:** Full functionality after initial load (all 8-12 tactics, both themes, all formats)
- **Rationale:** "Offline-first" is a hard requirement per NFR5—coaches need the app to work without internet on sidelines

**Hosting & Deployment:**
- **Static Hosting:** Vercel (recommended) or Netlify for free tier, automatic HTTPS, CDN, and preview deployments
- **Domain (OPTIONAL for MVP):** simple-tactics.org or simple-tactics.app (~$15-30/year budget)
  - MVP can launch on default Vercel URL (simple-tactics.vercel.app)
  - Custom domain can be added post-launch without code changes
  - If custom domain desired, register during Epic 3 and configure in Vercel dashboard
- **CI/CD:** GitHub Actions for automated testing, build, and deployment on merge to main
- **Rationale:** These platforms provide professional infrastructure at zero cost for open-source projects, with excellent developer experience

**Analytics:**
- **Privacy-First Analytics:** Implementation approach to be determined in Epic 3, Story 3.5:
  - **Option A (Recommended):** Cloud-hosted (Plausible.io $9/month or Umami Cloud free tier)
  - **Option B (Advanced):** Self-hosted (Plausible CE or Umami) - requires VPS, Docker, DevOps skills
  - **Option C (Fastest MVP):** Defer to post-MVP Phase 2, use alternative metrics (GitHub Stars, beta feedback)
- **No Google Analytics**—GDPR/CCPA compliance without cookie consent banners
- **Events to Track (if implemented):** Tactic views, theme switches, format selections, session duration, device types
- **Rationale:** Privacy-first aligns with grassroots/community values; no personal data collection per NFR9. Cloud-hosted recommended for MVP to avoid infrastructure complexity.

**Data Storage:**
- **Tactics Library:** Static JSON files in `/src/data/tactics/` directory, version-controlled in Git
- **User Preferences:** Browser localStorage (theme choice, player names, last-used format)
- **No Backend Database for MVP**—all content is static and client-side
- **Rationale:** JSON-based tactics enable community contributions via pull requests; no database overhead. localStorage sufficient for preferences without accounts.

**Browser & Device Support:**
- **Minimum Versions:** iOS 14+ (Safari), Android 10+ (Chrome, Samsung Internet)
- **Desktop:** Last 2 versions of Chrome, Firefox, Safari, Edge
- **No IE11 Support**—end-of-life and adds significant polyfill overhead
- **Rationale:** Balances broad reach with avoiding legacy support burden (per NFR7-NFR8)

**Performance Budgets:**
- **Initial Bundle:** <2MB (per NFR6)
- **Total Assets:** <5MB including animations and images
- **Load Time:** <3 seconds on 4G (per NFR1)
- **Animation Performance:** 30+ FPS on iPhone 8 / Galaxy A-series (per NFR3)
- **Enforcement:** Lighthouse CI in GitHub Actions blocks PRs that violate budgets
- **Rationale:** Performance is critical for mobile-first, sideline use case—budgets enforce this as a hard constraint

**Accessibility & Security:**
- **Content Security Policy (CSP):** Strict CSP headers via hosting provider configuration (per NFR11)
- **HTTPS Enforced:** Mandatory via hosting providers
- **Dependency Security:** Dependabot enabled for automated vulnerability alerts and updates
- **Accessibility Target:** WCAG AA (high contrast, touch targets 44x44px minimum, semantic HTML)
- **Rationale:** Security is table stakes; accessibility ensures broad usability even if full WCAG AAA deferred

**Open-Source & Contribution:**
- **License:** MIT License (permissive, maximizes community adoption and contributions)
- **Package Manager:** npm or pnpm (pnpm preferred for faster installs and disk efficiency)
- **Code Quality:** ESLint + Prettier for consistent code style; Husky for pre-commit hooks
- **Rationale:** Low-friction contribution environment attracts open-source developers; automated quality checks maintain consistency

**Development Convenience:**
- **Local Development:** Vite for fast dev server with HMR (Hot Module Replacement)
- **TypeScript:** Strict mode enabled for type safety
- **Conventional Commits:** Recommended for clear changelog generation
- **Rationale:** Developer experience matters for attracting contributors; Vite provides best-in-class local dev speed

---
