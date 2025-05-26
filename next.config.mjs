/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@react-pdf/renderer', 'react-pdf', 'react-pdf/dist/cjs'],

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      'pdfjs-dist': false,
    };
    return config;
  },
}

export default nextConfig
