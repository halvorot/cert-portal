const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#3b82f6", // blue-500
        accent: "#2563eb", // blue-600
      },
      secondary: {
        DEFAULT: "#93c5fd", // blue-300
        accent: "#60a5fa", // blue-400
      },
      dark: {
        DEFAULT: "#0a0a0a", // neutral-950
        accent: "#262626", // neutral-800
        blue: "#111724",
      },
      light: {
        DEFAULT: "#e2e8f0", // slate-200
        accent: "#cbd5e1", // slate-300
      },
      success: "#16a34a", // green-500
      error: "#dc2626", // green-500
      transparent: "transparent",
      current: "currentColor",
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, 1fr)',
      }
    }
  },
  plugins: [],
};
