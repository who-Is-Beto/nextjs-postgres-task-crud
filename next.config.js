// const withPWA = require("next-pwa");

// const nextConfig = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"]
//     });

//     return config;
//   },
//   pwa: withPWA({
//     dest: "public",
//     register: true,
//     skipWaiting: true
//   }),
//   reactStrictMode: true
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true
});

module.exports = withPWA({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
});
