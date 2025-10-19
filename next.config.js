/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export mode - generates HTML/CSS/JS files
  output: 'export',

  // No image optimization in static export mode
  images: {
    unoptimized: true,
  },

  // Strict mode for better React practices
  reactStrictMode: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Trailing slashes for static hosting
  trailingSlash: false,

  // TypeScript configuration
  typescript: {
    // Fail build on type errors
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Fail build on lint errors
    ignoreDuringBuilds: false,
  },

  // Webpack configuration for bundle optimization
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for React and Next.js
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Commons chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      }
    }

    return config
  },
}

module.exports = nextConfig
