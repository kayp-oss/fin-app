import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    'src/app/**/*.{ts,tsx}',
    'src/components/**/*.{ts,tsx}',
    'src/features/**/*.{ts,tsx}',
    'src/layouts/**/*.{ts,tsx}',
    'src/widgets/**/*.{ts,tsx}',
  ],

  theme: {
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
      keyframes: {
        'shimmer': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
        'shimmer-bg': {
          from: { backgroundPositionX: '100%' },
          to: { backgroundPositionX: '0%' },
        },
      },
    },
  },

  plugins: [],
}

export default config
