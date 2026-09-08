/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  basePath,
  assetPrefix: basePath,
};

export default nextConfig;