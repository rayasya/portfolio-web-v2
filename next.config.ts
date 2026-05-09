import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.imgur.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
