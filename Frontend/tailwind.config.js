module.exports = {
  purge: ['./src/**/*.js', './src/*.js', './public/*.html'],
  theme: {
    screens: {
      sm: '640px',

      md: [{ min: '768px' }, { raw: '(orientation: landscape)' }],

      lg: '1024px',

      xl: '1280px',
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'odd', 'even'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
}
