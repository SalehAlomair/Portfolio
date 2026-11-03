/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif"],
      },
      colors: {
        ink: {
          950: "#050505",
          900: "#0a0a0a",
          850: "#111111",
          800: "#171717",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
}
