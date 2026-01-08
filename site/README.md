# Website Project

This folder contains the marketing/website code that consumes the shared design system from the repository root.

## Structure
- `src/experience/` – pages, blocks, admin flows, and page stories.
- `src/chrome/` – shell/rails used by the experience pages.
- `src/primitives`, `src/lib`, `src/renderer` – symlinks to the shared design-system implementations in `/src` (single source of truth).
- `context/` – time-sensitive narrative, IA, and copy inputs for the site.

## Run
- Install deps in repo root: `npm install`
- Run Storybook (includes site stories): `npm run storybook` (port 6006)
- Build static Storybook: `npm run build-storybook`

## Notes
- Tokens and primitives are owned by the root design system. Do not edit the symlinked copies here; change the sources in `/src` and rebuild tokens if needed (`npm run build-tokens`).
- Context docs here are expected to change frequently; keep long-lived rules in the root `/docs`.
