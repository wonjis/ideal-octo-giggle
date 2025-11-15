/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#A855F7',
          hover: '#9333EA',
          active: '#7E22CE',
          light: '#C084FC',
        },
        background: {
          primary: '#0F0F1E',
          secondary: '#1A1A2E',
          tertiary: '#252541',
          elevated: '#2D2D4A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B4B4C8',
          tertiary: '#8B8B9E',
          disabled: '#5A5A6E',
        },
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
        border: {
          default: '#3A3A52',
          hover: '#4A4A62',
          focus: '#A855F7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Sora', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(168, 85, 247, 0.4)',
      },
      borderRadius: {
        'base': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
