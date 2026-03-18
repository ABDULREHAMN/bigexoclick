/** @type {import('next').NextConfig} */
// Build v4 - Force cache refresh (2025-03-18)
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
