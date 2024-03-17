const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addComponents }) {
      const cardContainer = {
        ".cardContainer": {
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          "@screen sm": { maxWidth: "730px" },
          "@screen md": { maxWidth: "770px" },
          "@screen lg": { maxWidth: "1024px" },
          "@screen xl": { maxWidth: "1024px" },
          "@screen 2xl": { maxWidth: "1024px" },
        },
      };
      addComponents(cardContainer);
    }),
  ],
};
