module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },

  overrides: [
    {
      files: [
        '.eslintrc.js',
        '.eleventy.js',
        'postcss.config.js',
        'scripts/*.js',
        'src/_data/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        node: true,
      },
      plugins: ['node'],
    },
  ],
}
