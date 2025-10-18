# AI Frontend Generation Prompt for Simple Tactics

**Version:** 1.0
**Date:** 2025-10-18
**Purpose:** Comprehensive prompt for AI-driven frontend development tools (v0, Lovable, etc.)
**Target Output:** Complete React + TypeScript PWA with dual-theme system

---

## How to Use This Prompt

1. **Copy the entire prompt** (everything below the horizontal line)
2. **Paste into your AI tool:**
   - Vercel v0: Paste into chat interface
   - Lovable.ai: Use as project prompt
   - Cursor/Windsurf: Use as system prompt
3. **Generate in phases:**
   - Phase 1: Core structure and theme system
   - Phase 2: One complete tactic flow
   - Phase 3: Replicate for 8-12 tactics
   - Phase 4: PWA, accessibility, optimization
4. **Always review and test** generated code (especially Canvas animations)

---

# COPY BELOW THIS LINE ⬇️

---

# Simple Tactics - Interactive Youth Soccer Tactics Board

## PROJECT CONTEXT

I need you to build a Progressive Web App called "Simple Tactics" - an interactive tactics board for volunteer youth soccer coaches (ages 5-11). This app translates adult tactical concepts into child-comprehensible explanations through pre-built tactics, dual visual themes, and animated demonstrations.

**Tech Stack:**
- React 18+ with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- HTML5 Canvas for tactical field rendering
- Vite for build tooling
- PWA with Service Workers (offline-first)

**Core Value Proposition:**
Provide instant access to expert tactical knowledge with zero friction (no login, 2-tap access), optimized for mobile-first sideline use with dual themes: Superhero mode (playful, ages 5-7) and Professional mode (broadcast-style, ages 9-11).

---

## VISUAL DESIGN SYSTEM

**Dual-Theme Requirement:**

The app MUST support two completely different visual themes that can be toggled instantly:

### Theme 1: Superhero Mode (Ages 5-7)

