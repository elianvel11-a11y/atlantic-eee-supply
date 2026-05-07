import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Sanity Studio requires this to avoid transpiling issues
  transpilePackages: ['next-sanity'],

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://cdn.sanity.io",
              "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://api.sanity.io",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
      // Allow Sanity Studio to iframe its own previews
      {
        source: '/studio/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Strict mode for catching React issues early
  reactStrictMode: true,
}

export default nextConfig
