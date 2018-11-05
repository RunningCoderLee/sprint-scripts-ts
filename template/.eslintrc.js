const isProd = process.env.NODE_ENV === 'production';

const baseRules = {
  // require or disallow use of semicolons instead of ASI
  // https://eslint.org/docs/rules/semi#require-or-disallow-semicolons-instead-of-asi-semi
  semi: ['error', 'never'],
  // disallow the use of console (no-console)
  // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
  'no-console': ['warn', {
    allow: ['warn', 'error'],
  }],
  // Forbid the use of extraneous packages
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
  // paths are treated both as absolute paths, and relative to process.cwd()
  'import/no-extraneous-dependencies': ['off'],
  // ensure imports point to files/modules that can be resolved
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
  'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true, "ignore": [ '-/' ]}],
}

const prodRules = Object.assign(baseRules, {
  // disallow the use of console (no-console)
  // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
  'no-console': ['error', {
    allow: ['warn', 'error'],
  }]
})

module.exports = {
  root: true,
  env: { 
    browser: true,
    jest: true
  },
  extends: 'airbnb',
  rules: isProd ? prodRules : baseRules
}