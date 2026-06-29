/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/BlurHalo" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Linting is handled by oxlint (`pnpm lint`), so skip Next's ESLint pass at build time.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
