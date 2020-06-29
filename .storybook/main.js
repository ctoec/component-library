const path = require('path');

module.exports = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
        {
          loader: require.resolve('sass-resources-loader'),
          options: {
            resources: [ path.resolve(__dirname, '../src/assets/styles/index.scss') ]
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    })
    return config;
  }
};
