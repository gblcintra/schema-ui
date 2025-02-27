import type { StorybookConfig } from '@storybook/react-webpack5'
const config: StorybookConfig = {
  stories: ['../react/components/**/*.mdx', '../react/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    "storybook-css-modules",
    "@storybook/addon-a11y",
    "storybook-addon-pseudo-states"
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
