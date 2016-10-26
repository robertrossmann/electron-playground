'use strict'

module.exports = {
  parser: 'babel-eslint',

  plugins: [
    'babel',
    'import',
  ],

  extends: [
    '@strv/javascript/environments/nodejs/v6',
    '@strv/javascript/environments/nodejs/optional',
    '@strv/javascript/coding-styles/recommended',
  ],

  rules: {
    // If your editor cannot show these to you, occasionally turn this off and run the linter
    'no-warning-comments': 0,
  }
}
