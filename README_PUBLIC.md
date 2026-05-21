# Future Memory — futurememory.studio

> Design and strategy studio. Statički sajt. Vanilla HTML, CSS, JavaScript.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Built with](https://img.shields.io/badge/Built%20with-HTML%20%7C%20CSS%20%7C%20JS-blue.svg)
![Status: Live](https://img.shields.io/badge/Status-Live-brightgreen.svg)

---

## Quick Start

### Local Development
1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR-USERNAME/futurememory-website.git
   cd futurememory-website
   ```

2. Serve locally (pick one):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # Or just open index.html in your browser
   ```

3. Open `http://localhost:8000` and you're live.

### Editing Content
All content lives in `index.html` as plain HTML. No build step needed.

- **Copy & text**: Edit directly between HTML tags
- **Modal content**: Edit `<template id="modal-NN">` blocks
- **Images**: Drop PNG/JPG files into `assets/cards/` (see below)
- **Brand colors & fonts**: Edit `styles/tokens.css`

Save → Refresh browser. Done.

---

## Adding Card Images

1. Prepare 8 images: `card-01.jpg` through `card-08.jpg` (recommended: 320×240px minimum)
2. Place in `assets/cards/`
3. For each card, add to `<div class="card__image">`:
   ```html
   style="background-image: url('/assets/cards/card-01.jpg')"
   ```

Until images are added, cards show CSS gradient placeholders (intentional design).

---

## Project Structure

```
futurememory-website/
├── index.html                 Main page (all content, all modals)
│
├── styles/
│   ├── tokens.css            CSS variables (colors, fonts, spacing)
│   ├── base.css              Typography, resets
│   ├── layout.css            Grid, sections, containers
│   ├── components.css        Cards, buttons, modals, nav
│   ├── effects.css           Gradients, animations, aurora effect
│   └── responsive.css        Mobile & tablet breakpoints
│
├── scripts/
│   └── main.js               Modal interactions, scroll effects, mobile menu
│
├── assets/
│   ├── favicon.svg
│   ├── og-image.png          Open Graph image (1200×630px)
│   └── cards/                8 card images (card-01.jpg … card-08.jpg)
│
└── README.md                 This file
```

---

## Deployment

### Option 1: Vercel (Recommended — 2 minutes)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub → Import repository
4. Framework: **Other** (auto-detect)
5. Build: Leave blank (static site)
6. Click **Deploy**

Your site is live at `futurememory-website-xxx.vercel.app` in ~30 seconds.

#### Connect Custom Domain
1. In Vercel project → **Settings** → **Domains**
2. Add `futurememory.studio`
3. Update DNS at your registrar with Vercel's records (A + CNAME)
4. Wait 5–30 minutes → SSL auto-provisioned → Live on `https://futurememory.studio`

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com) → Sign in with GitHub
2. **New site from Git** → Select repo
3. Build command: leave blank
4. Publish directory: `.` (root)
5. Deploy

### Option 3: GitHub Pages (Free)

```bash
# In repo settings, enable Pages
# Branch: main, folder: / (root)
# Live at: your-username.github.io/futurememory-website
```

### Option 4: Self-hosted / FTP

Copy the entire folder to your server's web root. No build required.

---

## How to Edit After Deploy

```bash
# 1. Edit index.html in your editor
# 2. Save
# 3. Commit & push:
git add .
git commit -m "Updated hero copy"
git push origin main
```

**Vercel auto-deploys on push** (~30 seconds). No manual steps.

---

## Brand & Customization

All design tokens are in `styles/tokens.css`:
- **Colors**: Primary, secondary, backgrounds, text
- **Typography**: Font families, sizes, weights
- **Spacing**: Margins, padding, gaps
- **Effects**: Shadows, gradients, transitions

Edit one variable → updates everywhere.

---

## Accessibility

- ✅ Semantic HTML (`<nav>`, `<section>`, `<article>`)
- ✅ ARIA labels in Serbian (close button, menu toggle, decorative elements)
- ✅ Keyboard navigation (Tab, Escape)
- ✅ Color contrast WCAG AA compliant
- ✅ Mobile-first responsive design

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

---

## Performance

- **Zero dependencies** (no npm, no build step)
- **Single HTTP request** for CSS & JS (minifiable for ~2KB gzipped)
- **No JavaScript frameworks** → instant load
- **No tracking or analytics** (privacy-first)

---

## License

MIT — Use, modify, share freely. See LICENSE file.

---

## Questions?

Open an **Issue** or reach out to `hello@futurememory.studio`.

---

**Last updated:** May 2026  
**Status:** Production ready  
**Next phase:** Lab section (WebGL audio-reactive shader) — when ready
