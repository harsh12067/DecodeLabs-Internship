# Harsh Tiwari — AI-Enhanced Personal Portfolio

A production-ready, AI-enhanced personal portfolio built with **React + Vite + Tailwind CSS**. Submitted as the **DecodeLabs Internship Capstone Project**.

🌐 **Live site**: [harshhweb.netlify.app](https://harshhweb.netlify.app/)  
📦 **Repository**: [github.com/harsh12067/DecodeLabs-Internship](https://github.com/harsh12067/DecodeLabs-Internship)

---

## Project Overview

This portfolio showcases the skills, projects, education, certifications, and experience of **Harsh Tiwari** — a B.Tech ECE student and Front-End Developer from Jaipur, India.

The application goes beyond a static portfolio by adding an **AI-powered assistant ("Ask My Portfolio")** that helps recruiters, developers, and visitors quickly discover and understand the work presented — without having to read every section manually.

---

## Features

### Core Portfolio
- **Hero section** with animated typewriter effect and social links
- **About** — personal summary and stats
- **Skills** — tab-filtered, animated progress bars
- **Projects** — 3 project cards with tech tags, live/code links
- **Work Experience** — VISHVENA AI Internship with certificate link
- **Education** — animated timeline (B.Tech, Class XII, Class X)
- **Certifications** — 4 verified credentials with verify links
- **Achievements** — scroll-triggered animated counters
- **Services** — developer service offerings
- **Contact** — validated contact form

### AI Portfolio Assistant
- Floating `✨ Ask My Portfolio` button
- Slide-up accessible panel (WCAG 2.1 AA compliant)
- **7 AI states**: Idle, Loading, Success, Empty, Error, Timeout, Unknown
- Suggested question chips for guided discovery
- **Structured responses** with related project cards
- Validates all AI output before rendering — never crashes on malformed data
- Retry button on failure
- Focus trap, Escape-to-close, screen-reader-friendly

### Technical Highlights
- Framer Motion + AOS scroll animations
- Glassmorphic dark-mode design
- Accessible navigation (ARIA roles, keyboard nav, skip-to-content)
- Lazy-loaded images, code splitting, chunked bundles
- Automated tests with Vitest + React Testing Library
- Netlify Functions secure AI proxy (API key never in frontend)

---

## Tech Stack

| Category | Technology |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion, AOS |
| Icons | react-icons |
| AI API | Google Gemini API (gemini-2.0-flash) |
| AI SDK | @google/genai (official Google GenAI JS SDK) |
| Backend | Netlify Functions (serverless) |
| Testing | Vitest, React Testing Library, jsdom |
| Deployment | Netlify |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
git clone https://github.com/harsh12067/DecodeLabs-Internship.git
cd DecodeLabs-Internship
npm install
```

### Environment Variables
Copy `.env.example` to `.env` and fill in your API key:
```bash
cp .env.example .env
```

Edit `.env`:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Never commit `.env` to version control. It is listed in `.gitignore`.

### Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

> **Note**: The AI feature requires `GEMINI_API_KEY` set in Netlify environment variables to work in production. Locally, it requires the [Netlify CLI](https://docs.netlify.com/cli/get-started/) to test serverless functions.

---

## Architecture

```
Portfolio UI (React)
     │
     │  POST /api/ask-portfolio
     ▼
Netlify Function (netlify/functions/ask-portfolio.js)
     │
     │  API call with system prompt + portfolio data
     ▼
Anthropic Claude API
     │
     │  Raw JSON response
     ▼
Response Validation (parseAIResponse)
     │
     │  Structured: { answer, relatedProjects }
     ▼
AskPortfolio Component — Renders result
```

---

## AI Integration

### Why AI?
Recruiters and visitors often don't read every section of a portfolio. The AI assistant helps them **quickly find what they need** — "Which projects use React?" or "What is Harsh's internship experience?" — saving time and improving discovery.

### Gemini Model Used
- **Model**: `gemini-2.0-flash`
- **SDK**: `@google/genai` (official Google GenAI JavaScript SDK)
- **Temperature**: `0.2` — low temperature for factual, grounded answers
- **Max Output Tokens**: `600`

### How Hallucinations Are Prevented
- A centralized `src/data/portfolioData.js` file contains **all real portfolio content**
- This data is injected into the AI's `systemInstruction` at every request
- The system prompt explicitly instructs: **"Use ONLY the portfolio information supplied. Never invent or assume information."**
- If the AI cannot answer, it returns: `"I don't have enough information about that in this portfolio."`

### Structured Response Format
The AI always responds in this validated JSON shape:
```json
{
  "answer": "Your full answer text here",
  "relatedProjects": [
    { "name": "Project Name", "reason": "Why this project is relevant" }
  ]
}
```

### Response Validation
- `parseAIResponse()` in `ask-portfolio.js` validates the JSON shape
- If validation fails, a safe fallback is returned — the app never crashes
- Frontend additionally validates the `answer` field type before rendering

### Error Handling
| Scenario | Response |
|---|---|
| Empty question | EMPTY state with prompt |
| Network failure | ERROR state with Retry |
| Timeout (>15s) | TIMEOUT state with Retry |
| Malformed AI JSON | Friendly fallback message |
| API key missing | 500 with config error message |

---

## Testing

### Framework
- **Vitest** — fast Vite-native test runner
- **React Testing Library** — component rendering
- **jsdom** — browser simulation
- **@testing-library/user-event** — realistic user interactions

### Run Tests
```bash
npm test                  # Run all tests once
npm run test:watch        # Watch mode
npm run test:coverage     # Run with coverage report
```

### Test Coverage
Tests are written for:
- `Navbar` — renders, opens/closes drawer, Escape key, aria-expanded
- `Hero` — name, CTA buttons, social links, profile image
- `Projects` — all 3 cards, tech tags, image alt text, live links
- `AskPortfolio` — all 7 states, focus behavior, retry, malformed response, suggested questions

**Target coverage**: 50%+ statements/functions/lines

---

## Accessibility

Improvements made to achieve WCAG 2.1 AA compliance:
- ✅ Semantic HTML throughout (`nav`, `main`, `section`, `article`, `ul`)
- ✅ Skip-to-content link for keyboard users
- ✅ Correct heading hierarchy (h1 → h2 → h3)
- ✅ All inputs have `<label>` elements
- ✅ All buttons have descriptive `aria-label` or visible text
- ✅ All images have meaningful `alt` text
- ✅ Keyboard-navigable mobile drawer with Escape key support
- ✅ Focus trap in AI assistant panel
- ✅ Focus returns to trigger button when AI panel closes
- ✅ `aria-expanded`, `aria-controls`, `aria-modal`, `aria-live` used correctly
- ✅ Role=tablist/tab/tabpanel for Skills category selector
- ✅ Progress bars have `role="progressbar"` with `aria-valuenow`
- ✅ Visible focus rings on all interactive elements
- ✅ `prefers-reduced-motion` respected (AOS disabled)
- ✅ Color is not the only way information is conveyed

---

## Performance

Optimizations implemented:
- **Code splitting**: Vendor chunks for React, Framer Motion, react-icons
- **Lazy image loading**: `loading="lazy"` on all project images
- **Preconnect**: Google Fonts preconnected in `<head>`
- **AOS disabled** when `prefers-reduced-motion: reduce`
- **Tailwind CSS v4**: Only generates CSS for used utility classes

**Lighthouse targets**: Performance 85+ · Accessibility 90+ · Best Practices 90+ · SEO 90+

---

## Deployment

The project is deployed on **Netlify** with automatic builds from the `main` branch.

### Steps
1. Push code to `main` branch on GitHub
2. Netlify automatically detects `netlify.toml` and runs `npm run build`
3. Set `ANTHROPIC_API_KEY` in Netlify → Site Settings → Environment Variables
4. Netlify deploys the `dist/` folder and registers the serverless function

### Rollback Plan
If a production deployment introduces a critical regression:
- Go to Netlify Dashboard → Deploys → Select the last known-good deploy → Click "Publish deploy"
- Or: `git revert` the breaking commit on `main` and push — Netlify auto-redeploys

---

## Known Limitations

- The AI feature requires an active Anthropic API key. Without it, the assistant returns a service configuration error.
- Locally testing the AI feature requires the Netlify CLI (`netlify dev`) to emulate serverless functions.
- The `og-image.png` Open Graph image referenced in `index.html` should be created and placed in `/public/` for social sharing previews.

---

## Future Improvements

- Add `og-image.png` for social sharing previews
- Add contact form backend (Netlify Forms or EmailJS)
- Stream AI responses token-by-token for faster perceived performance
- Add conversation history to the AI assistant
- Expand test coverage to 80%+
- Add E2E tests with Playwright
