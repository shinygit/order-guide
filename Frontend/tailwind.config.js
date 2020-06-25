module.exports = {
  purge: ['./src/**/*.js', './src/*.js', './public/*.html'],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'odd', 'even'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
}
