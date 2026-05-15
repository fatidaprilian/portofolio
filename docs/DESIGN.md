# DESIGN.md — Portofolio Farid Eka Aprilian
## Versi: 3.0 — Exhibition Catalog (Zero-Based Redesign)

---

## 1. Design Intent and Product Personality

The portfolio is staged as a printed exhibition catalog. Each project becomes a room. The visitor walks through wall labels, curator's notes, and plate panels rather than browsing a card grid. The personality is **curatorial, evidence-led, slow on purpose** — a developer who clearly cares about typography, hanging punctuation, plate numbering, and the ritual of a museum print catalog.

The brief from the user is explicit: the site must read as if the author trained in design or multimedia, not as a developer template dressed up. Every element earns its place by either holding evidence (year, role, stack), framing the protagonist (the photo, the headline, the curator's note), or carrying a structural function (rule line, plate label, floor plan number).

---

## 2. Audience and Use-Context Signals

- Hiring managers and creative directors scanning for taste, not feature checklists
- Potential collaborators who recognize editorial craft details
- Primary context desktop, secondary mobile; both must work without a custom cursor or scroll-jacked text reveals
- Reader expects a slower, more deliberate pace than the average dev portfolio

---

## 3. Visual Direction and Distinctive Moves

**Anchor:** Printed exhibition catalog. Specific reference point: catalog accompanying a small monographic show — wall labels at lower-left, curator's note in a narrow column, plate panels carrying chapter numbering, colophon at the back.

**Three at-a-glance product-specific signals (visible in first viewport):**
1. A wide installation view occupies the dominant column; a small wall label sits at the bottom-left holding year, role, and plate code (PR.MMYY).
2. The headline is set in Fraunces with `opsz` pushed near max regardless of render size, so the hairline serif stays present. `hanging-punctuation: first` is on globally — quotes break out of the measure on every curator's note.
3. A plate code (PR.0126, PR.0925) appears next to every project. It is never explained in the body. The colophon at the back is the only place it is decoded.

**Three distinct moves (anti-generic):**
- *Authoring decision in photography:* the protagonist is a single editorial portrait staged as installation view; subsequent rooms use plate panels (typeset plate composition) until installation photography is shot. Plate panels carry product function (identification + chapter marker), not decoration.
- *Type behavior signature:* hanging punctuation global, tabular numerals on every metadata block, project titles always typeset Fraunces opsz ~120 even when rendered at 32 px.
- *One unexplained element:* plate code (PR.MMYY). Only the colophon room decodes it. This is the "this person actually thinks about craft" moment.

**Forbidden by anchor and brief:**
Marquee tech logos, custom cursor, scroll-driven word-by-word reveals, parallax 3D, neon glow, balanced card grids, generic dashboard chrome, dark cinematic residue from v1, editorial magazine v2 column rhythm replayed in a new palette.

---

## 4. Color, Typography, Spacing, and Density

### 4.1 Color truth — 4 raw, 8 semantic roles, dual mode

Components never call raw colors. Components consume semantic roles. Both modes are derived (not inverted): light = warm paper hue 80, dark = cool slate hue 250, accent terracotta hue 25 carries character but reduces chroma in dark mode.

| Role             | Light value (OKLCH)         | Dark value (OKLCH)          | Purpose                            |
| ---------------- | --------------------------- | --------------------------- | ---------------------------------- |
| `--surface-page` | `oklch(0.97 0.008 80)`      | `oklch(0.16 0.012 250)`     | canvas                             |
| `--surface-raised` | `oklch(0.99 0.005 80)`     | `oklch(0.21 0.014 250)`     | panels, plate cards                |
| `--surface-sunken` | `oklch(0.94 0.012 80)`     | `oklch(0.13 0.010 250)`     | section dividers, footer           |
| `--ink-primary`  | `oklch(0.20 0.020 80)`      | `oklch(0.92 0.012 80)`      | body, headline                     |
| `--ink-secondary` | `oklch(0.45 0.020 80)`     | `oklch(0.70 0.014 80)`      | metadata, wall labels              |
| `--ink-tertiary` | `oklch(0.62 0.015 80)`      | `oklch(0.55 0.012 80)`      | captions, muted                    |
| `--rule`         | `oklch(0.85 0.010 80)`      | `oklch(0.30 0.012 250)`     | leader lines, borders              |
| `--accent`       | `oklch(0.55 0.18 25)`       | `oklch(0.62 0.14 25)`       | links, focus, plate number         |

**Raw palette (4 colors): Paper (warm cream-white, hue 80), Ink (warm near-black, hue 80), Slate (cool dark blue-gray, hue 250), Terracotta (muted brick, hue 25).** All other surfaces and text derive from these via the role tokens.

`color-scheme: light dark` is set on the root. `light-dark()` is used in tokens with a manual dual-declare fallback for older browsers. A no-flash inline script reads `localStorage.theme` (`auto` | `light` | `dark`) and sets `data-theme` on `<html>` before paint.

WCAG 2.2 AA verified pairs:
- light: `--ink-primary` on `--surface-page` ≈ 14.4:1; `--accent` on `--surface-page` ≈ 4.7:1; `--ink-secondary` on `--surface-page` ≈ 5.4:1
- dark: `--ink-primary` on `--surface-page` ≈ 12.1:1; `--accent` on `--surface-page` ≈ 4.6:1

### 4.2 Typography — Voice Triplet

| Voice             | Family                         | Used for                                           | Range       |
| ----------------- | ------------------------------ | -------------------------------------------------- | ----------- |
| Author (editorial) | Fraunces variable (OFL)       | Hero headline, project title, curator's note opener, pull quotes | 18–120 px |
| System (neutral)   | Inter variable (OFL)           | Body, navigation, wall label, metadata             | 13–18 px    |
| Machine (mono)     | JetBrains Mono variable (OFL)  | Plate code, year, stack tags, stats, code-adjacent | 11–14 px    |

Behavior signatures:
- `hanging-punctuation: first` global
- `font-feature-settings: 'tnum'` on every numeric metadata block
- Project titles set Fraunces with `font-variation-settings: "opsz" 120` regardless of rendered size — hairline serif stays elegant in cards
- `text-wrap: balance` on display headlines, `text-wrap: pretty` on body
- `font-display: swap` on every face; size-adjust kept default to avoid CLS

Total subset budget: ≤ 180 KB after variable subsetting (handled by @fontsource-variable per-script latin slices).

### 4.3 Spatial system

- Base unit: 4 px → step scale 4, 8, 12, 16, 24, 32, 48, 72, 112, 168, 248
- Section vertical padding: `clamp(96px, 12vw, 192px)`
- Section horizontal padding: `clamp(20px, 5vw, 96px)`
- Measure: 38–60ch on body, narrower in caption columns to force a slow read
- Spacing reasoning: the anchor's catalog page demands generous margins and column rules; cards and tight gutters are explicitly rejected.

---

## 5. Token Architecture and Alias Strategy

- Source of truth: `docs/design-intent.json` → `colorTruth` and `tokenSystem`
- Order: primitive (`--paper`, `--ink`, `--slate`, `--terracotta`) → semantic (`--surface-*`, `--ink-*`, `--rule`, `--accent`) → component (`--cta-bg`, `--plate-label-color`, etc., when needed)
- Components only consume semantic and component tokens
- Tailwind extend mirrors semantic names (`paper-page`, `paper-raised`, `ink-primary`, `accent`) so utility classes stay valid

---

## 6. Responsive Recomposition Plan

Mobile (≤ 720px): single-column floor plan, plate panels stack, wall label moves above the photo, nav collapses to brand mark + theme toggle.

Tablet (721–1024 px): plate spread becomes 8/4 instead of 7/3; index floor plan keeps the row metaphor but compresses the spacer columns.

Desktop (≥ 1025 px): full asymmetric `plate-spread` (1fr 7fr 1fr 3fr), `index-floorplan` (1fr 1fr 6fr 1fr 3fr) and `editor-note` (2fr 7fr 3fr) grids active; cropped chapter glyph and full hairline serif headlines visible.

At least one major surface mutates between mobile and desktop: the project list switches from row-per-room (desktop) to a stacked plate stack (mobile), and curator's note margin annotations dock to the bottom of the body column on mobile.

---

## 7. Motion, Interaction, and Feedback

### 7.1 Motion charter (4 buckets, no cinematic)

| Bucket     | Duration   | Easing                           | Used for                          |
| ---------- | ---------- | -------------------------------- | --------------------------------- |
| Micro      | 80–120 ms  | `ease-out`                       | hover, focus ring, button press   |
| Standard   | 240–360 ms | `cubic-bezier(0.65, 0, 0.35, 1)` | state change, panel open, theme switch |
| Editorial  | 700–1000 ms| `cubic-bezier(0.22, 1, 0.36, 1)` | plate reveal, room transition     |
| Cinematic  | banned     | —                                | not allowed (template signal)     |

Default global easing: `cubic-bezier(0.65, 0, 0.35, 1)`. Browser defaults `ease`, `ease-in-out` not used.

### 7.2 Plate reveal — CSS native, no library needed

Plate panels reveal with `animation-timeline: view()` on supporting browsers — `clip-path: inset(0 100% 0 0)` opens to `inset(0 0 0 0)` between `entry 0%` and `cover 30%`. The visual reads like a curtain pulling left to right across the plate. No GSAP, no IntersectionObserver fallback choreography because the static end-state is already accessible.

Fallback for browsers without `animation-timeline`: plates render fully visible at rest; no reveal motion is required to read the page.

### 7.3 GSAP scope

GSAP stays in the project (already a dep) but is restricted to:
- Opening sequence once per session — three hero elements orchestrated in ≤ 1.2 s
- Theme toggle micro-state and route-style focus handoff

GSAP is not used for hover, generic section fade-in, or per-word reveals.

### 7.4 Three required interaction-design decisions

1. **Focus management on navigation:** every in-page anchor click moves focus to the destination room's `<h1>` (`tabindex="-1"` + `.focus()`), so screen readers announce the room and keyboard users do not lose place.
2. **Progressive disclosure (3 tiers):** wall label (one line) → curator's note (constraint / decision / outcome) → deep dive (productContext, impactMetrics). Already encoded in data; enforced in interaction.
3. **Keyboard path:** every interactive element has a consistent `:focus-visible` ring (terracotta 2 px, offset 4 px). Tab order matches reading order. Skip-to-content link present.

### 7.5 No custom cursor, no decorative noise

Default OS cursor stays. No `mix-blend-mode` overlay. No grain overlay. Hover signal is carried by accent ring on links and buttons only.

### 7.6 Reduced motion

`prefers-reduced-motion: reduce` disables clip-path reveals, GSAP timelines, and theme transition; static rest-state is the design.

---

## 8. Component Language, States, and Morphology

Primary surfaces:
- `wall-label` — meta block (year, role, plate code) bottom-left of plate spread
- `plate-spread` — installation view + caption (template A)
- `index-floorplan` — room list (template B)
- `editor-note` — curator's note / about / deep dive (template C)
- `colophon-room` — closing room: type credits, plate code key, build notes

State keys: `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `empty`, `error`, `transition`.

Rules:
- No soft shadows. Borders use `--rule`. Surfaces differentiate via `--surface-raised` and `--surface-sunken`.
- No card grids. The project list is a numbered floor plan, never a 3-column tile rhythm.
- Plate panels look like typeset plate art (large plate code + project monogram + year), not framed thumbnails.
- Repeated structures (every room) get the same composition deliberately — repetition is the catalog grammar.

---

## 9. Source Boundaries and Context Hygiene

- Allowed sources: current user brief (this final decision sheet), current repo evidence, current docs, official font docs (OFL), official `animation-timeline` MDN spec
- Tainted: prior dark-cinematic v1, prior editorial-magazine v2 visual residue (kept only as content evidence: copy strings, project list)
- External inspiration is not copied; only the conceptual frame of "exhibition catalog" is borrowed, not any specific museum's brand

---

## 10. Accessibility Non-Negotiables

- WCAG 2.2 AA contrast across all text and meaningful non-text in both themes
- Focus visible on every interactive element with 3:1 against adjacent surface
- Target size ≥ 24×24 CSS px (44 preferred), spacing exception applied where not possible
- Color is never the only signal: theme toggle uses icon + text label, plate code is text not color, focus ring is shape change (ring) plus color
- Keyboard: skip link, focus management on hash navigation, no focus traps, motion-sensitive elements respect `prefers-reduced-motion`
- Live region (`aria-live="polite"`) on theme switch announces "Light theme" / "Dark theme" / "Auto"

---

## 11. Anti-Patterns to Avoid

- Marquee of tech logos, glow neon, custom cursor, parallax 3D, scroll text reveal per word
- Generic 3-column card grid for projects
- Soft drop shadow on every surface
- Centered "minimal" hero with one tagline
- Decorative grid wallpaper, calibration marks, scanlines used as background
- Default Tailwind component-kit chrome (rounded-2xl + shadow-lg + gradient)
- Dark mode as inverted light mode — both modes must read as different moods of the same catalog
- Loader animation that fakes work; readiness gating only

---

## 12. Implementation Notes for Future UI Tasks

- Theme: tri-state toggle (Auto / Light / Dark) backed by `localStorage.theme`. Inline `<head>` script writes `data-theme` before paint. `light-dark()` used where supported with dual-declare fallback.
- Photography: until installation photos are shot, every room renders a typeset plate panel. The hero alone uses the existing `/avatar-github.jpg` as a curated portrait inside a framed plate. Colophon notes the interim state explicitly.
- Plate code: `PR.MMYY`, derived from project commencement month. Source field added to `projects.js`. Decoded in `colophon-room` only.
- Numbering: roman plate numbers (ROOM I … ROOM N) on the floor plan; Arabic plate code (PR.MMYY) inside each room.
- Library research: no new motion library is required. Native CSS `animation-timeline: view()` carries the plate reveal. GSAP is already installed and is reused only for the opening orchestration. No GSAP ScrollTrigger work in v3.
- Build verification: `npm run build` is the gate.
