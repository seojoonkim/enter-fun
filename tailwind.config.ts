import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        mint: "#00D4AA",
        purple: "#7B61FF",
        dark: "#1A1A2E",
        dark2: "#16213E",
      },
    },
  },
};

export default config;
