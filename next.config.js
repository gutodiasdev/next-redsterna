/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['redsterna.s3.us-east-1.amazonaws.com']
  }
};

module.exports = nextConfig;
