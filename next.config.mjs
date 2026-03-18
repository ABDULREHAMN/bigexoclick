/** @type {import('next').NextConfig} */
// Build v7 - Cache cleared, hydration fixed
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
