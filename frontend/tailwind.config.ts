import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primargreen: 'var(--primary-green)',
        primaryBlack400: 'var(--primary-black-400)',
        primaryWhite500: 'var(--primary-white-500)',
        secundaryGreen700: 'var(--primary-gree-700)',
        primarygray: "var(--primary-gray)",
        secundarygray900:"var(--secundary-gray-900)"
      },
      boxShadow: {
        shadowButtomAcessar: '0px 4px 34px 5px #D5D6DB',
        shadowInputFormContact: '0px 1px 10px 3px rgba(32, 180, 114, 0.75)',
        hoverShadowButtomAcessar: '0px 4px 40px 8px #D5D6DB',
        shadowCardEventLocation: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config
