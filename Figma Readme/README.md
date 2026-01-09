# Front-End Handoff (Figma → Notion → GitHub)

This folder is the quick-start handbook for external designers building frontend in Figma. Follow the workflow and guardrails below to keep the system aligned with the live product.

## Source of Truth
- Notion is canonical. Start here: https://www.notion.so/2dc5a0fd01ef812ab28af56129a9d5a2
- Read first: AI Start Here / Context Map, Brand & Design System, Design System Playbook, Marketing Site, Platform/App.
- After shipping, mirror updates back into Notion (what changed, where the spec lives, and any deltas).

## Workflow
1) Read the Notion pages above before you touch Figma.
2) Design in Figma using only tokens and components already defined (no ad-hoc colors, radii, or shadows).
3) Export or annotate with token names, spacing scale, and typography scale. Call out any exceptions explicitly.
4) Create a short handoff note in Notion (links, decisions, open questions).
5) Engineers land changes in GitHub; you acknowledge in Notion once merged.

## Guardrails (must follow)
- One Surface Rule: no card-on-card, no tile-on-tile, no border-on-border.
- No new colors, radii, shadows, or spacing outside the token set.
- No emojis in UI copy; keep tone clear and direct.
- Keep copy minimal: avoid dashes and filler words.
- Prefer vertical stacking over dense grids; let content breathe.
- Motion: meaningful only (entrance, hierarchy), respect the system durations.

## What to hand off
- Layout with spacing tokens called out (e.g., space-4, space-6).
- Type with token names (e.g., h1, h2, meta, small).
- Color tokens (e.g., text-default, text-muted, bg-surface, border-default, brand-primary).
- Component variant selections (e.g., Button primary/secondary, Surface tone base/overlay/raised).
- Any conditional states (hover, focus, pressed) noted.

## File map in this folder
- README.md (this guide)
- import { defineConfig } from 'vite'.md (Vite config reference)
- main.tsx (app entry reference)
- package.json (app dependency snapshot)
- tsconfig.json (TS settings)
- tsconfig.node.json (TS node settings)

## When in doubt
- If a rule conflicts with a token, the token wins.
- If a layout needs a new token, stop and log it in Notion before proceeding.
- If copy is unclear, propose two concise options and park them in Notion.
