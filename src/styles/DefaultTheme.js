const px = d => `${d}px`;

export default {
  fonts: {
    sans: '"Roboto", sans-serif',
    serif: '"Roboto Slab", serif',
    mono: '"Roboto Mono", monospace'
  },
  fontSizes: [12, 13, 15, 19, 24, 32, 48, 64].map(px),
  boxShadow: '0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16)',
  borderRadius: '4px',
  colors: {
    primary: '#0030ff',
    lightgrey: '#f2f2f2'
  },
  margin: [10, 15, 25].map(px),
  padding: [5, 10, 15].map(px)
};
