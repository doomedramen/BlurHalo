/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/BlurHalo" : "",
  // Use a separate build directory in production so `next build` never clobbers
  // the `.next` state of a running `next dev` server (and vice versa).
  distDir: process.env.NODE_ENV === "production" ? ".next-prod" : ".next",
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
