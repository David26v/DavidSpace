import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Background gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Custom breakpoints
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
      // Custom animations
      animation: {
        'slowspin': 'slowspin 4s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
        'slideUp': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slideIn': 'slideIn 0.3s ease-out forwards',
        'scaleIn': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        slowspin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(112, 66, 248, 0.6), 0 0 20px rgba(112, 66, 248, 0.4)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(112, 66, 248, 0.8), 0 0 40px rgba(112, 66, 248, 0.5)' 
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      // Custom colors for consistency
      colors: {
        'primary': {
          DEFAULT: '#7042f8',
          50: '#f5f3ff',
          100: '#ede8ff',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7042f8',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        'accent': '#b49bff',
        'dark': {
          DEFAULT: '#030014',
          100: '#0c0f1a',
          200: '#0f1220',
          300: '#1a1f35',
          border: '#2A0E61',
        },
      },
      // Font sizes optimized for mobile
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      // Spacing for consistent layouts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      // Box shadow for glowing effects
      boxShadow: {
        'glow': '0 0 20px rgba(112, 66, 248, 0.4)',
        'glow-lg': '0 0 40px rgba(112, 66, 248, 0.5)',
        'glow-sm': '0 0 10px rgba(112, 66, 248, 0.3)',
      },
    },
  },
  plugins: [],
  // Enable future CSS features
  future: {
    hoverOnlyWhenSupported: true,
  },
}

export default config
