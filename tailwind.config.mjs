/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dunor-black": "#212121",
        "dunor-gold": "#bf9540"
      },
      screens: {
        "2xs": "480px",
        xs: "512px",
        slg: "1088px",
      },
      fontSize: {
        "3.5xl": "2rem"
      },
      fontFamily: {
        display: ["Playfair Display", "sans-serif"],
        sans: ["Fira Sans", "sans-serif"]
      }
    }
  },
  plugins: []
}
