/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8",
        "primary-dark": "#1557B0",
        safe: "#34A853",
        warning: "#FBBC04",
        danger: "#EA4335",
        bg: "#F0F4F8",
        surface: "#FFFFFF",
        text: "#1A1A2E",
        "text-secondary": "#5F6368",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Nunito", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
