/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#234B51', // Midnight green
          hover: '#1a3a3f',
        },
        secondary: {
          DEFAULT: '#C49E85', // Lion
          secondary: '#b38d73',
        },
        accent: {
          DEFAULT: '#FFD6AF', // Light orange
          hover: 'ffc992',
        },
        tertiary: {
          DEFAULT: '#DCCAE3', // Thistle
          hover: '#d0b9da',
        }
      }
    },
  },
  plugins: [],
}

