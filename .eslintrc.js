module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/essential'
  ],
  // Add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': ['error', {
      'ignoreWhenNoAttributes': true
    }],
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true
    }],
    'vue/html-self-closing': 'off',
    'vue/no-v-html': 'off',
    'no-lonely-if': 'off'
  }
}
