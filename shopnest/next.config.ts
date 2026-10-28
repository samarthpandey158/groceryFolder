import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {hostname:"lh3.googleusercontent.com" },
      {hostname:"images.unsplash.com"},
      {hostname:"media.istockphoto.com"},
      {hostname:"res.cloudinary.com"}
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
