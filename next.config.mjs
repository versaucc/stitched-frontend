import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ensure Next.js uses the App Router under /app
  experimental: {
    appDir: true,
  },

  webpack(config, { isServer }) {
    // SVGR support for importing .svg as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    });

    // Example: Fix for specific server-side or client-side issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Prevents issues with 'fs' module on the client side
      };
    }

    return config;
  },
};

export default nextConfig;