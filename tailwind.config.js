/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#211D1B', // near-black warm charcoal
          soft: '#3A3330',
        },
        sand: {
          50: '#FBF8F3',
          100: '#F5EFE4',
          200: '#EBE0CC',
          300: '#DCC9A3',
        },
        rust: {
          DEFAULT: '#8C3B2E', // deep terracotta/maroon, textile-inspired
          light: '#B15A44',
          dark: '#6B2A20',
        },
        gold: {
          DEFAULT: '#A8843F',
          light: '#C9A662',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wideish: '0.03em',
      },
      maxWidth: {
        prose: '70ch',
      },
    },
  },
  plugins: [],
};
