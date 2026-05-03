# Architecture Decision Record

## Decision

Use the existing Vue 3 and Vite single-page application as the delivery surface for **Editorial Magazine Issue**, a bright vertical portfolio concept with a real pre-press loading gate.

## Context

The user rejected the previous dark cinematic pass because it felt like a simplified version of the old design. The active direction is a bright editorial magazine: asymmetric spreads, cropped chapter numbers, vibrant print accents, and different motion per section. The user also clarified that the loader must be functional: it should block entry until the content is rendered and ready.

## Chosen Approach

- Keep the existing runtime and package manager.
- Use the already-declared GSAP dependency for loader and section choreography.
- Use existing project and career data as content evidence.
- Convert the surface into a vertical editorial issue.
- Render the main content behind a pre-press loader, lock scroll while loading, then release the page after DOM, font, image, and initial frame readiness.
- Use the local GitHub avatar asset as a right-page square profile proof so the hero has a clear subject without depending on GitHub at runtime or upscaling the 460px source into a blurred full-height image.
- Record the design contract before UI implementation.
- Preserve accessibility, reduced-motion behavior, keyboard access, and clear external links.

## Alternatives Considered

### Avoid GSAP

Native CSS and IntersectionObserver could handle a simpler version, but the user's feedback calls for stronger per-section movement. GSAP is already present in `package.json`, and official documentation confirms npm usage, plugin registration, ScrollTrigger, and `gsap.matchMedia()` for responsive cleanup.

### Use WebGL or Three.js immediately

The editorial magazine direction does not need WebGL. Print-production motion, typography, and layout carry the concept more directly.

### Keep the previous horizontal model

The user explicitly preferred scrolling downward. A vertical editorial issue keeps the portfolio easier to navigate while allowing each section to feel different.

## Consequences

- The portfolio has a real entry gate instead of a decorative loading animation.
- The page remains vertical and more natural to browse.
- Older component files may become unused until a cleanup pass.
- Validation stays simple through Vite build and the repo validation wrapper.
