/** @type {import('next').NextConfig} */
// Cache invalidation - cleaned config v2
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
