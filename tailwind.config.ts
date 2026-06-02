import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#FFFFFF",
          light: "#EBF5FB",
          mid: "#1B6CA8",
          dark: "#0D2137",
        },
        gold: {
          DEFAULT: "#1A9ED4",
          light: "#5BB8E0",
          dark: "#1565A0",
          pale: "#D6EAF8",
        },
        ivory: {
          DEFAULT: "#0D2137",
          light: "#1B4F72",
          dark: "#061523",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        notoSerif: ["var(--font-noto-serif)", "serif"],
        notoSans: ["var(--font-noto-sans)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        widest: "0.3em",
        "ultra-wide": "0.5em",
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #EBF5FB 0%, #D6EAF8 100%)",
        "gradient-gold": "linear-gradient(135deg, #1A9ED4 0%, #1565A0 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
