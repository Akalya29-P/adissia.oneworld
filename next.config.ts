/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // disable image optimization to avoid runtime error
  },
};

export default nextConfig;