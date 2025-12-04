export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#07060a",
        primary: "var(--color-primary)",
        primary2: "var(--color-primary-2)",
        primary3: "var(--color-primary-3)",
      }
    }
  },
  plugins: [],
}
