import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Server-side Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z.enum(['development', 'production']),

    ANALYZE: z.string().transform(v => v === 'true'),
    OPEN_ANALYZER: z.string().transform(v => v === 'true'),
    ANALYZER_MODE: z.enum(['static', 'json']),
  },

  /*
   * Environment variables available on the client (and server).
   */
  client: {
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production']),
  },

  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,

    ANALYZE: process.env.ANALYZE,
    OPEN_ANALYZER: process.env.OPEN_ANALYZER,
    ANALYZER_MODE: process.env.ANALYZER_MODE,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})

export default env
