Tokens — README

Location: `src/tokens/tokens.json`

Purpose: single source of truth for semantic tokens (color, type, spacing, motion, surfaces).

How to update
- Edit `src/tokens/tokens.json` for semantic changes.
- Keep the top-level categories: `color`, `type`, `space`, `surface`, `shadow`, `motion`.
- Add brand palette keys under `color.brand` only. Avoid raw hex usage outside tokens.

Design export
- Export mappings can be generated from `src/tokens/tokens.json` for design-tool imports.
- For production, use a token management tool (Style Dictionary, Tokens Studio) to generate platform assets.

Validation
- Run the token lint script:

```bash
npm run token-lint
```
