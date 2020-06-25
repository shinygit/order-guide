module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/assets/styles/tailwind.css',
  ],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'odd', 'even'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
}
