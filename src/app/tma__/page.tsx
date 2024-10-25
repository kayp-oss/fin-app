import type React from 'react'

import { cn } from '#utils'

const Homepage: React.FC = () => {
  return (
    <section className='grid min-h-dvh place-content-center'>
      <span
        className={cn(
          'bg-clip-text text-2xl font-semibold text-transparent',
          'bg-gradient-to-r from-white via-slate-500 to-white',
          'animate-[shimmer-bg_2s_infinite] from-40% to-60%',
        )}
        style={{
          backgroundSize: '300% 100%',
          backgroundPositionX: '100%',
        }}
      >
        Goodbye World!
      </span>
    </section>
  )
}

export default Homepage
