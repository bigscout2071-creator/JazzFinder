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

export async function searchJazz(term: string, entity: 'song' | 'album' | 'musicArtist' = 'song') {
  if (!term) return [];
  
  // Specifically target jazz genre in the search if needed, 
  // but usually adding "jazz" to the term is more flexible
  const query = encodeURIComponent(`${term} jazz`);
  const url = `https://itunes.apple.com/search?term=${query}&entity=${entity}&limit=20&media=music`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from iTunes');
    const data = await response.json();
    return data.results as ITunesResult[];
  } catch (error) {
    console.error('iTunes Search Error:', error);
    return [];
  }
}
