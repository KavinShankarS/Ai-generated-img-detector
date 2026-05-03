/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#00d4aa',
          500: '#00b894',
          600: '#00a381',
        }
      }
    },
  },
  plugins: [],
}
