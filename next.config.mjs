// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      // 필요 시 사용. 당장 없어도 OK
      allowedOrigins: ['*'],
    },
  },
};

export default nextConfig;
