import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        baskerville: ["Bodoni Moda", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
