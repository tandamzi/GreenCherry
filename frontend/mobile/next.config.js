const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  customWorkerDir: "worker",
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  // reactStrictMode: true,
});

module.exports = nextConfig;
