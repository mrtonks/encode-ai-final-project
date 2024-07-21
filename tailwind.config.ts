import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6750A4',
        secondary: '#333333',
        purple: '#6221e6',
        pink: '#fedadb',
        'gray-dark': '#273444',
        'gray-dark-2': '#302939',
        'gray-light': '#c7c6c6',
        'gray-light-2': '#79747E',
        white: '#ffffff',
        black: '#1e1e1e',
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        serif: ['Inter', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('preline/plugin'), require('@tailwindcss/forms')],
}
export default config
