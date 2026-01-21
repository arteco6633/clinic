/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основные цвета из референса
        'primary': {
          DEFAULT: '#2D7B6F',
          dark: '#246860',
          light: '#3A9485',
        },
        'accent': {
          DEFAULT: '#E85D2D',
          dark: '#D14F22',
          light: '#F06E42',
        },
        'neutral': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        'cream': '#F5F0E8',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
      },
      boxShadow: {
        'form': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 15px rgba(45, 123, 111, 0.3)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
  },
  plugins: [],
}
