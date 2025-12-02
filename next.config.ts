import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from 'next-pwa';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// PWA Configuration for offline disaster relief access
const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // Cache critical pages for offline access during network outages
  runtimeCaching: [
    {
      // Cache static assets
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      // Cache images from Supabase storage
      urlPattern: /^https:\/\/bercuuipenekhrxekcfx\.supabase\.co\/storage\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'supabase-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
        },
      },
    },
    {
      // Cache API responses with network-first strategy
      urlPattern: /^https:\/\/bercuuipenekhrxekcfx\.supabase\.co\/rest\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'supabase-api',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      // Cache page navigations
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-static',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bercuuipenekhrxekcfx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect cycloneditwah.com to ditwah.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'cycloneditwah.com',
          },
        ],
        destination: 'https://ditwah.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.cycloneditwah.com',
          },
        ],
        destination: 'https://ditwah.com/:path*',
        permanent: true,
      },
      // Redirect www.ditwah.com to ditwah.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ditwah.com',
          },
        ],
        destination: 'https://ditwah.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default withPWA(withNextIntl(nextConfig));
