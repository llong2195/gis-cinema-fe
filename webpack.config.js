// NOTE: To use this example standalone (e.g. outside of repo)
// delete the local development overrides at the bottom of this file

// avoid destructuring for older Node version support
const resolve = require("path").resolve;
const webpack = require("webpack");

const BABEL_CONFIG = {
  presets: ["@babel/env", "@babel/react"],
  plugins: ["@babel/proposal-class-properties"],
};

const config = {
  mode: "development",
  devServer: {
    historyApiFallback: true,
  },
  entry: {
    app: resolve("./src/index.js"),
  },

  output: {
    library: "App",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      webworkify: "webworkify-webpack",
    },
  },

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.js$/,
        include: [resolve(".")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: BABEL_CONFIG,
          },
        ],
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")()],
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [new webpack.EnvironmentPlugin(["GoongAccessToken"])],
};

// Enables bundling against src in this repo rather than the installed version
module.exports = (env) =>
  env && env.local ? require("../webpack.config.local")(config)(env) : config;
