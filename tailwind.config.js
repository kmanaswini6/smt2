/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8F6F2',
        paper: '#FFFCF8',
        card: '#FFFFFF',
        sidebar: '#EFEAE2',
        ink: {
          DEFAULT: '#2A2623',
          secondary: '#6E655D',
        },
        border: {
          DEFAULT: '#DDD6CE',
          soft: '#E8E2D9',
        },
        accent: {
          DEFAULT: '#8A6A44',
          light: '#E9DDCF',
        },
        success: {
          DEFAULT: '#557153',
          bg: '#EDF5ED',
        },
        warning: {
          DEFAULT: '#B7791F',
          bg: '#FFF8E8',
        },
        error: {
          DEFAULT: '#A63A3A',
          bg: '#FFF2F2',
        },
        btn: {
          DEFAULT: '#2A2623',
          text: '#FAFAF8',
          hover: '#403A36',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        editorial: '-0.02em',
      },
      maxWidth: {
        editorial: '72rem',
      },
      boxShadow: {
        paper: '0 1px 2px rgba(42,38,35,0.04), 0 4px 12px rgba(42,38,35,0.06)',
        'paper-lg': '0 2px 4px rgba(42,38,35,0.05), 0 12px 32px rgba(42,38,35,0.10)',
        'paper-xl': '0 8px 8px rgba(42,38,35,0.04), 0 24px 48px rgba(42,38,35,0.12)',
        stamp: '0 1px 0 rgba(42,38,35,0.12)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
    },
  },
  plugins: [],
};
