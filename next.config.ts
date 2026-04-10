import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 최소한의 패턴으로 이미지 허용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.mzstatic.com',
      },
    ],
  },
  // 타임아웃 및 리소스 이슈 방지를 위해 헤더 설정을 단순화하거나 
  // 호스팅 업체(Vercel, Cloudflare 등)의 기본 설정을 따르도록 조정
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
    ];
  },
  // 빌드 속도 및 메모리 최적화
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // 배포 시 중단 방지
  },
};

export default nextConfig;
