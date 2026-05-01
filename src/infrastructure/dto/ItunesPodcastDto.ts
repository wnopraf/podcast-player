export interface ItunesPodcastDto {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600?: string;
  collectionPrice?: number;
  trackPrice?: number;
  collectionExplicitness: string;
  trackExplicitness: string;
  discCount: number;
  discNumber: number;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis?: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating?: string;
  shortDescription?: string;
  longDescription?: string;
  feedUrl?: string;
  genres?: string[];
  releaseDate: string;
  description?: string;
}

export interface ItunesSearchResponse {
  resultCount: number;
  results: ItunesPodcastDto[];
}
