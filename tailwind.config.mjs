/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dunor-black": "#212121"
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
      },
      fontSize: {
        "3xl": "2rem"
      },
      fontFamily: {
        display: ["Playfair Display", "sans-serif"],
        sans: ["Josefin Sans", "sans-serif"]
      }
    }
  },
  plugins: []
}
