/** @type {import('next').NextConfig} */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  // Preserve the existing public Vite settings during the Next.js migration.
  // Only these public URLs are exposed. Model keys and webhooks stay server-side.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_CHAT_ENDPOINT:
      process.env.NEXT_PUBLIC_CHAT_ENDPOINT || process.env.VITE_CHAT_ENDPOINT || '',
    NEXT_PUBLIC_RESUME_URL:
      process.env.NEXT_PUBLIC_RESUME_URL || process.env.VITE_RESUME_URL || '',
  },
  turbopack: {
    root: import.meta.dirname,
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
