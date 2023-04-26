
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/_buildManifest\.js$/],
});

const isProd = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  
});