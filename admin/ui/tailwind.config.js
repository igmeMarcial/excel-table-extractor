/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src-frontpage/**/*.{tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-grey': '#F0F0F0',
        'custom-blue': '#0F6CBD',
        'custom-green': '#5ABA5B',
        'mdea-1': '#01b0f1',
        'mdea-2': '#c45a10',
        'mdea-3': '#c10100',
        'mdea-4': '#0170c0',
        'mdea-5': '#018000',
        'mdea-6': '#bc9100',
      },
      spacing: {
        'custom-pad': '6px',
      },
    },
  },
  plugins: [],
};
