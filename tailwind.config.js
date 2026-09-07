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
        brand: {
          orange: '#FF5722',
          'orange-hover': '#F4511E',
          'orange-light': '#FF7A45',
          'orange-dark': '#E64A19',
          gold: '#FF9800',
          cyan: '#00BCD4',
          emerald: '#10B981',
          navy: '#0B132B',
        },
        logistics: {
          950: '#070A0F',
          900: '#0C121D',
          850: '#121A2A',
          800: '#182338',
          700: '#23324E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 30px -5px rgba(255, 87, 34, 0.45)',
        'glow-orange-lg': '0 0 50px -5px rgba(255, 87, 34, 0.6)',
        'glow-cyan': '0 0 25px -5px rgba(0, 188, 212, 0.4)',
        'glow-badge': '0 0 0 10px rgba(255, 87, 34, 0.15), 0 0 0 20px rgba(255, 87, 34, 0.08)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
