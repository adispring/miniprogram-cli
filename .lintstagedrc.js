module.exports = {
  '*.{js,ts,vue}': 'eslint --cache --fix',
  '*.{js,vue,ts,css,md,wxml,wxss}': 'prettier --write',
  '*.{html,vue,css,scss,wxss}': 'stylelint --fix',
};
