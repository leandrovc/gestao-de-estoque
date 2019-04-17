module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'vue',
    'standard',
    'plugin:vue/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'import',
    'vue'
  ],
  'rules': {
  }
}
