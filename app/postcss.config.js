module.exports = {
  plugins: [
    ['postcss-preset-env', {
      browsers: 'last 2 versions',
    }],
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};

