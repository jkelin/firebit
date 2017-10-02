const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    main: [
      path.resolve(src, 'index.tsx')
    ],
  },

  output: {
    filename: "main.[hash].js",
    path: dist
  },

  devtool: "source-map",

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },

  module: {
    loaders: [{
        test: /\.tsx?$/,
        loaders: [
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
    new CleanWebpackPlugin([dist]),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.ejs'),
      NODE_ENV: process.env.NODE_ENV
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
    process.env.WEBPACK_ANALYZE && new BundleAnalyzerPlugin({analyzerMode: 'static', generateStatsFile: true})
  ],
};

module.exports.plugins = module.exports.plugins.filter(p => p)
