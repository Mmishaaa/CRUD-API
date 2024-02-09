const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['./src/server.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.cjs',
    clean: true,
  },
  target: 'node',
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.ts']
  },
  module: {
    rules: [
      { test: /\.([cm]?ts)$/, loader: 'ts-loader', exclude: /node_modules/ }
    ],
  },
};