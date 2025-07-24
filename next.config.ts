// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// import { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   experimental: {
//     forceSwcTransforms: true, // 可選，確保使用 SWC 編譯
//   },
//   webpack: (config: any, { isServer }: { isServer: boolean }) => {
//     if (!isServer) {
//       config.resolve.alias['@prisma/client'] = false;
//     }
//     return config;
//   },
// };

// export default nextConfig;



// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'testoss-img-pan.oss-cn-hongkong.aliyuncs.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   experimental: {
//     forceSwcTransforms: true,
//   },
//   webpack: (config: any, { isServer }: { isServer: boolean }) => {
//     if (!isServer) {
//       config.resolve.alias['@prisma/client'] = false;
//     }
//     return config;
//   },
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'testoss-img-pan.oss-cn-hongkong.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (
    config: import('webpack').Configuration,
    { isServer }: { isServer: boolean }
  ) => {
    // 確保 config.resolve 和 config.resolve.alias 存在
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }

    // 使用型別斷言設置 @prisma/client 別名
    if (!isServer) {
      (config.resolve.alias as Record<string, string | false | string[]>)['@prisma/client'] = false;
    }

    return config;
  },
  // async rewrites() {
  //   return process.env.NODE_ENV === 'production' ? [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
  //     }
  //   ] : [];
  // },
};

export default nextConfig;