# Next Steps

## UX Expert Prompt

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

## Architect Prompt

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
