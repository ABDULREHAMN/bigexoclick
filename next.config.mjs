/** @type {import('next').NextConfig} */
// Build v8 - Force cache clear
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
