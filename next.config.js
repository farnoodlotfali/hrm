/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["/"],
    loader: "imgix",
    path: "/",
  },
  env: {
    NEXT_APP_API_URL: "http://185.110.190.246:3000/v1/",
    NEXT_APP_API_CODE: "hTCUBvAvCkSSRcM2p0TPpQdJNM7MibFYbI2toWHQ",
    NEXT_APP_API_TOKEN: "jhvVK6Flu6RhWAZEApWLLuDc81yvVZjdO7uEU3Ur",
  },
};

module.exports = nextConfig;
