# Architecture Decision Record — Portofolio Farid Eka Aprilian
## Versi: 4.0 — Risograph Zine & Interactive Collage Redesign

## Decision

Re-architect the visual design system of the portfolio from the previous **Exhibition Catalog (v3)** to an authoritative **Risograph Indie Zine & Interactive Graphic Collage (v4)**. All margin rules, typography scales, token parameters, and layout morphology are updated to fit this highly playful, creative, and memorable design-system-first theme.

## Context

The user explicitly requested a **redesign from 0 (scratch)** to establish an identity as a **highly creative, unique, and playful UI/UX Designer & Graphic Developer**. The previous Swiss manual coordinate grids were discarded as they felt too technical, rigid, and similar to a system administration sheet, failing to showcase bold graphic talent, design playfulness, and high-impact visual authorship.

The new theme is derived directly from experimental indie publishing, risograph printmaking, and physical sticker collages. This positions the developer as a master of bold graphic layouts, typography toys, and interactive offsets.

## Chosen Approach

- **Token System Reset:** Reset the semantic tokens to a dual operational state:
  - **Fresh Zine (Light Mode):** Warm pulp paper background (`oklch(0.96 0.015 80)`), dense screen-printing carbon ink (`oklch(0.15 0.01 200)`), fluorescent pink screen ink (`oklch(0.65 0.25 345)`), and riso teal (`oklch(0.55 0.18 200)`) as the accent.
  - **Midnight Neon (Dark Mode):** Deep dark midnight printing plate background (`oklch(0.14 0.02 245)`), white-cyan text (`oklch(0.95 0.01 245)`), and luminous glowing green sticker paper (`oklch(0.85 0.20 120)`) as the accent.
- **Zero Card Shadows and Roundings:** Replace rounded card surfaces with imperfect offset borders and tactile zine sheets.
- **Halftone screen portrait circle:** Stage the developer's avatar in the hero within an offset halftone screen circle with cyan and pink outline printing marks.
- **Tactile Sticker Morphology:** Navigation links, skills, and project triggers are styled as physical graphic stickers. On hover, they playfully tilt and shift rotation angles.
- **2x2 Asymmetric Modular Specimen Index Matrix:** Projects are indexed as a bold, oversized specimen index matrix grid rather than standard rows.
- **Typographic Voice Triplet:** Pair highly-structured `Inter variable` bold system titles with `JetBrains Mono variable` system specs and `Fraunces variable` italicized handwritten log notes.

## Consequences

- The portfolio pivots to a highly-designed, extremely playful, and unique interface proving layout and graphic design mastery.
- Visual continuity is preserved on the content layer, while the visual shell is completely re-authored.
- Strict compliance with `AGENTS.md` and `FE-007` zero-based redesign rules is achieved.
