/** @type {import('next').NextConfig} */
// Build v9 - Cache invalidation for TRC20 payment update
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
