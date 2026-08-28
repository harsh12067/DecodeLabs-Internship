# Deployment Checklist — Harsh Tiwari Portfolio (Capstone)

Use this checklist before every production deployment.

## Build & Code
- [ ] Production build tested locally: `npm run build && npm run preview`
- [ ] No errors in browser console on local build
- [ ] No TypeScript / ESLint errors: `npm run lint`

## Security
- [ ] No API keys in any source code file
- [ ] No secrets committed to Git (check with `git log --all -p | grep -i "api_key"`)
- [ ] `.env` is listed in `.gitignore` and NOT committed
- [ ] `.env.example` is committed (contains only placeholder values)
- [ ] `GEMINI_API_KEY` is set in Netlify Environment Variables dashboard

## AI Feature
- [ ] AI assistant button visible and clickable on desktop
- [ ] AI assistant button visible and clickable on mobile
- [ ] Suggested question chips displayed in IDLE state
- [ ] Submitting empty question shows EMPTY state
- [ ] Submitting a real question shows LOADING state then SUCCESS
- [ ] Related project cards render correctly on success
- [ ] "Ask another question" resets panel to IDLE
- [ ] API failure (disconnected network) shows ERROR state with Retry button
- [ ] Retry button re-submits the previous question
- [ ] Malformed response handled gracefully (no crash)
- [ ] Timeout (simulated with slow network) shows TIMEOUT state

## Accessibility
- [ ] Skip-to-content link works with Tab key on fresh page load
- [ ] Tab key navigates through all interactive elements in correct order
- [ ] Escape key closes the AI assistant panel
- [ ] Focus moves into AI panel when opened
- [ ] Focus returns to trigger button when AI panel is closed
- [ ] Mobile nav drawer opens and closes with keyboard
- [ ] Escape key closes mobile nav drawer
- [ ] All images have non-empty alt text
- [ ] All buttons have accessible labels

## Responsive Design
- [ ] Navbar layout tested on mobile (320px), tablet (768px), desktop (1280px)
- [ ] Hero section layout correct on all screen sizes
- [ ] Projects grid: 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] Skills grid: 1 column on mobile, 2 on desktop
- [ ] AI assistant panel fits comfortably on mobile
- [ ] No horizontal scrolling on any screen size
- [ ] No text clipping or overflow

## Testing
- [ ] All tests passing: `npm test`
- [ ] Coverage report generated: `npm run test:coverage`
- [ ] Coverage ≥ 50% for statements, functions, and lines

## SEO & Meta
- [ ] Page title is meaningful
- [ ] Meta description is present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URL is correct
- [ ] favicon.svg loads correctly

## Deployment
- [ ] Code pushed to `main` branch on GitHub
- [ ] Netlify build succeeded (check Netlify dashboard)
- [ ] Production URL tested: https://harshhweb.netlify.app/
- [ ] All sections load and scroll correctly on production
- [ ] AI feature works end-to-end on production URL

## Rollback Plan
- [ ] Rollback plan documented in README.md
- [ ] Last known-good deploy identified in Netlify dashboard
- [ ] Steps to revert: go to Netlify → Deploys → select previous deploy → Publish deploy
