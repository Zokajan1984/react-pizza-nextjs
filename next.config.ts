import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/faux/:path*",
        destination: "https://faux-api.com*",
      },
    ];
  },
};

export default nextConfig;
