import { useEffect, useState } from 'react'

/**
 * A custom React hook that determines if a component has mounted.
 *
 * @returns {boolean} true if the component has mounted, false otherwise.
 *
 * @example ```
 * const isMounted = useDidMount();
 * if (isMounted) {
 *   // Perform actions only after component has mounted
 * }
 * ```
 * @see https://github.com/Telegram-Mini-Apps/telegram-apps/blob/master/playgrounds/next/src/hooks/useDidMount.ts
 */
export function useDidMount(): boolean {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
  }, [])

  return didMount
}
