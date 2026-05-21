# Future Memory — Figma Make Build Prompt

**For:** Figma Make (AI design generator in Figma)
**Target:** Initial visual design for `futurememory.studio` landing page
**Output:** Single Figma file with desktop (1440px) and mobile (390px) frames
**Site language:** Serbian (latinica with diacritics: š č ž ć đ Š Č Ž Ć Đ)

---

## How to use this prompt

Paste this entire prompt into Figma Make as one input. If Figma Make truncates or struggles with the full length, split at the section dividers (`---`) and paste sequentially, asking Figma Make to "continue from previous output" each time.

Save the resulting Figma file as `futurememory-website.fig`. Export the design as HTML/CSS, place in a folder named `figma-make-output/`, and pass to Claude Code for refinement using the separate Claude Code build instruction.

---

## Project brief

Future Memory is a one-person creative studio in Serbia offering AI-augmented services around the "Second Brain" concept. We help clients build personal knowledge bases controlled by frontier LLMs (Claude, ChatGPT/Codex) that act as Controllers driving external tools (Adobe suite, Figma, ComfyUI, 3D pipelines, code editors).

The landing page must feel:

- **Technical-luxe**, not consumer SaaS
- **Dark mode primary**, with restrained aurora-gradient accents used as punctuation
- **Editorial-typographic**, with serif italic for emotional/conceptual moments and sharp sans-serif for technical clarity
- **Confident and measured**, not AI-hype. The brand voice is honest about LLM limitations — that is a feature.

**Visual reference:** vercel.com (sharpness, grid discipline, dark surface treatment, restrained gradients). Match the level of polish, not the specific marks. Do NOT copy Vercel's triangular logo, do NOT use their exact button styles.

**Secondary references for tone:** linear.app (typographic confidence), arc.net (warmth in dark mode), instrument.com (editorial serif italic).

**Anti-references — explicitly avoid:**

- Generic SaaS hero with abstract 3D blob illustrations
- Stock "AI brain" or "neural network" graphics
- Glassmorphism on every surface
- Neon/synthwave aesthetics
- Bouncy/playful motion
- Emoji anywhere

---

## Design system (build this first as Figma styles + variables)

### Color variables — collection "Future Memory / Colors"

Create these as Figma color variables:

| Variable name | Hex | Use |
|---|---|---|
| `void` | `#050507` | Deepest background, modal overlay base |
| `deep` | `#0A0A0D` | Page background |
| `surface` | `#111114` | Card surface, secondary panels |
| `elevated` | `#18181D` | Modal background, hover surface |
| `elevated-hover` | `#1F1F26` | Active state |
| `border` | `rgba(255,255,255,0.08)` | Default border |
| `border-strong` | `rgba(255,255,255,0.16)` | Hover border, primary card border |
| `border-bright` | `rgba(255,255,255,0.24)` | Focus border |
| `text-primary` | `#FAFAF7` | Body and headline text (slight warm white) |
| `text-secondary` | `#A8A89F` | Subheads, taglines |
| `text-muted` | `#6B6B66` | Mono captions, metadata |
| `text-faint` | `#4A4A45` | Disabled, separators |
| `accent-violet` | `#8B5CF6` | Primary action color |
| `accent-violet-soft` | `#A78BFA` | Hover state for violet |
| `accent-violet-deep` | `#6D28D9` | Pressed state |
| `accent-cyan` | `#22D3EE` | Secondary highlight (rare) |
| `accent-amber` | `#F59E0B` | Warmth cue for "memory" word, very sparing |
| `accent-pink` | `#EC4899` | Gradient terminus only |

**Aurora gradient** (saved as a Figma gradient fill style): 135° linear gradient, stops at `accent-violet` 0%, `accent-cyan` 50%, `accent-pink` 100%.

**Soft aurora background gradient** (for hero orb): conic gradient from 180°, four stops: `accent-violet` → `accent-cyan` → `accent-pink` → `accent-violet`. Apply 120px gaussian blur, 25% opacity.

### Typography — collection "Future Memory / Typography"

Three font families, all from Google Fonts (ensure Latin Extended subset for Serbian diacritics):

