# GitHub Copilot Instructions - Thin Adapter

Adapter Mode: thin
Adapter Source: .instructions.md
Canonical Snapshot SHA256: 361ac86172268a2f20d4f7a1e407c7dd122f1b0c265d085e872254718b078d22

The canonical policy source for this repository is [.instructions.md](../.instructions.md).

## Required Load Order

1. Read [.instructions.md](../.instructions.md) first.
2. Read baseline rules in [.agent-context/rules/](../.agent-context/rules).
3. Load language profile from [.agent-context/stacks/](../.agent-context/stacks).
4. Load blueprints from [.agent-context/blueprints/](../.agent-context/blueprints) for scaffolding requests.
5. Load domain skills from [.agent-context/skills/](../.agent-context/skills).
6. Load request templates from [.agent-context/prompts/](../.agent-context/prompts).
7. Apply team defaults from [.agent-context/profiles/](../.agent-context/profiles), state awareness from [.agent-context/state/](../.agent-context/state), and thresholds from [.agent-context/policies/](../.agent-context/policies).

## Completion Gate

Run [.agent-context/review-checklists/pr-checklist.md](../.agent-context/review-checklists/pr-checklist.md) before declaring work complete.