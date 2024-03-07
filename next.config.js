/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.liberagency.co.ke",
        // port: "80",
        pathname: "/media/images/**",
      },
      // {
      //   protocol: "http",
      //   hostname: "127.0.0.1",
      //   port: "8000",
      //   pathname: "/media/images/**",
      // },
    ],
  },
};

module.exports = nextConfig;
