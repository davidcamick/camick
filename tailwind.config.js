/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--rgb-bg) / <alpha-value>)",
        panel: "rgb(var(--rgb-panel) / <alpha-value>)",
        panel2: "rgb(var(--rgb-panel-2) / <alpha-value>)",
        line: "rgb(var(--rgb-line) / <alpha-value>)",
        ink: "rgb(var(--rgb-text) / <alpha-value>)",
        muted: "rgb(var(--rgb-muted) / <alpha-value>)",
        cue: "rgb(var(--rgb-cue) / <alpha-value>)",
        rec: "rgb(var(--rgb-rec) / <alpha-value>)",
        amber: "rgb(var(--rgb-amber) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        // Broadcast chrome is hard-edged. Nothing rounder than a 2px chamfer.
        hud: "2px",
      },
      animation: {
        "bar-wipe": "bar-wipe 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        ticker: "ticker-run var(--ticker-duration, 32s) linear infinite",
      },
      transitionTimingFunction: {
        hud: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
