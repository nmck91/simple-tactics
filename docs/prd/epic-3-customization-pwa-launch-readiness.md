# Epic 3: Customization, PWA, & Launch Readiness

**Epic Goal:** Deliver a production-ready MVP by adding player name customization for personalization, implementing offline-first PWA capability with Service Workers for reliable sideline access, optimizing performance to meet strict mobile targets (30 FPS animations, <3s load time), integrating privacy-first analytics to measure success metrics, and completing comprehensive documentation to enable open-source community contributions. This epic ensures the app is polished, performant, and ready for public launch.

---

## Story 3.1: Implement Player Name Customization with localStorage Persistence

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

## Story 3.2: Configure Service Worker for Offline-First PWA Capability

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

## Story 3.3: Optimize Animation Performance to 30+ FPS on Mid-Range Devices

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

## Story 3.4: Optimize Bundle Size and Load Time to Meet Performance Targets

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

## Story 3.5: Integrate Privacy-First Analytics

As a product manager,
I want to measure key user behaviors without compromising privacy,
so that I can validate product-market fit and iterate based on usage data.

**Implementation Decision Required:**

Before starting this story, choose ONE of the following approaches based on your infrastructure experience and MVP timeline:

### **Option A: Cloud-Hosted Analytics** ⭐ *RECOMMENDED FOR MVP*

**Service Options:**
- **Plausible.io** (cloud plan: $9/month, 10k monthly pageviews)
- **Umami Cloud** (free tier available, pay-as-you-grow)

**Pros:**
- ✅ Setup time: ~30 minutes
- ✅ No infrastructure management
- ✅ Automatic updates and uptime monitoring
- ✅ Scales automatically

**Cons:**
- ⚠️ Ongoing cost ($9/month for Plausible, free tier for Umami)
- ⚠️ Data stored on third-party servers (still GDPR/CCPA compliant)

**Prerequisites:**
- Plausible.io account OR Umami Cloud account created
- Payment method configured (if using Plausible)

---

### **Option B: Self-Hosted Analytics** ⚙️ *ADVANCED - Consider Deferring*

**Service Options:**
- **Plausible Community Edition** (self-hosted, free)
- **Umami** (self-hosted, free)

**Pros:**
- ✅ No ongoing cost (except server ~$5-10/month)
- ✅ Full data ownership
- ✅ No third-party data sharing

**Cons:**
- ⚠️ Setup time: 8-20 hours (first time)
- ⚠️ Requires: VPS, Docker, domain/subdomain, SSL certificate
- ⚠️ Ongoing maintenance and updates required
- ⚠️ DevOps knowledge needed

**Prerequisites:**
- VPS account (DigitalOcean, Linode, Hetzner, etc.) - ~$5-10/month
- Docker and Docker Compose knowledge
- Domain or subdomain for analytics (e.g., `analytics.simple-tactics.org`)
- SSH and server administration experience

**⚠️ RECOMMENDATION:** Self-hosting analytics is infrastructure-heavy for MVP. Consider **Option A** or **Option C** unless you have DevOps expertise.

---

### **Option C: Defer Analytics to Post-MVP** 🚀 *FASTEST MVP PATH*

**Approach:**
- Launch MVP without analytics initially
- Use alternative success metrics during beta:
  - GitHub Stars
  - Beta tester feedback surveys
  - Direct user interviews
  - Manual usage observation during beta testing (Epic 3, Story 3.7)
- Add analytics in Phase 2 (post-MVP) after validating core product

**Pros:**
- ✅ Fastest path to MVP launch
- ✅ No analytics infrastructure to maintain
- ✅ Focus on core product value
- ✅ Can add later without code changes (just add script tag)

**Cons:**
- ⚠️ No quantitative usage data during initial launch
- ⚠️ Harder to measure retention and engagement metrics

---

**Acceptance Criteria:**

**AC #1: Decision Documented**
- Analytics approach selected and documented: Option A, B, or C
- If Option C (defer), mark this story as deferred and proceed to Story 3.6

**[IF OPTION A OR B SELECTED]**

