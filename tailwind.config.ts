import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFDD00',
        'primary-dark': '#FFB800',
        'primary-light': '#FACC15',
        'bg-gray': '#1B1D27',
        'accent-gray': '#151721',
        'accent-gray2': '#12131C',
        'accent-dark': '#040613',
        dark: '#141414',
        darker: '#111111',
        light: '#F4F4F4',
        'text-gray': '#B3B3B3',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        DEFAULT: '0 4px 8px rgba(0, 0, 0, 0.15)',
        lg: '0 6px 12px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config
