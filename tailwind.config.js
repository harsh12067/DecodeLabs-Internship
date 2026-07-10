/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030712', // deep black-blue
          900: '#0B0F19', // main dark background
          800: '#111827', // secondary dark
          700: '#1F2937', // dark cards
          600: '#374151',
        },
        purple: {
          500: '#A855F7', // primary accent purple
          600: '#9333EA', // hover purple
          700: '#7E22CE', // deep purple
        },
        accent: {
          pink: '#EC4899', // pink accent for gradients
          blue: '#3B82F6', // blue accent for gradients
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
