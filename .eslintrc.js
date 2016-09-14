'use strict'

module.exports = {
  parser: 'babel-eslint',

  plugins: [
    'babel'
  ],

  extends: [
    '@strv/javascript/environments/nodejs/v6',
    '@strv/javascript/environments/nodejs/best-practices',
    '@strv/javascript/environments/nodejs/optional',
    '@strv/javascript/coding-styles/base'
  ],

  rules: {
    // If your editor cannot show these to you, occasionally turn this off and run the linter
    'no-warning-comments': 0,

    // Fix false positives for some ESLint rules - they do not properly handle async functions
    'arrow-parens': 0,
    'babel/arrow-parens': [1, 'as-needed'],
    'generator-star-spacing': 0,
    'babel/generator-star-spacing': [1, {
      before: false,
      after: true
    }]
  }
}
