const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: { path: path.resolve(__dirname, 'dist'), filename: '[name].[contenthash:8].js', clean: true },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  devServer: { 
    port: 3000, 
    hot: true, 
    open: true,
    watchFiles: ['src/**/*'], 
  },
};
