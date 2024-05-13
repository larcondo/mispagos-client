module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'no-console': 0,
    'no-unused-vars': 'warn',
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-refresh/only-export-components': 'warn',
  },
}
