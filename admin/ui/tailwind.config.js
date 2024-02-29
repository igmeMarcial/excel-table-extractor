/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src-frontpage/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-grey": "#F0F0F0",
        "custom-blue": "#0F6CBD",
      },
    },
  },
  plugins: [],
};
