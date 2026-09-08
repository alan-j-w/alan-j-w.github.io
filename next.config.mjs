/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Set NEXT_PUBLIC_BASE_PATH=/portfolio in your env if hosting as a project repo
  // (e.g. https://alan-j-w.github.io/portfolio/)
  // Leave empty / unset for custom domain or user site (alan-j-w.github.io)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
