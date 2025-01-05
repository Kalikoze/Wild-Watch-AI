import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#121212', // Rich black
          light: '#1E1E1E',   // Lighter black
          dark: '#0A0A0A',    // Darker black
        },
        accent: {
          green: '#28A745',     // Rich modern green
          orange: {
            DEFAULT: '#FF5722', // Vibrant orange
            light: '#FF7F50',   // Coral orange
            dark: '#B33810',    // Deep orange
          },
          gold: '#FFA000',      // Warm gold
        },
        neutral: {
          light: '#F5F5F5',     // Almost white
          DEFAULT: '#A0A0A0',   // Medium gray
          dark: '#404040',      // Dark gray
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
