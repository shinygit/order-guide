module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'odd', 'even'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
}
