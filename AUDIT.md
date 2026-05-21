# AUDIT — Figma Make Output

Date: 2026-05-21

## What Figma Make captured

- Hero section: correct copy, layout, aurora orb
- All 8 service cards: correct titles, taglines, modal content
- Explainer section: correct structure
- Process section: staircase layout
- Studio section: two-column layout
- Contact section: correct copy
- Footer: correct

## What Figma Make got wrong (ranked by severity)

### Brand violations (critical)
1. **Framework**: React/Vite/TypeScript — fails "edit content directly in index.html" requirement
2. **Dependencies**: Tailwind CSS, Radix UI, shadcn/ui, lucide-react — ~200MB node_modules
3. **Content in JS**: All copy lives in a CARDS array in App.tsx, not editable HTML tags
4. **Build step required**: Operator cannot drag folder to Netlify Drop; must run `pnpm build`

### Layout issues (moderate)
1. Card dimensions not fixed (320×380px) — uses auto-fill minmax grid
2. Cards grid uses `repeat(auto-fill, minmax(280px, 1fr))` not the specified 4×2 layout
3. Modal image overlapping position bug (absolute positioned gradient over image)

### Polish (minor)
1. Process section staircase only shown on desktop via Tailwind class, mobile stack correct
2. Footer nav links use inline onMouseEnter handlers (fragile pattern)
3. No scroll-triggered reveal animations implemented
4. No hero entrance animation implemented

## Decision

**REBUILD as vanilla HTML/CSS/JS** using the React output as visual reference only.

The React output is 0% usable as a base (build step, framework lock-in, non-editable content).
The visual design quality is good — use it as reference for layout, spacing, and component styling.
All content will be placed directly in index.html as visible text between semantic HTML tags.
