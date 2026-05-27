# Design System and Style Guidelines
## Version 5.0 — Kinetic Grid Shift & Liquid Glassmorphism (Zero-Based Redesign)

---

## 1. Design Intent and Product Personality

This website is styled as a premium, fluid, and highly interactive **Kinetic Grid Shift & Liquid Glassmorphic Playground**. The personality is **innovative, highly refined, visually memorable, and technically authoritative**. It is structured explicitly to demonstrate your dual expertise: elite engineering craftsmanship (clean code, performant assets) paired with outstanding graphic/interaction design sensitivity.

Unlike typical static layouts or eccentric catalogs, the entire experience is built as a series of semi-transparent, frosted glass modules that float over a canvas rich with slowly morphing background gradient fields. Spacing and borders are highlighted through electric glows that react dynamically to interaction, making the interface feel alive, premium, and designed to the absolute teeth.

---

## 2. Audience and Use-Context Signals

- **Creative directors and design-minded tech leaders** looking for candidates who combine robust engineering skills with exceptional visual taste and layout sensitivity.
- **Developers and engineering teams** who value clean component architectures and high performance.
- **Context of Use:** Primarily desktop for rich micro-interactions (mouse-tracking glass effects, magnetic scales), and secondary mobile stacking for fast, clean, high-impact readability. The site remains fully operable under keyboard control and prefers-reduced-motion profiles.

---

## 3. Visual Direction and Distinctive Moves

- **Visual Reference Point:** Sleek, high-end creative digital studio pages featuring dark obsidian glass surfaces, shifting modular grid panels, and deep animated background gradients.
- **Three At-A-Glance Visual Signals:**
  1. **Tightly-Tracked Display Headers:** Clean, heavy sans display typography overlapping frosted, semi-transparent layout plates.
  2. **Morphing Gradient Backdrop:** Vibrant, slow-floating gradient blobs that hover and morph continuously in the background, providing organic depth.
  3. **Interactive Target Framing:** The profile portrait is mounted within clean target vectors that rotate and react dynamically on cursor approach.

- **Three Distinctive Interaction Moves:**
  - **Frosted Glass Panel Morphology:** Layout divisions are presented as floating frosted glass panels with `backdrop-filter: blur(20px)` and oklch active borders that illuminate on hover.
  - **Spring-Scale Hover Proximity:** Skill chips, buttons, and works cards expand and rotate subtly using smooth CSS transitions and GSAP, giving them a physical, springy weight.
  - **Dynamic Slide-In Spec Sheets:** Project grids are displayed as clean modular cards. Clicking a card slides open a detailed specification pane detailing the problem, decision, and outcome in clean, modern terms.

---

## 4. Color, Typography, Spacing, and Density Decisions

### 4.1 Color System — 6 Primitives, 8 Semantic Roles, Dual Mode

We employ separate lightness curves for light and dark modes to avoid flat inversion effects:

| Role | Alabaster Prism (Light Mode) | Obsidian Cyber (Dark Mode) | Purpose |
| --- | --- | --- | --- |
| `surface-page` | `oklch(0.97 0.005 80)` | `oklch(0.12 0.015 250)` | Canvas background |
| `surface-raised` | `oklch(0.99 0.005 80 / 0.8)` | `oklch(0.18 0.02 250 / 0.7)` | Frosted glass panel backing |
| `surface-sunken` | `oklch(0.93 0.01 80)` | `oklch(0.08 0.01 250)` | Code block and quote backings |
| `ink-primary` | `oklch(0.12 0.01 250)` | `oklch(0.97 0.01 250)` | Primary titles and body |
| `ink-secondary` | `oklch(0.38 0.01 250)` | `oklch(0.76 0.01 250)` | Descriptive blocks and readouts |
| `ink-tertiary` | `oklch(0.60 0.01 250)` | `oklch(0.50 0.01 250)` | Technical details and metadata labels |
| `rule` | `oklch(0.88 0.01 80)` | `oklch(0.22 0.03 250)` | Inactive glass panel borders |
| `accent` | `oklch(0.48 0.22 260)` | `oklch(0.78 0.16 200)` | Glowing cobalt blue / neon cyan |

