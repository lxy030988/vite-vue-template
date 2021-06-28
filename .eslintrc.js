/**
 * https://segmentfault.com/a/1190000019661168
 * https://segmentfault.com/a/1190000038533257?utm_source=sf-similar-article
 *
 * ESLint的规则有三种级别：
 * "off"或者0，不启用这个规则
 * "warn"或者1，出现问题会有警告
 * "error"或者2，出现问题会报错
 */
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  // extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'eslint:recommended',
    'prettier',
    // 'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  globals: {},
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    '@typescript-eslint/no-unused-wars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',

    // https://eslint.vuejs.org/rules/
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/max-attributes-per-line': 'off'
  }
})
