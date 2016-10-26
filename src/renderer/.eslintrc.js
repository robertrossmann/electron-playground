'use strict'

module.exports = {
  env: {
    'shared-node-browser': true,
  },

  plugins: [
    'babel',
    'react',
  ],

  extends: [
    '@strv/javascript/environments/react/v15',
    '@strv/javascript/environments/react/optional',
    '@strv/javascript/coding-styles/recommended',
  ],

  rules: {
    'no-warning-comments': 0,
  },
}
