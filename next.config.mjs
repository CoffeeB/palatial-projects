/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["framerusercontent.com", "res.cloudinary.com"], // Add this line
  },
};

export default nextConfig;
