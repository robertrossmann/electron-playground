'use strict'

module.exports = {
  env: {
    mocha: true,
  },

  rules: {
    'prefer-arrow-callback': 0,
    'require-jsdoc': 0,
    'no-invalid-this': 0,
    'func-names': 0,
    // Account for main describe() block, nested describe() block and one it() block
    'max-nested-callbacks': [1, 7],
  }
}
