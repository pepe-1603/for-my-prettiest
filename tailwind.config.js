// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['"Pacifico"', 'cursive'],
        caveat: ['"Caveat"', 'cursive'],
        'caveat-brush': ['"Caveat Brush"', 'cursive'],
      },
    },

  },
  plugins: [],
}