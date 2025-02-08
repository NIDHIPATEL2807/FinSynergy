/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // Include your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}",  // Include all JSX, TSX, JS, TS files inside `src`
  ],
  theme: {
    extend: {
      colors: {
        dgreen: "#2c5d63", // Dark Green
        lgreen: "#3ab7bf", // Light Green
      },
    },
  },
  plugins: [],
}
