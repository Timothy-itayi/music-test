/** @type {import('tailwindcss').Config} */
module.exports = { mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation:{
        fade:'fade 1s east-out',
        shimmer: "shimmer 2s linear infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
          
     
      },
      width: {
        '[300px]': '300px',
      },
      height: {
        '[400px]': '400px',
        '[600px]': '600px',
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      
        shimmer:{
          from:{
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0"
          },
        },
      },
      variants: {
        grayscale: ['responsive', 'hover'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  plugins: [
    require('tailwindcss-animated')
  ],
},}
