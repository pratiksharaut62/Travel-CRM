/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#0E1428",
          hover: "#171E3A",
          active: "#1B2340",
          border: "#232B4A",
          text: "#8992B3",
          textActive: "#FFFFFF",
        },
        brand: {
          50: "#FFF1EC",
          100: "#FFE1D2",
          400: "#FA9776",
          500: "#F87C56",
          600: "#F0673D",
          700: "#D9542C",
        },
        canvas: "#F5F6FA",
        card: "#FFFFFF",
        ink: {
          900: "#12162B",
          700: "#374162",
          500: "#6B7396",
          400: "#9AA1BD",
          200: "#E4E7F1",
          100: "#EEF0F7",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18, 22, 43, 0.06), 0 1px 1px rgba(18, 22, 43, 0.04)",
        pop: "0 12px 32px rgba(18, 22, 43, 0.14)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};
