module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': [0],
    'react/destructuring-assignment': [0],
    'react/jsx-one-expression-per-line': [0],
  },
  env: {
    browser: true,
    jest: true,
  },
};
