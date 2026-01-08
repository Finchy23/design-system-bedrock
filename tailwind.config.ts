import type { Config } from 'tailwindcss';

const config = {
  theme: {
    extend: {
      borderRadius: {
        'none': '0px'
      }
    }
  },
  corePlugins: {
    // Keep utility set but make radii explicit via tokens/components
  }
} as Config;

export default config;
