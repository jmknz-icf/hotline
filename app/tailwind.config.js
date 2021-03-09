module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      inset: {
        4: '1rem',
        '1/2': '50%',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'odd', 'hover', 'focus', 'active'],
  },
  plugins: [],
};
