/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},

      keyframes: {
        live: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.7" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        live: "live 1.5s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
