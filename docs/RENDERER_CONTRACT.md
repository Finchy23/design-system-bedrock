Renderer Contract — Recoverlution

Purpose: define the minimal module contract for any renderer, and how it interacts with the chrome kit and heat engine.

Module metadata (required)
- `id` (string): unique module id.
- `intent` (enum): `belief|friction|qualify|commit`.
- `heatGate` (object): allowed heat levels. Example: `{ red: false, amber: true, green: true }`.

Optional metadata
- `title` (string)
- `signals` (string[])
- `primaryCTA` (string)
- `proofAsk` (boolean)

Runtime contract
- A renderer is a React component with signature `(props: { heat, context })`.
- A renderer must declare its `ModuleMetadata` and register with `registerRenderer(meta, Component)`.
- Renderers must check `heat` (via provided `heatGate` helper) and display minimal micro-UI when disallowed.

Enforcement
- The registry performs basic metadata validation on register.
- CI will validate module JSON/schema (added in follow-up tasks).
