/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        custom:'#002240',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

