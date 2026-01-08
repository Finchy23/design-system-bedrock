Component Guides — Primitives and Contracts

This file lists the minimal API and behavioral contracts for primitives. Keep these contracts small, explicit, and stable.

Text
- Props: `variant: display|h1|h2|body|small|meta`, `className`
- Behavior: maps to tokened `font-family`, `font-size`, `weight`.

Stack
- Props: `direction: row|column`, `gap: space.*`, `className`
- Behavior: enforces layout gap and prevents arbitrary margins between children.

Surface
- Props: `level: base|raised|overlay`, `className`
- Behavior: controls background, border, shadow according to `tokens.surface.levels`.

Button
- Props: `variant: primary|secondary|tertiary`, `onClick`, `disabled`, `aria-*`
- Behavior: consistent padding, focus ring, disabled styles; uses tokened colors.

Icon
- Props: `name`, `size`, `aria-hidden|aria-label`
- Behavior: single stroke weight, tokenized sizes. Use approved icon set (Lucide recommended).

Guidelines
- Do not accept arbitrary style props that allow breaking token usage.
- Keep default focus and keyboard interactions accessible.
- All primitives must be covered by Storybook stories and visual snapshots.
