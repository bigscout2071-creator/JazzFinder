import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 보안을 높이기 위해 와일드카드와 특정 호스트만 허용하는 remotePatterns를 사용합니다.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.mzstatic.com', // iTunes 음악 커버 이미지 호스트
      },
    ],
  },
  typescript: {
    // 배포 안정성을 위해 빌드 시 타입 체크를 강제합니다.
    tsconfigPath: "./tsconfig.json",
  },
  // 기본 보안 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
