const StyleDictionary = require('style-dictionary');
const path = require('path');

const root = path.join(__dirname, '..');
const source = path.join(root, 'src', 'tokens', 'tokens.json');
const sdSource = path.join(root, 'src', 'tokens', '_sd_tokens.json');

console.log('Style Dictionary — normalizing tokens from', source);

function wrapValues(obj) {
  if (obj === null) return { value: null };
  if (Array.isArray(obj)) return obj.map(wrapValues);
  if (typeof obj === 'object') {
    const hasValue = 'value' in obj;
    if (hasValue) return obj;
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = wrapValues(obj[k]);
    }
    return out;
  }
  return { value: obj };
}

const raw = require(source);
const normalized = wrapValues(raw);
require('fs').writeFileSync(sdSource, JSON.stringify(normalized, null, 2));

console.log('Style Dictionary — building tokens from', sdSource);

const SD = StyleDictionary.extend({
  source: [sdSource],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/tokens/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: { outputReferences: true }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/module'
        }
      ]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat'
        }
      ]
    }
    ,
    platform_ios: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/platform/ios/',
      files: [
        {
          destination: 'tokens.ios.json',
          format: 'json/flat'
        }
      ]
    },
    platform_android: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/platform/android/',
      files: [
        {
          destination: 'tokens.android.json',
          format: 'json/flat'
        }
      ]
    }
    ,
    android: {
      transformGroup: 'android',
      buildPath: 'dist/tokens/android/',
      files: [
        {
          destination: 'colors.xml',
          format: 'android/resources'
        }
      ]
    },
    
  }
});

SD.buildAllPlatforms();

console.log('Style Dictionary — build complete. Outputs in dist/tokens/*');

// Post-process: generate simple iOS Swift file from the flat JSON tokens
try {
  require('./generate-ios');
} catch (e) {
  console.warn('generate-ios failed:', e.message);
}
