/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bpydvhufllpenvzgzbwx.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
