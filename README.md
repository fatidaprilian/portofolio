# Personal Portfolio — Farid Eka Aprilian

Welcome to the personal portfolio of **Farid Eka Aprilian**, designed and built as a premium, fluid, and highly interactive **Kinetic Grid Shift & Liquid Glassmorphism (v5.0)** website.

This website explicitly breaks away from standard, generic layouts. It showcases professional visual design authorship, layout confidence, and high-performance frontend engineering.

---

## Visual and Design Philosophy

- **Liquid Gradient Canvas:** Slow-drifting, organic background gradient blobs that animate dynamically, providing depth and movement.
- **Frosted Glass Panels:** Frosted modular containers built using CSS backdrop blurs and semantic OKLCH borders that illuminate dynamically on hover.
- **Spring Scale Proximity:** Active buttons, works grid cards, and skill tags expand and tilt subtly on hover using smooth transition ease.
- **Voice Triplet Typography:**
  - **Inter Variable (Sans)** for bold sans-serif display headers and system navigation.
  - **JetBrains Mono Variable (Monospace)** for metrics, milestones, technical metadata, and duration periods.
  - **Fraunces Variable (Serif Italic)** for elegant quotes and personal philosophy comments.
- **Dual Semantic Color Themes:** Supports **Alabaster Prism (Light Mode)** and **Obsidian Cyber (Dark Mode)** derived separately through custom oklch coordinates.

---

## Technical Stack and Engineering Foundations

- **Core:** Vue 3 (Composition API, `<script setup>`) with HTML5 and Vanilla CSS.
- **Styling:** CSS variables for OKLCH theme mapping + Tailwind CSS v3 utility classes.
- **Smooth Scroll:** Lenis.
- **Animations:** CSS transition and keyframe springs + GSAP (confined strictly to once-per-session intro animations).
- **Icons:** `lucide-vue-next`.
- **Accessibility Floor:** Full keyboard navigation support, skip-links, focus-managed layout transitions, and WCAG 2.2 AA color contrast compliance.

---

## Documentation Mapping

For detailed planning and architectural notes, visit the [Documentation Index](file:///e:/Project/portofolio/docs/doc-index.md) under the `docs/` folder:
- **[Project Brief](file:///e:/Project/portofolio/docs/project-brief.md)** — Project scope, stack, requirements, and constraints.
- **[Architecture Decision Record](file:///e:/Project/portofolio/docs/architecture-decision-record.md)** — Rationale behind visual anchoring, package selections, and structural planning.
- **[DESIGN.md](file:///e:/Project/portofolio/docs/DESIGN.md)** — Complete layout guide, typography chart, spacing beats, and color semantic aliases.
- **[design-intent.json](file:///e:/Project/portofolio/docs/design-intent.json)** — Core visual parameters, anti-repeat blocklists, and token derived logic.
- **[Flow and Layout Overview](file:///e:/Project/portofolio/docs/flow-overview.md)** — Interactive Mermaid charts and layout schematics.

---

## Local Development

### Prerequisites
Make sure you have Node.js installed on your system.

### Scripts
- `npm install` — Install required Fontsource variable weights, Lenis, and GSAP dependencies.
- `npm run dev` — Spin up local Vite development server.
- `npm run build` — Compile high-performance production build.
- `npm run validate` — Run production check (Vite build & asset output verification).
- `npm run avatar:sync` — Pull and cache local copy of your GitHub profile photo for offline rendering resilience.
