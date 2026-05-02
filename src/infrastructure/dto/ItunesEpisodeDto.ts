export interface ItunesEpisodeDto {
  trackId: number;
  collectionId: number;
  trackName: string;
  artistName: string;
  releaseDate: string;
  trackTimeMillis: number;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  previewUrl?: string;
  episodeUrl?: string;
  episodeContentType?: string;
  wrapperType: string;
  kind: string;
}

export interface ItunesEpisodesResponse {
  resultCount: number;
  results: ItunesEpisodeDto[];
}
