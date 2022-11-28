/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    maxWidth: {
      lg: "1536px",
    },
    maxHeight: {
      136: "32rem",
      96: "24rem",
      36: "9rem",
    },
    colors: {
      main: "rgb(15 23 42)",
      white: "white",
      "main-dark": "rgb(14 20 37)",
      "slate-300": "rgb(203 213 225)",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
