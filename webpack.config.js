var webpack = require('webpack');

module.exports = {
  entry: './src/assets/js/App',
  output: {
    path: './src/assets/js',
    filename: 'app-bundle.js',
    publicPath: '/assets/js/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules','bower_components', './src/assets/js']
  },
  module: {
    preLoaders: [
      {
        test: /src\/.*\.js?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  plugins: []
};