- **Colors:** Bright, saturated palette
  - Primary: Purple (#9C27B0), Blue (#2196F3), Orange (#FF9800)
  - Field grass: Bright green (#32CD32)
- **Typography:** Fredoka or Nunito (rounded, friendly sans-serif)
  - Body text: 18px (larger for younger kids)
  - Bold weights, playful feel
- **Visual Style:**
  - Rounded corners (12px border-radius)
  - Bold shadows with purple/blue tints
  - Gradient buttons
  - Comic-style character icons for players
- **Player Icons:** Character-based (⚡ Rocket Racer, 🧱 Brick Wall, 🐝 Busy Bee)
- **Animations:** Motion trails, sparkle effects, bounce easing

### Theme 2: Professional Mode (Ages 9-11)

- **Colors:** Clean, muted palette
  - Primary: Dark Blue (#1976D2), Navy (#0D47A1), Teal (#00897B)
  - Field grass: Realistic green (#228B22)
- **Typography:** Inter or system fonts (clean, modern sans-serif)
  - Body text: 16px
  - Medium weights, professional feel
- **Visual Style:**
  - Sharp corners (6px border-radius)
  - Subtle gray shadows
  - Solid color buttons (no gradients)
  - Realistic numbered jerseys for players
- **Player Icons:** Circular jerseys with numbers
- **Animations:** Smooth, realistic movement only (no effects)

---

## DETAILED STEP-BY-STEP INSTRUCTIONS

### Step 1: Project Setup & Structure

1. Initialize a new React project with TypeScript using Vite
2. Install dependencies: tailwindcss, framer-motion, workbox (for PWA)
3. Create the following folder structure:
   ```
   src/
   ├── components/      # Reusable UI components
   ├── features/        # Feature modules (tactics, themes, animations)
   ├── lib/            # Utilities, hooks
   ├── data/           # Tactics library (JSON)
   ├── assets/         # SVG icons, images
   ├── styles/         # Global styles, theme configs
   └── contexts/       # React contexts (Theme, Format)
   ```
4. Configure Tailwind CSS with custom theme colors for both Superhero and Professional modes
5. Set up PWA manifest and service worker configuration

### Step 2: Create Theme System

1. Create a `ThemeContext` using React Context API that manages:
   - Current theme state (Superhero or Professional)
   - Theme toggle function
   - Persist theme to localStorage
2. Create a `ThemeProvider` component that wraps the entire app
3. Define theme configuration objects in `src/styles/themes.ts`:
   - Colors (primary, secondary, neutral, field colors)
   - Typography settings (font families, sizes, weights)
   - Border radius values
   - Shadow definitions
4. Create a `ThemeToggle` component (88px × 44px) with:
   - Icons: 🦸 (Superhero) and 👔 (Professional)
   - Toggle switch that slides between states
   - 500ms transition animation
   - Save to localStorage on toggle

### Step 3: Build Home Screen (Tactics Library Grid)

1. Create `TacticsGrid` component that displays 8-12 tactic cards in a responsive grid:
   - Mobile (375px): 2 columns
   - Tablet (768px): 3 columns
   - Desktop (1024px+): 4 columns
2. Create `TacticCard` component (165px × 200px):
   - Static thumbnail image (120×120px simplified tactical icon)
   - Tactic title (16px bold)
   - Category badge (top-right): color-coded by type (Pressing=red, Passing=yellow, Defending=green, Set Pieces=purple)
   - Theme-specific styling:
     - Superhero: Colorful 3px gradient border, 12px rounded corners
     - Professional: 1px gray border, 6px sharp corners
   - Hover state: Scale 1.05x, deeper shadow
   - Tap/Active state: Scale 0.98x
3. Create `FormatTabBar` component (full width, 48px height):
   - Three tabs: 5v5, 7v7, 9v9
   - Active tab has underline that slides on change (300ms animation)
   - Default selection: 7v7 with "Default ▾" label
4. Add header with app title "Simple Tactics" and `ThemeToggle`

### Step 4: Create Format Context

1. Create `FormatContext` that manages:
   - Current format state (5v5, 7v7, or 9v9)
   - Format selection function
   - Persist format to localStorage
2. Format changes should update all visible tactics globally

### Step 5: Build Tactic Detail View

1. Create `TacticDetailView` component with three sections:

   **Section A: Animated Field (420px height on mobile)**
   - Use HTML5 Canvas element for rendering
   - Draw soccer field with grass background (theme-dependent color)
   - Draw field markings: center circle, penalty areas, goals (white lines, theme-dependent width)
   - Render player positions as circles or character icons (theme-dependent)
   - Implement animation loop showing tactical movement patterns:
     - Use requestAnimationFrame for smooth 30+ FPS
     - Players move along bezier curves from start to end positions
     - Animation duration: 5-8 seconds, loops continuously
     - Superhero mode: Add motion trail effects
     - Professional mode: Clean movement only

   **Section B: Animation Controls (overlaid on field)**
   - Three circular buttons (56×56px each): Play ▶️, Pause ⏸️, Restart 🔁
   - Semi-transparent background (rgba(0,0,0,0.3))
   - Centered horizontally, positioned at bottom third of field
   - Play/Pause toggle based on animation state
   - Theme-specific styling:
     - Superhero: Gradient backgrounds, glow on hover
     - Professional: Solid dark gray, simple scale on hover

   **Section C: Explanation Card (minimized 40px, expands to 365px)**
   - Default state: Minimized bar at bottom with:
     - Drag handle (three horizontal lines ═══)
     - One-line teaser: "💬 [First sentence of explanation]"
     - "Swipe up for explanation" text
   - Expanded state (on swipe up or tap):
     - Field shrinks to 182px (30% of remaining viewport)
     - Explanation expands to 365px (60% of remaining viewport)
     - Shows full content:
       - "💬 HOW TO EXPLAIN:" heading
       - Explanation text (theme switches language: kid-speak for Superhero, tactical for Professional)
       - "⭐ CHARACTER ROLES:" section with icons and role descriptions
       - "💡 WHEN TO USE:" bulleted situational tips
       - "⇄ Switch to tactical language" link (optional override)
     - "▶️ Show My Team" primary button (minimizes card, plays animation)
     - "Customize Names" secondary button
   - Swipe gesture: Follow finger during drag, snap to minimized or expanded on release
   - 300ms expansion/collapse animation with ease-out easing

2. Back button in header navigates to home grid

### Step 6: Implement Player Customization

1. Create `PlayerCustomization` component (modal or full screen):
   - List view showing all positions for current format (5, 7, or 9 positions)
   - Each position row:
     - Label: "Position X: [Role]" (e.g., "Position 1: Forward")
     - Text input field with placeholder "Player X"
     - Character counter: "(X/15)" showing remaining characters
     - Edit icon ✏️
   - Format change handling:
     - If format changes from 7v7 to 5v5:
       - Show positions 1-5 as active
       - Show positions 6-7 grayed out under "🔒 HIDDEN IN 5v5:" heading
       - Preserve names in localStorage (don't delete)
   - "Clear All Names" button (requires confirmation modal: "Clear all names? This cannot be undone.")
   - "Done" button (closes panel, returns to detail view)
2. Auto-save names to localStorage on blur (no explicit save needed)
3. Character limit: 15 characters max (hard stop)
4. Auto-capitalize first letter
5. Display custom names on field canvas during animation (small labels next to player icons)

### Step 7: Create Tactics Data Schema

1. Create JSON file structure for tactics in `src/data/tactics/`:

   **Example: high-press.json**
   ```json
   {
     "id": "high-press",
     "title": "High Press Attack",
     "category": "pressing",
     "formats": {
       "5v5": {
         "positions": [
           {"x": 50, "y": 20, "role": "forward"},
           {"x": 30, "y": 40, "role": "midfielder"},
           {"x": 70, "y": 40, "role": "midfielder"},
           {"x": 30, "y": 70, "role": "defender"},
           {"x": 70, "y": 70, "role": "defender"}
         ],
         "animationKeyframes": [
           {"time": 0, "player": 0, "x": 50, "y": 20},
           {"time": 2000, "player": 0, "x": 50, "y": 10},
           {"time": 4000, "player": 0, "x": 50, "y": 20}
         ]
       },
       "7v7": { /* ... similar structure ... */ },
       "9v9": { /* ... similar structure ... */ }
     },
     "explanations": {
       "kidSpeak": "The Rocket Racers sprint up super fast to get the ball! The Brick Walls stay back to protect the goal. When they get the ball, everyone chases like Busy Bees!",
       "tactical": "Aggressive high press in the attacking third. Forwards apply immediate pressure on first touch. Defenders maintain compact line. Coordinated press triggers force turnovers."
     },
     "characterRoles": [
       {"icon": "⚡", "name": "Rocket Racers", "position": "Forwards", "description": "Sprint fast and chase the ball!"},
       {"icon": "🧱", "name": "Brick Walls", "position": "Defenders", "description": "Stay strong and protect the goal!"},
       {"icon": "🐝", "name": "Busy Bees", "position": "Midfielders", "description": "Help everyone, run everywhere!"}
     ],
     "whenToUse": [
       "Your team is faster than opponents",
       "Playing on a small field",
       "Want to score quickly and pressure opponent"
     ]
   }
   ```

2. Create a data loader utility to import all tactics
3. Validate JSON schema on load (TypeScript interfaces)

### Step 8: Implement Responsive Design

1. Mobile-first approach: Design for 375px viewport first
2. Use Tailwind responsive classes:
   - `grid-cols-2` (mobile)
   - `md:grid-cols-3` (tablet, 768px+)
   - `lg:grid-cols-4` (desktop, 1024px+)
3. Detail view adaptations:
   - Mobile (375px): Stacked layout (field above explanation)
   - Tablet landscape (768px+): Consider side-by-side layout (field 60%, explanation 40%)
   - Desktop (1024px+): Centered layout with max-width 1200px
4. Touch targets: Minimum 44×44px for all interactive elements
5. Test on viewport widths: 320px (min), 375px, 768px, 1024px, 1440px

### Step 9: Add PWA Offline Support

1. Configure Workbox service worker to cache:
   - All app JavaScript/CSS bundles
   - All tactics JSON files (8-12 files)
   - All static assets (icons, images)
2. Implement cache-first strategy for tactics and assets
3. Create PWA manifest.json:
   - App name: "Simple Tactics"
   - Short name: "Tactics"
   - Icons: 192×192px and 512×512px
   - Display: "standalone"
   - Theme colors based on current theme
4. Add offline indicator in header when network unavailable: "⚡ Offline"
5. On first visit without network, show error: "Please connect to internet for first use. After that, works offline!"

### Step 10: Implement Accessibility

1. Add ARIA labels to all icon-only buttons:
   - Play button: aria-label="Play animation"
   - Pause button: aria-label="Pause animation"
   - Restart button: aria-label="Restart animation"
   - Theme toggle: aria-label="Toggle between Superhero and Professional themes"
2. Ensure proper heading hierarchy (H1 → H2 → H3)
3. Add keyboard navigation:
   - Tab key moves focus through all interactive elements
   - Enter/Space activates buttons
   - Escape closes modals
   - Arrow keys navigate format tabs
4. Ensure color contrast meets WCAG AA (4.5:1 minimum):
   - Test all text on backgrounds
   - Superhero bright colors on white backgrounds
   - Professional dark text on light backgrounds
5. Implement `prefers-reduced-motion` media query:
   - When detected, disable tactical animations, show static diagram
   - Reduce theme transition to simple fade (no complex animations)
6. Add focus visible indicators (2px solid outline, high contrast)

### Step 11: Optimize Performance

1. Lazy load tactic detail views (only load when navigated to)
2. Implement code splitting (separate bundles for home and detail views)
3. Compress images and use WebP format where supported
4. Target bundle sizes:
   - Initial bundle: <500KB (well under 2MB target)
   - Total assets including all tactics: <5MB
5. Use React.memo() for TacticCard to prevent unnecessary re-renders
6. Optimize canvas rendering:
   - Only redraw when animation frame changes
   - Use requestAnimationFrame
   - Apply GPU acceleration with `will-change: transform` on animated elements
7. Lighthouse CI targets:
   - Performance: ≥90
   - Accessibility: ≥90
   - Best Practices: ≥90

### Step 12: Add Loading and Error States

1. Skeleton loading state for tactics grid:
   - Show gray placeholder cards with shimmer animation
   - Shimmer: gradient moves left to right (1.5s loop)
2. Field canvas loading state:
   - Gray rectangle with centered spinner while initializing
3. Error state for failed tactic load:
   - Show error message: "Tactic failed to load" with retry button
4. Network error handling:
   - If JSON fails to load on first visit, show friendly error
   - Provide "Retry" button to attempt reload

---

## CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

### Theme Configuration Example

```typescript
// src/styles/themes.ts
export const themes = {
  superhero: {
    colors: {
      primary: '#9C27B0',
      secondary: '#2196F3',
      accent: '#FF9800',
      grass: '#32CD32',
      text: '#212121',
      background: '#FAFAFA',
    },
    typography: {
      fontFamily: 'Fredoka, Nunito, "Comic Sans MS", cursive, sans-serif',
      baseFontSize: '18px',
      buttonFontSize: '18px',
      fontWeight: 'bold',
    },
    borderRadius: {
      small: '8px',
      medium: '12px',
      large: '16px',
    },
    shadows: {
      card: '0 4px 8px rgba(156, 39, 176, 0.2)',
      button: '0 4px 12px rgba(33, 150, 243, 0.3)',
    },
  },
  professional: {
    colors: {
      primary: '#1976D2',
      secondary: '#0D47A1',
      accent: '#00897B',
      grass: '#228B22',
      text: '#212121',
      background: '#ECEFF1',
    },
    typography: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      baseFontSize: '16px',
      buttonFontSize: '16px',
      fontWeight: 'medium',
    },
    borderRadius: {
      small: '4px',
      medium: '6px',
      large: '8px',
    },
    shadows: {
      card: '0 2px 4px rgba(0, 0, 0, 0.1)',
      button: '0 2px 6px rgba(25, 118, 210, 0.2)',
    },
  },
};
```

### Animation Timing Constants

```typescript
// src/lib/constants.ts
export const ANIMATION_TIMINGS = {
  FAST: 150,          // Button hover states
  NORMAL: 300,        // Card expansion, format changes
  SLOW: 500,          // Theme transformations
  TACTICAL: 6000,     // Tactical animation duration (6 seconds)
};

export const EASING = {
  STANDARD: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Superhero only
};
```

### Component State Management

```typescript
// Use React Context for global state (theme, format)
// Use local component state for animation playback
// Use localStorage for persistence (theme, format, player names)

// Example: Theme Context
interface ThemeContextType {
  theme: 'superhero' | 'professional';
  toggleTheme: () => void;
}

// Example: Format Context
interface FormatContextType {
  format: '5v5' | '7v7' | '9v9';
  setFormat: (format: '5v5' | '7v7' | '9v9') => void;
}
```

---

## STRICT SCOPE DEFINITION

### FILES TO CREATE:

**Core App Structure:**
- `src/main.tsx` - App entry point
- `src/App.tsx` - Root component with providers
- `src/index.css` - Global styles and Tailwind imports

**Contexts:**
- `src/contexts/ThemeContext.tsx` - Theme state management
- `src/contexts/FormatContext.tsx` - Format state management

**Components:**
- `src/components/Header.tsx` - App header with title and theme toggle
- `src/components/ThemeToggle.tsx` - Theme switcher (🦸 ⟷ 👔)
- `src/components/FormatTabBar.tsx` - Format selector tabs
- `src/components/TacticCard.tsx` - Individual tactic card in grid
- `src/components/TacticsGrid.tsx` - Grid layout of tactic cards
- `src/components/TacticDetailView.tsx` - Full tactic detail screen
- `src/components/FieldCanvas.tsx` - Animated tactical field
- `src/components/AnimationControls.tsx` - Play/Pause/Restart buttons
- `src/components/ExplanationCard.tsx` - Expandable explanation panel
- `src/components/PlayerCustomization.tsx` - Name customization panel

**Data:**
- `src/data/tactics/high-press.json` - Example tactic (repeat for 8-12 tactics)
- `src/data/tacticsLoader.ts` - Utility to load all tactics

**Utilities:**
- `src/lib/animationEngine.ts` - Canvas animation logic
- `src/lib/localStorage.ts` - Helpers for persisting preferences

**Configuration:**
- `tailwind.config.js` - Tailwind with custom theme colors
- `vite.config.ts` - Vite build configuration
- `public/manifest.json` - PWA manifest

### FILES YOU MUST NOT CREATE OR MODIFY:

- Do NOT create backend/server files (this is frontend-only)
- Do NOT create database schemas (uses localStorage only)
- Do NOT create user authentication (no login required)
- Do NOT create admin interfaces (coaches use same interface)
- Do NOT create custom tactic creation tools (pre-built library only)
- Do NOT create video recording features (out of scope)
- Do NOT create multi-language support beyond English (deferred to Phase 2)

### DESIGN CONSTRAINTS - YOU MUST FOLLOW:

1. **Mobile-first:** Design for 375px viewport FIRST, then enhance for larger screens
2. **No blank canvas:** Always show default content, never empty states on initial load
3. **Performance budget:** Initial bundle <2MB, total assets <5MB, 30 FPS animations minimum
4. **Touch targets:** All interactive elements minimum 44×44px
5. **Color contrast:** WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
6. **Offline-first:** App must function fully offline after initial visit
7. **Zero login:** No authentication, no user accounts
8. **Dual themes:** Every visual element must support both Superhero and Professional modes
9. **Format flexibility:** Every tactic must work in 5v5, 7v7, and 9v9 formats
10. **Simplified icons:** Tactic card thumbnails should be iconic (3-5 elements max), not photographic

---

## ADDITIONAL NOTES

**Animation Implementation Tips:**
- Use Canvas API for field rendering (better performance than SVG for complex animations)
- Implement keyframe-based animation system (not physics-based)
- Use bezier curves for smooth player movement paths
- Framer Motion for UI transitions, native Canvas animation for tactical movements

**Theme Switching Behavior:**
- When theme toggles, ALL visual elements must update (colors, typography, icons, field rendering)
- Animation should restart when theme changes (acceptable 6-second delay)
- Explanation text should switch language (kid-speak ↔ tactical)
- localStorage must save preference immediately

**Testing Priorities:**
- Test on iPhone SE (375px, oldest supported iOS device)
- Test on Samsung Galaxy A-series (mid-range Android)
- Test offline functionality (disable network, verify app still works)
- Test theme switching during animation playback
- Test format changes with custom names assigned
- Test accessibility with keyboard-only navigation

**Future Enhancements (DO NOT IMPLEMENT IN MVP):**
- Training drill library linked to tactics
- Achievements/rewards for players
- Custom tactic creation tools
- Video recording integration
- Multi-language support
- User accounts and cloud sync
- Social sharing features

---

## IMPORTANT REMINDERS

1. **All AI-generated code REQUIRES careful human review** - Test thoroughly, especially:
   - Canvas animation performance on real devices
   - Theme switching edge cases
   - Offline functionality on iOS Safari (known PWA issues)
   - Accessibility with screen readers

2. **Start with ONE complete tactic** - Build the entire flow (grid → detail → animation) with a single tactic first, then replicate for 8-12 tactics

3. **Mobile-first is critical** - 75%+ of usage will be on mobile devices at soccer fields

4. **Performance testing is mandatory** - Animation FPS must be tested on 3+ year old devices (iPhone 8 / Galaxy A-series)

5. **Dual themes are non-negotiable** - This is the core differentiator; every component must support both

---

**END OF PROMPT**
