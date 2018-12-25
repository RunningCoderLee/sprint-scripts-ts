module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-css-modules',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // https://stylelint.io/user-guide/rules/max-nesting-depth/
    'max-nesting-depth': [
      1,
      {
        ignore: ['blockless-at-rules', 'pseudo-classes'],
        ignoreAtRules: ['each', 'media', 'supports', 'include'],
      },
    ],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
}
