/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["/"],
    loader: "imgix",
    path: "/",
  },
};

module.exports = nextConfig;
