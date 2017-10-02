const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      path.resolve(src, 'index.tsx')
    ],
  },

  output: {
    filename: "main.js",
    path: dist
  },

  devtool: "source-map",

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },

  module: {
    loaders: [
      {
          test: /\.tsx?$/,
          loaders: [
              "react-hot-loader/webpack",
              "awesome-typescript-loader"
          ],
          exclude: path.resolve(__dirname, 'node_modules'),
          include: path.resolve(__dirname, "src"),
      },
      {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
      },
  ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.ejs'),
      NODE_ENV: process.env.NODE_ENV
    }),
    process.env.WEBPACK_ANALYZE && new BundleAnalyzerPlugin({analyzerMode: 'static', generateStatsFile: true})
  ],

  devServer: {
    hot: true,
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "lodash": "_",
    "semantic-ui-react": "semanticUIReact",
    "recompose": "Recompose",
    "redux": "Redux",
    "redux-form": "ReduxForm",
    "react-redux": "ReactRedux",
    "prop-types": "PropTypes"
  },
};

module.exports.plugins = module.exports.plugins.filter(p => p)
