import reactNativeGlobals from 'eslint-plugin-react-native-globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';

export default tseslint.config(
  // Базовые настройки
  {
    languageOptions: {
      globals: {
        ...reactNativeGlobals.environment
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Основные правила
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // React
  {
    plugins: {
      react: reactPlugin,
      'react-native': reactNativePlugin
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off', // Не требуется с новым JSX
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'warn'
    }
  },

  // Кастомные правила
  {
    rules: {
      'indent': ['error', 2, { SwitchCase: 1 }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'always',
        'asyncArrow': 'always'
      }],
      'react/jsx-closing-tag-location': ['error', 'line-aligned'],
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'array-bracket-spacing': ['error', 'never'],
      'newline-before-return': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': false,
        'ts-nocheck': false,
        'ts-check': false
      }]
    }
  },

  // Игнорируемые файлы
  {
    ignores: [
      '**/android/**',
      '**/ios/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/.expo/**'
    ]
  }
);