**AC #2: Analytics Service Configured**
- **[Option A]** Cloud analytics account created (Plausible.io or Umami Cloud)
- **[Option B]** Self-hosted analytics infrastructure provisioned (see Story 3.5a below if needed)
- Analytics dashboard accessible to project maintainers
- Test event sent successfully from localhost to verify configuration

**AC #3: Analytics Integration Implemented**
- Analytics script integrated into app layout (`app/layout.tsx`)
- Script loads asynchronously without blocking page rendering (using `next/script` with `strategy="afterInteractive"`)
- Analytics events tracked for the following user behaviors:
  - **Pageviews:** Automatic (home, tactics index, tactic detail pages)
  - **Custom events:**
    - `tactic_view` - Properties: `tactic_id`, `category`, `format`
    - `theme_switch` - Properties: `from_theme`, `to_theme`
    - `format_change` - Properties: `from_format`, `to_format`
    - `player_names_added` - Properties: `tactic_id`, `count`
- Device type tracking enabled (mobile vs desktop vs tablet)
- Session duration tracked (automatic with Plausible/Umami)

**AC #4: Privacy Compliance**
- No personal data collected (no user IDs, names, emails)
- No cookies used for tracking (cookieless analytics)
- No cross-site tracking (analytics scoped to simple-tactics domain only)
- GDPR/CCPA compliant (no consent banner required)
- Analytics script honors "Do Not Track" browser setting (if supported by chosen service)

**AC #5: Performance Validation**
- Analytics script size: <5KB (verified with bundle analysis)
- Analytics events sent in background (non-blocking, fire-and-forget)
- No impact on Time to Interactive (TTI) measured via Lighthouse
- Failed analytics requests do not cause user-facing errors (error handling implemented)

**AC #6: Privacy Policy**
- Privacy statement added to app footer (e.g., "We use privacy-first analytics to understand usage patterns. No personal data is collected. [Learn more]")
- Privacy policy page created (`app/privacy/page.tsx`) explaining:
  - What data is collected (pageviews, events, device types)
  - What is NOT collected (personal info, cookies, cross-site tracking)
  - How data is used (product improvement only)
  - How users can opt out (Do Not Track or browser extensions)
  - Link to analytics provider's privacy policy

**AC #7: Production Verification**
- Analytics tested in production environment (after deployment)
- Test events verified in analytics dashboard:
  - Pageview recorded for home page
  - Custom event recorded for tactic view
  - Custom event recorded for theme switch
- Real-time dashboard shows events appearing within 1 minute
- Historical data accessible (24-hour view, 7-day view)

**AC #8: Documentation**
- Analytics setup documented in `README.md` (which service, how to access dashboard)
- Analytics dashboard access shared with project maintainers
- If self-hosted (Option B): Infrastructure setup documented in `docs/analytics-infrastructure.md`

**[IF OPTION C SELECTED]**

**AC (Deferred):**
- Analytics implementation deferred to post-MVP Phase 2
- Alternative success metrics documented for MVP launch:
  - GitHub Stars tracking
  - Beta tester feedback surveys (Epic 3, Story 3.7)
  - User interviews (manual)
- Analytics placeholder added to codebase (`// TODO: Add analytics in Phase 2`) for future implementation

---

**Definition of Done:**

- [ ] Decision made and documented (Option A, B, or C)
- [ ] If Option A or B: All acceptance criteria #2-8 met
- [ ] If Option C: Story marked as deferred, alternative metrics documented
- [ ] Privacy policy reviewed for accuracy
- [ ] Analytics dashboard accessible and showing live data (if implemented)

---

## Story 3.5a: Provision Self-Hosted Analytics Infrastructure

**⚠️ NOTE:** This story is **CONDITIONAL** and only required if **Option B (Self-Hosted Analytics)** was selected in Story 3.5.

**RECOMMENDED:** Unless you have DevOps experience, consider Option A (cloud-hosted) or Option C (defer) instead.

---

