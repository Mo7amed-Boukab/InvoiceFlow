import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "node_modules/.cache/next",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
