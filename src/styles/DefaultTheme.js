const px = d => `${d}px`;

export default {
  fonts: {
    sans: 'Arial, sans-serif',
    serif: 'Georgia, Times, Times New Roman, serif',
    mono: 'monospace'
  },
  fontSizes: [12, 13, 15, 19, 24, 32, 48, 64].map(px),
  boxShadow: '0 0 50px rgba(0, 0, 0, 0.2)',
  borderRadius: '2px',
  colors: {
    primary: '#e60005',
    secondary: '#1e3791',
    lightgrey: '#f5f5f5',
    midgrey: '#d8d8d8',
    textgrey: '#777'
  },
  margin: [10, 15, 25].map(px),
  padding: [5, 10, 15].map(px)
};
