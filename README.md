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

Sadržaj modal prozora je u `<template id="modal-NN">` blokovima u `index.html`,
odmah ispod `.cards-grid` sekcije. Edituj na isti način kao i ostali sadržaj.

## Dodavanje slika za kartice

Ubaci slike u `assets/cards/` — nazivi: `card-01.jpg` do `card-08.jpg`.
Detalji u `assets/cards/README.md`.

Da aktiviraš sliku umesto CSS gradijenta, dodaj u svaki `<div class="card__image">`:
```html
style="background-image: url('/assets/cards/card-01.jpg')"
```

## Brand

Sve boje, fontovi i razmaci su definisani u `styles/tokens.css` kao CSS
varijable. Ako menjaš brand, menjaš samo taj fajl. Nigde u kodu nema
"hardcoded" boja ili veličina.

## Struktura

```
futurememory_web_website/
├── index.html            — glavna i jedina stranica, sav sadržaj
├── styles/
│   ├── tokens.css        — brand varijable (boje, fontovi, razmaci)
│   ├── base.css          — reset, body, tipografija
│   ├── layout.css        — grid, sekcije, kontejner
│   ├── components.css    — dugmad, kartice, modal, nav
│   ├── effects.css       — gradijenti, hover, aurora, card placeholders
│   └── responsive.css    — mobilni i tablet breakpointi
├── scripts/
│   └── main.js           — modali, scroll efekti, mobilni meni
├── assets/
│   ├── favicon.svg
│   ├── og-image.png      — placeholder, zameniti pre produkcije (1200×630px)
│   └── cards/            — 8 slika za kartice (card-01.jpg … card-08.jpg)
├── AUDIT.md              — audit Figma Make output-a
└── DECISIONS.md          — sve odluke tokom izgradnje
```

## Lab sekcija (faza 6.5 — blokirano)

Lab sekcija sa WebGL audio-reaktivnim shaderom nije integrisana jer
`lab-section-dropin.html` nije pronađen u root folderu projekta.
Obezbedi tu datoteku i integrišu prema uputstvima u Phase 6.5 iz
build instrukcija.
