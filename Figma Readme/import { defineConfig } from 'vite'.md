# Vite Config Reference

This mirrors the app build setup. Designers do not edit this; it exists so you know the tooling expectations when handing off assets.

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

Notes:
- React + Vite + Tailwind.
- Aliases allow `@/` to reference the repo root.
- Keep asset paths relative and token-based.
