#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"

fail() { echo "❌ $1"; exit 1; }

echo "Running infiniteK checks..."

if ! command -v rg >/dev/null 2>&1; then
  echo "⚠️  ripgrep (rg) not found; skipping infiniteK checks locally. Install ripgrep or rely on CI."
  exit 0
fi

# 1) Rounded corners
if rg -n --glob='**/*.{ts,tsx,css}' "rounded-([a-z0-9]+)|borderRadius\s*:" "$ROOT" ; then
  fail "Rounded corners detected (rounded-* or borderRadius)."
fi

# 2) Emojis in UI
if rg -n --glob='**/*.{ts,tsx}' "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" "$ROOT" ; then
  fail "Emoji detected in TS/TSX."
fi

# 3) Glass drift (inline backdropFilter)
if rg -n --glob='**/*.{ts,tsx}' "backdropFilter\s*:" "$ROOT" ; then
  fail "Inline backdropFilter detected. Use glass utilities/tokens."
fi

# 4) Raw hex usage (optional strict mode)
if rg -n --glob='**/*.{ts,tsx,css}' "#[0-9a-fA-F]{3,8}\b" "$ROOT" ; then
  fail "Raw hex detected. Use tokens."
fi

# 5) Dashes in copy (only when used in strings/words, not arithmetic)
if rg -n --glob='**/*.{ts,tsx}' "[A-Za-z]\s[—–-]\s[A-Za-z]" "$ROOT" ; then
  fail "Dash detected in copy. Use sentences or remove spaced dashes."
fi

echo "✅ infiniteK checks passed."
