/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      mainColor : "#0aad0a",
      secondColor : "#ffc908"
      }
    },
  },
  plugins: [],
}

