/**
 * ESLint的规则有三种级别：
 * "off"或者0，不启用这个规则
 * "warn"或者1，出现问题会有警告
 * "error"或者2，出现问题会报错
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2021
  },
  globals: {},
  rules: {
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-wars': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
