# Project Brief — Farid Eka Aprilian Portfolio

## 1. Project Vision
The goal of this project is to build an outstanding, highly creative, and visually memorable personal portfolio for **Farid Eka Aprilian**. The design explicitly rejects the generic layout grids of modern SaaS websites in favor of an interactive **Risograph Indie Zine & Interactive Graphic Collage** aesthetic. 

The portfolio showcases double-specialization: elite coding craftsmanship (clean engineering foundations) combined with expert graphic/UI/UX design authority (asymmetry, bold typography, offset printing separations, tactile interaction).

## 2. Core Visual & Layout Characteristics
- **Anchor Style:** Risograph Indie Zine. Elements feature imperfect offset layers (shifted double-borders in pink/teal simulating screen printing plates), bold display type, and textured layout paper.
- **Interactive Tactile Stickers:** All active skill chips, tags, and project links are styled as physical paper stickers that randomly tilt (`rotate()`) and scale on hover.
- **Asymmetric Grid Spreads:** The project index is built as an asymmetric 2x2 modular matrix, and individual project specifications are shown as 3-column spreads (design tokens, visual typeset frame, and design logs).
- **Voice Triplet Typography:**
  - *Inter (Sans)*: Giant display headers and system navigation actions.
  - *JetBrains Mono (Monospace)*: Design tokens, padding specs, coordinates, and technical metadata.
  - *Fraunces (Serif Italic)*: Editorial commentary, hand-written footnotes, and designer quotes.

## 3. Technology Stack
- **Framework:** Vue 3 (Composition API, `<script setup>`).
- **Build System:** Vite.
- **Styling:** CSS Variables (OKLCH color primitives & semantic mappings) + Tailwind CSS v3 utility classes.
- **Smooth Scroll:** Lenis.
- **Orchestrated Animation:** GSAP (orchestrating the once-per-session boot calibration animation only).
- **Fonts:** `@fontsource-variable` packages loaded for Fraunces, Inter, and JetBrains Mono.
- **Icons:** `lucide-vue-next`.

## 4. Key Constraints & Non-negotiables
- **Accessibility Floor:** Full compliance with WCAG 2.2 AA (minimum contrast ratios of 4.5:1 for text).
- **Reduced Motion Support:** Respect system-level prefers-reduced-motion preferences by disabling Lenis smooth scroll, GSAP timelines, and hover sticker animations.
- **Bilingual Copy:** Fully supports Indonesian (`id`) and English (`en`) via an in-memory translations block.
- **Forbidden Visual Patterns:**
  - Generic SaaS 3-column card grids with rounded corners and soft box shadows.
  - Terracotta terracotta/roman exhibition catalog leftovers (from v3).
  - Dry, clinical technical manuals (from v4-draft).
  - Custom mouse overlays or word-by-word scroll text reveals.
