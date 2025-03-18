/** @type {import('next').NextConfig} */
import TerserPlugin from "terser-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js"
        }
      }
    }
  },
  webpack: config => {
    config.optimization = {
      ...config.optimization,
      minimize: isProduction,
      minimizer: isProduction
        ? [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                format: {
                  comments: false
                },
                compress: {
                  drop_console: true
                }
              },
              extractComments: false
            })
          ]
        : []
    };
    return config;
  }
};

export default nextConfig;
