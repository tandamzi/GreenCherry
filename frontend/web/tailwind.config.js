/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        sans: ['Gmarket-Sans-Light'],
        medium: ['Gmarket-Sans-Medium'],
        bold: ['Gmarket-Sans-Bold'],
      },
    },
  },
  plugins: [],
};
