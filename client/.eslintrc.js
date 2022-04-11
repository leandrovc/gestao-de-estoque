module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'plugin:vue/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'parser': '@babel/eslint-parser',
    'ecmaVersion': 2018,
    'requireConfigFile': false,
    'sourceType': 'module'
  },
  'plugins': [
    'import',
    'vue'
  ],
  'rules': {
  }
}
