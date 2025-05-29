import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'pakosti.online'],
  },
  serverRuntimeConfig: {
    suppressAxiosErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost',
  },
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)
