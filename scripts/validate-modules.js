const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const schemaPath = path.join(__dirname, '..', 'schema', 'renderer.schema.json');
const modulesDir = path.join(__dirname, '..', 'src', 'renderer', 'metadata');

function parseJsonFile(filePath, label) {
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to parse ${label} at ${filePath}`);
    console.error('JSON error:', err.message);
    console.error('Content preview:', raw.slice(0, 200));
    throw err;
  }
}

function run() {
  if (!fs.existsSync(schemaPath)) {
    console.error('Schema not found at', schemaPath);
    process.exit(2);
  }
  const schema = parseJsonFile(schemaPath, 'schema');
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);

  if (!fs.existsSync(modulesDir)) {
    console.warn('No metadata dir found at', modulesDir);
    return;
  }

  const files = fs.readdirSync(modulesDir).filter((f) => f.endsWith('.json'));
  let ok = true;
  for (const f of files) {
    const p = path.join(modulesDir, f);
    let data;
    try {
      data = parseJsonFile(p, f);
    } catch (err) {
      ok = false;
      continue;
    }
    const valid = validate(data);
    if (!valid) {
      console.error('Validation errors for', f, validate.errors);
      ok = false;
    } else {
      console.log('Validated', f);
    }
  }

  if (!ok) process.exit(2);
}

run();
