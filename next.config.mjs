// next.config.mjs
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ensure Next.js uses the App Router under /app
  experimental: {
    appDir: true,
  },

  webpack(config) {
    // SVGR support for importing .svg as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig
