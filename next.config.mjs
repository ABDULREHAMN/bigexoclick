/** @type {import('next').NextConfig} */
// Force cache invalidation - v2
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
