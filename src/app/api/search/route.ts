import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // 항상 실시간 검색을 보장하여 캐시 생성 부하 제거

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');
  const entity = searchParams.get('entity') || 'song';

  if (!term) {
    return NextResponse.json({ results: [] });
  }

  const safeTerm = encodeURIComponent(`${term} jazz`);
  const url = `https://itunes.apple.com/search?term=${safeTerm}&entity=${entity}&limit=20&media=music`;

  try {
    // 522 에러 방지를 위해 fetch 타임아웃을 명시적으로 고려한 구조
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000), // 8초 이상 걸리면 중단 (게이트웨이 타임아웃 방지)
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'iTunes API Unavailable' }, { status: 503 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Router Error:', error);
    // 타임아웃 시 504로 빠르게 응답하여 522 연결 대기 상태를 해제
    if (error.name === 'TimeoutError') {
      return NextResponse.json({ error: 'Upstream Timeout' }, { status: 504 });
    }
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
