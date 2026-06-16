/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkblue: '#1e3a5f',
          lightblue: '#4a90e2'
        }
      }
    },
  },
  plugins: [],
}
