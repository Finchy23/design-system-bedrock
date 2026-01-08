# Design System Bedrock

This repository now holds two siblings:

- `design-system` (root): canonical tokens, primitives, Storybook, and contracts.
- `site/`: the marketing/website code that consumes the design system.

Quick start:

1. Review docs/FRONTEND_DESIGN_MAP.md for system rules and contracts.
2. Tokens: src/tokens/tokens.json — canonical source for colors, type, spacing, surfaces, motion.
3. Primitives: src/primitives/* — reference implementations and contracts for Text, Stack, Surface, Button, Icon.
4. Components: src/components/* — composed examples using primitives.
5. Run token lint:

```bash
node scripts/token-lint.js
```

Development scripts:

- Install deps: `npm install`
- Run Storybook (builds tokens first): `npm run storybook` (port 6006)
- Build static Storybook: `npm run build-storybook`
- Build tokens manually: `npm run build-tokens`

Handoff: provide this folder to designers and frontend engineers; they can implement Storybook and CI based on the tokens and contracts here.

Context and site copy now live in `site/context` (narrative, IA, page-ready text). These are time-sensitive; keep them separate from the stable design system docs in `/docs`.

Website project: see `site/` for pages, blocks, chrome, and copy wiring; it consumes the shared primitives/tokens via symlinks and Storybook uses both `src/` and `site/src/` stories.
