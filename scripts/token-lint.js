const fs = require('fs');
const path = require('path');

const TOKENS_PATH = path.join(__dirname, '..', 'src', 'tokens', 'tokens.json');

function run() {
  if (!fs.existsSync(TOKENS_PATH)) {
    console.error('tokens.json not found at', TOKENS_PATH);
    process.exit(2);
  }

  const raw = fs.readFileSync(TOKENS_PATH, 'utf8');
  let tokens;
  try {
    tokens = JSON.parse(raw);
  } catch (e) {
    console.error('Invalid JSON in tokens.json');
    process.exit(2);
  }

  const required = ['color', 'type', 'space', 'surface', 'motion'];
  const missing = required.filter((k) => !(k in tokens));
  if (missing.length) {
    console.error('Missing token categories:', missing.join(', '));
    process.exit(2);
  }

  console.log('Token lint passed — top-level categories present.');
}

run();
