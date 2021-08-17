module.exports = {
  root: true,
  env: {
    node: true,
    "es6": true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    "gapi": true,
    "FB": true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-console": "off",
    "no-tabs": 0,
    "quotes": [1, "single"],
    "quotes": [0, "double"],
    "semi": [1, "always"],
    "indent": ["off", 2],
    "dot-notation": 0,
    "space-before-function-paren": ["error", "never"],
    "comma-dangle": ["off", "always-multiline"]
  }
}
