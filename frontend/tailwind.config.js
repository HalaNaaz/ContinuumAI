/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#111111",
        surface: "#171717",
        "surface-2": "#1D1D1B",
        text: "#F0EFEA",
        muted: "#A6A49E",
        border: "#383835",
        accent: {
          DEFAULT: "#FF6A00",
          hover: "#E55F00",
        },
        success: "#8DD8B5",
        warning: "#E8BD70",
        danger: "#F07878",
      },
      fontFamily: {
        display: ["var(--font-display)", "Oxanium", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -4px rgba(255, 106, 0, 0.45)",
        "glow-lg": "0 0 40px -6px rgba(255, 106, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