As a developer with infrastructure experience,
I want self-hosted analytics infrastructure provisioned and secured,
so that I can integrate analytics without third-party data collection or ongoing costs.

**Prerequisites:**

- VPS account created (DigitalOcean, Linode, Hetzner, or similar)
- SSH key configured for secure server access
- Domain or subdomain available (e.g., `analytics.simple-tactics.org`)
- Docker and Docker Compose knowledge
- Basic Linux server administration skills

**Acceptance Criteria:**

**AC #1: Server Provisioned**
- VPS instance created with minimum specifications:
  - 1GB RAM (2GB recommended for better performance)
  - 25GB SSD storage
  - Ubuntu 22.04 LTS or Debian 11
- SSH access configured with key-based authentication (password auth disabled)
- Firewall configured (UFW) allowing only: SSH (22), HTTP (80), HTTPS (443)
- Automatic security updates enabled (`unattended-upgrades`)

**AC #2: Docker Environment Setup**
- Docker installed (latest stable version)
- Docker Compose installed (v2.x)
- Non-root user created for running Docker containers
- Docker daemon configured to start on boot

**AC #3: Analytics Service Deployed**
- **[Plausible CE]** Plausible Community Edition deployed via Docker Compose:
  - Official Docker Compose configuration used: https://github.com/plausible/hosting
  - PostgreSQL and ClickHouse databases configured
  - Environment variables configured (admin credentials, secret key base)
- **[Umami]** Umami deployed via Docker Compose:
  - Official Docker Compose configuration used: https://github.com/umami-software/umami
  - PostgreSQL or MySQL database configured
  - Environment variables configured (database URL, app secret)
- Service accessible on localhost (http://localhost:8000 or similar)

**AC #4: DNS and SSL Configuration**
- Subdomain DNS A record created pointing to VPS IP address (e.g., `analytics.simple-tactics.org`)
- Nginx reverse proxy configured to forward requests to analytics service
- Let's Encrypt SSL certificate provisioned via Certbot
- HTTPS enforced (HTTP redirects to HTTPS)
- SSL certificate auto-renewal configured (certbot renew cron job)

**AC #5: Analytics Dashboard Access**
- Analytics dashboard accessible at `https://analytics.simple-tactics.org`
- Admin account created with strong password (password manager recommended)
- HTTPS verified (green padlock in browser)
- Dashboard login tested successfully

**AC #6: Monitoring and Backups**
- Health check endpoint configured (e.g., `/api/health`)
- Uptime monitoring configured (UptimeRobot free tier or similar)
- Database backup script created (automated daily backups)
- Backup retention policy: 7 daily, 4 weekly (configurable)
- Backup restoration tested (verify backup files are valid)

**AC #7: Documentation**
- Infrastructure setup documented in `docs/analytics-infrastructure.md`:
  - VPS provider and server specs
  - Docker Compose configuration
  - SSL certificate renewal process
  - Backup and restore procedures
  - Troubleshooting common issues
  - How to update analytics service (Docker image updates)
- Admin credentials stored securely (password manager, NOT in Git)

**AC #8: Security Hardening**
- Fail2ban installed and configured (blocks brute-force SSH attempts)
- Server timezone set to UTC
- Log rotation configured (`logrotate`)
- Unused services disabled
- Security audit performed (basic vulnerability scan with `lynis` or similar)

**Estimated Effort:** 8-12 hours (first-time setup), 2-4 hours (if experienced with Docker/VPS)

**Ongoing Maintenance:**
- Weekly: Check uptime monitoring alerts
- Monthly: Review and rotate backups, update Docker images
- Quarterly: Review security logs, update server packages

---

**Definition of Done:**

- [ ] All acceptance criteria met
- [ ] Analytics dashboard accessible via HTTPS
- [ ] SSL certificate valid and auto-renewing
- [ ] Backups automated and tested
- [ ] Documentation complete
- [ ] Ready for Story 3.5 integration (AC #2)

---

## Story 3.6: Create Comprehensive Documentation and Contribution Guidelines

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

## Story 3.7: Conduct Final User Testing and Bug Fixes

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
