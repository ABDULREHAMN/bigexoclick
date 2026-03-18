/** @type {import('next').NextConfig} */
// Build v6 - Fixed hydration and removed invalid keys
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
