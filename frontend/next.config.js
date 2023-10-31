/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'theturfman.com.au',
            port: '',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '1337',
          },
        ],
      },
}

module.exports = nextConfig
