/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        bangla: ["LiAdor"],
        poppins: ["'Poppins', sans-serif"],
        amaranth: ["Amaranth", "sans-serif"],
        inter: ["Inter"],
      },
    },
  },
  plugins: [
    require("daisyui", "tw-elements/dist/plugin", "@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
  ],
  daisyui: {
    themes: [
      {
        SBtheme: {
          primary: "#0f172a",
          secondary: "#8A8A8A",
          "base-100": "#f1f2f4",
        },
      },
    ],
  },
};
