# Future Memory — Autonomous Website Build Instruction

**For:** Claude Code (Sonnet 4.6) running in the Anthropic desktop panel
**Operator:** Nenad Kuzmanović
**Domain:** futurememory.studio
**Site language:** Serbian (latinica, with proper diacritics: š, č, ž, ć, đ)
**Mode:** Autonomous multi-phase build. Do not stop between phases. Do not ask for permission at routine decision points. Do not summarize after each phase and wait. Execute the whole plan, then report once at the end.

---

## Operating rules — read once, apply throughout

These rules override default conversational behavior. Treat them as binding for this entire session.

1. **Do not stall between phases.** When Phase N finishes, move directly to Phase N+1. Do not write "Phase N complete. Shall I proceed?" Do not summarize unless the final report at the end. Only stop if a phase is genuinely blocked by missing input that only the operator can provide.

2. **Do not ask permission for routine decisions.** Make the call, document it briefly in `DECISIONS.md` at the project root, and continue. Routine decisions include: file naming, folder structure, choice of CSS approach (vanilla CSS over framework — see Phase 2), placement of components, where to put utility files.

3. **Genuine blockers only.** Stop and ask only if: a required input file is missing, a credential is needed for a deploy step, or a conflict in the brand spec can only be resolved by the operator. Otherwise: proceed.

4. **Honesty protocol applies.** This project belongs to Nenad Kuzmanović and uses a documented honesty discipline:
   - Memory is not evidence. Verify against the brand spec in this document before generating.
   - Completion claims require direct verification (file diff, build output, browser render). Do not say "the hero section is done" — show the file contents and the test result.
   - If something cannot be verified, state it explicitly. Do not paper over uncertainty.
   - Never invent file contents, never fabricate test results, never claim a step succeeded without evidence.

5. **Site copy is in Serbian, verbatim from this document.** Do not paraphrase, do not "improve" the copy, do not translate to English. The Serbian text provided here is canonical. If a string is missing for some UI element (e.g. an aria-label), use Serbian and document the addition in `DECISIONS.md`.

6. **No decorative prose anywhere in the build.** Code comments stay minimal and functional. No AI-generated marketing fluff in HTML. The copy in this spec is the only copy.

7. **Token economy.** Operator is watching token burn. Be terse in chat output. Verbose in code comments only where necessary for future maintenance.

8. **Content must be easy to edit by a non-developer.** All site copy lives directly in `index.html` as visible text inside semantic tags. Modal content lives in sibling hidden `<div>` blocks next to each card. The operator must be able to open `index.html` in VS Code (or Notepad) and edit text between tags without touching CSS or JS.

---

## Project context

Future Memory (`futurememory.studio`) is a one-person studio offering AI-augmented services around the "Second Brain" concept: personal knowledge bases controlled by frontier LLMs (Claude, ChatGPT/Codex) that act as Controllers driving external tools (Adobe suite, Figma, ComfyUI, 3D pipelines, code editors). The site is the studio's public face.

**Visual register:** technical-luxe, dark-mode primary, sharp typography, restrained aurora-gradient accents used as punctuation (not decoration). Inspiration: vercel.com (sharpness, dark elegance, grid discipline), linear.app (typographic confidence), arc.net (warmth in dark mode), instrument.com (editorial serif italic for emotional moments).

**NOT:** chaotic neon, generic SaaS hero with abstract 3D blobs, stock "AI brain" graphics, gradient overuse on every surface, glassmorphism everywhere, AI-hype copy. The brand voice is measured and honest about LLM limitations — that is a feature, not a hedge.

**Visual reference:** https://vercel.com — for grid sharpness, dark surface treatment, hover discipline. Do NOT copy specific Vercel components (no triangular geometric logo, no "Deploy" CTA aesthetics). Match the level of polish, not the specific marks.

Expected input from Figma Make (if present): an HTML/CSS or React export located in `./figma-make-output/` or similar. If that folder is absent, proceed without it — this document contains the full brand spec and copy, and the site can be built from scratch from this document alone. The Figma output is a visual reference, not a source of truth.

---

## Phase 1 — Audit and triage (5–10 minutes)

**Goal:** Understand what (if anything) Figma Make produced, and how much of it is reusable.

1. Locate any Figma Make output in the working directory. Determine:
   - Is it plain HTML/CSS/JS, or a React/Next.js project?
   - File structure (`tree` or `ls -R`)
   - Entry point (`index.html`, `App.tsx`, or similar)
   - Which sections it captured (Hero, "What Is Second Brain", Services Grid, How It Works, About, Contact, Footer)

2. Read this entire instruction document once more and extract:
   - All hex colors from the Brand section below
   - All font-family declarations (Geist Sans, Instrument Serif, Geist Mono)
   - The 8-card service grid structure with hover/modal behavior
   - The Serbian copy that must be used verbatim

3. Write `AUDIT.md` at the project root containing:
   - What Figma Make captured correctly (if anything)
   - What Figma Make got wrong (color drift, missing fonts, wrong copy language, missing sections, wrong card behavior)
   - List of fixes needed, ranked by severity (brand violations first, layout issues second, polish third)
   - Decision: keep Figma output as base, or rebuild from scratch using it only as visual reference

4. Move to Phase 2 immediately. Do not wait for operator approval of the audit.

---

## Phase 2 — Decide build target and structure (5 minutes)

**Default decision unless Figma Make output is 80%+ usable React:** vanilla HTML + CSS + minimal JS (no framework, no build step, no Tailwind, no TypeScript).

**Reasoning:** the operator's update workflow requires editing text directly in `index.html` without a build step. A framework adds friction. The site is content-light, performance-sensitive, and lives as plain files in a Git repo. Static deployment to Netlify Drop or Vercel must work by dragging the folder.

If Figma Make produced a React project that's 80%+ usable, keep it and clean it up — but ONLY if you can preserve the "edit content directly" workflow (i.e., content stays in JSX as readable text, not pulled from a CMS or data file the operator would have to find). Otherwise, rebuild as vanilla.

Document the decision in `DECISIONS.md`.

**Final structure target:**

