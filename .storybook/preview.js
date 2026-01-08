import '../styles/globals.css';

// Import generated CSS variables (built by Style Dictionary)
// Storybook should run the token build first (see `prestorybook` script)
try {
  require('../dist/tokens/css/variables.css');
} catch (e) {
  // generated CSS not found yet — Storybook can continue without it
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true }
};
