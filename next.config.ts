import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { hostname: "abit-website-flax.vercel.app" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
