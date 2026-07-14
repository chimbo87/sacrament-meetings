import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optional: If you want to suppress the workspace root warning
  experimental: {
    turbopack: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;