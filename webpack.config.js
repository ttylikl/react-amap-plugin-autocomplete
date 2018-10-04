var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var webpackConfig = {
  entry: './src/',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'autocomplete.js',
    library: 'Autocomplete',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.output.filename = 'autocomplete.min.js';
  webpackConfig.plugins.push(new UglifyJSPlugin());
}

module.exports = webpackConfig;
