const path = require('path');
const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  customWorkerDir: 'worker',
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  images: {
    domains: ['tandamzi-greencherry-bucket.s3.ap-northeast-2.amazonaws.com','i.ytimg.com'],
  },
  devIndicators: {
    autoPrerender: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
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
