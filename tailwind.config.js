const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.svelte'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        yellow: colors.yellow,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
