// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#fff0f0',
          100: '#ffdede',
          200: '#ffc2c2',
          300: '#ff9090',
          400: '#ff5454',
          500: '#ee2a2a',
          600: '#db0000',
          700: '#b80000',
          800: '#960000',
          900: '#7a0000',
        },
        neutral: {
          50: '#ffffff',
          100: '#f8f8f8',
          200: '#e6e6e6',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#0a0a0a',
        },
        success: '#16a34a',
        warning: '#ea580c',
        error: '#dc2626',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Oswald"', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'nav': '0 1px 0 rgba(0,0,0,0.05)',
        'button': '0 2px 4px rgba(238, 42, 42, 0.2)',
      }
    },
  },
  plugins: [],
}