- **Display:** `Instrument Serif` — italic variant used for accent words inside headings and the wordmark
- **Sans (UI/Body):** `Geist` — weights 400, 500, 600, 700
- **Mono:** `Geist Mono` — weights 400, 500

Create text styles:

| Style | Font | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| `Display / Hero` | Instrument Serif Italic | 96px | 400 | 1.05 | -2% |
| `Display / Section` | Geist Sans | 56px | 600 | 1.1 | -1.5% |
| `Display / Section Accent` | Instrument Serif Italic | 56px | 400 | 1.1 | -1.5% |
| `Heading / H3` | Geist Sans | 24px | 600 | 1.25 | -0.5% |
| `Body / Lede` | Geist Sans | 20px | 400 | 1.5 | 0 |
| `Body / Regular` | Geist Sans | 16px | 400 | 1.6 | 0 |
| `Body / Small` | Geist Sans | 14px | 400 | 1.5 | 0 |
| `Mono / Label` | Geist Mono | 12px | 500 | 1.4 | 5% |
| `Mono / Caption` | Geist Mono | 13px | 400 | 1.4 | 0 |
| `Button / Default` | Geist Sans | 15px | 500 | 1 | 0 |

**Mobile typography overrides** (create as separate variants):

- `Display / Hero Mobile`: 44px
- `Display / Section Mobile`: 32px
- `Body / Lede Mobile`: 17px

### Spacing — collection "Future Memory / Spacing"

4px base, geometric scale. Create as number variables for use in auto-layout:

`s1=4`, `s2=8`, `s3=12`, `s4=16`, `s5=20`, `s6=24`, `s8=32`, `s10=40`, `s12=48`, `s16=64`, `s20=80`, `s24=96`, `s32=128`, `s40=160`

### Radius — collection "Future Memory / Radius"

`sm=6`, `md=12`, `lg=20`, `xl=28`, `pill=999`

---

## Frame setup

Create two top-level frames:

1. **Desktop** — 1440 × 5800px (page is tall, hero is 800px, rest follows)
2. **Mobile** — 390 × 6400px

Both frames have background fill `deep` (`#0A0A0D`) and a subtle film-grain overlay (apply an SVG noise texture at 4% opacity, fixed across the frame). The noise is mandatory — it breaks the flatness of large dark surfaces and is what separates this from generic dark-mode templates.

Center content uses a 1280px max-width container on desktop with 24px horizontal padding. Mobile uses full-width with 16px horizontal padding.

---

## Page sections (in order)

Build these sections as auto-layout frames stacked vertically. Each is a section.

---

### Section 1 — Navigation (sticky, 64px tall)

Sticky top navbar, full width, background `deep` at 70% opacity with backdrop blur 20px applied. Border-bottom 1px `border`.

**Layout** (horizontal auto-layout, space-between, padding 24px horizontal, height 64px):

