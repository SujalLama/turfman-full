/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'theturfman.com.au',
            port: '',
          },
        ],
      },
}

module.exports = nextConfig