```
futurememory-website/
├── index.html                  # main landing page, all content in here
├── styles/
│   ├── tokens.css              # brand variables (colors, fonts, spacing, radius, motion)
│   ├── base.css                # reset, body, typography defaults
│   ├── components.css          # buttons, cards, badges, modals
│   ├── layout.css              # grid, sections, container
│   ├── effects.css             # gradients, hover effects, aurora
│   └── responsive.css          # mobile overrides
├── scripts/
│   └── main.js                 # modal open/close, scroll reveals, mobile menu
├── assets/
│   ├── favicon.svg
│   ├── og-image.png            # 1200x630 for social share (placeholder if not provided)
│   └── cards/                  # 8 images for service cards, named card-01.jpg ... card-08.jpg
│       └── README.md           # explains naming and what each card needs visually
├── AUDIT.md
├── DECISIONS.md
└── README.md
```

If images for cards are not provided, generate placeholder dark gradient images programmatically in CSS (no broken `<img>` tags). Document this in `DECISIONS.md` and list filenames the operator should drop in later.

---

## Phase 3 — Build the token layer (10 minutes)

Create `styles/tokens.css` with the full Future Memory token set. Exact values, no substitutions:

```css
:root {
  /* PALETTE — dark mode primary */
  --color-void: #050507;
  --color-deep: #0A0A0D;
  --color-surface: #111114;
  --color-elevated: #18181D;
  --color-elevated-hover: #1F1F26;

  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-strong: rgba(255, 255, 255, 0.16);
  --color-border-bright: rgba(255, 255, 255, 0.24);

  --color-text-primary: #FAFAF7;
  --color-text-secondary: #A8A89F;
  --color-text-muted: #6B6B66;
  --color-text-faint: #4A4A45;

  /* ACCENTS — used sparingly, never more than one accent per composition unit */
  --color-violet: #8B5CF6;
  --color-violet-soft: #A78BFA;
  --color-violet-deep: #6D28D9;
  --color-cyan: #22D3EE;
  --color-amber: #F59E0B;
  --color-pink: #EC4899;

  /* GRADIENTS — only on accent surfaces, never on body */
  --gradient-aurora: linear-gradient(135deg, #8B5CF6 0%, #22D3EE 50%, #EC4899 100%);
  --gradient-aurora-soft: linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(34,211,238,0.10) 50%, rgba(236,72,153,0.15) 100%);
  --gradient-warm: linear-gradient(135deg, #F59E0B 0%, #EC4899 100%);
  --gradient-fade-down: linear-gradient(180deg, transparent 0%, var(--color-deep) 100%);

  /* FONTS */
  --font-display: "Instrument Serif", "Iowan Old Style", Georgia, serif;
  --font-sans: "Geist", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, "SF Mono", monospace;

  /* TYPOGRAPHY SCALE */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-md: 18px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --text-3xl: 44px;
  --text-4xl: 56px;
  --text-5xl: 72px;
  --text-6xl: 96px;

  /* SPACING — 4px base, geometric */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
  --space-40: 160px;

  /* RADIUS */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;

  /* MOTION — sharp, intentional, no spring */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --motion-fast: 150ms var(--ease);
  --motion-base: 250ms var(--ease);
  --motion-slow: 400ms var(--ease);

  /* SHADOWS */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.4);
  --shadow-lg: 0 24px 64px rgba(0,0,0,0.5);
  --shadow-glow-violet: 0 0 32px rgba(139,92,246,0.25);

  /* GRID */
  --max-width: 1280px;
  --gutter: 24px;
  --gutter-mobile: 16px;
}
```

In `index.html` `<head>`, load fonts from Google Fonts and Vercel's font CDN (Geist is hosted by Vercel; use the Google Fonts mirror for reliability):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

Confirm Cyrillic and Latin Extended subsets cover Serbian diacritics (š, č, ž, ć, đ). Geist and Instrument Serif both ship with Latin Extended-A which covers these. Verify by checking the font file or rendering the test string `Šćedžaiprč` in the hero.

Continue to Phase 4.

---

## Phase 4 — Build the base layer (15 minutes)

