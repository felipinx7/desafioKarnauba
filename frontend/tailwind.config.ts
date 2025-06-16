import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/paginas/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primargreen: 'var(--primary-green)',
        primaryBlack400: 'var(--primary-black-400)',
        primaryWhite500: 'var(--primary-white-500)',
        secundaryGreen700: 'var(--primary-gree-700)',
        primarygray: 'var(--primary-gray)',
        secundarygray900: 'var(--secundary-gray-900)',
        secundaryblack800: 'var(--secundary-black800)',
      },
      boxShadow: {
        shadowButtomAcessar: '0px 4px 34px 5px #D5D6DB',
        shadowInputFormContact: '0px 1px 10px 3px rgba(32, 180, 114, 0.75)',
        hoverShadowButtomAcessar: '0px 4px 40px 8px #D5D6DB',
        shadowCardEventLocation: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        shadowInputClientePage: '0px 12px 12px 1px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' },
        },
      },
      animation: {
        typing: 'typing 3s steps(30, end) forwards',
        blink: 'blink 0.75s step-end infinite',
        'typing-with-cursor': 'typing 3s steps(30, end) forwards, blink 0.75s step-end infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
