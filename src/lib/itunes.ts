export interface ITunesResult {
  wrapperType: string;
  kind?: string;
  artistId: number;
  collectionId?: number;
  trackId?: number;
  artistName: string;
  collectionName?: string;
  trackName?: string;
  previewUrl?: string;
  artworkUrl100: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate: string;
  primaryGenreName: string;
}

/**
 * 프록시 서버 API(/api/search)를 호출하여 보안과 성능을 높입니다.
 */
export async function searchJazz(term: string, entity: 'song' | 'album' | 'musicArtist' = 'song') {
  if (!term) return [];
  
  const query = encodeURIComponent(term);
  const url = `/api/search?term=${query}&entity=${entity}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch results');
    const data = await response.json();
    return (data.results || []) as ITunesResult[];
  } catch (error) {
    console.error('Search Client Error:', error);
    return [];
  }
}
