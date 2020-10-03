module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        js: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts'],
      },
    ],
    'no-use-before-define': 'off',
    'prettier/prettier': ['error'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
