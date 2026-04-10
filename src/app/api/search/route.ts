import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Cloudflare Pages(Edge) 환경 최적화
export const dynamic = 'force-dynamic';

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
    // Edge 환경에서의 fetch 호출
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'iTunes API Unavailable' }, { status: 503 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Edge API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