`styles/base.css`:
- Modern CSS reset (Andy Bell's modern-css-reset or equivalent)
- `html { scroll-behavior: smooth; }`
- `body` background `var(--color-deep)`, text `var(--color-text-primary)`, font `var(--font-sans)`, `font-size: var(--text-base)`, `line-height: 1.6`, `-webkit-font-smoothing: antialiased`
- `::selection { background: var(--color-violet); color: var(--color-text-primary); }`
- Default heading typography:
  - `h1`: `var(--font-display)`, italic, `var(--text-5xl)` desktop / `var(--text-3xl)` mobile, line-height 1.05, letter-spacing -0.02em
  - `h2`: `var(--font-sans)`, weight 600, `var(--text-3xl)` desktop / `var(--text-xl)` mobile, line-height 1.15, letter-spacing -0.015em
  - `h3`: `var(--font-sans)`, weight 600, `var(--text-xl)`, line-height 1.25
- Body paragraphs: `var(--text-md)` on desktop, `var(--text-base)` on mobile, max-width 65ch for prose blocks
- Code/mono: `var(--font-mono)`, `var(--text-sm)`, background `var(--color-surface)`, padding 2px 6px, radius `var(--radius-sm)`
- Subtle film-grain noise overlay on body for texture (SVG-based, 4% opacity max):

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

This grain is mandatory. It is the only "decorative" texture allowed and serves to break the flat dark surfaces, matching the Vercel-level finish target.

Continue to Phase 5.

---

## Phase 5 — Build layout primitives and components (20 minutes)

`styles/layout.css`:
- `.container` — `max-width: var(--max-width)`, centered, horizontal padding `var(--gutter)`
- `.section` — vertical padding `var(--space-24)` desktop, `var(--space-16)` mobile, with optional `.section--hero` for full-viewport sizing
- 12-column CSS grid utility for inner layouts
- Section divider — 1px line `var(--color-border)` between major sections

`styles/components.css`:

**Buttons** — three variants:
- `.btn--primary`: violet background, white text, radius `var(--radius-pill)`, padding `12px 24px`, font-weight 500, hover lifts with `var(--shadow-glow-violet)` and brightens to `--color-violet-soft`
- `.btn--ghost`: transparent background, 1px `var(--color-border-strong)` border, hover border becomes `var(--color-border-bright)` and background `var(--color-surface)`
- `.btn--link`: no background or border, just text with right-arrow `→` that translates 4px on hover

**Badges/chips** — pill-shaped, mono font, `var(--text-xs)`, padding `4px 10px`, border `1px solid var(--color-border)`, text `var(--color-text-secondary)`. Used in modal "Tehnologije" sections.

**Service card** — THIS IS THE CENTERPIECE. Specification:
- Fixed dimensions: 320px wide × 380px tall on desktop, full-width × 320px tall on mobile
- All 8 cards exactly the same size, no exceptions
- Structure:
  - Top 60% (228px): image area with subtle gradient overlay from transparent at top to `rgba(5,5,7,0.7)` at bottom
  - Bottom 40% (152px): content area on `var(--color-surface)` background
- Background: `var(--color-surface)`
- Border: 1px `var(--color-border)`, radius `var(--radius-md)`
- Cursor: pointer
- Title: `var(--font-sans)`, weight 600, `var(--text-lg)`, color `var(--color-text-primary)`
- Tagline: `var(--font-sans)`, weight 400, `var(--text-sm)`, color `var(--color-text-secondary)`, max 2 lines with ellipsis
- "Detaljnije →" affordance: `var(--font-mono)`, `var(--text-xs)`, color `var(--color-text-muted)`, positioned bottom-right of content area
- Default state: image at full opacity, content visible
- Hover state (transition `var(--motion-base)`):
  - Image opacity drops to 0.35
  - Image scales 1.05× (subtle zoom)
  - Border becomes `var(--color-border-bright)`
  - "Detaljnije →" color changes to `var(--color-violet-soft)` and font-size scales to `var(--text-sm)`
  - Subtle aurora gradient appears as 1px border via `background-clip` trick or pseudo-element
  - Shadow `var(--shadow-md)` appears under card
- Focus state: same as hover plus 2px outline `var(--color-violet)` with 4px offset (accessibility)

**Modal** — opens on card click:
- Backdrop: fixed full-viewport, `rgba(5,5,7,0.7)`, backdrop-filter `blur(12px)`, fade in 200ms
- Container: centered, max-width 720px, max-height 85vh, background `var(--color-elevated)`, radius `var(--radius-lg)`, 1px border `var(--color-border-strong)`, padding `var(--space-8)`, scroll if content overflows
- Modal structure (inner DOM order):
  - Close button (top-right, X icon, 32px tap target, ghost style)
  - Image (full-width, 280px tall, object-fit cover, radius `var(--radius-md)`, margin-bottom `var(--space-6)`)
  - Modal title (`h2`)
  - Section: "Šta je ovo" heading + 2–3 paragraphs of body text
  - Section: "Šta dobijate" heading + bulleted list
  - Section: "Tehnologije" heading + horizontal flex-wrap of badge chips
  - CTA: `.btn--primary` "Pošalji upit" linking to `#kontakt`
- Open animation: backdrop fade + modal scales from 0.96 to 1.0 and opacity 0 → 1, duration `var(--motion-base)`
- Close: same in reverse
- ESC closes
- Click backdrop closes
- Click modal body does NOT close (stopPropagation)
- Body scroll locked while modal open

**Hero gradient orb** — for the hero section background only:
- Single conic gradient orb, positioned absolutely, blurred heavily, low opacity
- Implementation:
```css
.hero-orb {
  position: absolute;
  top: -200px;
  right: -200px;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: conic-gradient(from 180deg, #8B5CF6, #22D3EE, #EC4899, #8B5CF6);
  filter: blur(120px);
  opacity: 0.25;
  pointer-events: none;
  animation: orb-rotate 40s linear infinite;
}
@keyframes orb-rotate { to { transform: rotate(360deg); } }
```
- This is the ONLY decorative gradient on the site. Used once, in the hero.

Continue to Phase 6.

---

## Phase 6 — Build `index.html` with all sections (60–90 minutes)

Build `index.html` with these sections in order. All Serbian copy below is canonical — paste verbatim into the HTML. Do not paraphrase. Do not translate.

### `<head>`

```html
<!DOCTYPE html>
<html lang="sr-Latn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Future Memory — Drugi mozak na zahtev</title>
  <meta name="description" content="LLM-vođeni sistemi za znanje, programiranje, dizajn i 3D. Studio Nenada Kuzmanovića. futurememory.studio">
  <meta property="og:title" content="Future Memory">
  <meta property="og:description" content="Drugi mozak na zahtev. LLM kao kontroler vaših alata.">
  <meta property="og:image" content="/assets/og-image.png">
  <meta property="og:url" content="https://futurememory.studio">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/tokens.css">
  <link rel="stylesheet" href="styles/base.css">
  <link rel="stylesheet" href="styles/layout.css">
  <link rel="stylesheet" href="styles/components.css">
  <link rel="stylesheet" href="styles/effects.css">
  <link rel="stylesheet" href="styles/responsive.css">
</head>
```

### 1. Navigation bar

- Height 64px, fixed top, background `rgba(10,10,13,0.7)` with `backdrop-filter: blur(20px)`
- Border-bottom 1px `var(--color-border)`
- Container has logo on left, nav links center, CTA on right
- Logo wordmark: "Future Memory" in Geist Sans Medium, with the word "Memory" wrapped in `<em>` and styled as Instrument Serif italic with a subtle warm tint (`var(--color-amber)` or warm white)
- Nav links: "Drugi mozak", "Šta radimo", "Kako radimo", "Studio", "Kontakt"
- CTA: `.btn--primary` "Zakaži razgovor"
- On scroll past 40px: background opacity increases to `rgba(10,10,13,0.9)`, border-bottom appears
- Mobile: hamburger that opens a full-screen overlay menu

### 2. Hero section

Full viewport height (min 720px). Contains hero orb (see Phase 5). Centered content.

```html
<section class="section section--hero" id="top">
  <div class="hero-orb" aria-hidden="true"></div>
  <div class="container hero__inner">
    <div class="hero__eyebrow">
      <span class="badge">Future Memory · Studio</span>
    </div>
    <h1 class="hero__title">
      Drugi mozak. <br>
      <em>Na zahtev.</em>
    </h1>
    <p class="hero__lede">
      Vaša lična baza znanja, povezana sa najjačim LLM modelima na tržištu, postaje sagovornik koji razume vaš kontekst i kontroliše alate koje već koristite — od Photoshop-a do ComfyUI-a, od web razvoja do 3D rekonstrukcije.
    </p>
    <div class="hero__actions">
      <a href="#sta-radimo" class="btn btn--primary">Pogledaj šta radimo</a>
      <a href="#drugi-mozak" class="btn btn--ghost">Šta je drugi mozak?</a>
    </div>
    <div class="hero__meta">
      <span class="mono">futurememory.studio</span>
      <span class="mono">·</span>
      <span class="mono">Novi Sad / Beograd / Daljinski</span>
    </div>
  </div>
</section>
```

The `<em>` in the title is Instrument Serif italic with `var(--gradient-aurora)` clipped to text via `background-clip: text`. This is the ONE place where the aurora gradient touches type. Nowhere else.

### 3. "Šta je drugi mozak" section (`id="drugi-mozak"`)

Long-form explanatory section. Two-column on desktop (left: heading + lede sticky; right: scrolling prose), single column on mobile.

```html
<section class="section section--explainer" id="drugi-mozak">
  <div class="container explainer__grid">
    <aside class="explainer__heading">
      <span class="mono mono--label">01 — Koncept</span>
      <h2>Drugi mozak nije aplikacija. To je <em>arhitektura</em>.</h2>
      <p class="explainer__lede">
        Verovatno ste čuli za "Second Brain". Evo šta tu zaista postoji — i šta nije marketing.
      </p>
    </aside>
    <div class="explainer__body">
      <p>
        Zamislite bazu podataka u koju vremenom unosite stvari koje vam trebaju. Beleške sa sastanaka. Naučne radove. Snimke razgovora. Fotografije tabli sa idejama. Foldere klijenata. Vaše stare projekte. Bilo šta što biste inače "zaboravili gde ste sačuvali".
      </p>
      <p>
        Tu bazu zatim pohrani jedan od velikih modela — Claude ili ChatGPT/Codex — i indeksira je tako da joj može pristupiti preko chata. Ne čita sve odjednom. Pretražuje relevantno, citira izvor, i odgovara na osnovu vaših podataka. Sa minimalnom potrošnjom tokena, jer ne ubacuje sve u kontekst — samo ono što treba.
      </p>
      <p>
        Rezultat: imate sagovornika koji zna ono što vi znate, ali sa savršenim sećanjem. Pita ga sa telefona dok ste u kafiću. Pita ga sa laptopa dok pišete izveštaj. Pita ga šta ste odlučili na sastanku od pre tri meseca, i on vam citira tačan paragraf iz transkripta.
      </p>
      <p>
        Ovaj sistem nije Notion sa AI dugmetom. Nije ChatGPT sa fajlovima. To je <em>modularan i prenosiv</em> sistem koji vi posedujete — vaši podaci žive na vašem disku, vaš LLM ih čita pod vašim pravilima, i možete ga preneti sa jedne platforme na drugu kada se pejzaž promeni. (A promeniće se.)
      </p>
      <p>
        Drugi mozak nije zamena za vaš mozak. To je <em>spoljni indeks</em> — kao što je biblioteka spoljni indeks za civilizaciju. Vaše misli ostaju vaše. Ovaj sistem samo prestaje da vas tera da ih pamtite napamet.
      </p>
      <div class="explainer__caveat">
        <span class="mono mono--label">Iskrenost</span>
        <p>
          LLM-ovi haluciniraju. To je činjenica, ne softverska greška. Sistem koji vam pravim je dizajniran tako da to zna i da radi <em>uprkos</em> tome — sa proverama, citiranjem izvora, i diskovima koji se zovu "ne dozvoli mi da pošaljem ovo bez verifikacije". Bez te discipline, drugi mozak postaje treći problem.
        </p>
      </div>
    </div>
  </div>
</section>
```

### 4. "Šta radimo" — Service cards grid (`id="sta-radimo"`)

8 cards, 4×2 grid on desktop, 2×4 on tablet, 1×8 on mobile. All same size. Each card has a hidden sibling `<div class="modal-content" data-card="N">` containing the expanded content.

Section header:

```html
<section class="section section--services" id="sta-radimo">
  <div class="container">
    <div class="section__header">
      <span class="mono mono--label">02 — Radovi</span>
      <h2>Osam radnih tokova. <em>Jedan kontroler.</em></h2>
      <p class="section__lede">
        Svaki od ovih tokova koristi LLM kao Kontroler koji vodi alate i pipeline-ove. Vi razgovarate sa kontrolerom. Kontroler radi posao. Kliknite na karticu za detaljnije objašnjenje.
      </p>
    </div>
    <div class="cards-grid">
      <!-- 8 cards here -->
    </div>
  </div>
</section>
```

Card markup template (use this exactly, repeat 8 times with different content):

```html
<article class="card" data-card-id="01" tabindex="0" role="button" aria-haspopup="dialog">
  <div class="card__image" style="background-image: url('/assets/cards/card-01.jpg')"></div>
  <div class="card__body">
    <h3 class="card__title">Drugi mozak</h3>
    <p class="card__tagline">Vaša lična baza znanja, indeksirana i pretraživa kroz razgovor.</p>
    <span class="card__cta mono">Detaljnije →</span>
  </div>
</article>
<template id="modal-01">
  <div class="modal__image" style="background-image: url('/assets/cards/card-01.jpg')"></div>
  <h2 class="modal__title">Drugi mozak — vaša lična baza znanja</h2>
  <div class="modal__section">
    <h3>Šta je ovo</h3>
    <p>...</p>
  </div>
  <div class="modal__section">
    <h3>Šta dobijate</h3>
    <ul>...</ul>
  </div>
  <div class="modal__section">
    <h3>Tehnologije</h3>
    <div class="badges">...</div>
  </div>
  <a href="#kontakt" class="btn btn--primary">Pošalji upit</a>
</template>
```

(Use `<template>` for modal content — JS clones it into the modal container on open. This keeps the source HTML clean and the content editable in one place.)

**The 8 cards, in order, with full content:**

---

**Card 01 — Drugi mozak**
- Tagline: `Vaša lična baza znanja, indeksirana i pretraživa kroz razgovor.`
- Šta je ovo:
  > Lična baza znanja koju zajedno punimo vašim materijalom — beleške, PDF-ovi, transkripti razgovora, slike, foldere klijenata, stare projekte. Sve to ulazi u sistem koji LLM indeksira i čita pod vašim pravilima. Pristupate joj preko običnog chata na telefonu ili laptopu. Sistem citira izvor uz svaki odgovor, tako da znate odakle dolazi tvrdnja.
  >
  > Vaši podaci ostaju na vašem disku. Ne odlaze u nečiji cloud osim ako vi tako ne odlučite. Sistem je dizajniran da bude prenosiv — danas radi sa Claude-om, sutra sa novim modelom, bez gubljenja sadržaja koji ste godinama gradili.
- Šta dobijate:
  - Strukturisanu bazu znanja sa konvencijama koje vi razumete
  - Chat interfejs (telefon + laptop) koji pretražuje samo vašu bazu
  - Pipeline za dodavanje novih dokumenata (drag-and-drop ili automatski)
  - Pravila citiranja — svaki odgovor sa izvorom
  - Obuku za održavanje sistema bez moje pomoći
- Tehnologije: `Obsidian` `Claude Projects` `RAG` `Markdown` `Python` `Local-first`

---

**Card 02 — Web razvoj**
- Tagline: `Sajtovi i aplikacije, sa kodom koji ostaje vaš i razumljiv.`
- Šta je ovo:
  > Pravimo web sajtove, landing strane i jednostavnije aplikacije koristeći Claude Code i Codex kao primarne izvršioce. Razlika u odnosu na "AI website builder" alate je u tome da vi dobijate čist kod u svom Git repozitorijumu, koji možete da preuzmete, hostujete bilo gde, i menjate sami ili sa nekim drugim za pet godina.
  >
  > Sistemski je postavljen workflow gde ja vodim arhitekturu i verifikaciju, a LLM-ovi pišu kod pod nadzorom. Sve ide kroz verziju i pregled — bez "magic" koraka koje niko ne razume.
- Šta dobijate:
  - Statički sajt ili aplikacija u Git repozitorijumu (vaš nalog)
  - Vanilla HTML/CSS/JS ili React/Next.js, prema potrebi
  - Deploy na Netlify, Vercel ili vaš server
  - Dokumentaciju koju će razumeti i osoba koja vas nasleđuje
  - Mogućnost obuke da sami pravite manje izmene
- Tehnologije: `Claude Code` `Codex` `HTML/CSS/JS` `React` `Next.js` `Git` `Vercel` `Netlify`

---

**Card 03 — Brending i grafika**
- Tagline: `Vizuelni sistemi i prepress, kontrolisani direktno iz razgovora.`
- Šta je ovo:
  > Brand sistemi, vizuelni identiteti, prepress workflow-i i automatizacija Adobe alata kroz scripting. Photoshop akcije za pripremu za štampu, Illustrator data merge za batch generisanje (sertifikati, etikete, lokalizacije), Figma plugin-i za usklađivanje sa brand sistemom. LLM kontroler ovde znači da vi razgovaramo, on pokreće alate — ne morate da znate JSX ili Photoshop scripting.
- Šta dobijate:
  - Vizuelni identitet (logo, paleta, tipografija, primeri primene)
  - Prepress-spreman izlaz (TIFF/LZW @ 300 dpi, CMYK gde treba)
  - Batch automatizacije za serije materijala
  - Brand brief koji ne pati od "nadahnutog opisa" — to je dokument, ne ode
- Tehnologije: `Adobe Photoshop` `Illustrator` `InDesign` `Figma` `MCP` `Scripting`

---

**Card 04 — Generativna slika i animacija**
- Tagline: `ComfyUI workflow-i pod prst, sa lokalnim modelima i kontrolom kvaliteta.`
- Šta je ovo:
  > Pravimo i isporučujemo ComfyUI workflow-e za vaš RTX hardver ili na cloud GPU. Konzistentni karakteri (IPAdapter, LoRA trening), prepoznatljiv stil (style reference), kontrolisana kompozicija (ControlNet), video (Wan, Hunyuan, animaciju kroz interpolaciju). Cilj je da vi imate workflow koji radi predvidljivo — ne magični prompt koji se "ponekad pogodi".
  >
  > Lokalno izvršavanje na vašem hardveru znači bez mesečne pretplate i bez slanja vaših referenci u tuđi cloud.
- Šta dobijate:
  - ComfyUI workflow JSON fajlove sa dokumentacijom svakog node-a
  - Listu modela koje treba preuzeti, sa veličinama i izvorima
  - Recepte za rešavanje uobičajenih problema (ruke, lice, konzistentnost)
  - Po potrebi: obuku za vlastito održavanje
- Tehnologije: `ComfyUI` `Flux` `SDXL` `ControlNet` `IPAdapter` `Wan` `Hunyuan` `RTX 3090+`

---

**Card 05 — 3D i Gaussian Splatting**
- Tagline: `Fotorealistična 3D rekonstrukcija iz fotografija ili video snimaka.`
- Šta je ovo:
  > Gaussian Splatting je tehnika koja od običnog video snimka ili serije fotografija pravi 3D scenu kojom se može slobodno kretati kamera — sa zadržanim svetlom, refleksijama i materijalima originalne scene. To je nova klasa 3D sadržaja, između foto-realizma i klasičnog mesh-a.
  >
  > Pravimo splat scene za prezentacije proizvoda, virtuelne ture, virtual production setove, AR/VR projekte. Po potrebi izvozimo i u klasičan mesh za Blender ili Unreal pipeline.
- Šta dobijate:
  - .ply ili .splat fajl spreman za web viewer ili Unreal/Blender
  - Snimak ili niz fotografija sa uputstvom (ako sami snimate)
  - Web viewer integraciju (ako želite splat na sajtu)
  - Verziju za mobilne uređaje sa optimizacijom
- Tehnologije: `Polycam` `Postshot` `Nerfstudio` `3DGS` `Blender` `Unreal Engine`

---

**Card 06 — Lokalna AI infrastruktura**
- Tagline: `Privatni LLM-ovi na vašem hardveru. Vaši podaci ne idu u tuđi cloud.`
- Šta je ovo:
  > Za slučajeve gde poverljivost ili budžet ne dozvoljavaju cloud LLM API, postavljamo lokalnu infrastrukturu. Ollama, Qwen, Mistral, Llama — biramo model po zadatku. Hibridni setup (lokalno za rutinske stvari, cloud za one koje zahtevaju jaki "reasoning") drži mesečne troškove na nivou kafe.
  >
  > Setup uključuje Streamlit ili sopstveni dashboard kao jedinstveni interfejs, LangGraph orkestraciju ako su potrebni multi-agent tokovi, i pravila za kada koji model radi šta.
- Šta dobijate:
  - Funkcionalan lokalni LLM stack na vašem hardveru
  - Hibridna pravila routing-a (lokalno vs cloud) sa procenom troškova
  - Dashboard za pristup svemu sa jednog mesta
  - Backup i restore procedure
- Tehnologije: `Ollama` `Qwen` `Mistral` `LangGraph` `Streamlit` `Linux` `RTX 3090+`

---

**Card 07 — Glas i transkripcija**
- Tagline: `Whisper STT pipeline od mikrofona do bilo koje aplikacije, jednim klikom.`
- Šta je ovo:
  > Lokalna transkripcija govora kroz Whisper, povezana sa hardverskim dugmetom (na primer HOCO bluetooth mikrofonom) ili tastaturskim shortcut-om. Pričate u mikrofon, otpustite dugme, tekst se pojavi gde god je kursor — u chat-u, u dokumentu, u email-u.
  >
  > Pipeline radi lokalno, znači privatno i bez kašnjenja od mrežnog poziva. Pratećih jezika ima koliko ih Whisper podržava (uključujući srpski).
- Šta dobijate:
  - Konfigurisan Whisper na vašoj mašini sa modelom prema potrebi
  - Hardver button + softver bridge (pyautogui ili native shortcut)
  - Konfiguracioni fajl koji možete sami menjati (jezik, model, prečice)
  - Po potrebi: real-time transkripciju sastanaka u dokument
- Tehnologije: `Whisper` `Python` `pyautogui` `HOCO BT` `Linux/Windows/macOS`

---

**Card 08 — Mentorstvo i obuka**
- Tagline: `Naučite da koristite Claude Code i Codex profesionalno, bez gubljenja godina.`
- Šta je ovo:
  > Strukturisan jedan-na-jedan program za programere, dizajnere i istraživače koji žele da rade sa LLM-ovima ozbiljno, ne kao hobi. Pokrivamo: kako se postavlja kontekst, kako se verifikuje izlaz, kako se brani od halucinacija, kako se postavlja Git workflow koji radi sa AI saradnikom, i — najvažnije — koja je granica između "ovo mogu da poverim modelu" i "ovo moram sam".
  >
  > Iskreno: LLM-ovi su moćni i nepouzdani u isto vreme. Ako ih koristite bez discipline, dobićete brz prototip i sporu, skupu, dugu produkciju. Cilj programa je da vam uštedi hiljade sati koje biste inače proveli na YouTube-u, učeći kroz pokušaj-i-grešku.
- Šta dobijate:
  - 6 ili 12 nedelja strukturisanog rada (po dogovoru)
  - Vaš stvarni projekat kao radni materijal
  - Templates za promptove, verification protokole, Git workflow
  - Završni projekat koji radi i koji razumete u celosti
- Tehnologije: `Claude Code` `Codex` `Git` `verification protocols` `prompt engineering`

---

### 5. "Kako radimo" section (`id="kako-radimo"`)

Process section. 4 steps in a vertical or stair-step layout. Each step has a number, title, paragraph, and optional mono caption.

```html
<section class="section section--process" id="kako-radimo">
  <div class="container">
    <div class="section__header">
      <span class="mono mono--label">03 — Proces</span>
      <h2>Kako <em>radimo</em>.</h2>
      <p class="section__lede">
        Bez "AI magije". Sa razgovorom, dokumentom, i isporukom koju možete da proverite.
      </p>
    </div>

    <div class="process">
      <div class="process__step">
        <span class="mono mono--num">01</span>
        <h3>Razgovor</h3>
        <p>Pišete šta vam treba — ili pričamo. Bez ograničenja forme. Cilj je da razumem šta zaista treba da uradimo, a ne šta zvuči dobro u brifu.</p>
      </div>

      <div class="process__step">
        <span class="mono mono--num">02</span>
        <h3>Dokument</h3>
        <p>Ja pišem kratak dokument koji opisuje šta će sistem da radi, šta neće, koje su pretpostavke, i koliko košta. Vi potvrđujete ili menjamo dok ne legne.</p>
      </div>

      <div class="process__step">
        <span class="mono mono--num">03</span>
        <h3>Izgradnja</h3>
        <p>Radim. Sa Claude Code-om i Codex-om kao izvršiocima, mojim nadzorom kao arhitektom i verifikatorom. Pravim međukorake koji se mogu testirati. Bez "javljam se kad bude gotovo".</p>
      </div>

      <div class="process__step">
        <span class="mono mono--num">04</span>
        <h3>Isporuka</h3>
        <p>Predajem fajlove, kod, dokumentaciju. Pokazujem šta radi, šta ne, i koje su poznate granice. Sve ostaje vaše — vaš Git, vaš nalog, vaši podaci.</p>
      </div>
    </div>
  </div>
</section>
```

### 6. "Studio" section (`id="studio"`)

About section. Two-column: prose left, "credentials" panel right.

```html
<section class="section section--about" id="studio">
  <div class="container about__grid">
    <div class="about__body">
      <span class="mono mono--label">04 — Studio</span>
      <h2>Ko stoji iza ovoga.</h2>
      <p>
        Future Memory je studio Nenada Kuzmanovića. Docent na Fakultetu tehničkih nauka u Novom Sadu. Poslednjih pet godina sam proveo radeći 15 sati dnevno na razumevanju, testiranju i puštanju u rad svega što je moglo da se preuzme sa GitHub-a i pokrene na RTX 3090.
      </p>
      <p>
        Paralelno sa tim radim na <em>AUTO ENGINE</em> projektu — sistemu za kriptografski upravljano AI-asistirano inženjerstvo. To je razlog zašto ovaj studio ima jaku poziciju oko poštenja, verifikacije, i razlike između "model je rekao" i "stvar je urađena".
      </p>
      <p>
        Ako tražite nekoga ko će vam reći da je AI rešenje svega — to nije ovaj studio. Ako tražite nekoga ko zna gde su granice i kako da ih koristi u vašu korist — onda da.
      </p>
    </div>
    <aside class="about__panel">
      <h3 class="mono">Tehnička osnova</h3>
      <ul class="about__list">
        <li>RTX 3090 lokalni rig</li>
        <li>Linux + Windows hibrid</li>
        <li>Claude Code + Codex za izvršavanje</li>
        <li>Ollama (Qwen, Mistral, Llama) za lokalni LLM</li>
        <li>ComfyUI za generativnu sliku/video</li>
        <li>Adobe paket + Figma za grafiku</li>
        <li>Git za sve, bez izuzetka</li>
      </ul>
      <h3 class="mono">Lokacija</h3>
      <p>Novi Sad. Rad za klijente lokalno i daljinski.</p>
    </aside>
  </div>
</section>
```

### 7. Kontakt section (`id="kontakt"`)

Simple contact section. Email address as primary CTA, optionally a contact form. For first version: just email link and Calendly placeholder (operator will fill).

```html
<section class="section section--contact" id="kontakt">
  <div class="container contact__inner">
    <span class="mono mono--label">05 — Kontakt</span>
    <h2>Imate <em>pitanje</em>?</h2>
    <p class="contact__lede">
      Pišite kratko šta vam treba. Odgovaram u roku od 2 radna dana.
    </p>
    <div class="contact__actions">
      <a href="mailto:hello@futurememory.studio" class="btn btn--primary">hello@futurememory.studio</a>
      <a href="#" class="btn btn--ghost" data-calendly-placeholder>Zakaži 30 min razgovor</a>
    </div>
    <p class="contact__note mono">
      Za hitne projekte: napišite "HITNO" u naslov. Inače uobičajen tempo.
    </p>
  </div>
</section>
```

### 8. Footer

```html
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <span class="wordmark">Future <em>Memory</em></span>
      <p class="mono">futurememory.studio</p>
    </div>
    <nav class="footer__nav">
      <a href="#drugi-mozak">Drugi mozak</a>
      <a href="#sta-radimo">Šta radimo</a>
      <a href="#kako-radimo">Kako radimo</a>
      <a href="#studio">Studio</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
    <div class="footer__meta">
      <p class="mono">© 2026 Nenad Kuzmanović</p>
      <p class="mono">Novi Sad, Srbija</p>
    </div>
  </div>
  <div class="footer__strip">
    <p class="mono">Drugi mozak. Vaš sistem, vaša kontrola, vaš kod.</p>
  </div>
</footer>
```

**Discipline checklist per section (run before moving on):**
- Is the accent (violet, aurora, amber) used at most once per section?
- Does the section heading have exactly one italicized word (Instrument Serif)?
- Are all paddings/margins using spacing tokens?
- Are all colors using color tokens? No raw hex outside `tokens.css`.
- Is all copy in Serbian, exactly as in this document?

If any check fails: fix before continuing.

Continue to Phase 7.

---

## Phase 7 — Mobile responsive (20 minutes)

`styles/responsive.css`:

**Breakpoints:**
- Mobile: ≤ 640px
- Tablet: 641px – 1024px
- Desktop: ≥ 1025px

**Mobile rules (≤ 640px):**
- Navbar: hamburger menu, logo stays left, CTA becomes icon only
- Hero: title scales from `--text-5xl` to `--text-3xl`, lede from `--text-md` to `--text-base`, orb scales down and repositions
- Explainer section: collapses to single column, sticky aside becomes normal flow
- Services grid: 1 column, card width 100%, height stays at 320px
- Process: vertical stack with numbered cards
- About: single column, panel becomes a full-width card below body
- Footer: stacks vertically
- Modal: full-screen on mobile (max-width 100vw, max-height 100vh, no border-radius), close button top-right with safe-area-inset padding

**Tablet rules (641–1024px):**
- Services grid: 2 columns × 4 rows
- Other sections: keep two-column layouts but with reduced gutters

**Test mentally at 390px width (iPhone 14) and 768px (iPad portrait).** Document any tradeoffs in `DECISIONS.md`.

Continue to Phase 8.

---

## Phase 8 — JavaScript (15 minutes)

`scripts/main.js` — single file, vanilla JS, no dependencies. Required behavior:

1. **Navbar scroll state.** On scroll past 40px, add class `is-scrolled` to nav. Use `requestAnimationFrame` throttling.

2. **Service card → modal open.**
   - Click or keyboard activation (Enter/Space) on `.card`
   - Find the `<template>` with matching `data-card-id`
   - Clone template content into a global `<div id="modal-root">`
   - Add `is-open` class to backdrop
   - Trap focus inside modal (basic implementation: focus first focusable element, listen for Tab/Shift+Tab to wrap)
   - Add `body.is-modal-open` to lock scroll
   - ARIA: set `aria-modal="true"`, `role="dialog"`, `aria-labelledby` to modal title id

3. **Modal close.**
   - X button click
   - ESC key
   - Click on backdrop (but NOT modal body — use `event.target === backdrop`)
   - Restore focus to the card that opened it
   - Remove `body.is-modal-open`

4. **Scroll-triggered fade-in.** IntersectionObserver on `.section__header` and `.explainer__body > p` and `.card`. When 20% visible, add `is-revealed` class. CSS transitions opacity 0 → 1 and translateY 12px → 0 over 400ms. Single trigger per element, no repeat.

5. **Hero entrance.** On `DOMContentLoaded`: stagger fade-in of hero badge, title, lede, actions, meta in that order with 80ms gaps. Each element transitions from opacity 0 + translateY 16px to natural state. Duration 400ms.

6. **Mobile menu toggle.** Hamburger click toggles `nav.is-open` which CSS animates as full-screen overlay.

7. **Smooth scroll for anchor links.** All `a[href^="#"]` calls `event.preventDefault()` and `scrollIntoView({ behavior: 'smooth', block: 'start' })` with 80px offset for navbar.

**No spring, no bounce, no parallax. Max 400ms duration anywhere. No third-party JS libraries.**

Continue to Phase 9.

---

## Phase 9 — Polish and verify (20 minutes)

1. **Validate HTML** — no unclosed tags, all `<img>` have `alt` attributes (use `""` for decorative), all interactive elements have accessible names.

2. **Verify color tokens** — grep the source for hex values that don't appear in `tokens.css`. Replace any stray hex with token references.

3. **Verify typography tokens** — grep for hardcoded `font-size: Npx` outside `tokens.css`. Replace with `var(--text-*)`.

4. **Verify Serbian text rendering** — check that `š č ž ć đ Š Č Ž Ć Đ` render correctly in all three fonts. If any glyph is missing, document it in `DECISIONS.md` and add a fallback font that covers it.

5. **Verify modal behavior** — open each of 8 modals, check ESC closes, backdrop click closes, body click stays open, focus traps correctly, scroll restores after close.

6. **Verify keyboard navigation** — tab through entire page, every interactive element reachable, visible focus state on all (use `:focus-visible`).

7. **Verify mobile breakpoint** — resize to 390px, check navbar collapses, cards stack to single column, hero scales, modals go full-screen.

8. **Verify favicon and OG** — check `<head>` references `favicon.svg` and `og-image.png` (create placeholders in `assets/` if missing, with a note in `DECISIONS.md`).

9. **Lighthouse check (mental or actual)** — Performance, Accessibility, Best Practices, SEO. Goal: each ≥ 90 on mobile. Identify anything that would fail (e.g., missing meta description, missing alt, low contrast).

10. **Verify the "non-developer can edit" promise.** Open `index.html` in a plain editor. Confirm that:
    - All card titles and taglines are visible plain text in HTML
    - All modal content is visible plain text inside `<template>` blocks
    - All section copy is visible plain text inside semantic tags
    - No content is constructed in JavaScript at runtime
    - No content is in CSS pseudo-elements

If any check fails: fix immediately. Do not defer.

Continue to Phase 10.

---

## Phase 10 — README, DECISIONS, and final report (10 minutes)

Write `README.md` at the project root:

```markdown
# Future Memory — futurememory.studio

Statički sajt za Future Memory studio. Vanilla HTML, CSS, JS. Bez build koraka.

## Lokalno pokretanje

Otvori `index.html` u browseru. To je sve. Za "live reload" tokom rada, pokreni
bilo koji statički server (npr. `python -m http.server 8000`).

## Deploy

- **Netlify Drop**: prevuci folder na netlify.com/drop, dobiješ URL za 60 sekundi.
- **Vercel**: `vercel` u terminalu iz foldera, ili konektuj Git repo.
- **GitHub Pages**: push folder, uključi Pages u settings → Pages → branch.
- **Sopstveni server**: kopiraj folder preko FTP/rsync u web root.

## Izmena sadržaja

Sav tekst sajta je u `index.html` — direktno između HTML tagova.
Otvori u VS Code ili bilo kom editoru, izmeni tekst, sačuvaj, refresh browser.

Sadržaj modal prozora je u `<template id="modal-NN">` blokovima ispod svake
kartice. Edituj na isti način kao i ostali sadržaj.

## Brand

Sve boje, fontovi i razmaci su definisani u `styles/tokens.css` kao CSS
varijable. Ako menjaš brand, menjaš samo taj fajl. Nigde u kodu nema
"hardcoded" boja ili veličina.

## Struktura

- `index.html` — glavna i jedina stranica, sav sadržaj
- `styles/` — CSS organizovan po slojevima
- `scripts/main.js` — modali, scroll efekti, mobilni meni
- `assets/cards/` — slike za 8 servisnih kartica (drop in own images here)
- `AUDIT.md` — početni audit Figma Make output-a
- `DECISIONS.md` — sve odluke donesene tokom izgradnje
```

Then produce the **final report** in the chat. Maximum 15 lines:

- One-line summary of what was built
- Phases completed (list, with checkmarks)
- File count created
- Any genuine blockers (and how they were resolved or what is still pending)
- Three things the operator should review before deploying
- One next-step recommendation (open locally first? deploy to Netlify Drop? push to GitHub?)

End the session. Do not ask "what's next?" Do not offer to do more.

---

## Forbidden during this run

- Asking the operator for permission at the end of each phase
- Translating Serbian copy to English, or paraphrasing it
- Generating fake testimonials, fake customer logos, fake pricing tiers
- Using a framework or build tool unless Figma Make output forces it AND content-editability is preserved
- Using emojis in code, output, or chat messages, or in the site itself
- Adding any color outside the documented palette
- Adding any font outside Geist, Instrument Serif, Geist Mono
- Using border-radius above 28px on any element (no fully-rounded oversized shapes except pill buttons)
- Spring/bounce/elastic motion easing anywhere
- Glassmorphism on more than 2 surfaces total (navbar + modal backdrop are the only allowed instances)
- Aurora gradient on more than 2 surfaces (hero orb + hero `<em>` title word are the only allowed instances)
- Output longer than 5 lines in chat between phases — code goes in files, status goes to `DECISIONS.md`

---

## Definition of done

The operator must be able to:
1. Open `futurememory-website/index.html` in a browser and see the full site rendered correctly, with all 8 service cards, working modals, responsive layout
2. Drag the folder to Netlify Drop and get a live URL within 60 seconds
3. Open `index.html` in VS Code, find any sentence on the site, change it, save, refresh, and see the change — without touching CSS or JS

That is the definition of done for this session.

---

## Phase 6.5 — Lab section with audio-reactive shader

After Phase 6 sections are built, before Phase 7:

1. Add a new section `<section id="lab">` to `index.html` immediately before
   the Kontakt section (`<section id="kontakt">`).

2. The Lab section contains a WebGL fragment shader with audio reactivity
   (three modes: microphone, file upload, generative synth). The complete
   drop-in code is in the operator's `lab-section-dropin.html` file in the
   project root. Read that file and integrate as follows:
   
   - Copy the `<section class="section section--lab" id="lab">...</section>`
     block verbatim into `index.html` at the position above.
   - Move the inline `<style>` block from lab-section-dropin.html into a new
     file `styles/lab.css` and link it from `<head>`.
   - Move the inline `<script>` block into a new file `scripts/lab.js` and
     reference it from before `</body>` with `<script src="scripts/lab.js"></script>`.
   - Do not modify the shader code, the audio analysis logic, or the
     Serbian copy in the section.

3. Add a "Lab" link to the navigation bar between "Studio" and "Kontakt",
   with `href="#lab"`.

4. Add a "Lab" link to the footer navigation, same position.

5. Verify the Lab section uses brand tokens from `tokens.css` for all
   non-shader colors (button borders, text, backgrounds). The shader itself
   has hardcoded palette values matching the brand — leave those alone.

6. Test: scroll to Lab section, click each of three audio mode buttons,
   verify mic permission prompt works, file picker opens, synth produces
   sound. Verify the level meter (bottom-right) updates with audio.

If `lab-section-dropin.html` is not present in the project root, ask the
operator to provide it. This is a genuine blocker.


---

**Begin Phase 1.**
