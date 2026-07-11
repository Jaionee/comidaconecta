import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://comidaconecta-worker.jaione-garay.workers.dev/api/:path*',
      },
    ]
  },
};

export default nextConfig;
