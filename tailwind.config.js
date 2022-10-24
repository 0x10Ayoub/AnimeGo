/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors:{
        'primary-blue':'#3db4f2'
      }
    },
  },
  plugins: [],
}