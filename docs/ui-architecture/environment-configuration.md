# Environment Configuration

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
