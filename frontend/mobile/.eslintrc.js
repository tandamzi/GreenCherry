module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'internal',
          'external',
          ['sibling', 'parent', 'index'],
          'type',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '{react*,react*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@saas-fe/**/*.style',
            group: 'unknown',
          },
          {
            pattern: '@pages/**/*.style',
            group: 'unknown',
          },
          {
            pattern: '@components/**/*.style',
            group: 'unknown',
          },
          {
            pattern: './**/*.style',
            group: 'unknown',
          },
          {
            pattern: '../**/*.style',
            group: 'unknown',
          },
          {
            pattern: '*.style',
            group: 'unknown',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'unknown'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-restricted-globals': 'off',
    'no-unused-vars': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-unused-prop-types': ['off'],
    'react/no-array-index-key': 'off',
    'global-require': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    radix: 'off',
    'import/no-extraneous-dependencies': [
      0,
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: [
          'arrow-function',
          'function-declaration',
          'function-expression',
        ],
      },
    ],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'],
      },
    ],
  },
  plugins: ['prettier'],
};
