/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0E1126',
          main: '#037F8C',
          light: '#F2CEAE'
        },
        accent: {
          copper: '#BF754B',
          brown: '#734230'
        }
      }
    },
  },
  plugins: [],
};