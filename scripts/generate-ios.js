const fs = require('fs');
const path = require('path');

const distJson = path.join(__dirname, '..', 'dist', 'tokens', 'json', 'tokens.json');
const outDir = path.join(__dirname, '..', 'dist', 'tokens', 'ios');

function hexToRgbFloats(hex) {
  if (!hex) return null;
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return { r: r.toFixed(3), g: g.toFixed(3), b: b.toFixed(3) };
}

if (!fs.existsSync(distJson)) {
  console.error('iOS generator: tokens.json not found at', distJson);
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(distJson, 'utf8'));

// Collect Color* keys from flat tokens JSON
const colors = Object.keys(tokens)
  .filter((k) => k.startsWith('Color'))
  .reduce((acc, k) => {
    acc[k] = tokens[k];
    return acc;
  }, {});

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const lines = [];
lines.push('// Generated file — do not edit directly');
lines.push('import UIKit');
lines.push('');
lines.push('extension UIColor {');

for (const [k, v] of Object.entries(colors)) {
  // Convert PascalCase key to camelCase Swift property name, e.g. ColorBrandPrimary -> brandPrimary
  const name = k.replace(/^Color/, '');
  const camel = name.charAt(0).toLowerCase() + name.slice(1);
  const rgb = hexToRgbFloats(v);
  if (!rgb) continue;
  lines.push(`  static var ${camel}: UIColor { return UIColor(red: ${rgb.r}, green: ${rgb.g}, blue: ${rgb.b}, alpha: 1) }`);
}

lines.push('}');

const outPath = path.join(outDir, 'Colors.swift');
fs.writeFileSync(outPath, lines.join('\n'));
console.log('iOS Colors.swift generated at', outPath);
