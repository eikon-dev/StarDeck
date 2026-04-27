import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['abnormal-upbeat-charger.ngrok-free.dev'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

export default nextConfig;
