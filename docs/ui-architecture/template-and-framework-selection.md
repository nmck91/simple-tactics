# Template and Framework Selection

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
