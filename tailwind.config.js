/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-heart": {
          50: "#f9f5ff",
          100: "#f1e9fe",
          200: "#e6d6fe",
          300: "#d3b7fb",
          400: "#b888f8",
          500: "#9d5bf1",
          600: "#8739e4",
          700: "#7228c8",
          800: "#6226a3",
          900: "#512083",
          950: "#350a61",
        },
        "black-russian": {
          50: "#e5e4ff",
          100: "#d3cfff",
          200: "#b2a8ff",
          300: "#8974ff",
          400: "#703eff",
          500: "#6613ff",
          600: "#6100ff",
          700: "#6100ff",
          800: "#5600e4",
          900: "#4900b0",
          950: "#0f0022",
        },
        haiti: {
          50: "#ede7ff",
          100: "#dfd3ff",
          200: "#c8b0ff",
          300: "#ac81ff",
          400: "#9e50ff",
          500: "#9a28ff",
          600: "#a104ff",
          700: "#9f00ff",
          800: "#8300d3",
          900: "#650ca3",
          950: "#1a0328",
        },
      },
    },
  },
  plugins: [],
};
