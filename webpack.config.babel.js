import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
  'entry': {
    'styles': path.resolve(__dirname, 'styling/base.scss')
  },

  'output': {
    'path': path.resolve(__dirname, 'public/dist'),
    'filename': '[name].js'
  },

  'module': {
    'rules': [{
      'test': path.resolve(__dirname, 'styling/base.scss'),
      'use': ExtractTextPlugin.extract([{
        'loader': 'css-loader',
        'options': {
          'minimize': true,
          'importLoaders': 1,
          'modules': true
        }
      }, {
        'loader': 'sass-loader'
      }])
    }]
  },

  'resolve': {
    'alias': {
      'styling': path.resolve(__dirname, './styling')
    },
    'extensions': ['.js', '.jsx']
  },

  'plugins': [
    new ExtractTextPlugin('[name].css')
  ]
};

export default config;