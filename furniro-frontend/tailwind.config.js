/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary_button' : '#B88E2F'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
   
  },
  plugins: [],
}

