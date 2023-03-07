module.exports = {
  content: [
    "./content/**/*.{html,njk,md,json,js}",
    "./.eleventy.js",
    "_includes/**/*.{html,njk,md,json,js}",
  ],
  // plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#293E40",
        },
        accent: {
          400:"#86ED78",
          500: "#62D84E",
        }
      }
    }
  }
};
