module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../site/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  typescript: {
    reactDocgen: false
  },
  babel: async (options) => ({
    ...options,
    presets: [...options.presets, require.resolve('@babel/preset-typescript')]
  })
};
