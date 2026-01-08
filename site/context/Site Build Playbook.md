# Site Build Playbook (Routes → Copy → Blocks)

Use this as the canonical build map so we ship fast without inventing new structures.

## Routes and source copy
- Home → context/site-copy/Page Copy - Home.md
- How it works → context/site-copy/Page Copy - How It Works.md
- Proof → context/site-copy/Page Copy - Proof.md
- Technology → context/site-copy/Page Copy - Technology.md
- Trust → context/site-copy/Page Copy - Trust.md
- Choose your world → context/site-copy/Page Copy - Choose Your World.md
- World: Individual → context/site-copy/Page Copy - Individual (Companion).md
- World: Professionals → context/site-copy/Page Copy - Professionals (Console).md
- World: Organisations → context/site-copy/Page Copy - Organisations (Command Center).md

## Core blocks (use these components; wire props with the copy above)
- PageSection: src/experience/blocks/PageSection.tsx (layout wrapper with tone/padding/maxWidth)
- HeroBlock: src/experience/blocks/HeroBlock.tsx (eyebrow, title, subtitle, CTAs)
- LoopExplainerBlock: src/experience/blocks/LoopExplainerBlock.tsx (READ/ROUTE/DELIVER/SEAL)
- ProofBlock: src/experience/blocks/ProofBlock.tsx (wraps ProofStrip)
- LumaVowBlock: src/experience/blocks/LumaVowBlock.tsx (trust boundary)
- DataDignityBlock: src/experience/blocks/DataDignityBlock.tsx (consent/quiet-by-default)
- EscalationBlock: src/experience/blocks/EscalationBlock.tsx (humans when humans matter)
- CtaBand: src/experience/blocks/CtaBand.tsx
- WorldSelectorBlock: src/experience/blocks/WorldSelectorBlock.tsx
- ProofStrip primitive: components/primitives/ProofStrip.tsx
- Explainability line: components/primitives/WhyThis.tsx (use for “why this, why now”)

## Page assembly (section order guidance)
- Home: Hero → LoopExplainer → Two-speed (can reuse LoopExplainer + copy) → ProofBlock → MTTR line → DataDignity → Escalation → WorldSelector → CTA band.
- How it works: Hero → LoopExplainer → Two-speed explainer → LumaVowBlock → ProofBlock (with MTTR mention) → Escalation → DataDignity → CTA band.
- Proof: Hero → ProofBlock (stage=trajectory) → MTTR/return cadence line → Use-case strip (three worlds) → CTA band.
- Technology: Hero → LumaVowBlock → DataDignityBlock → LoopExplainer (state-first computing angle) → CTA band.
- Trust: Hero → DataDignityBlock → EscalationBlock → Governance notes (plain text) → CTA band.
- Choose your world: Hero → WorldSelectorBlock (3 cards) → ProofBlock → CTA band.
- World pages: Hero (world-specific) → LoopExplainer (world lens) → ProofBlock (benefit per world) → Escalation/DataDignity (as relevant) → CTA band.

## Layout and design rules
- Use PageSection for vertical rhythm; default padding var(--space-6), maxWidth 1200.
- Stick to primitives (Text, Stack, Surface, Button, Input, Icon) and tokens; no ad-hoc colors/radii.
- Tone: prefer semantic tokens (state/status) already wired in primitives; keep “proof without punishment” and avoid streak language.
- Responsiveness: blocks use Stack with wrap; keep min card width ~300–320 for WorldSelector.
- Accessibility: respect touch targets, contrast, reduced motion; keep copy succinct (see UI Copy Kit + Tone of Voice).

## Assets
- Place high-end assets in the designated bucket/prefix; media enrichment runbook: context/reference/Media Enrichment Ops.md.
- Admin-only control: MediaEnricherAdmin (src/experience/MediaEnricherAdmin.tsx) with master-API fetchers (src/lib/mediaEnricherApi.ts).

## Build checklist
- Map page → copy file → blocks before coding.
- Drop in copy verbatim; don’t rewrite.
- Keep styling to tokens and primitives.
- Guard admin surfaces with RBAC/feature flags.
- Run `npm run check:all` before handoff.
