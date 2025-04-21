// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fcddf2',     // light pink background
        body: '#505477',           // dark muted purple for text
        primary: '#616c99',
        'primary-dark': '#505477',
        'light-pink-1': '#fcddf2',
        'light-pink-2': '#ffc2c2',
        'light-pink-3': '#ffdede',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
export default config
