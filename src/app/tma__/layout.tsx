import type React from 'react'
import type { PropsWithChildren } from 'react'
import type { Metadata, Viewport } from 'next'

import { Fragment } from 'react'
import { TelegramMiniAppRegister } from '~/src/features'

export const metadata: Metadata = {
  //
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  userScalable: false,
}

const TelegramWebAppsLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <TelegramMiniAppRegister>{children}</TelegramMiniAppRegister>
    </Fragment>
  )
}
TelegramWebAppsLayout.displayName = 'Root layout for telegram web app'

export default TelegramWebAppsLayout
