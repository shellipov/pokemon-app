// eslint.config.js
export default [
    {
        rules: {
            // Проектные из eslint-rules
            // 'no-locale-function-restricted-args': 'error',
            'no-restricted-syntax': [
                'error',
                {
                    'selector': 'Literal[value=/НРБ|NRB/i]',
                    'message': 'Недопустимое буквосочетание ☝️\nНужно через:\n\n@IConst() private _const: IConst\n\nНапример:\nthis._const.appDisplayName.short',
                },
            ],
            // Внешние
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/ban-types': 'error',
            '@typescript-eslint/consistent-type-assertions': 'error',
            '@typescript-eslint/consistent-type-definitions': 'error',
            '@typescript-eslint/explicit-member-accessibility': ['error', {
                'accessibility': 'explicit',
                'overrides': {
                    'constructors': 'no-public',
                },
            }],
            'indent': 'off',
            '@typescript-eslint/indent': [
                'error',
                2,
            ],
            '@typescript-eslint/member-delimiter-style': [
                'error',
                {
                    'multiline': {
                        'delimiter': 'semi',
                        'requireLast': true,
                    },
                    'singleline': {
                        'delimiter': 'semi',
                        'requireLast': false,
                    },
                },
            ],
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    'default': [
                        // ScreenMainPageComponent signature
                        'signature',
                        // All static fields and members
                        'public-static-field',
                        'protected-static-field',
                        'private-static-field',
                        'static-field',
                        'public-static-method',
                        'protected-static-method',
                        'private-static-method',
                        'static-method',
                        // All fields
                        'public-field',
                        'protected-field',
                        'private-field',
                        'field',
                        // Constructors
                        'public-constructor',
                        'protected-constructor',
                        'private-constructor',
                        'constructor',
                        // All methods
                        'public-method',
                        'protected-method',
                        'private-method',
                        'method',
                    ],
                },
            ],
            // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
            // TODO: Настроить naming-convention
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-parameter-properties': 'off',
            '@typescript-eslint/no-use-before-declare': 'off',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            '@typescript-eslint/quotes': [
                'error',
                'single',
                {
                    'avoidEscape': true,
                },
            ],
            '@typescript-eslint/semi': [
                'error',
                'always',
            ],
            '@typescript-eslint/triple-slash-reference': 'error',
            '@typescript-eslint/type-annotation-spacing': 'error',
            '@typescript-eslint/unified-signatures': 'error',
            '@typescript-eslint/no-shadow': 'error',
            // 'arrow-body-style': 'error',
            'arrow-parens': [
                'off',
                'as-needed',
            ],
            'capitalized-comments': 'off',
            'comma-dangle': [
                'error',
                'always-multiline',
            ],
            'complexity': 'off',
            'constructor-super': 'error',
            'curly': 'error',
            'dot-notation': 'off',
            'eol-last': 'error',
            'eqeqeq': [
                'error',
                'smart',
            ],
            'guard-for-in': 'error',
            'id-blacklist': [
                'error',
                'any',
            ],
            'id-match': 'error',
            // 'ordered-imports': 'error',
            // 'import/order': ['error', {'alphabetize': true}],
            'max-classes-per-file': 'off',
            'max-len': [
                'error',
                {
                    'code': 160,
                },
            ],
            'new-parens': 'error',
            'no-bitwise': 'error',
            'no-caller': 'error',
            'no-cond-assign': 'error',
            'no-console': ['warn'],
            'no-debugger': 'error',
            'no-empty': 'error',
            'no-eval': 'error',
            'no-fallthrough': 'off',
            'no-invalid-this': 'off',
            'no-multiple-empty-lines': 'error',
            'no-new-wrappers': 'error',
            'no-shadow': 'off',
            'no-throw-literal': 'error',
            'no-trailing-spaces': 'error',
            'no-undef-init': 'error',
            'no-underscore-dangle': [
                'off',
            ],
            'no-unsafe-finally': 'error',
            'no-unused-expressions': 'error',
            'no-unused-labels': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
            'one-var': [
                'error',
                'never',
            ],
            'padding-line-between-statements': ['error'],
            'prefer-arrow/prefer-arrow-functions': 'off',
            'prefer-const': 'error',
            'quote-props': 'off',
            'radix': 'error',
            'use-isnan': 'error',
            'valid-typeof': 'off',
            'padded-blocks': ['error', 'never'],
            'space-in-parens': ['error'],
            'keyword-spacing': ['error', { 'before': true, 'after': true }],
            'object-curly-spacing': ['error', 'always'],
            'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
            'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
            'space-before-blocks': ['error'],
            'space-infix-ops': ['error'],
            'space-unary-ops': ['error'],
            'space-before-function-paren': ['error', {
                'anonymous': 'always',
                'asyncArrow': 'always',
                'named': 'never',
            }],
            'spaced-comment': ['error', 'always', {
                'block': { 'balanced': true },
            }],
            'array-bracket-spacing': ['error', 'never'],
            'newline-before-return': 'error',
            'react/jsx-no-bind': ['error', {
                ignoreRefs: true,
                allowArrowFunctions: false,
                allowFunctions: false,
                allowBind: false,
            }],
            'react/no-string-refs': ['error'],
            'react/self-closing-comp': ['error'],
            'react/jsx-tag-spacing': ['error', {
                'beforeClosing': 'never',
            }],
            'react/jsx-wrap-multilines': ['error', {
                'declaration': 'parens-new-line',
                'assignment': 'parens-new-line',
                'return': 'parens-new-line',
                'arrow': 'parens-new-line',
                'condition': 'parens-new-line',
                'logical': 'parens-new-line',
                'prop': 'parens-new-line',
            }],
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-closing-bracket-location': ['error', {
                'nonEmpty': 'after-props',
                'selfClosing': 'after-props',
            }],
            'react/jsx-first-prop-new-line': ['warn', 'multiline'],
        }
    }
];
