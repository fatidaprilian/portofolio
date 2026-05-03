---
applyTo: "**"
---

# GitHub Copilot Path Instructions - Thin Adapter

Adapter Mode: thin
Adapter Source: .instructions.md
Canonical Snapshot SHA256: 91efb30348194cff4f7a820caabeb60cd7ca59dea3982a7d3991c7b18991d225

This repository is governed by a strict instruction contract.
Use [.instructions.md](../../.instructions.md) as the canonical policy source.
Use .agent-context/ for technical rules, prompts, checklists, policies, and state.
Treat README.md as overview/install/user context only when governance files conflict.

## Critical Bootstrap Floor

- If your host stops at this file, continue the chain manually before coding.
- Read `.agent-instructions.md` next when it exists.
- Memory continuity does not replace bootstrap loading.
- For UI, UX, layout, screen, tailwind, frontend, or redesign requests, load [bootstrap-design.md](../../.agent-context/prompts/bootstrap-design.md) and [frontend-architecture.md](../../.agent-context/rules/frontend-architecture.md) before code edits.
- For UI scope, include a one-line Motion/Palette Decision in the Bootstrap Receipt; product categories are heuristics, not style presets.
- For UI scope, create or refine `docs/DESIGN.md` and `docs/design-intent.json` before UI implementation.
- For documentation-first requests, create or refine required project docs in English by default and do not write application, firmware, or UI code until the user asks or approves.
- For backend, API, data, auth, error, event, queue, worker, or distributed-system requests, load only relevant global rules from .agent-context/rules/ ([link](../../.agent-context/rules)).
- For ecosystem, framework, dependency, or Docker claims, perform live web research.
- Resolve runtime choices from project evidence and live official documentation; resolve structural planning from constraints and architecture boundaries.

## Mandatory Bootstrap Chain

1. Load [.instructions.md](../../.instructions.md).
2. Load `.agent-instructions.md` when present.
3. Load only relevant files from .agent-context/rules/ ([link](../../.agent-context/rules)).
4. Apply matching prompts from .agent-context/prompts/ ([link](../../.agent-context/prompts)).
5. Enforce .agent-context/review-checklists/ ([link](../../.agent-context/review-checklists/pr-checklist.md)).
6. Use .agent-context/state/ ([link](../../.agent-context/state)) and .agent-context/policies/ ([link](../../.agent-context/policies)) only when relevant.
7. Use project docs and live evidence for runtime, dependency, and architecture claims.

## Bootstrap Receipt

For non-trivial coding, review, planning, or governance work, produce a short Bootstrap Receipt before implementation output: `loaded_files`, `selected_rules`, `skipped_rules`, `unreachable_files`, and `validation_plan`.

## Completion Gate

Run [pr-checklist.md](../../.agent-context/review-checklists/pr-checklist.md) before declaring work complete.

If this adapter drifts from canonical behavior, refresh from [.instructions.md](../../.instructions.md) and update the hash metadata.
