/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://comidaconecta-worker.jaione-garay.workers.dev/api/:path*',
      },
    ]
  },
}

export default nextConfig
