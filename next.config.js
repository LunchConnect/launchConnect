/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://89.117.36.172:3010/api/:path*", // Proxy to backend
  //     },
  //   ];
  // },
};

module.exports = nextConfig;