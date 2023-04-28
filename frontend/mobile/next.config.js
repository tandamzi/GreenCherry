const runtimeCaching = require('next-pwa/cache');
<<<<<<< HEAD

=======
// eslint-disable-next-line import/order
>>>>>>> 3d3e07cf1652d39e1436a6dc636ab0a1fac41af2
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  customWorkerDir: 'worker',
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  devIndicators: {
    autoPrerender: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});

module.exports = nextConfig;
