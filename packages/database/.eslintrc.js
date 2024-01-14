/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@read-quill/eslint-config/library.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
