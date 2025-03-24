/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
