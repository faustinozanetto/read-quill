module.exports = {
  extends: ['@read-quill/eslint-config/next.js'],
  env: {
    jest: true,
  },
  rules: {
    'function-component-definition': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
