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
        'primary-blue':'#3db4f2',
        'primary-gray':'#edf1f5',
        'gray-a-900':'#516170',
        'white':'#fbfbfb'
      },
      dropShadow:{
        'md-blue':'--tw-drop-shadow: drop-shadow(0 4px 3px rgb(103 132 187 / 0.07)) drop-shadow(0 2px 2px rgb(103 132 187 / 0.06));'
      },
      fontWeight:{
        '600':'600'
      }
    },
  },
  plugins: [],
}