# Epic 2: Animations, Multi-Format, & Dual-Theme System

**Epic Goal:** Transform the static tactics library into an engaging, animated experience by implementing player movement animations, expanding to the full 8-12 tactics across all three formats (5v5, 7v7, 9v9), and creating dual visual themes (Superhero mode for ages 5-7, Professional mode for ages 9-11). This epic delivers the core "translation layer" value proposition, enabling coaches to present age-appropriate, visually compelling tactical explanations that capture children's attention and make complex concepts comprehensible.

---

## Story 2.1: Implement Animation Engine with Framer Motion for Player Movements

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

## Story 2.2: Expand Tactics Library to 8-12 Complete Tactics with Animations

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

## Story 2.3: Implement Multi-Format Adaptation (5v5, 7v7, 9v9)

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

## Story 2.4: Design and Implement Superhero Theme Visual Assets

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

## Story 2.5: Design and Implement Professional Theme Visual Assets

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

## Story 2.6: Build Theme Switcher UI and Context Provider

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

## Story 2.7: Add Integration Tests for Animations and Theme Switching

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

## Story 2.8: Implement Error Boundaries and Loading States

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
