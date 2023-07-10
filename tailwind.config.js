/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkgreen: '#304811',
        lightgreen: '#6A9633',
        softgreen: '#7BAD3B',
        rsgreen: '#7EB33D',
        heavydark: '#0F1011',
        lightdark: '#1A1C1D',
      },

      screens: {
        'xs': '475px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