**Color Primitives:** Obsidian Black (dark base, hue 250), Alabaster White (light base, hue 80), Electric Cyan (neon cyan, hue 200), Fluorescent Magenta (pink magenta, hue 345), Deep Cobalt (blue accent, hue 260), and Indigo Glow (dark line base, hue 280).

### 4.2 Typography — Voice Triplet

| Family | Used for | Range |
| --- | --- | --- |
| **Inter variable** | Giant sans-serif display headers, navigation items, buttons | 14px – 96px |
| **JetBrains Mono variable** | Milestones, tech tags, metrics, and parameters | 11px – 13px |
| **Fraunces variable** | Italicized editorial callouts and philosophy quotes | 16px – 20px |

---

## 5. Token Architecture and Alias Strategy

- CSS variables are defined inside `:root` and `[data-theme='dark']` mappings.
- Primitives are declared as CSS custom properties and consumed exclusively through semantic tokens.
- Tailwind CSS utility mappings extend from these semantic roles (e.g. `bg-page`, `text-primary`, `border-rule`).

---

## 6. Responsive Recomposition Plan

- **Mobile (≤ 720px):** Single-column stack; glass card borders merge; background blur filters are optimized for GPU efficiency; tag chips layout dynamically.
- **Tablet (721px – 1024px):** Dual-column project grid; sidebar notes stack inline.
- **Desktop (≥ 1025px):** Full fluid grids, floating glass panel hover springs, and cursor tracking active.

---

## 7. Motion, Interaction, and Feedback Rules

- **Micro-animations (80ms – 120ms):** Hover and focus spring scales and active border glows.
- **Standard Transitions (280ms – 360ms):** Smooth panel shifts, drawer overlays, and theme switches.
- **Editorial Reveals (700ms – 900ms):** GSAP-orchestrated entrance animations.
- **Reduced Motion:** If prefers-reduced-motion is active, all GSAP entrance timelines, floating blob drifts, and magnetic scales are bypassed. Standard glass modules render instantly.

---

## 8. Component Language, States, and Morphology

- **Panels:** Frosted, semi-transparent rectangles outlined by thin rules. On hover, the border glow transitions into a bright cyan or cobalt highlight.
- **Stickers and Tags:** Skill tags and Milestones are framed in minimal glass pills that scale up and glow on hover.
- **Forms:** Input fields are outlined by sleek rules with floating labels that lift on focus.

---

## 9. Source Boundaries and Context Hygiene

- Keep third-party assets focused.
- All code structures are derived dynamically. We avoid copying flat external templates.
- Contrast ratios are verified in both modes using oklch coordinates.

---

## 10. Accessibility Non-Negotiables

- **Contrast Floor:** WCAG 2.2 AA (minimum 4.5:1 for text, 3:1 for interactive states).
- **Keyboard Navigation:** Full tabindex indexing, focus highlights (`2px solid oklch(--accent)` with `4px offset`), and skip-links are fully operable.
- **Screen Reader Support:** Theme transitions, language switches, and state shifts are broadcast immediately using active aria announcements.

---

## 11. Anti-Patterns to Avoid

- **No esoteric room/catalog terms:** Replaced by clear, modern page divisions.
- **No terracotta clay colors:** Replaced by obsidian and alabaster neon accents.
- **No rigid grid lines:** Replaced by frosted glass panels that float and morph on scroll.
- **No global custom mouse overlays:** Replaced by native cursor interactive highlights.

---

## 12. Implementation Notes for Future UI Tasks

- Build responsive layers using Tailwind’s viewport modifiers.
- Use native CSS `backdrop-filter: blur(20px)` for glass panels.
- Configure all interactive spring timelines inside `src/style.css` using GPU-accelerated CSS animations (`transform` and `opacity`) where possible.
