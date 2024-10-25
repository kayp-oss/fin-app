import bundleAnalyzer from '@next/bundle-analyzer'
import { env } from './src/env.mjs'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: env.ANALYZE,
  openAnalyzer: env.OPEN_ANALYZER,
  analyzerMode: env.ANALYZER_MODE,
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
}

export default withBundleAnalyzer(nextConfig)
