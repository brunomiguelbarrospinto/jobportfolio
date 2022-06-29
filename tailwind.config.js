module.exports = {
  darkMode: "class",

  important: true,
  content: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    cursor: {
      pointer: "pointer",
      grab: "grab",
    },
    extend: {},
  },
  variants: {
    extend: {
      margin: ["last"],
    },
  },
  plugins: [],
};
