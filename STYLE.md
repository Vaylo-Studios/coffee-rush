# Coffee Rush — Style Guide

Warm, family-owned, small-batch-since-1994 brand. Editorial and calm, not
corporate-chain. Motion is used sparingly to feel alive, never flashy.

## Color

Defined in `app/globals.css` as CSS custom properties, mapped into Tailwind
via `@theme inline` (use as `bg-espresso`, `text-terracotta`, etc.).

```
--background:       #fffbf4   base page background
--surface:           #f9f4ed   section/card background (one step down)
--surface-elevated:  #eee7dd   raised surface
--border:            #e4dbcb   default hairline
--border-hover:      #d4cab9   hover state hairline
--espresso:          #4c2d1d   primary dark, headings on light, dark section bg
--sand:               #d4cab9   muted numerals, dividers
--cream:              #fffbf4   same value as background, used for text-on-dark
--charcoal:           #2e2a27   body text base
--terracotta:         #b86b4b   accent: kickers, CTAs, underlines, hover states
--palmetto:           #6d7861   secondary accent, used sparingly (blobs, variety)
--gulf:               #6f8991   tertiary accent, rarely used
--text-primary:       #2e2a27
--text-secondary:     #6b5f52
--text-muted:         #a49a8c
```

Rules:
- Espresso is the dark anchor: headings, dark section backgrounds (e.g.
  OperatorProgram), primary buttons.
- Terracotta is the single accent color for interactive/attention moments
  (kickers, CTA buttons, hover underlines, hover borders). Don't introduce a
  second accent for the same job.
- Palmetto and gulf are used only in decorative motifs (blobs) for variety,
  never for text or UI controls.
- Opacity suffixes (`/10`, `/20`, `/60`) are how motifs and hover states stay
  subtle — decorative elements should read at 10-25% opacity, never full.

## Typography

- Display font: Montserrat (`--font-display`, weight 800, `-0.01em` tracking,
  `text-wrap: balance`) via the `.font-display` class. Used for all headings.
- Body font: Inter, default on `body`.
- Kicker labels: `.font-kicker` — Montserrat 700, uppercase, `0.16em`
  tracking, always terracotta, always small (`text-[10.5px]` to
  `text-[11px]`).

Heading scale: `text-3xl` mobile up to `text-5xl` desktop, `uppercase`,
`leading-tight`, color `text-espresso` (or `text-cream` on dark sections).

## Spacing & Layout

- Section rhythm: `mx-auto max-w-7xl px-6 py-24 md:px-10`.
- Section boundary: `border-b border-border` between stacked sections on the
  same background; sections that change background (surface vs background vs
  espresso) don't need a border, the color shift is the divider.
- Every section opens with `RushLine` (small accent line, `tone="light"` on
  dark sections) then the kicker, then the heading.
- Radius: `rounded-sm` everywhere — cards, buttons, photo frames, CTA blocks.
  Never a large radius; the brand is squared-off and editorial.

## Motion & Motifs

Reusable SVG motif components in `components/motifs/`: `Blob`, `CoffeeBean`,
`SteamCup`. Keyframes/utilities live in `app/globals.css`:

```
.animate-bean-float        5.5s
.animate-bean-float-slow   7.5s
.animate-blob-drift        9s
.animate-steam-1/2/3       3.2s, staggered 1.1s / 2.2s
```

Usage pattern:
- `Blob`: large (`h-56` to `h-80`), positioned bleeding off a section corner
  (`-top-16 -left-16` style), colored at 4-10% opacity (`text-terracotta/10`,
  `text-sand/[0.04]` on dark), `pointer-events-none`, `aria-hidden`. Stagger
  multiple blobs in one section with `animationDelay: "3s"` so they don't
  pulse in sync.
- `CoffeeBean`: small (`h-5 w-3.5` up to `h-14 w-9`), rotated via the `--r`
  CSS custom property (e.g. `style={{ "--r": "18deg" }}`), opacity 15-30%.
  Used both as a floating decorative accent and, at higher opacity, as a
  literal per-card icon (see Values.tsx).
- `SteamCup`: used once per page max, next to a section heading, as a
  literal icon rather than a background accent.
- Respect `prefers-reduced-motion` globally — already handled in
  `globals.css`, don't override it per-component.

All decorative motifs are `pointer-events-none` and `aria-hidden` — they
never intercept clicks or get announced to screen readers.

## Interaction Patterns

- Hover states use the Tailwind `group`/`group-hover:` pattern, always
  `transition-colors duration-300` or `transition-transform duration-300`.
- Underline reveal: `<span className="block h-[2px] w-6 origin-left
  scale-x-0 bg-terracotta transition-transform duration-300
  group-hover:scale-x-100" />` — used above list-item titles and below
  cards.
- List/card hover: subtle background shift (`hover:bg-cream/50` or
  `hover:bg-surface`) plus a small icon/number translate
  (`group-hover:translate-x-1`, `group-hover:-translate-y-1`). Never scale
  the whole card, never add a shadow-pop.
- Numbered lists (career ladder, guest-experience steps): numeral in
  `text-sand` (muted) at rest, shifts to `text-terracotta/50` or brightens
  on hover — the numeral is secondary to the label.
- `Reveal` component (`components/Reveal.tsx`): scroll-triggered fade-in
  wrapper, used on every section's heading and content blocks, with a small
  staggered `delay={i * 0.03–0.06}` on repeated list/grid items.

## Layout Integrity Rules

- Never reintroduce a full-bleed photo-banner treatment (`FullBleedPanel`)
  — explicitly rejected for this brand, it reads too aggressive/corporate.
- Two-column photo/text sections must match column height at the source
  (CSS Grid `items-stretch` + `PhotoFrame`'s `fill` prop), never by padding,
  filler copy, or reusing a photo twice.
- No emojis anywhere. No em dashes in copy — use commas or periods.

## Assets

- Logo: `public/brand/coffee-rush-logo.png` — RGBA with a properly
  decontaminated transparent background (soft-alpha chroma-key, edges
  cleaned of the old cream-colored halo). If it's ever regenerated, redo the
  decontamination pass, don't reuse a hard-threshold cutout — a hard
  threshold leaves a visible light fringe around the letters against dark
  backgrounds.
