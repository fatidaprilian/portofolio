# Design Direction Prompt: Minimalist Dark Canvas (Framer)

## Anchor
A confident dark-canvas portfolio treating the screen as an artboard, featuring pure black surfaces, oversized tightly-tracked white display typography, and a single blue accent. Borrowed from `framer`.

## Tokens
- **Typography**:
  - Display: Inter / System Sans (e.g. `tracking-[-0.04em]` to `tracking-[-0.05em]`)
  - Body: Inter Variable
  - Mono: JetBrains Mono
- **Colors**:
  - `surface-canvas`: `oklch(0.12 0.015 250)` (Near Black)
  - `surface-1`: `oklch(0.18 0.02 250)` (Charcoal Card)
  - `surface-2`: `oklch(0.25 0.02 250)` (Lifted Card)
  - `ink-primary`: `oklch(0.98 0.0 0)` (Pure White)
  - `ink-muted`: `oklch(0.70 0.0 0)` (Gray)
  - `accent-blue`: `oklch(0.60 0.15 250)` (Signal Blue)
  - `hairline`: `oklch(0.22 0.03 250)` (Subtle border)
  - `gradient-violet`: `oklch(0.55 0.2 280)`
- **Spacing**: Base unit `5px` -> Tailwind `1` (4px), `2` (8px), `4` (16px), `8` (32px), `16` (64px)
- **Radius**:
  - Small: `rounded-sm` (6px)
  - Medium: `rounded-lg` (15px)
  - Large: `rounded-2xl` (24px)
  - Pill: `rounded-full` (9999px)
- **Shadow**:
  - Floating Card: `0px 10px 30px rgba(0,0,0,0.5)`, `inset 0 1px 0 rgba(255,255,255,0.1)`
- **Motion**: `duration-300`, `ease-out`, with `reduced-motion` fallbacks.

## Constraints
- WCAG 2.2 AA floor for `ink-muted` on `surface-canvas`.
- Anti-patterns to avoid: (1) 3-column generic SaaS grids, (2) Light-mode interludes (everything must be dark canvas), (3) Multiple chromatic colors.

## Previous Directions
- Kinetic Grid Shift & Liquid Glassmorphic Playground
- Risograph Indie Zine
