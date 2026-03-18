/** @type {import('next').NextConfig} */
// Cache invalidation - cleaned config
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
