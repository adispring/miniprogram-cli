module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
  rules: {
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
  },
};
