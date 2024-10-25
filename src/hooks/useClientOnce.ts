import { useRef } from 'react'

type UseClientOnceFn = () => void

/**
 * A custom React hook that ensures a function is called only once on the client side.
 *
 * @param {UseClientOnceFn} fn - The function to be executed once on the client side.
 *
 * @example ```ts
 * useClientOnce(() => {
 *   console.log('This will be logged only once on the client side');
 * });
 * ```
 * @see https://github.com/Telegram-Mini-Apps/telegram-apps/blob/master/playgrounds/next/src/hooks/useClientOnce.ts
 */
export function useClientOnce(fn: UseClientOnceFn): void {
  const hasRun = useRef(false)

  /**
   * Confirms that the code is running in a browser environment (`typeof window !== 'undefined`),
   * which prevents execution on the server side.
   *
   * By checking outside React lifecycle hooks (like `useEffect`), the hook minimizes unnecessary renders
   * and allows `fn` to execute immediately on component initialization, but only once in the client environment.
   * The `hasRun` ref ensures `fn` is only called once per component lifecycle.
   */
  if (typeof window !== 'undefined' && !hasRun.current) {
    hasRun.current = true
    fn()
  }

  return
}
