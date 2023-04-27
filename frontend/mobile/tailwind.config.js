/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      mob: '375px',
      tablet: '768px',
      laptop: '1024px',
      laptopl: '1440px',
      desktop: '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['LINESeedRg'],
        thin: ['LINESeedTh'],
        bold: ['LINESeedBd'],
      },
    },
  },
  plugins: [],
};
