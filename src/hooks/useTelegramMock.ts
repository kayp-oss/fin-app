import { parseInitData, isTMA, mockTelegramEnv } from '@telegram-apps/sdk-react'
import { useClientOnce } from '#hooks'

/**
 * A hook for simulating the Telegram environment during development.
 * This hook only works on the client side and is only active in development mode.
 *
 * @returns {void}
 * @see https://github.com/Telegram-Mini-Apps/telegram-apps/blob/master/playgrounds/next/src/hooks/useTelegramMock.ts
 */
export function useTelegramMock(): void {
  useClientOnce(() => {
    if (!shouldMockEnvironment()) {
      return
    }

    const initDataRaw = createMockInitData()
    applyMockEnvironment(initDataRaw)

    logMockWarning()
  })
}

/**
 * Determines if the environment should be mocked.
 *
 * @returns {boolean} Whether the environment should be mocked or not
 */
function shouldMockEnvironment(): boolean {
  const MOCK_KEY = '____mocked'

  // Returns true if the current environment is Telegram Mini Apps.
  // We don't mock if we are already in a mini app.
  if (isTMA('simple')) {
    // We could previously mock the environment.
    // In case we did, we should do it again.
    // The reason is the page could be reloaded, and we should apply mock again,
    // because mocking also enables modifying the window object.
    return !!sessionStorage.getItem(MOCK_KEY)
  }

  return true
}

/**
 * Creates mocked initData.
 *
 * @returns {string} initData in URLSearchParams format
 */
function createMockInitData(): string {
  return new URLSearchParams([
    [
      'user',
      JSON.stringify({
        id: 99281932,
        first_name: 'Ryan',
        last_name: 'Gosling',
        username: 'gosling',
        language_code: 'en',
        is_premium: true,
        allows_write_to_pm: true,
      }),
    ],
    [
      'hash',
      '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
    ],
    ['auth_date', '1716922846'],
    ['start_param', 'debug'],
    ['chat_type', 'sender'],
    ['chat_instance', '8428209589180549439'],
  ]).toString()
}

/**
 * Applies the mocked Telegram environment.
 *
 * @param {string} initDataRaw - initData in URLSearchParams format
 */
function applyMockEnvironment(initDataRaw: string): void {
  mockTelegramEnv({
    themeParams: {
      accentTextColor: '#6ab2f2',
      bgColor: '#17212b',
      buttonColor: '#5288c1',
      buttonTextColor: '#ffffff',
      destructiveTextColor: '#ec3942',
      headerBgColor: '#17212b',
      hintColor: '#708499',
      linkColor: '#6ab3f3',
      secondaryBgColor: '#232e3c',
      sectionBgColor: '#17212b',
      sectionHeaderTextColor: '#6ab3f3',
      subtitleTextColor: '#708499',
      textColor: '#f5f5f5',
    },
    initData: parseInitData(initDataRaw),
    initDataRaw,
    version: '8',
    platform: 'tdesktop',
  })

  sessionStorage.setItem('____mocked', '1')
}

/**
 * Logs a warning message about the mocking to the console.
 */
function logMockWarning(): void {
  console.info(
    '⚠️ As the current environment was not considered Telegram-based, it has been mocked. ' +
      'Please note that you should not do this in production, and this behavior is specific ' +
      'to the development process only. Environment mocking is applied only in development mode. ' +
      'Therefore, after building the application, you will not see this behavior or the related ' +
      'warning, which would lead to the application crashing outside of Telegram.',
  )
}
