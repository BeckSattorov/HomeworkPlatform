/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    clipPath: {
      myCircle: "circle(100%)",
    },
    screens: {
      '2xl': { 'max': '1440px' },
      // => @media (max-width: 1440px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '991px' },
      // => @media (max-width: 991px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '479px' },
      // => @media (max-width: 479px) { ... }
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("tw-elements-react/dist/plugin.cjs"),
    require('tailwind-clip-path'),
  ]
}