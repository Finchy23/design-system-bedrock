# Frontend Handover — Design System Bedrock

Audience: frontend engineers wiring the site/experience to this design system, Storybook, and motion layer.

## What’s in this repo
- Tokens: `src/tokens/tokens.json` (canonical); built artifacts in `dist/tokens/**` via Style Dictionary.
- Primitives: `src/primitives/*` — Stack, Text, Surface, Button, Icon, Divider, Input, ProofStrip, WhyThis.
- Components (playground builds): `src/components/PlaygroundComponents.tsx` + stories; legacy Card/ButtonPrimary remain.
- Experience blocks (site): `site/src/experience/blocks/*` — already use motion utilities and primitives.
- Storybook config: `.storybook/` with webpack5, MDX2 docs.

## Install & scripts
- Install deps: `npm install --include=dev`
- Build tokens: `npm run build-tokens`
- Storybook dev: `npm run storybook`
- Storybook build: `npm run build-storybook`
- Lint (lightweight): `npm run lint:js` / `npm run lint:css` / `npm run token-lint`

## How to consume tokens
- Import CSS vars from `dist/tokens/css/variables.css` (built by Style Dictionary). Already consumed by primitives via CSS variables.
- If you need JSON/JS: `dist/tokens/json/tokens.json` or `dist/tokens/js/tokens.js`.

## Primitives cheat sheet
- `Stack`: flex wrapper; `gap`, `inline`, `align` props.
- `Text`: variants `h1|h2|h3|body|small|meta|eyebrow`; tones `primary|muted|brand|danger|success|warning`.
- `Surface`: tone `base|raised|overlay`, `padding`, `glass` for blur, `style` override; uses token colors/borders/radius.
- `Button`: variants `primary|secondary|tertiary`; bring your own Text for color when on-brand.
- `Icon`: wraps lucide-react; pass `icon`, `size`, `tone`.
- `Divider`: simple 1px line.

## Playground components (10)
Location: `src/components/PlaygroundComponents.tsx`, stories in `src/components/PlaygroundComponents.stories.tsx`.
- ClinicalSpineHero — deterministic pipeline stages with routing CTA.
- SchemaConstellation — schema picker with family/proof tags.
- FamilyTreeExplorer — schema → family → mindblock browser.
- SixPillarsDeepDive — pillar carousel with proof/steps CTA.
- VoiceTaxonomy — stance cards with sample CTA.
- PrimitiveLibrary — primitive picker with navicue/use CTAs.
- RoutingEngine — archetype-driven routing logic with simulate CTA.
- ProofTransferSystem — receipts/tests with log/start CTAs.
- HeatKbeMatrix — state-based grid with drilldown.
- FourLayerArchitecture — CC2/LUMA/6S/Rooms stack with expand/simulate CTAs.

Styling & motion:
- Glass/gradient shells via shared `panelStyle`/`gradientShell` in the file.
- Hover: lift/scale + soft glow + subtle shimmer (`hoverMotion`, `hoverGlow`, `shimmerStyle`). Keyframes injected via `PlaygroundShimmerStyles` (stories wrap components).
- Motion cadence tuned to subtle: translateY(-3px), scale(1.006), brightness(1.02), shimmer 2.2s.

To reuse components in-app:
1) Import the component(s) from `src/components/PlaygroundComponents`. If outside Storybook, also render `<PlaygroundShimmerStyles />` once to ensure keyframes exist.
2) Ensure tokens are built or variables CSS is available (run `npm run build-tokens` or include the CSS output in your bundler entry).
3) Verify lucide icons are installed (`lucide-react` is a dependency). If tree-shaking, import only used icons.
4) Wrap pages/blocks with the same CSS variables (from tokens) and global styles (`styles/globals.css` in site) for consistent motion classes.

## Motion utilities already in site
- `styles/globals.css` includes motion tokens, fade-up, card-hover, shimmer-line, underline-flow.
- Experience blocks (hero, loop explainer, proof, world selector, CTA band, data dignity, escalation) already use these; loop explainer has auto-advance tracer with hover pause and reduced-motion guard.

## Accessibility & prefs
- Reduced motion: loop tracer respects `prefers-reduced-motion`; consider similar guards if reusing shimmer/hover effects in production.
- Buttons and surfaces preserve focus styles; ensure you keep visible focus when integrating.

## Packaging guidance
- For app integration, prefer importing primitives/components directly; Storybook build is for review/demo. Ensure your app bundler includes CSS variables and any global keyframes if you copy the motion helpers.
- If you need lighter visuals, reduce or remove `shimmerStyle` on specific components by omitting it in their `style` spreads.

## Verification checklist
- `npm run build-tokens`
- `npm run build-storybook` (or `npm run storybook` for dev)
- Spot-check hover/motion under `prefers-reduced-motion`
- Confirm icon rendering after any tree-shaking config changes

## Contacts / change notes
- Motion and copy tuned to clinical, verb-first tone (“proof”, “transfer”, “run simulation”).
- Latest polish: glass gradients + hover lift/glow/shimmer; toned to subtle settings.
