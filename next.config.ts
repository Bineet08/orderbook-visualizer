import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig & { turbopack?: { root?: string } } = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
