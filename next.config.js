/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};
