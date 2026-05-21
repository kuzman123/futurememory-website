# DECISIONS — Future Memory Website Build

## Build target
**Decision:** Vanilla HTML + CSS + minimal JS. No framework, no build step, no Tailwind.
**Reason:** Operator requirement — edit content directly in index.html without build step.
**Evidence:** Figma Make output fails this requirement (React/Vite, content in JS array).

## Image placeholders
**Decision:** CSS gradient backgrounds for all 8 card image areas and modal image areas.
**Reason:** No card images provided. Spec says "generate placeholder dark gradient images programmatically in CSS (no broken img tags)."
**Files operator should drop in:** assets/cards/card-01.jpg through card-08.jpg
**How to activate:** Add `background-image: url('/assets/cards/card-NN.jpg')` to the `.card__image` inline style on each card article.

## Hero h1 typography
**Decision:** Hero h1 first line uses Geist Sans 700 (sans), not Instrument Serif.
**Reason:** Visual reference (React output) shows "Drugi mozak." in sans-serif bold. Only `<em>Na zahtev.</em>` uses Instrument Serif italic + aurora gradient. Base h1 spec says Instrument Serif italic but the hero is the only h1 and requires split treatment.
**Override:** `.hero__title` resets font to sans, `.hero__title em` restores Instrument Serif italic with aurora gradient.

## Section h2 `<em>` styling
**Decision:** Section h2 `<em>` elements use Instrument Serif italic, inheriting text color (no added color).
**Reason:** Spec says "exactly one italicized word (Instrument Serif)" per section heading. Aurora gradient is ONLY for the hero `<em>` per spec: "This is the ONE place where the aurora gradient touches type."
**Note:** React output added amber (#F59E0B) to "arhitektura" in explainer — this is NOT carried over per spec discipline.

## Modal content storage
**Decision:** `<template id="modal-NN">` elements for all 8 card modals.
**Reason:** Spec requires this approach. JS clones template content into modal container on open. Content remains editable as plain text in index.html.

## Phase 6.5 — Lab section
**Decision:** BLOCKED. `lab-section-dropin.html` not found in project root.
**Spec says:** "If lab-section-dropin.html is not present in the project root, ask the operator to provide it. This is a genuine blocker."
**Action taken:** HTML placeholder comment added in index.html where Lab section should go. Nav and footer links for Lab section are commented out.

## aria-labels in Serbian
**Decision:** All aria-labels use Serbian, as required by spec.
- Close button: `aria-label="Zatvori"`
- Hamburger: `aria-label="Otvori meni"` / `aria-label="Zatvori meni"`
- Hero orb: `aria-hidden="true"` (decorative)

## Card grid layout
**Decision:** CSS Grid with `repeat(4, 1fr)` on desktop, `repeat(2, 1fr)` on tablet, `1fr` on mobile.
**Reason:** Spec specifies 4×2 on desktop, 2×4 on tablet, 1×8 on mobile.
**Card fixed dimensions:** 320px wide × 380px tall desktop, full-width × 320px mobile (as specified).

## Scroll-hide scrollbar
**Decision:** Scrollbars hidden via CSS (matching React reference style).
**Reason:** Dark sites at this polish level hide scrollbars for visual cleanliness.

## og-image.png
**Decision:** Placeholder — 1200×630 not generated (requires graphics tooling).
**Operator action:** Drop assets/og-image.png when ready for production.
