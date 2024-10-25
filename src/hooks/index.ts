/**
 * This file exports all functions from the #hooks directory.
 * It serves as a central point for importing hook functions throughout the application.
 * When adding new hooks, make sure to export them here for easy access.
 *
 * Example usage:
 * Instead of:
 * import { useDidMount } from '#hooks/useDidMount'
 * import { useSomeFn } from '#hooks/useSomeFn'
 *
 * You can now use:
 * import { useDidMount, useSomeFn } from '#hooks'
 */

export { useTelegramMock } from '#hooks/useTelegramMock'
export { useClientOnce } from '#hooks/useClientOnce'
export { useDidMount } from '#hooks/useDidMount'
