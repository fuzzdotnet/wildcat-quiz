/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'placekitten.com'
      }
    ]
  },
  // Add metadata base URL configuration
  metadata: {
    metadataBase: new URL('http://localhost:3000')
  }
}

module.exports = nextConfig 