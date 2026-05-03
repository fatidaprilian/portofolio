# Architecture Decision Record

## Decision

Use the existing Vue 3 and Vite single-page application as the delivery surface for the Rank 1 portfolio concept, **The Narrative Thread**.

## Context

The user wants to try the Gemini research result for a highly impressive designer-style portfolio. The selected concept prioritizes cinematic narrative, chaptered storytelling, high-end typography, and fluid motion. The current project is already a Vue 3 and Vite portfolio with Tailwind CSS, Lenis, local fontsource packages, and local data modules for projects and career profile.

## Chosen Approach

- Keep the existing runtime and package manager.
- Avoid new dependencies in this first implementation pass.
- Use existing project and career data as content evidence.
- Convert the surface into a cinematic single-page chapter sequence.
- Record the design contract before UI implementation.
- Preserve accessibility, reduced-motion behavior, keyboard access, and clear external links.

## Alternatives Considered

### Add GSAP immediately

GSAP matches the research direction, but adding a new animation dependency requires current official documentation verification and dependency installation. The first pass can validate the concept using native CSS, IntersectionObserver, and existing Lenis.

### Use WebGL or Three.js immediately

The research references WebGL-heavy portfolios, but the selected narrative concept does not require 3D to prove the direction. A CSS-led cinematic thread is lower risk and easier to validate before investing in heavier spatial work.

### Keep the existing component-by-section structure

The existing structure is functional, but the requested reset needs a stronger unified concept. The first pass can centralize the cinematic surface in `src/App.vue` while preserving the existing data modules and leaving older components available for future reuse or cleanup.

## Consequences

- The portfolio can be reviewed quickly as a full concept without dependency churn.
- Older component files may become unused until a cleanup pass.
- Future rich-motion upgrades can add GSAP or WebGL after the visual direction is accepted.
- Validation stays simple through Vite build and the repo validation wrapper.
