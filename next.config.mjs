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
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "developer.apple.com",
        pathname: "/assets/elements/badges/**",
      },
    ],
  },
};

export default nextConfig;
