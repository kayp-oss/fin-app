import type { PropsWithChildren } from 'react'
import type { Metadata, Viewport } from 'next'

// Utils
import { cn } from '#utils'

// Fonts
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

// Styles
import '#assets/css/tailwind.css'

export const metadata: Metadata = {
  title: {
    default: 'Fin',
    template: '%s | Fin',
  },
  description:
    'Helps users track their expenses, manage budgets and receive financial insights directly via Telegram.',
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  userScalable: false,

  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
}

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html
      lang='en-EN'
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        'bg-black text-white antialiased',
      )}
    >
      <body>{children}</body>
    </html>
  )
}
RootLayout.displayName = 'Root Layout'

export default RootLayout
