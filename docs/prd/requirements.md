# Requirements

## Functional

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

## Non-Functional

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

## Out of Scope (Deferred to Post-MVP)

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
