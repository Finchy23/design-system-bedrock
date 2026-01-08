# Front-end Integration Guide

Audience: frontend engineers building the marketing/Console surfaces. Use this as the single map: what to ship, which copy to use, which components/tokens to rely on, and how to handle media enrichment.

## Sources of truth
- IA and routes: context/ia/Site Architecture Outline.md, context/ia/Sitemap and IA.md.
- Page-ready copy: context/site-copy/ (use exact files per page; avoid rewrites).
- Narrative/claims: context/narrative/ (science, measurement, escalation posture).
- Tone/microcopy rules: context/reference/Tone of Voice, context/site-copy/UI Copy Kit.md.
- Ops (media enrichment, clinical refs): context/reference/Media Enrichment Ops.md, context/reference/Supabase Asset Handler 2e15a0fd01ef807c9d4bdafbc822b84e.md, context/reference/Clinician Review Pack 2.md.

## Page map → components → copy
- Home, How it works, Proof, Technology, Trust, Choose your world: pair each with its Page Copy file in context/site-copy/. Structure sections per context/ia/Site Architecture Outline.md.
- World pages (Individual, Professionals, Organisations): use corresponding Page Copy files; follow the world-specific flows in IA.
- Reusable blocks (wire these instead of inventing new):
  - Loop explainer (READ/ROUTE/DELIVER/SEAL)
  - Proof strip (Receipt → Transfer → Trajectory) — component: components/primitives/ProofStrip
  - LUMA vow (trust boundary)
  - Data dignity (quiet by default / consent by design)
  - Escalation (Humans when humans matter)
  - CTA library (See IA doc)

## Components/primitives
- Tokens: src/tokens/tokens.json; use semantic aliases already wired in styles.
- Primitives: components/primitives/{Text, Stack, Surface, Button, Input, Icon, ProofStrip, WhyThis}.
- Blocks (page assembly): src/experience/blocks/* — PageSection, HeroBlock, LoopExplainerBlock, ProofBlock, LumaVowBlock, DataDignityBlock, EscalationBlock, CtaBand, WorldSelectorBlock.
- Experience components: src/experience/RecoveryLoopInstrument (loop/MTTR view), src/experience/MediaEnricherAdmin (admin-only asset enrichment control).
- Style guard: keep semantic tones (state/status) and avoid custom colors outside tokens. Radii/motion already set in primitives.

## Media enrichment (high-end assets)
- Runbook: context/reference/Media Enrichment Ops.md (short) + Supabase Asset Handler doc (full).
- UI: use MediaEnricherAdmin; inject fetchers that call your master API (preferred) instead of direct Supabase service keys in the browser.
- Master API shape (suggested):
  - POST /api/media-enricher/backfill { bucket, prefix?, limit? }
  - GET /api/media-enricher/runs?limit=20
  - Server uses Supabase service role; client only sends session token if needed for RBAC.

## Implementation notes
- Copy integrity: don’t rephrase. Pull from the matched Page Copy file.
- Tone: no streak language; “return cadence” instead. Keep “proof without punishment.”
- Accessibility: respect touch targets, contrast, reduced motion (see UI Copy Kit + token system).
- Storybook: RecoveryLoopInstrument and MediaEnricherAdmin stories exist for visual QA; run `npm run storybook` after `npm run build-tokens`.

## Fast start checklist
1) Read IA outline, pick target page, open its Page Copy.
2) Assemble layout with blocks from src/experience/blocks and primitives; drop in ProofStrip and WhyThis where applicable.
3) For admin settings, mount MediaEnricherAdmin behind RBAC, wiring to master API.
4) Keep styles to tokens; avoid ad-hoc CSS colors/radii.
5) Run lint/token checks: `npm run check:all`.
