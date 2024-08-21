/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/component/**/*.{js,ts,jsx,tsx}',    
    './src/section/**/*.{js,ts,jsx,tsx}',    
  ],
  theme: {
    extend: {
      colors: {
        primary: "#71cfb9",
        secondary: "#fac441",
        accent: "#556080",        
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'hero': "url('/images/hero.jpg')",
      },
      fontFamily:{
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
