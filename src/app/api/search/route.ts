import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');
  const entity = searchParams.get('entity') || 'song';

  if (!term) {
    return NextResponse.json({ results: [] });
  }

  // 검색어 안전하게 인코딩 및 "jazz" 키워드 강제 (보안 및 목적 부합)
  const safeTerm = encodeURIComponent(`${term} jazz`);
  const url = `https://itunes.apple.com/search?term=${safeTerm}&entity=${entity}&limit=20&media=music`;

  try {
    const response = await fetch(url, {
      // 캐시 설정으로 성능 향상 및 외부 API 부하 감소
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from iTunes' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
