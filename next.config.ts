/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixes the Webpack cross-origin network block for your local IP
  experimental: {
    allowedDevOrigins: ['192.168.137.1', 'localhost:3000']
  }
};

module.exports = nextConfig;