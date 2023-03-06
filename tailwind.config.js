module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        activeColor: "#E03400",
        warningColor: "#f5bc42",
        mainBlue: "#364BB5",
        mainBlueDisabled: "#A4ADDD",
        darkBlue: "#102347",
        turquoise: "#1BC7FE",
        backgroundBlue: "#EFF1F9",
        mainGray: "#90949C",
        lightBlue: "rgba(54, 75, 181, 0.32441)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
