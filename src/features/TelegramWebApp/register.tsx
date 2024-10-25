'use client'

import type React from 'react'
import type { PropsWithChildren } from 'react'

import env from '#env'
import { Fragment } from 'react'
import { init } from '@/init'
import {
  initDataUser,
  useLaunchParams,
  useSignal,
} from '@telegram-apps/sdk-react'
import { useClientOnce, useDidMount, useTelegramMock } from '#hooks'
import { cn } from '#utils'

const TelegramMiniApp: React.FC<PropsWithChildren> = ({ children }) => {
  const isDev = env.NEXT_PUBLIC_NODE_ENV === 'development'

  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock()
  }

  const lp = useLaunchParams()
  const debug = isDev || lp.startParam === 'debug'

  useClientOnce(() => {
    init(debug)
  })

  const client = useSignal(initDataUser)

  return (
    <Fragment>
      <section className='fixed left-0 top-0 bg-black/75 backdrop-blur-sm'>
        <pre className='font-mono text-white'>
          {JSON.stringify(client, null, 2)}
        </pre>
      </section>

      {children}
    </Fragment>
  )
}

const TelegramMiniAppLoader: React.FC = () => {
  return (
    <div
      className={cn(
        'size-20 animate-spin rounded-full',
        'border-4 border-white border-t-transparent',
      )}
    />
  )
}

export const TelegramMiniAppRegister: React.FC<PropsWithChildren> = props => {
  const isMounted = useDidMount()

  if (!isMounted) {
    return <TelegramMiniAppLoader />
  }

  return <TelegramMiniApp {...props} />
}
