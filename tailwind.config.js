/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Future Sport"', 'sans-serif'],
        'pixel': ['"Press Start 2P"', 'cursive'],
        'sans': ['Inter', 'sans-serif'],
        'sport': ['"Future Sport"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

