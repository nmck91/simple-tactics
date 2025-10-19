# Simple Tactics Product Requirements Document (PRD)

**Version:** v1.3
**Date:** 2025-10-18
**Author:** Sarah (Product Owner)
**Status:** Ready for Architecture Phase

---

## Goals and Background Context

### Goals

- Provide volunteer youth soccer coaches (ages 5-11) with instant access to expert-level tactical knowledge through a pre-built tactics library
- Translate adult tactical concepts into child-comprehensible explanations with age-appropriate visual themes (Superhero mode for 5-7, Professional mode for 9-11)
- Deliver zero-friction tactical explanation tool accessible in 3 taps with no login required
- Build coach confidence and reduce pre-game anxiety through ready-made, engaging tactical content
- Increase kid engagement and tactical understanding through animated, fun visual presentations
- Achieve 500+ active volunteer coaches and 40%+ weekly retention within 6 months of launch
- Establish open-source community with 10+ contributors and 100+ GitHub stars within first year

### MVP Timeline

**Target Duration:** 3-4 months for production-ready MVP

**Epic Breakdown:**
- **Epic 1 (Foundation & Visual Tactics Library):** 4-5 weeks
  - Project setup, CI/CD, 3-4 core tactics with static visualization
  - Deliverable: Browsable tactics library on mobile

- **Epic 2 (Animations, Multi-Format, & Dual-Theme System):** 6-8 weeks
  - Animation engine, full 8-12 tactics library, format adaptation, dual themes
  - Deliverable: Complete animated, themed, multi-format tactics experience

- **Epic 3 (Customization, PWA, & Launch Readiness):** 3-4 weeks
  - Player customization, offline PWA, performance optimization, documentation, beta testing
  - Deliverable: Production-ready MVP with community launch

**Milestones:**
- **Month 1:** Epic 1 complete - static tactics viewable on mobile
- **Month 2-3:** Epic 2 complete - animated dual-theme system operational
- **Month 3-4:** Epic 3 complete - MVP launched to beta testers and community

**Contingency:** Timeline assumes consistent development effort. Open-source volunteer pace may extend to 5-6 months. Phased launch recommended: Beta at Month 3, public launch at Month 4-6.

### Background Context

Grassroots youth soccer relies heavily on volunteer coaches who often lack formal coaching experience or the mental library of age-appropriate explanations that experienced coaches build over years. These volunteers face a translation barrier—they may understand tactics intellectually but don't know HOW to explain pressing, passing patterns, or defensive positioning to 5-11 year-olds in engaging, child-friendly language. This gap leads to coach burnout, player disengagement, and missed tactical development during critical foundational years.

