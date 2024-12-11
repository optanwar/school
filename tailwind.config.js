/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      backgroundImage: {
        "hero-about": `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`,
        "testimonial-bg": `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('./assets/bg-testmonials.jpg')`,
      },
      colors: {
        primary_bg: "#F8F8F8",
        normal_bg: "#F5F5F5",
        brand_text: "#FF7A59",
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: ["flowbite/plugin", require("@tailwindcss/typography")],
};
