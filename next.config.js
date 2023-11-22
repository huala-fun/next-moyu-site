/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i0.hdslb.com",
        port: "",
        pathname: "",
      },
    ],
  },
};

module.exports = nextConfig;
