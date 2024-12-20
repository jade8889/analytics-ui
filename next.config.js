/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: "worker-loader",
      options: {
        name: "static/[hash].worker.js",
        publicPath: "/_next/",
      },
    });

    // Overcome Webpack referencing `window` in chunks
    config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`;

    return config;
  },
};
