const isProd = process.env.NODE_ENV === 'production';

const baseRules = {  
  'typescript/adjacent-overload-signatures': 'error',
  'typescript/class-name-casing': ['error', 'always'],
  'typescript/explicit-function-return-type': ['error', { allowExpressions: true }],
  'typescript/explicit-member-accessibility': 'error',
  'typescript/interface-name-prefix': ['error','always'],
  // https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/member-delimiter-style.md
  'typescript/member-delimiter-style': ['error', {
    delimiter: 'comma',
    requireLast: true,
    ignoreSingleLine: true,
  }],
  'typescript/member-naming': ['error', {
    private: '^_',
  }],
  'typescript/member-ordering': 'error',
  'typescript/no-angle-bracket-type-assertion': 'error',
  'typescript/no-array-constructor': 'error',
  'typescript/no-empty-interface': 'error',
  'typescript/no-explicit-any': 'error',
  'typescript/no-inferrable-types': 'error',
  'typescript/no-namespace': 'error',
  'typescript/no-non-null-assertion': 'error',
  'typescript/no-parameter-properties': 'off',
  'typescript/no-triple-slash-reference': 'error',
  'typescript/no-type-alias': 'off',
  'typescript/no-unused-vars': 'error',
  'typescript/no-use-before-define': 'error',
  'typescript/no-var-requires': 'error',
  'typescript/prefer-namespace-keyword': 'error',
  'typescript/type-annotation-spacing': 'error',
  'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true, "ignore": [ '-/' ]}],
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    // require or disallow use of semicolons instead of ASI
  // https://eslint.org/docs/rules/semi#require-or-disallow-semicolons-instead-of-asi-semi
  semi: ['error', 'never'],
  // disallow the use of console (no-console)
  // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
  'no-console': ['warn', {
    allow: ['warn', 'error'],
  }],
  // disallow declaration of variables that are not used in the code (no-unused-vars)
  // https://eslint.org/docs/rules/no-unused-vars
  'no-unused-vars': ['off'],
}

const prodRules = Object.assign({}, baseRules, {
  // disallow the use of console (no-console)
  // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
  'no-console': ['error', {
    allow: ['warn', 'error'],
  }]
})

module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'typescript-eslint-parser',
  plugins: [
    'typescript',
  ],
  env: { 
    browser: true,
    jest: true
  },
  extends: 'airbnb',
  rules: isProd ? prodRules : baseRules,
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ]
      }
    }
  }
}
