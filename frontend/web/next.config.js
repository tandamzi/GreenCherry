/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  customWorkerDir: 'worker',
  runtimeCaching,
});

const nextConfig = withPWA({
  eslint: {
    ignoreDuringBuilds: true,
  },
});
module.exports = nextConfig;
