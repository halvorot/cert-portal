/** @type {import('next').NextConfig} */
const nextConfig = {
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