- **Left — Wordmark:** Two text layers side by side, no space between:
  - "Future " — Geist Sans Medium 18px, color `text-primary`
  - "Memory" — Instrument Serif Italic 22px, color `text-primary`, slight warm shift (overlay `accent-amber` at 15% opacity, or just leave white — designer's call)
- **Center — Nav links** (horizontal auto-layout, 32px gap): "Drugi mozak" · "Šta radimo" · "Kako radimo" · "Studio" · "Kontakt". All `Body / Small`, color `text-secondary`, hover transitions to `text-primary`.
- **Right — CTA button:** Pill button `Zakaži razgovor`. See Button components below.

**Mobile variant:** Replace nav links with a hamburger icon (24px, three lines, color `text-primary`). Wordmark stays. CTA becomes icon-only (small chat bubble icon) or hidden.

---

### Section 2 — Hero (full viewport on desktop, 100vh = 800px frame)

**Background:** Page-level `deep`, with the hero orb composited on top.

**Hero orb:** Single circular shape, 800 × 800px, positioned top-right at offset (+200px right, -200px top — so it bleeds off the edge). Fill = conic aurora gradient (see Design System). Blur 120px Gaussian. Opacity 25%. Slow rotation animation hint in design notes (40 second loop) — the rotation happens in code, but lay it out as if rotating.

**Content** (vertical auto-layout, centered horizontally and vertically in frame, max-width 880px, 24px gap):

1. **Eyebrow pill badge:**
   - Pill shape, padding 6px horizontal 4px vertical, border 1px `border-strong`, background `surface` 60% opacity
   - Text "Future Memory · Studio" in `Mono / Label`, color `text-secondary`

2. **Headline (h1):**
   - Two-line composition:
     - Line 1: "Drugi mozak." — Geist Sans 700, 96px, color `text-primary`
     - Line 2: "Na zahtev." — Instrument Serif Italic, 96px, with Aurora gradient applied to text fill (use Figma's gradient fill on text)
   - Line height 1.05, letter spacing -2%

3. **Lede paragraph:**
   - Single paragraph, max-width 720px, centered text alignment
   - Text style `Body / Lede`, color `text-secondary`
   - Copy verbatim:
     > "Vaša lična baza znanja, povezana sa najjačim LLM modelima na tržištu, postaje sagovornik koji razume vaš kontekst i kontroliše alate koje već koristite — od Photoshop-a do ComfyUI-a, od web razvoja do 3D rekonstrukcije."

4. **Action buttons** (horizontal auto-layout, 12px gap, centered):
   - Primary button: "Pogledaj šta radimo"
   - Ghost button: "Šta je drugi mozak?"

5. **Meta line** (horizontal auto-layout, 8px gap, mono caption):
   - "futurememory.studio · Novi Sad / Beograd / Daljinski"
   - All in `Mono / Caption`, color `text-muted`

**Mobile hero:**
- Hero shrinks to 100vh = ~640px on a 390×844 device
- Headline scales to 44px
- Lede scales to 17px
- Orb scales to 500×500 and repositions
- Stack all elements vertically with reduced gaps (16px)

---

### Section 3 — "Šta je drugi mozak" explainer

Long-form prose section. Establishes the concept. Two-column layout on desktop, single column on mobile. Vertical padding 96px top and bottom.

**Layout** (horizontal auto-layout on desktop, 64px gap):

- **Left column** (sticky position, 30% width, max 380px):
  - Mono label `01 — Koncept` in `Mono / Label`, color `text-muted`, margin-bottom 16px
  - Heading: "Drugi mozak nije aplikacija. To je *arhitektura*." (last word in Instrument Serif Italic)
  - `Display / Section`, color `text-primary`, with the italic word using `Display / Section Accent` and amber color
  - Sub-lede: "Verovatno ste čuli za 'Second Brain'. Evo šta tu zaista postoji — i šta nije marketing." — `Body / Regular`, color `text-secondary`, margin-top 16px

- **Right column** (70% width, max 720px):
  Five body paragraphs, each `Body / Lede`, color `text-secondary`, line-height 1.6, paragraph spacing 20px. Some words italicized in Instrument Serif within paragraphs for emphasis — only one or two per paragraph, and only on conceptual key terms.

  **Paragraphs verbatim:**

  > Zamislite bazu podataka u koju vremenom unosite stvari koje vam trebaju. Beleške sa sastanaka. Naučne radove. Snimke razgovora. Fotografije tabli sa idejama. Foldere klijenata. Vaše stare projekte. Bilo šta što biste inače "zaboravili gde ste sačuvali".

  > Tu bazu zatim pohrani jedan od velikih modela — Claude ili ChatGPT/Codex — i indeksira je tako da joj može pristupiti preko chata. Ne čita sve odjednom. Pretražuje relevantno, citira izvor, i odgovara na osnovu vaših podataka. Sa minimalnom potrošnjom tokena.

  > Rezultat: imate sagovornika koji zna ono što vi znate, ali sa savršenim sećanjem. Pita ga sa telefona dok ste u kafiću. Pita ga sa laptopa dok pišete izveštaj. Pita ga šta ste odlučili na sastanku od pre tri meseca, i on vam citira tačan paragraf iz transkripta.

  > Ovaj sistem nije Notion sa AI dugmetom. Nije ChatGPT sa fajlovima. To je *modularan i prenosiv* sistem koji vi posedujete — vaši podaci žive na vašem disku, vaš LLM ih čita pod vašim pravilima, i možete ga preneti sa jedne platforme na drugu kada se pejzaž promeni. (A promeniće se.)

  > Drugi mozak nije zamena za vaš mozak. To je *spoljni indeks* — kao što je biblioteka spoljni indeks za civilizaciju. Vaše misli ostaju vaše. Ovaj sistem samo prestaje da vas tera da ih pamtite napamet.

  **Caveat card** (below paragraphs, surface background, 24px padding, border 1px `border`, radius 12px, left border-left 2px `accent-amber`):
  - Mono label `Iskrenost` in `Mono / Label`, color `accent-amber`
  - Body: "LLM-ovi haluciniraju. To je činjenica, ne softverska greška. Sistem koji vam pravim je dizajniran tako da to zna i da radi *uprkos* tome — sa proverama, citiranjem izvora, i diskovima koji se zovu 'ne dozvoli mi da pošaljem ovo bez verifikacije'. Bez te discipline, drugi mozak postaje treći problem."

**Mobile:** Collapse to single column. Left column becomes a top header before the paragraphs. No sticky behavior.

---

### Section 4 — Service cards grid (THE CENTERPIECE)

Most important section visually. 8 cards of identical size in a 4×2 grid on desktop, 2×4 on tablet, 1×8 on mobile.

**Section header** (centered, max-width 720px, margin-bottom 64px):
- Mono label `02 — Radovi`, `Mono / Label`, color `text-muted`
- Heading: "Osam radnih tokova. *Jedan kontroler.*" (italic word in Instrument Serif)
- Lede: "Svaki od ovih tokova koristi LLM kao Kontroler koji vodi alate i pipeline-ove. Vi razgovarate sa kontrolerom. Kontroler radi posao. Kliknite na karticu za detaljnije objašnjenje." — `Body / Lede`, color `text-secondary`

**Grid:** 4 columns × 2 rows on desktop, 24px gap between cards.

**Card component spec — critical: ALL 8 CARDS EXACTLY SAME SIZE:**

- Frame: 320 × 380px (desktop), full-width × 320px (mobile)
- Background: `surface`
- Border: 1px `border`, radius 12px
- Layout (vertical auto-layout, no padding on container):
  - **Top 60% (228px):** Image area
    - Background image fills this area, object-fit cover
    - Gradient overlay on top: linear gradient from transparent at top to `void` at 70% opacity at bottom
    - 12px radius on top corners only
  - **Bottom 40% (152px):** Content area
    - Padding: 24px all sides
    - Vertical auto-layout, space-between
    - Top group:
      - Card title (`Heading / H3`, color `text-primary`)
      - Card tagline (`Body / Small`, color `text-secondary`, max 2 lines)
    - Bottom row:
      - "Detaljnije →" — `Mono / Label`, color `text-muted`, aligned bottom-right

**Card hover state** (create as a Figma component variant):
- Image opacity drops to 35%
- Image scales 1.05× (Figma transform)
- Border becomes `border-bright`
- "Detaljnije →" color changes to `accent-violet-soft` and scales to 14px (`Body / Small`)
- Add `shadow-md` to card (0 8px 24px black 40%)

**The 8 cards — title + tagline + suggested image vibe:**

| # | Title | Tagline | Image vibe (for placeholder) |
|---|---|---|---|
| 01 | Drugi mozak | Vaša lična baza znanja, indeksirana i pretraživa kroz razgovor. | Dark library shelves with single warm light beam, photographic |
| 02 | Web razvoj | Sajtovi i aplikacije, sa kodom koji ostaje vaš i razumljiv. | Close-up of code editor with violet syntax highlight, dark theme |
| 03 | Brending i grafika | Vizuelni sistemi i prepress, kontrolisani direktno iz razgovora. | Type specimen on dark paper, single oxblood ink mark |
| 04 | Generativna slika i animacija | ComfyUI workflow-i pod prst, sa lokalnim modelima i kontrolom kvaliteta. | Abstract aurora gradient mesh, slightly diffuse |
| 05 | 3D i Gaussian Splatting | Fotorealistična 3D rekonstrukcija iz fotografija ili video snimaka. | Point-cloud rendering of a sculpted bust, dark background |
| 06 | Lokalna AI infrastruktura | Privatni LLM-ovi na vašem hardveru. Vaši podaci ne idu u tuđi cloud. | Dark server rack with single LED, low-key photography |
| 07 | Glas i transkripcija | Whisper STT pipeline od mikrofona do bilo koje aplikacije, jednim klikom. | Vintage microphone in low-key dark light, single highlight |
| 08 | Mentorstvo i obuka | Naučite da koristite Claude Code i Codex profesionalno, bez gubljenja godina. | Two chairs in dark studio, dimensional with sidelight |

**Image placeholders:** Generate 8 placeholder images in Figma. They can be (in order of preference):
1. Actual placeholder photos matching the vibes above, generated by Figma AI
2. Solid dark gradient blocks with a small mono label "card-01" through "card-08" centered
3. Just dark `surface` rectangles with `border` outline

**Modal component** (create separately, not visible on page, document for engineer):

This is the expanded view that opens when a card is clicked. Build as a separate Figma component:

- Backdrop: full-viewport rectangle, fill `void` at 70% opacity, backdrop blur 12px effect
- Modal container: 720 × auto px max, centered, max-height 85vh
  - Background: `elevated`
  - Border: 1px `border-strong`, radius 20px
  - Padding: 32px all sides
  - Vertical auto-layout, 24px gaps
- Modal contents (vertical stack):
  1. Close X button (top-right absolute, 32px tap area, ghost button)
  2. Hero image (full width, 280px tall, radius 12px, object-fit cover)
  3. Modal title (`Display / Section` but reduced to 36px, color `text-primary`)
  4. Section: "Šta je ovo" — mono label + body paragraph(s)
  5. Section: "Šta dobijate" — mono label + bulleted list (custom bullets: violet dot)
  6. Section: "Tehnologije" — mono label + horizontal flex-wrap of technology badges (small pill chips, mono font, 1px border, transparent background)
  7. Primary CTA: "Pošalji upit" button at bottom

For Figma: design ONE modal layout fully populated (use Card 01 content), then duplicate as overlay states for the other 7 — but only show the canonical one in the main file; engineer will template it.

**Card 01 Modal content for the Figma reference:**

- **Title:** Drugi mozak — vaša lična baza znanja
- **Šta je ovo:**
  > "Lična baza znanja koju zajedno punimo vašim materijalom — beleške, PDF-ovi, transkripti razgovora, slike, foldere klijenata, stare projekte. Sve to ulazi u sistem koji LLM indeksira i čita pod vašim pravilima. Pristupate joj preko običnog chata na telefonu ili laptopu. Sistem citira izvor uz svaki odgovor."
  > "Vaši podaci ostaju na vašem disku. Ne odlaze u nečiji cloud osim ako vi tako ne odlučite. Sistem je dizajniran da bude prenosiv — danas radi sa Claude-om, sutra sa novim modelom."
- **Šta dobijate** (5 bullets):
  - Strukturisanu bazu znanja sa konvencijama koje vi razumete
  - Chat interfejs (telefon + laptop) koji pretražuje samo vašu bazu
  - Pipeline za dodavanje novih dokumenata
  - Pravila citiranja — svaki odgovor sa izvorom
  - Obuku za održavanje sistema bez moje pomoći
- **Tehnologije** (badges): `Obsidian` `Claude Projects` `RAG` `Markdown` `Python` `Local-first`

---

### Section 5 — Proces ("Kako radimo")

Four-step process. Vertical stair-step layout on desktop (each step indented slightly more than previous, creating a diagonal flow). Vertical stack on mobile.

**Section header:**
- Mono label `03 — Proces`
- Heading: "Kako *radimo*." (italic word)
- Lede: "Bez 'AI magije'. Sa razgovorom, dokumentom, i isporukom koju možete da proverite."

**Steps** (each a card, surface background, 32px padding, border 1px `border`, radius 12px):

1. **01 — Razgovor:** "Pišete šta vam treba — ili pričamo. Bez ograničenja forme. Cilj je da razumem šta zaista treba da uradimo, a ne šta zvuči dobro u brifu."

2. **02 — Dokument:** "Ja pišem kratak dokument koji opisuje šta će sistem da radi, šta neće, koje su pretpostavke, i koliko košta. Vi potvrđujete ili menjamo dok ne legne."

3. **03 — Izgradnja:** "Radim. Sa Claude Code-om i Codex-om kao izvršiocima, mojim nadzorom kao arhitektom i verifikatorom. Pravim međukorake koji se mogu testirati. Bez 'javljam se kad bude gotovo'."

4. **04 — Isporuka:** "Predajem fajlove, kod, dokumentaciju. Pokazujem šta radi, šta ne, i koje su poznate granice. Sve ostaje vaše — vaš Git, vaš nalog, vaši podaci."

Each step has: step number in `Mono / Label` color `text-muted` at top, `Heading / H3` title, `Body / Regular` paragraph color `text-secondary`.

On desktop: 4 cards arranged in a 4-column grid, but each card has a slight `margin-top` offset (0, 32, 64, 96px) creating a staircase descending right. On mobile: vertical stack.

---

### Section 6 — Studio (about)

Two-column on desktop. Left: prose. Right: credentials panel.

**Section header in left column:**
- Mono label `04 — Studio`
- Heading: "Ko stoji iza ovoga." (no italic accent on this one — title is matter-of-fact)

**Body paragraphs** (left column, max-width 560px):

> "Future Memory je studio Nenada Kuzmanovića. Docent na Fakultetu tehničkih nauka u Novom Sadu. Poslednjih pet godina sam proveo radeći 15 sati dnevno na razumevanju, testiranju i puštanju u rad svega što je moglo da se preuzme sa GitHub-a i pokrene na RTX 3090."

> "Paralelno sa tim radim na *AUTO ENGINE* projektu — sistemu za kriptografski upravljano AI-asistirano inženjerstvo. To je razlog zašto ovaj studio ima jaku poziciju oko poštenja, verifikacije, i razlike između 'model je rekao' i 'stvar je urađena'."

> "Ako tražite nekoga ko će vam reći da je AI rešenje svega — to nije ovaj studio. Ako tražite nekoga ko zna gde su granice i kako da ih koristi u vašu korist — onda da."

**Right column — Credentials panel** (surface background, 32px padding, border 1px `border`, radius 12px, fixed width ~380px):

**Tehnička osnova** (mono label):
- RTX 3090 lokalni rig
- Linux + Windows hibrid
- Claude Code + Codex za izvršavanje
- Ollama (Qwen, Mistral, Llama) za lokalni LLM
- ComfyUI za generativnu sliku/video
- Adobe paket + Figma za grafiku
- Git za sve, bez izuzetka

(List items in `Body / Small`, color `text-secondary`, with `accent-violet` 4px dot bullets, 12px gap between items.)

**Lokacija** (mono label, below the tehnička osnova list, separated by 1px `border` divider):
- "Novi Sad. Rad za klijente lokalno i daljinski." (`Body / Small`)

---

### Section 7 — Kontakt

Centered, single-column, no panels. Vertical padding 96px.

**Layout** (vertical auto-layout, centered, max-width 640px, 24px gap):

- Mono label `05 — Kontakt`
- Heading: "Imate *pitanje*?" (italic word)
- Lede: "Pišite kratko šta vam treba. Odgovaram u roku od 2 radna dana." (`Body / Lede`, `text-secondary`)
- Action buttons row (horizontal auto-layout, 12px gap, centered):
  - Primary button: `hello@futurememory.studio` (the email IS the button text)
  - Ghost button: `Zakaži 30 min razgovor`
- Footnote: "Za hitne projekte: napišite 'HITNO' u naslov. Inače uobičajen tempo." (`Mono / Caption`, `text-muted`)

---

### Section 8 — Footer

Background `void` (slightly darker than page), padding 64px top 32px bottom, border-top 1px `border`.

**Layout** (horizontal auto-layout, space-between on desktop, vertical stack on mobile):

- **Left — Brand block:**
  - Wordmark: "Future *Memory*" (same as nav)
  - Domain caption: "futurememory.studio" in `Mono / Caption`, `text-muted`

- **Center — Nav links** (vertical auto-layout, 8px gap): Drugi mozak · Šta radimo · Kako radimo · Studio · Kontakt — all `Body / Small`, `text-secondary`

- **Right — Meta block** (right-aligned):
  - "© 2026 Nenad Kuzmanović" in `Mono / Caption`
  - "Novi Sad, Srbija" in `Mono / Caption`
  - Both color `text-muted`

**Footer strip** (full width below main footer, padding 16px vertical, border-top 1px `border`):
- Centered tagline: "Drugi mozak. Vaš sistem, vaša kontrola, vaš kod." in `Mono / Caption`, `text-muted`

---

## Reusable component specifications

Build these as proper Figma components with variants.

### Button component

Three variants: Primary, Ghost, Link.

**Primary** (default state):
- Background `accent-violet`
- Text `text-primary`, `Button / Default`
- Padding 12px vertical, 24px horizontal
- Radius `pill` (999px)
- Hover variant: background `accent-violet-soft`, shadow glow 0 0 32px `accent-violet` 25%
- Active variant: background `accent-violet-deep`

**Ghost:**
- Background transparent
- Border 1px `border-strong`
- Text `text-primary`, `Button / Default`
- Same padding and radius as primary
- Hover variant: border `border-bright`, background `surface`

**Link:**
- No background, no border
- Text `text-primary` with right arrow `→` 8px right margin
- Padding 0
- Hover: arrow translates 4px right, text color `accent-violet-soft`

### Badge / chip component

For Tehnologije section in modals and inline labels.

- Pill shape, padding 4px vertical 10px horizontal
- Border 1px `border`
- Background transparent
- Text `Mono / Caption`, color `text-secondary`
- No hover state needed

### Mono label component

Used for section eyebrows like "01 — Koncept".

- Text style `Mono / Label`
- Color `text-muted`
- Uppercase optional (designer's call — try both, pick what reads better at 12px)

---

## Asset list

Generate or placeholder these in Figma:

1. **Favicon** — 32×32 svg. Suggestion: lowercase italic "fm." in Instrument Serif, white on transparent. Or a simple geometric mark — a circle bisected by a diagonal line in `accent-violet`.

2. **OG image** — 1200×630, dark background `deep`, large wordmark "Future Memory" centered, subtle aurora gradient orb in corner, tagline below: "Drugi mozak. Na zahtev."

3. **8 service card images** — see image vibes table above. If Figma Make cannot generate suitable images, leave them as placeholder dark gradient blocks with mono labels `card-01` through `card-08` and a note to the engineer to swap in real images.

4. **Hamburger icon** — 24×24, three horizontal lines, `text-primary` color.

5. **Close X icon** — 24×24, two diagonal lines, `text-primary` color.

---

## Mobile-specific notes

- All sections stack to single column at ≤640px
- Hero compresses, orb shrinks to 500×500
- Cards become 100% width, 320px tall (image area 192px, content 128px)
- Process steps lose the staircase offset, become vertical
- Studio section: prose first, credentials panel after
- Modal becomes full-screen with safe-area-inset padding

---

## What Figma Make should output

A single Figma file containing:

1. **Page 1 — Cover:** Brand summary, design system swatches (colors, type, spacing), and table of contents
2. **Page 2 — Desktop design:** 1440×5800 frame with all sections built top-to-bottom
3. **Page 3 — Mobile design:** 390×6400 frame with all sections built top-to-bottom
4. **Page 4 — Components:** Buttons, cards (default + hover variants), modal, badge, mono label
5. **Page 5 — Modal detail:** Full modal example using Card 01 content

Use Figma auto-layout for everything. Use components and variants — not detached frames. Use the variable collections (Colors, Spacing, Radius) for all property values so the engineer who exports this can refactor in one place.

When done, the engineer (Claude Code) will export the file to HTML/CSS and refine it against the separate Claude Code build instruction.

---

## What Figma Make should NOT do

- Do not invent additional sections or features
- Do not change the Serbian copy
- Do not switch to English
- Do not add stock photos of "diverse team smiling"
- Do not add fake testimonials, fake client logos, fake pricing
- Do not use emoji
- Do not use any color outside the documented palette
- Do not use any font outside Geist, Instrument Serif, Geist Mono
- Do not add icons unless explicitly requested (hamburger, close X)
- Do not use shadow effects above `shadow-lg` strength (no dramatic drop shadows)
- Do not add page-section background images other than the hero orb
- Do not use any aurora gradient outside hero orb and hero `<em>` title word

---

**Begin design generation.**