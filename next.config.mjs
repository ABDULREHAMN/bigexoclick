/** @type {import('next').NextConfig} */
// Build v3 - Clean cache
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
