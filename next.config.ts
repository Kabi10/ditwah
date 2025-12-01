import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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

export default withNextIntl(nextConfig);
