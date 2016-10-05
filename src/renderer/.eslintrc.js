'use strict'

module.exports = {
  env: {
    browser: true,
    node: false
  },

  plugins: [
    'babel',
    'react'
  ],

  extends: [
    '@strv/javascript/environments/react/latest',
    '@strv/javascript/environments/react/best-practices',
    '@strv/javascript/environments/react/optional',
    '@strv/javascript/coding-styles/base'
  ],

  rules: {
    'class-methods-use-this': 0,
    'no-warning-comments': 0
  }
}
