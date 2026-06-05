# John Paul Giftson — Personal Website

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## GitHub Pages Deployment

### Option A: Custom Domain (e.g. johnpaulgiftson.com)

1. Keep `base: '/'` in `vite.config.ts` (default — already set)
2. Push to a repo named anything (e.g. `portfolio`)
3. In the repo → Settings → Pages → Source: GitHub Actions
4. Add a `CNAME` file to `public/` with your domain:
   ```
   johnpaulgiftson.com
   ```
5. Configure DNS at your registrar:
   - A records pointing to GitHub Pages IPs
   - Or CNAME to `<username>.github.io`
6. Push to `main` → GitHub Actions builds and deploys

### Option B: GitHub Pages subdomain (`<username>.github.io`)

1. Name your repo exactly: `<username>.github.io`
2. Keep `base: '/'`
3. Push to `main` — that's it

### Option C: Project subdomain (`<username>.github.io/<repo>`)

1. In `vite.config.ts`, change:
   ```ts
   base: '/<your-repo-name>/',
   ```
2. In `index.html`, update all og/twitter URLs to include the path
3. Push to `main`

---

## Customization Checklist

- [ ] `index.html` — Update domain in og/twitter meta tags and JSON-LD
- [ ] `public/sitemap.xml` — Update domain
- [ ] `public/robots.txt` — Update sitemap URL
- [ ] `src/data/index.ts` — Add real GitHub/LinkedIn URLs
- [ ] `src/components/layout/Footer.tsx` — Update social links
- [ ] Replace `https://github.com/johnpaulgiftson` with your actual GitHub profile URL
- [ ] Add a real `og-image.png` (1200×630) to `public/`

---

## Cloudflare Setup (Optional, Recommended)

1. Add your domain to Cloudflare
2. Set DNS: CNAME `@` → `<username>.github.io`
3. Enable: SSL/TLS → Full, Auto HTTPS Rewrite, HTTPS Redirect
4. Enable Cloudflare Analytics (no cookies, GDPR-friendly)
5. Page Rules: Cache everything for static assets

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | TailwindCSS 3 |
| Animation | Framer Motion 11 |
| Router | React Router 6 |
| Icons | Lucide React |
| Deployment | GitHub Pages + GitHub Actions |
| Fonts | Syne (display), Inter (body), JetBrains Mono |

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        — Scroll-aware nav, mobile menu
│   │   ├── Footer.tsx        — Links, status, copyright
│   │   └── PageTransition.tsx — Route transition wrapper
│   └── ui/
│       ├── CustomCursor.tsx  — Magnetic cursor (desktop only)
│       └── ScrollProgress.tsx — Amber progress bar
├── pages/
│   ├── Home.tsx      — Hero, stats, projects, about teaser, AI Lab CTA
│   ├── About.tsx     — Bio, experience timeline, education, skills
│   ├── Projects.tsx  — Filtered project grid with hover cards
│   ├── Writing.tsx   — Essay list with reading time
│   ├── AILab.tsx     — Evolutionary Consensus Engine demo
│   └── Contact.tsx   — Form + social links
├── data/
│   └── index.ts      — All content (projects, experience, writing)
└── styles/
    └── globals.css   — Tailwind base + custom components
```

---

## Performance Notes

- Fonts loaded via Google Fonts with `display=swap`
- Framer Motion lazy-loaded via code splitting
- No Google Analytics — add Plausible or Cloudflare Analytics
- Images: use WebP, add to `public/`, reference in `src/data/index.ts`
- Target: 95+ Lighthouse score on production build
