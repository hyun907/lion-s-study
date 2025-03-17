/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
import TerserPlugin from "terser-webpack-plugin";
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  webpack: (config: any) => {
    config.optimization = {
      ...config.optimization,
      minimize: isProduction, // minimizer 에 설정된 플러그인을 기반으로 번들을 최소화 시킴.
      minimizer: isProduction
        ? [
            new TerserPlugin({
              parallel: true, // 병렬 작업
              terserOptions: {
                format: {
                  comments: false, // 빌드 시, comment 제거 (주석 제거)
                },
                compress: {
                  drop_console: true, // 빌드 시, console.* 구문 코드 제거
                },
              },
              extractComments: false, // 주석을 별도의 파일로 추출할 지 여부
            }),
          ]
        : [],
    };
    return config;
  },
};

module.exports = nextConfig;
