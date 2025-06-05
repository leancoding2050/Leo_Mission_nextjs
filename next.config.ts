// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true, // 可選，確保使用 SWC 編譯
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@prisma/client'] = false;
    }
    return config;
  },
};

module.exports = nextConfig;