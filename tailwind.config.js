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
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out',
        slideUp: 'slideUp 0.2s ease-out',
        fadeIn: 'fadeIn 0.2s ease-out',
        fadeOut: 'fadeOut 0.2s ease-out'
      }
    },
  },
  plugins: [],
}