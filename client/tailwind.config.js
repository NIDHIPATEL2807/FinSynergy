/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // Include your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}",  // Include all JSX, TSX, JS, TS files inside `src`
  ],
  theme: {
    extend: {
      colors: {
        textdark: "#2c5d63",  // Custom text color
        textlight: "#a2c11c",  // Custom background color
      },
    },
  },
  plugins: [],
}
