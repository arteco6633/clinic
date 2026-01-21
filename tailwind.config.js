/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'green': {
          glow: '#39FF14',
          dark: '#1a3d1a',
          light: '#7FFF00',
        },
        'purple': {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          glow: '#9945FF',
        },
        'gray': {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'massive': ['clamp(80px, 15vw, 200px)', { lineHeight: '0.9', fontWeight: '900' }],
        'huge': ['clamp(60px, 12vw, 160px)', { lineHeight: '0.9', fontWeight: '900' }],
      },
      letterSpacing: {
        'widest': '0.2em',
        'ultra': '0.3em',
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
