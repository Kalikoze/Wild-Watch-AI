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
          green: {
            DEFAULT: '#28A745', // Rich modern green
            dark: '#1E7E34',   // Darker green for primary actions
            light: '#34CE57',   // Lighter green for hover states
          },
          orange: {
            DEFAULT: '#FF5722', // Vibrant orange
            light: '#FF7F50',   // Coral orange
            dark: '#B33810',    // Deep orange
          },
          gold: {
            DEFAULT: '#FFA000', // Warm gold
            light: '#FFB74D',   // Lighter gold for hover states
            dark: '#FF8F00',   // Darker gold for primary actions
          },
          blue: {
            DEFAULT: '#2196F3', // Vibrant blue
            light: '#64B5F6',   // Lighter blue for hover states
            dark: '#1976D2',   // Darker blue for primary actions
          },
        },
        neutral: {
          light: '#F5F5F5', // Almost white
          DEFAULT: '#A0A0A0',   // Medium gray
          dark: '#404040',   // Dark gray
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
