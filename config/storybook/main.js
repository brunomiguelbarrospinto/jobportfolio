const path = require("path");

module.exports = {
  stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          // When you have splitted your css over multiple files
          // and use @import('./other-styles.css')
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          // When using postCSS 8
          implementation: require("postcss"),
        },
      },
    },
  ],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    return config;
  },

  core: {
    builder: "webpack5"
  }
};
