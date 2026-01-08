# Recoverlution Front-End Design Map

Apple-level coherence adapted for Recoverlution: tokens → primitives → components → governance.

See the repository `styles/tokens.css`, `components/primitives/*`, and `scripts/infinitek-check.sh` for implementation.

— The 10 Laws, Token categories, Primitive contracts and ModuleKit guidance are documented in the original design brief (Design Template).
Recoverlution Front-End Design Map

Purpose: A concise, enforceable front-end design system for designers and developers to implement, review, and ship with confidence.

## Philosophy
- Clarity: content-first. UI is a frame.
- Deference: interface yields to content.
- Hierarchy: motion, layering, and materials communicate importance.
- Consistency: single source of truth for tokens and primitives.

## System Stack
- Layer 0 — Laws: short, non-negotiable rules enforced by CI and reviews.
- Layer 1 — Tokens: semantic tokens for color, type, spacing, motion, surfaces.
- Layer 2 — Primitives: tiny, general-purpose building blocks (Text, Stack, Surface, Button, Icon, Input, Divider).
- Layer 3 — Components: composed UI with strict variant sets (Card, Modal, Table, etc.).
- Layer 4 — Pages: assembly of components only; no bespoke visuals.

## Design Laws (examples)
- One Surface Rule: only one elevated surface in a hierarchy.
- Token Rule: no raw hex, no arbitrary spacing.
- Type Rule: limited approved sizes/weights.
- CTA Rule: one primary CTA per screen.
- Accessibility Rule: keyboard, focus, contrast, reduced motion required.

## Tokens (canonical)
- Color: `bg.base`, `bg.surface`, `bg.overlay`, `text.primary`, `text.muted`, `border.default`, `brand.primary`, `status.*`
- Type: `font.body`, `type.h1..h6`, `weight.regular|medium|semibold|bold`, `leading.*`
- Spacing: `space.1..12` (fixed scale only)
- Surface: `surface.base|raised|overlay`, `shadow.1..3` (restricted)
- Motion: `motion.fast|med|slow`

## Primitives (contracts)
- `Text`: accepts `variant` (display/body/meta), enforces tokened sizes/weights.
- `Stack`: layout primitive for consistent gaps and alignment; accepts `direction`, `gap` from token scale.
- `Surface`: handles elevation, background, border, and focus; only `base|raised|overlay`.
- `Button`: `primary|secondary|tertiary` variants only; respects focus, disabled, and loading states.
- `Icon`: single stroke weight, tokenized sizes.

## Components (rules)
- Each component exposes a tiny, explicit variant set.
- No bespoke styling at page level; composition only.

## Governance
- Enforce tokens via lint script and CI check.
- Storybook as canonical visual system and review tool.
- Design review required for any new component.
- Visual regression snapshots for critical components.

## Handoff checklist
- Provide `docs/FRONTEND_DESIGN_MAP.md` (this file).
- Provide `src/tokens/tokens.json` as canonical tokens.
- Provide `src/primitives/*` showing component contracts and usage patterns.
- Add `scripts/token-lint.js` to validate token completeness.
- Provide Storybook or static rendered examples for designer review.

---
This document is intentionally concise. Use it as the bedrock for the component library and enforcement pipeline.
