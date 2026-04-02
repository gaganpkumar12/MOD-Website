/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cleanfanatics.com",
        pathname: "/wp-content/uploads/2023/03/**",
      },
    ],
  },
};

export default nextConfig;
