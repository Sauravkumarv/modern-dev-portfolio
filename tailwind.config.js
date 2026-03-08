/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0f172a",
        panel: "rgba(15, 23, 42, 0.72)",
        accent: "#22d3ee",
        "accent-strong": "#38bdf8",
        "text-soft": "#cbd5e1",
      },
      boxShadow: {
        glow: "0 0 30px rgba(34, 211, 238, 0.18)",
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at top, rgba(34, 211, 238, 0.12), transparent 34%), linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 0.98))",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
