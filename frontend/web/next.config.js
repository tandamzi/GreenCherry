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
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'tandamzi-greencherry-bucket.s3.ap-northeast-2.amazonaws.com',
      'i.ytimg.com',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
module.exports = nextConfig;