Existing solutions (CoachNow, TacticalPad, TeamSnap) are elite-focused professional drawing tools requiring coaching expertise to use effectively. They assume users already know what to draw and how to explain it—presenting volunteers with a "blank canvas problem" that overwhelms rather than empowers. Simple Tactics fills this systemic gap by functioning as a translation layer and expert knowledge library, providing pre-built tactics with dual visual themes, animations, and relatable metaphors. By optimizing for emotional success metrics (confidence, calm, fun) rather than tactical execution perfection, Simple Tactics democratizes coaching expertise for the underserved grassroots community that market forces have ignored.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-17 | v1.0 | Initial PRD creation based on Project Brief | John (PM) |
| 2025-10-17 | v1.1 | Added Out of Scope section, MVP Timeline, and User Flow Diagrams per checklist recommendations | John (PM) |
| 2025-10-18 | v1.2 | Enhanced Epic 1 Story 1.5: Added Framer Motion installation and animation prototype validation to address early technical risk identification (PO Master Checklist Section 1.4 finding) | Sarah (PO) |
| 2025-10-18 | v1.3 | Fixed UI/UX risks (PO Checklist Section 4): Added theme system foundation to Epic 1 Story 1.1 (AC #8-9) for early architecture validation, and added Story 2.8 for comprehensive error boundaries and loading states | Sarah (PO) |

---

## Requirements

### Functional

- **FR1:** The system shall provide a pre-built library of 8-12 fundamental tactics covering Pressing (2-3 tactics), Passing (2-3 tactics), Defending (2-3 tactics), and Set Pieces (2-3 tactics)
- **FR2:** Each tactic shall automatically adapt to 5-a-side, 7-a-side, and 9-a-side formats with appropriate player positioning
- **FR3:** The system shall support dual visual themes: Superhero Mode (ages 5-7) and Professional Mode (ages 9-11), switchable by the coach
- **FR4:** Each tactic shall include animated player movements showing tactical flow visually on an interactive field canvas
- **FR5:** Each tactic shall include dual-language explanations: simple kid-speak and professional tactical language
- **FR6:** Each tactic shall include relatable metaphors and character-based player identities (e.g., "Brick Wall" defender, "Rocket Ball" scorer)
- **FR7:** The system shall enable coaches to select and view a tactic within 3 taps: Open → Select tactic → Customize/Show
- **FR8:** The system shall allow coaches to assign player names to positions for personalization
- **FR9:** The system shall allow coaches to adjust player count within a format (e.g., 5v5 → 4v4 for small-sided practice)
- **FR10:** The system shall display tactics in a visual grid with preview thumbnails (no blank canvas on startup)
- **FR11:** The system shall persist user preferences (theme choice, player names) using browser localStorage
- **FR12:** The system shall function without requiring user login or account creation

### Non-Functional

- **NFR1:** Initial page load shall complete in <3 seconds on a 4G mobile connection
- **NFR2:** Time to Interactive (TTI) shall be <5 seconds on mid-range mobile devices
- **NFR3:** Tactical animations shall maintain 30+ FPS on 3+ year old smartphones (iPhone 8, Samsung Galaxy A-series equivalent)
- **NFR4:** The application shall be mobile-first responsive, optimized for smartphones and tablets with touch-friendly controls
- **NFR5:** The application shall function as a Progressive Web App (PWA) with full offline capability after initial load
- **NFR6:** Initial bundle size shall be <2MB; total assets including animations shall be <5MB
- **NFR7:** The application shall support iOS 14+ (Safari) and Android 10+ (Chrome, Samsung Internet) browsers
- **NFR8:** The application shall support modern desktop browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **NFR9:** The application shall use privacy-first analytics (no personal data collection, GDPR/CCPA compliant)
- **NFR10:** The application shall be open-source with permissive licensing (MIT or Apache 2.0) enabling community contributions
- **NFR11:** The application shall implement Content Security Policy (CSP) headers to prevent XSS attacks
- **NFR12:** The application shall cache all tactical content, animations, and UI assets via Service Worker for offline-first operation

### Out of Scope (Deferred to Post-MVP)

The following features are explicitly excluded from the MVP to maintain focus on core value proposition and achieve the 3-4 month timeline:

**Phase 2 Features (Post-MVP):**
- Training-to-match connection system (linking drills to game-day tactics)
- Pre-game vs in-game separate modes
- Achievements and rewards framework for players
- Coach-driven player recognition system

**Phase 3+ Features (Future Roadmap):**
- Interactive quizzes or comprehension checks
- Multiple tactical camera angles / 3D perspectives
- Parent/kid home-use mode
- Custom tactic creation / drawing tools (contradicts "pre-built" philosophy for MVP)
- AI-powered tactic generation
- Kids-pick-character-first reversed flow

**Not in Scope:**
- Video recording or playback of real games
- Multi-language support beyond English (deferred to internationalization phase)
- User accounts, cloud sync, cross-device history (maintaining zero-friction for MVP)
- Advanced analytics, heat maps, or player tracking (wrong success metrics for ages 5-11)
- Integration with league management systems (TeamSnap, LeagueApps)
- Native iOS/Android apps (PWA only for MVP)
- Social features (sharing tactics, coach community)

**Rationale:** These features would extend timeline beyond 3-4 months and dilute focus on validating core "translation layer" value proposition. All defer to post-MVP based on user feedback and adoption metrics.

---

## User Interface Design Goals

### Overall UX Vision

Simple Tactics delivers a **delightful, confidence-building experience** that transforms tactical explanation from an anxiety-inducing challenge into an opportunity for connection and fun. The interface prioritizes **instant comprehension over customization**, presenting coaches with beautiful, ready-to-use tactical content within seconds of opening the app. The design balances **playful engagement for young children** with **professional credibility for coaches**, creating an experience that feels both fun and authoritative. Every interaction is optimized for the **sideline environment**: bright, high-contrast visuals for outdoor readability, large touch targets for distracted coaches, and a flow so simple it works even with kids crowding around the screen.

### Key Interaction Paradigms

- **Visual-First Navigation:** Tactics presented as animated thumbnail previews in a scrollable grid—coaches recognize tactics visually rather than reading text menus
- **Tap-to-Animate:** Single tap on a tactic card triggers full-screen animation with controls (play/pause/restart) accessible via large, obvious buttons
- **Theme Toggle:** Prominent visual switcher (toggle or slider) between Superhero and Professional modes, with instant visual transformation of the entire interface
- **Drag-and-Drop Customization:** (Optional for MVP) Simple drag-to-assign player names to positions on the field
- **Swipe Gestures:** Swipe left/right to navigate between tactics; swipe up for format selection (5v5, 7v7, 9v9)
- **Always-Visible Defaults:** No blank states—every screen shows example content or helpful defaults reducing cognitive load

### Core Screens and Views

From a product perspective, the most critical screens necessary to deliver the PRD values and goals:

1. **Tactics Library Grid (Home)** - Visual grid of all available tactics with animated thumbnails, theme toggle, and format selector
2. **Tactic Detail View** - Full-screen animated field showing selected tactic with play controls, explanation text, and customization options
3. **Format Selector** - Simple picker for 5-a-side, 7-a-side, or 9-a-side (could be inline on home screen)
4. **Player Customization Panel** - Overlay or slide-in panel for assigning player names to positions
5. **Theme Preview/Switcher** - Visual comparison or instant switcher between Superhero and Professional modes (could be integrated into home screen header)

### User Flow Diagram

**Primary Flow: 3-Tap Tactics Viewing**

```
┌─────────────────────────────────────────────────────────────┐
│  APP OPEN                                                   │
│  └─> Tactics Library Grid (Home Screen)                    │
│      • Visual grid of 8-12 tactic cards                    │
│      • Theme toggle (Superhero/Professional) in header     │
│      • Format selector (5v5/7v7/9v9) visible               │
│      • No blank canvas - all tactics shown as thumbnails   │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ TAP 1: Select Tactic Card
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  TACTIC DETAIL VIEW                                         │
│  └─> Full-screen animated field                            │
│      • Soccer field canvas with player positions           │
│      • Tactic title & description (theme-appropriate)      │
│      • Animation controls: [Play] [Pause] [Restart]        │
│      • Back button to grid                                 │
│      • Optional: Customize button                          │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ TAP 2: Play Animation
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  ANIMATED TACTIC PLAYBACK                                   │
│  └─> Players move showing tactical pattern                 │
│      • 5-8 second animation sequence                       │
│      • Controls remain accessible                          │
│      • Auto-loop or restart on completion                  │
└─────────────────────────────────────────────────────────────┘

                    │ TAP 3 (Optional): Customize
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  PLAYER CUSTOMIZATION (Optional)                            │
│  └─> Tap player positions to assign names                  │
│      • Text input appears on position tap                  │
│      • Names saved to localStorage                         │
│      • Clear/Reset button available                        │
│      • Return to animated view with custom names           │
└─────────────────────────────────────────────────────────────┘
```

**Secondary Flow: Theme Switching**

```
ANY SCREEN
    │
    │ Toggle Theme Switcher (Header)
    ↓
INSTANT VISUAL UPDATE
    • Colors change (bright → realistic or vice versa)
    • Player icons update (characters → humans or vice versa)
    • Typography transforms (rounded → clean or vice versa)
    • Preference saved to localStorage
```

**Secondary Flow: Format Selection**

```
HOME SCREEN or DETAIL VIEW
    │
    │ Select Format (5v5, 7v7, 9v9)
    ↓
FIELD & PLAYERS UPDATE
    • Player count adjusts to format
    • Field positions recalculated
    • Animations adapt to new format
    • Preference saved to localStorage
```

### Accessibility

**Target Level: WCAG AA**

- High-contrast color schemes for outdoor visibility (especially in Professional mode)
- Touch targets minimum 44x44px for thumb-friendly interaction
- Text legible at small sizes on mobile (minimum 16px base font)
- Animation controls (play/pause) accessible for users sensitive to motion
- Semantic HTML and ARIA labels for screen reader compatibility (future enhancement)

### Branding

**Visual Identity:**
- **Superhero Mode:** Bright, saturated colors (primary: vibrant blue/red/yellow), comic book-style visual effects, playful typography (rounded sans-serif), character-based iconography
- **Professional Mode:** TV broadcast aesthetics—clean, modern interface with tactical camera angles, realistic field textures (green grass), sports network color palette (deep greens, whites, accent colors for team differentiation), professional typography (sans-serif, medium weight)

**Design Philosophy:**
- **Dual Personality:** The brand must feel equally comfortable as a "game" for 5-7 year-olds and a "serious coaching tool" for 9-11 year-olds
- **Trust + Fun:** Visual quality signals expertise and professionalism to coaches while maintaining approachability and delight
- **Open-Source Friendly:** Clean, modern design that feels polished but not corporate—community-driven, grassroots aesthetic

### Target Device and Platforms

**Primary: Web Responsive (Mobile-First)**

- **Mobile:** iOS Safari (iPhone/iPad), Android Chrome/Samsung Internet—optimized for smartphones (375px-430px width) and tablets (768px-1024px)
- **Desktop:** Secondary support for modern browsers (Chrome, Firefox, Safari, Edge) for pre-game planning use case
- **Progressive Web App:** Installable to home screen, offline-capable, app-like experience without app store barriers

**Device Targets:**
- Mid-range smartphones 3+ years old (iPhone 8/XR, Samsung Galaxy A-series)
- Optimized for portrait orientation (primary) with landscape support (secondary)
- Touch-first interaction model; mouse/keyboard functional but not prioritized

---

## Technical Assumptions

### Repository Structure

**Monorepo**

The project shall use a single repository containing all frontend code, tactical content (JSON), assets, documentation, and configuration.

**Rationale:** For an MVP with no backend services and a single web application, a monorepo provides simplicity and ease of contribution for open-source developers. All code, content, and documentation live in one place, reducing onboarding friction. Polyrepo adds unnecessary complexity for a project of this scope.

### Service Architecture

**Single-Page Application (SPA) with Client-Side Rendering and PWA Capabilities**

The application shall be architected as a client-side single-page application with:
- Client-side routing (no server-side rendering for MVP)
- Progressive Web App (PWA) with Service Worker for offline-first operation
- Static JSON-based tactics library (no backend database for MVP)
- Static site hosting (Vercel, Netlify, or Cloudflare Pages)
- Optional serverless functions for analytics (deferred to implementation)

**Rationale:** This architecture maximizes simplicity, minimizes infrastructure costs (free hosting tiers), and enables offline functionality critical for sideline use. SPA architecture with client-side routing provides app-like experience without backend complexity. Service Workers enable the "offline-first" requirement after initial load.

### Testing Requirements

**Unit Testing + Integration Testing with Manual E2E Validation**

The project shall implement:
- **Unit tests** for utility functions, tactical data parsing, and component logic (Jest or Vitest)
- **Integration tests** for critical user flows: tactic selection, theme switching, format changes, animation playback (React Testing Library or similar)
- **Manual end-to-end testing** on physical devices (iPhone 8+, Samsung Galaxy A-series) for performance validation and animation quality
- **Performance testing** using Lighthouse CI for automated performance budgets (load time, TTI, bundle size)
- **No automated E2E framework initially** (Playwright/Cypress deferred to post-MVP to reduce setup complexity)

**Rationale:** Unit and integration tests catch regressions without excessive setup time. Manual E2E testing on real devices is critical given the performance constraints (30 FPS animations, mid-range mobile targets). Automated E2E adds significant maintenance overhead for a small open-source project—better to invest in solid unit/integration coverage and manual device testing initially.

### Additional Technical Assumptions and Requests

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
- **Domain:** simple-tactics.org or simple-tactics.app (~$15-30/year budget)
- **CI/CD:** GitHub Actions for automated testing, build, and deployment on merge to main
- **Rationale:** These platforms provide professional infrastructure at zero cost for open-source projects, with excellent developer experience

**Analytics:**
- **Privacy-First Analytics:** Plausible Analytics (community edition self-hosted) or Umami (self-hosted)
- **No Google Analytics**—GDPR/CCPA compliance without cookie consent banners
- **Events to Track:** Tactic views, theme switches, format selections, session duration, device types
- **Rationale:** Privacy-first aligns with grassroots/community values; no personal data collection per NFR9

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

## Epic List

**Epic 1: Foundation & Visual Tactics Library**
Establish project infrastructure (React, TypeScript, CI/CD) and deliver a browsable library of 3-4 core tactics with static field visualization, enabling coaches to view tactical concepts on mobile devices.

**Epic 2: Animations, Multi-Format, & Dual-Theme System**
Complete the full 8-12 tactics library with animated player movements, multi-format adaptation (5v5, 7v7, 9v9), and dual visual themes (Superhero/Professional modes), delivering the core value proposition of engaging, age-appropriate tactical explanations.

**Epic 3: Customization, PWA, & Launch Readiness**
Enable player name customization, implement offline-first PWA capability, optimize performance for mobile devices, integrate analytics, and complete documentation, delivering a production-ready MVP ready for community launch.

---

## Epic 1: Foundation & Visual Tactics Library

**Epic Goal:** Establish a production-ready project foundation with React, TypeScript, and CI/CD pipeline while delivering immediate user value through a mobile-responsive tactics browser displaying 3-4 core tactical concepts on a visual field canvas. This epic enables coaches to discover, browse, and view static tactical diagrams on their mobile devices, validating the core navigation and visualization approach before adding animations and themes.

---

### Story 1.1: Initialize Project with React, TypeScript, and Tailwind CSS

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

### Story 1.2: Set Up CI/CD Pipeline with GitHub Actions and Vercel Deployment

As a developer,
I want automated testing and deployment on every commit,
so that code quality is maintained and changes are immediately available for testing.

**Acceptance Criteria:**

1. GitHub Actions workflow created (`.github/workflows/ci.yml`) that runs on push to `main` and pull requests
2. CI workflow executes linting (`npm run lint`) and build (`npm run build`) steps
3. CI workflow fails if lint errors or build errors are detected
4. Vercel project connected to GitHub repository with automatic deployments
5. Successful builds on `main` branch automatically deploy to production URL
6. Pull requests generate preview deployment URLs visible in GitHub PR comments
7. Vercel environment configured with appropriate build settings (Node version, build command, output directory)

---

### Story 1.3: Create Responsive Tactics Grid Layout with Mobile Navigation

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

### Story 1.4: Design Tactics Data Schema and Load First 3 Tactics from JSON

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

### Story 1.5: Implement Canvas-Based Field Rendering with Player Positions and Animation Prototype

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

### Story 1.6: Add Unit Tests for Tactics Data Loading and Validation

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

### Story 1.7: Optimize Mobile Performance and Lighthouse Score

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

## Epic 2: Animations, Multi-Format, & Dual-Theme System

**Epic Goal:** Transform the static tactics library into an engaging, animated experience by implementing player movement animations, expanding to the full 8-12 tactics across all three formats (5v5, 7v7, 9v9), and creating dual visual themes (Superhero mode for ages 5-7, Professional mode for ages 9-11). This epic delivers the core "translation layer" value proposition, enabling coaches to present age-appropriate, visually compelling tactical explanations that capture children's attention and make complex concepts comprehensible.

---

### Story 2.1: Implement Animation Engine with Framer Motion for Player Movements

As a volunteer coach,
I want to see players move on the field showing the tactical pattern,
so that my team can visualize how the tactic unfolds in motion rather than static positions.

**Acceptance Criteria:**

1. Framer Motion library integrated into project
2. Animation system designed to accept keyframe data (sequence of player positions over time) from JSON
3. Player positions animate smoothly from start to end positions following keyframe sequence
4. Animation includes play, pause, and restart controls with large touch-friendly buttons
5. Animations maintain ≥30 FPS on iPhone 8 / Samsung Galaxy A-series equivalent devices (tested on real devices or emulator)
6. Animation timing configurable (default 5-8 seconds per tactic sequence)
7. Animation engine abstracted to support future enhancements (speed control, looping)
8. At least one existing tactic (from Epic 1) updated with animation keyframes and tested

---

### Story 2.2: Expand Tactics Library to 8-12 Complete Tactics with Animations

As a volunteer coach,
I want a complete library covering pressing, passing, defending, and set pieces,
so that I have expert tactical content for the most common game situations I encounter.

**Acceptance Criteria:**

1. Tactics library expanded to 8-12 tactics total across four categories: Pressing (2-3 tactics), Passing (2-3 tactics), Defending (2-3 tactics), Set Pieces (2-3 tactics)
2. Each tactic includes animation keyframes (sequence of player movements over time)
3. Each tactic includes dual descriptions: kid-friendly explanation and professional tactical language
4. Each tactic includes relatable metaphors or character identities (e.g., "Brick Wall" defender, "Rocket Ball" scorer)
5. All tactics render correctly with animations in the tactic detail view
6. Tactics grid displays all 8-12 tactics with category filtering (optional stretch goal: filter by category)
7. JSON schema documentation updated with animation keyframe format examples
8. All new tactics reviewed for tactical accuracy (validate with experienced coach if possible)

---

### Story 2.3: Implement Multi-Format Adaptation (5v5, 7v7, 9v9)

As a volunteer coach,
I want to select my team format (5v5, 7v7, or 9v9) and see tactics adapted appropriately,
so that the tactical concepts match the actual game format I'm coaching.

**Acceptance Criteria:**

1. Format selector UI added to home screen or tactic detail view (dropdown or segmented control with 5v5, 7v7, 9v9 options)
2. Each tactic JSON updated to include position data for all three formats (5v5, 7v7, 9v9)
3. Field rendering adapts player count and positions based on selected format
4. Animations adjust to show appropriate player movements for each format
5. Format selection persists in localStorage so coaches don't re-select every session
6. Default format is 7v7 (most common for ages 5-11)
7. All 8-12 tactics render correctly in all three formats
8. Format switcher is visually prominent and easy to discover for first-time users

---

### Story 2.4: Design and Implement Superhero Theme Visual Assets

As a volunteer coach of 5-7 year-olds,
I want a fun, playful visual theme with bright colors and character-based players,
so that my young kids stay engaged and excited when I explain tactics.

**Acceptance Criteria:**

1. Superhero theme color palette defined (vibrant blue, red, yellow, bright greens)
2. Player icons designed with character-based identities (e.g., "Brick Wall," "Rocket Ball," "Flash") with comic book style
3. Field rendering uses bright, saturated grass color and bold line work
4. Typography uses rounded, friendly sans-serif font
5. Animation effects include playful transitions (e.g., motion trails, sparkles on key movements)
6. Theme assets optimized for mobile performance (<1MB total for theme-specific assets)
7. Superhero theme renders correctly on both mobile and desktop viewports
8. Theme applied consistently across tactics grid, detail view, and animations

---

### Story 2.5: Design and Implement Professional Theme Visual Assets

As a volunteer coach of 9-11 year-olds,
I want a professional, broadcast-style visual theme that feels serious,
so that my older kids feel respected and engaged with tactics that look like what they see on TV.

**Acceptance Criteria:**

1. Professional theme color palette defined (deep green grass, white lines, muted accent colors for team differentiation)
2. Player icons designed with realistic, simplified human figures (not cartoon characters)
3. Field rendering uses realistic grass texture and TV broadcast camera angle aesthetics
4. Typography uses clean, modern sans-serif font (medium weight, professional feel)
5. Animation effects are smooth and realistic (no playful sparkles—focus on tactical clarity)
6. Theme assets optimized for mobile performance (<1MB total for theme-specific assets)
7. Professional theme renders correctly on both mobile and desktop viewports
8. Theme applied consistently across tactics grid, detail view, and animations

---

### Story 2.6: Build Theme Switcher UI and Context Provider

As a volunteer coach,
I want to easily toggle between Superhero and Professional modes,
so that I can match the visual style to the age group I'm coaching.

**Acceptance Criteria:**

1. Theme switcher UI component created (toggle switch or segmented control) with clear labels ("Superhero" / "Professional")
2. Theme switcher positioned prominently in app header or home screen
3. React Context Provider created to manage global theme state (Superhero vs Professional)
4. Theme selection persists in localStorage across sessions
5. Switching theme instantly updates all visual assets (colors, player icons, field rendering, typography)
6. Theme switcher is accessible on both tactics grid and tactic detail views
7. Default theme is Superhero mode for first-time users
8. Smooth transition animation when switching themes (fade or crossfade effect)

---

### Story 2.7: Add Integration Tests for Animations and Theme Switching

As a developer,
I want automated tests for animation playback and theme switching,
so that I catch regressions in core user interactions.

**Acceptance Criteria:**

1. Integration tests written using React Testing Library covering: tactic selection navigates to detail view, animation controls (play/pause/restart) trigger expected state changes, theme switching updates rendered components
2. Tests verify that animation keyframes load correctly from JSON data
3. Tests verify that format switching (5v5, 7v7, 9v9) renders correct player count
4. Tests verify that theme context provider correctly propagates theme state to child components
5. Test coverage for animation and theme features reaches at least 70%
6. All integration tests pass in CI pipeline
7. Tests run in reasonable time (<30 seconds for full suite)

---

### Story 2.8: Implement Error Boundaries and Loading States

As a volunteer coach,
I want clear feedback when something goes wrong or is loading,
so that I understand what's happening and the app feels responsive and reliable.

**Acceptance Criteria:**

1. React Error Boundary component created wrapping the application to catch rendering errors gracefully
2. Error boundary displays user-friendly error message with "Try Again" action (not technical stack traces)
3. Loading skeleton components created for tactics grid and tactic detail view (placeholder cards/field while content loads)
4. Tactics data loader includes error handling for failed JSON fetch with user-friendly error message
5. Invalid tactic data (malformed JSON, missing required fields) displays helpful error instead of crashing
6. Animation errors (invalid keyframes, performance failures) degrade gracefully without blocking the app
7. Network error state displayed when offline and Service Worker hasn't cached tactics yet (with helpful message to try again when online)
8. All error states tested manually and include recovery actions (retry button, back to home, etc.)

---

## Epic 3: Customization, PWA, & Launch Readiness

**Epic Goal:** Deliver a production-ready MVP by adding player name customization for personalization, implementing offline-first PWA capability with Service Workers for reliable sideline access, optimizing performance to meet strict mobile targets (30 FPS animations, <3s load time), integrating privacy-first analytics to measure success metrics, and completing comprehensive documentation to enable open-source community contributions. This epic ensures the app is polished, performant, and ready for public launch.

---

### Story 3.1: Implement Player Name Customization with localStorage Persistence

As a volunteer coach,
I want to assign my players' names to positions on the field,
so that kids see their own names in the tactics and feel personally connected to their roles.

**Acceptance Criteria:**

1. Customization UI added to tactic detail view allowing coaches to tap/click player positions to assign names
2. Text input or name picker interface appears when player position is tapped (mobile-friendly keyboard input)
3. Player names displayed as labels next to or on player icons in the field rendering
4. Player name assignments persist in localStorage keyed by tactic ID and format
5. Clear/Reset button allows coaches to remove all custom names and return to defaults
6. Default player labels (e.g., "Player 1," "Player 2" or position names like "Striker," "Defender") shown if no custom names assigned
7. Customization works correctly across all three formats (5v5, 7v7, 9v9)
8. Character identities/metaphors (e.g., "Brick Wall") remain visible in Superhero mode alongside or instead of custom names (design decision)

---

### Story 3.2: Configure Service Worker for Offline-First PWA Capability

As a volunteer coach,
I want the app to work without internet after I've loaded it once,
so that I can access tactics on the sideline even with poor or no cell signal.

**Acceptance Criteria:**

1. Workbox installed and configured for service worker generation
2. PWA manifest file created (`manifest.json`) with app name, icons, theme colors, and display mode
3. Service worker implements cache-first strategy for tactics JSON, animations, images, and static assets
4. All 8-12 tactics, both themes, and all formats fully functional offline after initial app load
5. Service worker precaches critical assets during installation
6. App displays offline indicator or toast message when network is unavailable (user awareness)
7. App installable to mobile home screen (meets PWA installability criteria)
8. Service worker tested by throttling network in DevTools and verifying full functionality offline

---

### Story 3.3: Optimize Animation Performance to 30+ FPS on Mid-Range Devices

As a volunteer coach using an older phone,
I want animations to run smoothly without lag or stuttering,
so that the tactics look professional and kids stay engaged.

**Acceptance Criteria:**

1. Animation performance profiled on iPhone 8 and Samsung Galaxy A-series devices (or equivalents in emulator)
2. Frame rate monitoring confirms animations maintain ≥30 FPS consistently during playback
3. Animation rendering optimized (use requestAnimationFrame, GPU acceleration, avoid layout thrashing)
4. Canvas rendering optimized (minimize redraws, use layers for animations)
5. Performance budgets enforced via Lighthouse CI: Performance score ≥85 on mobile
6. Animations tested with multiple tactics running simultaneously (e.g., navigating between tactics quickly)
7. No janky or dropped frames during theme switching or format changes
8. Fallback to simplified animations if performance detection identifies low-end device (stretch goal)

---

### Story 3.4: Optimize Bundle Size and Load Time to Meet Performance Targets

As a volunteer coach on a 4G connection,
I want the app to load in under 3 seconds,
so that I can quickly access tactics during time-sensitive game situations.

**Acceptance Criteria:**

1. Production bundle size reduced to <2MB initial bundle (code splitting, tree shaking, minification)
2. Total assets including all tactics, animations, and images <5MB
3. Lazy loading implemented for non-critical assets (e.g., tactics loaded on-demand, theme assets loaded only when selected)
4. Image assets compressed and optimized (WebP format where supported, appropriate dimensions)
5. Lighthouse CI enforces: Initial load <3s on simulated 4G, Time to Interactive <5s
6. Code splitting configured to separate vendor bundles from application code
7. Critical CSS inlined; non-critical CSS deferred
8. Bundle analysis report generated (webpack-bundle-analyzer or similar) showing largest modules

---

### Story 3.5: Integrate Privacy-First Analytics (Plausible or Umami)

As a product manager,
I want to measure key user behaviors without compromising privacy,
so that I can validate product-market fit and iterate based on usage data.

**Acceptance Criteria:**

1. Plausible Analytics (self-hosted community edition) or Umami installed and configured
2. Analytics events tracked: tactic views (by tactic ID and category), theme switches (Superhero ↔ Professional), format selections (5v5, 7v7, 9v9), session duration, device types (mobile vs desktop)
3. Analytics dashboard accessible to project maintainers
4. No personal data, cookies, or tracking across sites (GDPR/CCPA compliant)
5. Analytics script loads asynchronously without blocking page rendering
6. Analytics events queued and sent in background (non-blocking user experience)
7. Privacy policy or data statement added to footer explaining analytics usage
8. Analytics tested in production environment and verified that events are being recorded

---

### Story 3.6: Create Comprehensive Documentation and Contribution Guidelines

As an open-source contributor,
I want clear documentation explaining how to run the project, add tactics, and contribute code,
so that I can easily get started without friction.

**Acceptance Criteria:**

1. `README.md` created with: project description, features list, demo link/screenshots, quick start instructions, tech stack overview
2. `CONTRIBUTING.md` created with: how to set up local development environment, how to add a new tactic (JSON schema guidance), code style guidelines, PR submission process
3. `/docs/tactics/SCHEMA.md` documented with: detailed JSON schema for tactics, example tactic JSON with annotations, guidelines for writing kid-friendly descriptions
4. GitHub issue templates created for: bug reports, feature requests, new tactic contributions
5. GitHub PR template created with checklist: linting passed, tests pass, screenshots (if UI change)
6. `LICENSE` file added (MIT License recommended)
7. Code of Conduct added (`CODE_OF_CONDUCT.md`) to foster welcoming community
8. All documentation reviewed for clarity and completeness (test by having someone unfamiliar with project follow setup instructions)

---

### Story 3.7: Conduct Final User Testing and Bug Fixes

As a volunteer coach (beta tester),
I want to test the complete app and provide feedback,
so that the development team can fix bugs and polish the experience before public launch.

**Acceptance Criteria:**

1. Beta testing conducted with 5-10 volunteer coaches from local soccer organizations
2. Beta testers provided with test plan covering: first-time app usage (onboarding), tactic browsing and selection, animation playback, theme switching, format selection, player name customization, offline usage
3. Feedback collected via survey or interviews covering: ease of use, kid engagement (observed), feature requests, bugs encountered
4. Critical bugs (blocking functionality) identified and fixed
5. Usability improvements implemented based on feedback (e.g., unclear UI, confusing navigation)
6. Performance validated on real devices (beta testers' phones)
7. At least 80% of beta testers successfully complete core task: "Select and view a tactic within 2 minutes without assistance"
8. Beta feedback documented in GitHub issues for future iteration

---

## Checklist Results Report

### Executive Summary

**Overall PRD Completeness:** 87% (PASS)

**MVP Scope Appropriateness:** Just Right - The scope is well-balanced for a 3-4 month MVP, focusing on core value proposition (translation layer for coaches) while deferring nice-to-haves appropriately.

**Readiness for Architecture Phase:** **READY** - The PRD provides sufficient clarity, technical constraints, and epic structure for the architect to begin detailed technical design.

**Most Critical Gaps:**
1. Missing explicit "Out of Scope" section in the PRD (exists in brief but should be in PRD)
2. No visual diagrams for user flows (would improve clarity)
3. Stakeholder/approval process undefined (may not be critical for solo open-source project)

---

### Category Analysis Table

| Category                         | Status  | Critical Issues                                    |
| -------------------------------- | ------- | -------------------------------------------------- |
| 1. Problem Definition & Context  | PASS    | None - strong problem articulation                 |
| 2. MVP Scope Definition          | PARTIAL | Missing explicit out-of-scope section              |
| 3. User Experience Requirements  | PASS    | Could benefit from user flow diagrams              |
| 4. Functional Requirements       | PASS    | None - clear, testable, well-structured            |
| 5. Non-Functional Requirements   | PASS    | None - comprehensive performance/security coverage |
| 6. Epic & Story Structure        | PASS    | Excellent - logical sequencing, appropriate sizing |
| 7. Technical Guidance            | PASS    | Strong technical direction with rationales         |
| 8. Cross-Functional Requirements | PASS    | Data schema and integrations well-defined          |
| 9. Clarity & Communication       | PARTIAL | Missing stakeholder section, no flow diagrams      |

**Legend:** PASS (≥85% complete), PARTIAL (60-84%), FAIL (<60%)

---

### Top Issues by Priority

#### BLOCKERS (Must fix before architect can proceed)
*None identified* - The PRD is ready for architectural design.

#### HIGH (Should fix for quality)
1. **Add "Out of Scope" section to PRD** - Currently only exists in brief. Helps architect understand boundaries clearly.
   - *Suggested fix:* Add subsection after Requirements listing deferred features (custom tactic creation, video recording, multi-language, achievements system)

#### MEDIUM (Would improve clarity)
2. **Add visual user flow diagram** - A simple diagram showing the 3-tap flow would help visualize the UX
   - *Suggested fix:* Create simple flow: Home Grid → Tactic Selection → Customization (optional) → Animation View
3. **Clarify timeline in PRD body** - Brief mentions 3-4 months, but PRD doesn't explicitly state timeline
   - *Suggested fix:* Add timeline subsection under Goals or create explicit MVP timeline section

#### LOW (Nice to have)
4. **Stakeholder/approval section** - Not critical for solo open-source but good practice
5. **Explicit epic duration estimates** - Could help with planning (e.g., "Epic 1: ~4 weeks")

---

### MVP Scope Assessment

**Features that might be cut for true MVP:**
- Player name customization (Story 3.1) - Nice personalization but not core to translation value prop
- Multi-format adaptation (Story 2.3) - Could start with just 7v7 (most common), add 5v5/9v9 post-MVP
- Superhero theme (Stories 2.4) - Could launch with Professional theme only, add Superhero in v2

**However, these features are integral to the core value proposition (age-appropriate explanations, format flexibility), so I recommend keeping them unless timeline is severely constrained.**

**Missing features that might be essential:**
- None identified - The MVP covers all critical paths from tactics browsing to viewing animations

**Complexity concerns:**
- Animation performance (30 FPS on iPhone 8) is ambitious - Story 3.3 acknowledges this with fallback options
- iOS PWA reliability - Known pain point, mitigated by extensive testing (Story 3.2 AC #8)

**Timeline realism:**
- 3-4 months for 18 stories is achievable (~1 story per week)
- Epic 2 (animations + themes + full library) is the heaviest - may need 6-8 weeks
- Overall timeline seems realistic for solo developer or small team

---

### Technical Readiness

**Clarity of technical constraints:** Excellent
- React + TypeScript + Tailwind + Framer Motion stack clearly defined
- Performance budgets explicit (<2MB bundle, 30 FPS, <3s load)
- Browser support matrix clear (iOS 14+, Android 10+)

**Identified technical risks:**
1. **Animation performance on mid-range devices** - Acknowledged in NFR3 and Story 3.3, with fallback strategies
2. **iOS Safari PWA limitations** - Flagged in Technical Assumptions, requires extensive testing
3. **Canvas vs SVG rendering decision** - Left appropriately for architect to validate with prototypes

**Areas needing architect investigation:**
- Exact animation implementation (Framer Motion vs GSAP vs pure Canvas)
- Bundle splitting strategy for lazy-loading tactics/themes
- Service Worker caching granularity (which assets cache-first vs network-first)
- Field rendering approach (Canvas API final decision pending performance testing)

---

### Strengths of this PRD

1. **Excellent epic structure** - Logical progression, each epic delivers value, stories appropriately sized
2. **Clear acceptance criteria** - Testable, specific, measurable (6-8 criteria per story)
3. **Strong technical guidance** - Architect has clear constraints and rationales for key decisions
4. **User-centric language** - Stories consistently use "As a volunteer coach..." format
5. **Comprehensive non-functional requirements** - Performance, security, accessibility all addressed
6. **First epic completeness** - Epic 1 includes all setup (project init, CI/CD, testing, performance)

---

### Recommendations

**Immediate Actions (before handoff to architect):**
1. Add "Out of Scope" section to PRD listing deferred features explicitly
2. Consider adding simple user flow diagram (optional but helpful)

**For Architect Phase:**
3. Architect should prototype Canvas animation performance early (Epic 1, Story 1.5 or Epic 2, Story 2.1)
4. Architect should validate Framer Motion vs Canvas animation approaches with real device testing
5. Architect should design tactics JSON schema with animation keyframe structure

**For Development Phase:**
6. Prioritize animation performance testing on real devices throughout Epic 2
7. Beta testing (Story 3.7) should explicitly test on volunteer coaches' actual phones
8. Consider creating visual asset design earlier to unblock theming stories

---

### Final Decision

**✅ READY FOR ARCHITECT**

The PRD and epics are comprehensive, properly structured, and provide sufficient clarity for architectural design to begin. The identified gaps (out-of-scope section, flow diagrams) are quality improvements rather than blockers.

The architect has clear technical constraints, well-defined functional requirements, and a logical epic structure to work from. The MVP scope is appropriate and achievable within the 3-4 month timeline.

---

## Next Steps

### UX Expert Prompt

```
I need you to create the visual design and user experience for Simple Tactics, an open-source interactive tactics board for youth soccer coaches. Please review the attached PRD (docs/prd.md) and create:

1. **Design System**
   - Dual visual themes (Superhero mode for ages 5-7, Professional mode for ages 9-11)
   - Color palettes for both themes
   - Typography system
   - Component library (buttons, cards, controls)

2. **High-Fidelity Mockups**
   - Tactics Library Grid (Home)
   - Tactic Detail View with animated field
   - Theme switcher UI
   - Format selector UI
   - Player customization panel

3. **User Flow Diagrams**
   - 3-tap core flow: Browse → Select → View animation
   - Customization flow: Assign player names
   - Theme switching interaction

4. **Visual Assets**
   - Player icons for both themes (Superhero: character-based, Professional: realistic)
   - Field rendering specifications (colors, lines, proportions)
   - Animation effect guidelines (motion trails for Superhero, smooth transitions for Professional)

Key Constraints:
- Mobile-first (375px-430px primary viewport)
- WCAG AA accessibility (high contrast, 44x44px touch targets)
- Outdoor readability (bright, high-contrast visuals)
- Performance-optimized assets (<1MB per theme)

Focus on the dual-theme system as it's the core visual differentiator. Deliverables should be ready for handoff to developers (Figma files, exported assets, design tokens).
```

### Architect Prompt

```
I need you to design the technical architecture for Simple Tactics, an open-source PWA for youth soccer coaches. Please review the attached PRD (docs/prd.md) and create:

1. **System Architecture Document**
   - Component structure (React app organization)
   - Data flow architecture (tactics loading, state management)
   - Animation engine design (Framer Motion vs Canvas API decision)
   - PWA offline strategy (Service Worker caching patterns)

2. **Data Schema Design**
   - Tactics JSON schema with animation keyframes
   - TypeScript interfaces for Tactic, Position, Metadata, Theme
   - localStorage structure for user preferences
   - Example tactic JSON with all required fields

3. **Technical Stack Validation**
   - Confirm React + TypeScript + Tailwind + Framer Motion
   - Prototype Canvas animation performance on target devices (iPhone 8, Galaxy A-series)
   - Validate bundle size feasibility (<2MB initial, <5MB total)
   - Test PWA offline capability on iOS Safari

4. **Performance Strategy**
   - Bundle splitting approach (lazy-load tactics/themes)
   - Animation optimization techniques (30+ FPS target)
   - Asset loading strategy (WebP images, code splitting)
   - Lighthouse CI configuration

5. **Deployment Architecture**
   - Vercel/Netlify hosting setup
   - GitHub Actions CI/CD pipeline
   - Environment configuration
   - Analytics integration (Plausible/Umami)

Key Technical Constraints:
- Mobile-first PWA (no native apps)
- Offline-first after initial load
- 30 FPS animations on 3+ year old devices
- <3s load time on 4G
- No backend/database for MVP (static JSON)

Priority: Validate animation performance early (Epic 1, Story 1.5 or Epic 2, Story 2.1) as it's the highest technical risk. Create a working prototype with 1 animated tactic to prove feasibility before Epic 2 begins.

Deliverables: Architecture document, tactics JSON schema, component structure diagram, performance test results, and technical recommendations for Epic 1 implementation.
```
