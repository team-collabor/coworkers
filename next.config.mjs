/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  webpack: (config) => {
    // 기존 SVG 파일 로더 규칙을 찾습니다.
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // 기존 규칙을 재적용하되, ?url 로 끝나는 SVG 파일에만 적용합니다.
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // 나머지 *.svg 파일을 React 컴포넌트로 변환합니다.
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        }, // *.svg?url 제외
        use: ['@svgr/webpack'],
      }
    );
    return config;
  },
};

export default nextConfig;
