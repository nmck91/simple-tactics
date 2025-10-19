# Simple Tactics ⚽

**Interactive tactics board for youth soccer coaches**

A Progressive Web App that helps volunteer coaches explain tactical concepts to children (ages 5-11) through animated visual demonstrations. Built with Next.js, React, and TypeScript.

---

## 🎯 Features

- **🎨 Dual Themes**: Superhero mode (ages 5-7) and Professional mode (ages 9-11)
- **📱 PWA**: Works offline, installable on mobile devices
- **🎬 Animated Tactics**: Visual demonstrations of tactical concepts
- **⚙️ Format Support**: Adapts to 5v5, 7v7, and 9v9 formats
- **👤 Player Customization**: Assign player names to personalize tactics
- **🌐 Zero Backend**: Fully client-side, no login required
- **♿ Accessible**: WCAG 2.1 AA compliant
- **📦 Lightweight**: <2MB initial bundle

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/simple-tactics.git
cd simple-tactics

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Deployment

🚀 **Live App**: [https://simple-tactics-rmrnjjdmn-niall-mckinneys-projects.vercel.app](https://simple-tactics-rmrnjjdmn-niall-mckinneys-projects.vercel.app)

---

## 📁 Project Structure

```
simple-tactics/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home - Tactics grid
│   └── tactic/[id]/       # Dynamic tactic detail pages
├── components/            # Reusable React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
│   ├── field-rendering/   # Canvas rendering logic
│   ├── types.ts          # TypeScript type definitions
│   └── tactics-loader.ts  # Tactics JSON loader
├── public/
│   └── data/
│       └── tactics/       # Tactics JSON files
├── __tests__/             # Test files
├── __mocks__/             # Test mocks
└── docs/                  # Documentation
```

---

## 🛠️ Available Scripts

### Development

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (static export)
npm run start        # Preview production build
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

### Testing

```bash
npm test             # Run Jest tests
npm run test:watch   # Jest watch mode
npm run test:coverage # Generate coverage report
```

### Utilities

```bash
npm run validate-tactics  # Validate tactics JSON schemas
npm run bundle-report     # Analyze bundle size
npm run optimize-images   # Compress assets
```

---

## 🎨 Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | Next.js 14+ (App Router) | React framework with static export |
| **Language** | TypeScript 5+ (strict mode) | Type-safe development |
| **Styling** | Tailwind CSS + CSS Variables | Theme-aware utility-first CSS |
| **Animation** | Framer Motion (LazyMotion) | Performant animations |
| **State** | React Context API + localStorage | Global state management |
| **PWA** | next-pwa | Service worker generation |
| **Testing** | Jest + React Testing Library | Unit and integration tests |

---

## 📝 Adding a New Tactic

1. **Create JSON file** in `/public/data/tactics/[category]/your-tactic.json`

```json
{
  "id": "your-tactic",
  "title": "Your Tactic Name",
  "category": "passing",
  "description": {
    "kidSpeak": "Simple explanation for kids",
    "tactical": "Professional coaching language"
  },
  "formats": {
    "5v5": { "players": [...] },
    "7v7": { "players": [...] },
    "9v9": { "players": [...] }
  }
}
```

2. **Add to index** in `/public/data/tactics/index.json`

```json
{
  "id": "your-tactic",
  "title": "Your Tactic Name",
  "category": "passing"
}
```

3. **Validate**

```bash
npm run validate-tactics
```

4. **Test in app**

```bash
npm run dev
# Your tactic should appear in the grid
```

See [Tactics README](/public/data/tactics/README.md) for detailed schema documentation.

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Test Structure

```
__tests__/
├── components/        # Component unit tests
├── lib/              # Utility function tests
├── integration/      # User flow tests
└── fixtures/         # Test data
```

### Writing Tests

```tsx
import { render, screen } from '@testing-library/react'
import { TacticCard } from '@/components/TacticCard'

describe('TacticCard', () => {
  it('renders tactic title', () => {
    render(<TacticCard tactic={mockTactic} />)
    expect(screen.getByText('High Press')).toBeInTheDocument()
  })
})
```

---

## 📦 Building for Production

```bash
# Build static export
npm run build

# Output directory: /out
# - out/index.html
# - out/_next/static/...
# - out/data/tactics/...
```

### Deployment

**Vercel (Recommended):**

```bash
vercel deploy
```

**Netlify:**

```bash
netlify deploy --prod --dir=out
```

**Static Hosting (GitHub Pages, S3, etc.):**

Upload contents of `/out` directory.

### CI/CD

- **GitHub Actions**: Automatic linting, testing, and building on every push
- **Vercel**: Automatic deployment on push to `main` branch
- **Preview Deployments**: Automatic preview URLs for pull requests

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit with conventional commits (`git commit -m 'feat: add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Coding Standards

- ✅ TypeScript strict mode (no `any` without comments)
- ✅ ESLint rules enforced
- ✅ Prettier formatting
- ✅ WCAG 2.1 AA accessibility
- ✅ Tests for new features
- ✅ <2MB bundle size

---

## 📚 Documentation

- **[Frontend Architecture](docs/ui-architecture.md)** - Complete technical architecture
- **[Product Requirements](docs/prd.md)** - Product vision and requirements
- **[UX Specification](docs/front-end-spec.md)** - User experience design
- **[Tactics Schema](public/data/tactics/README.md)** - Tactics JSON format

---

## 🐛 Known Issues

See [GitHub Issues](https://github.com/your-org/simple-tactics/issues) for current bugs and feature requests.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by volunteer youth soccer coaches worldwide
- Built with ❤️ for the soccer community
- Special thanks to all contributors

---

## 📧 Contact

- **Issues**: [GitHub Issues](https://github.com/your-org/simple-tactics/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/simple-tactics/discussions)
- **Email**: hello@simple-tactics.org

---

**Made with ⚽ for coaches, by coaches**
