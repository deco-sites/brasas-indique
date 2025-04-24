import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    colors: {
      "white": "#FFFFFF",
      black: {
        500: "#2C2C2C",
      },
      blue: {
        300: "#1e22be",
      },
      purple: {
        500: "#9063CD",
      },
      green: {
        100: "#C5E86C",
      },
    },
  },
};
