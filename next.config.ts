import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/6vdq2o9vy/acessibiweb",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
