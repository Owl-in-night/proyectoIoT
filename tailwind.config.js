/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    screens: {
      'xs': '375px', // Extra small devices (phones)
      'sm': '640px', // Small devices (phones)
      'md': '768px', // Medium devices (tablets)
      'lg': '1024px', // Large devices (desktops)
      'xl': '1280px', // Extra large devices (large desktops)
      '2xl': '1536px' // Extra extra large devices
    },
    extend: {}
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
  plugins: [
    require('tw-elements/plugin.cjs'),
    require('flowbite/plugin')
  ]
}
