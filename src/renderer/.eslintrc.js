'use strict'

module.exports = {
  env: {
    browser: true,
    node: false,
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
  }
}
