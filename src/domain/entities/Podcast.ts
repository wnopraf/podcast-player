export interface Podcast {
  id: string;
  trackId: number;
  collectionId: number;
  title: string;
  author: string;
  description?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  feedUrl?: string;
  releaseDate?: string;
  primaryGenreName?: string;
  genres?: string[];
  trackCount?: number;
  trackTimeMillis?: number;
  collectionViewUrl?: string;
  country?: string;
}

export class PodcastEntity implements Podcast {
  id: string;
  trackId: number;
  collectionId: number;
  title: string;
  author: string;
  description?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  feedUrl?: string;
  releaseDate?: string;
  primaryGenreName?: string;
  genres?: string[];
  trackCount?: number;
  trackTimeMillis?: number;
  collectionViewUrl?: string;
  country?: string;

  constructor(
    id: string,
    trackId: number,
    collectionId: number,
    title: string,
    author: string,
    description?: string,
    artworkUrl60?: string,
    artworkUrl100?: string,
    artworkUrl600?: string,
    feedUrl?: string,
    releaseDate?: string,
    primaryGenreName?: string,
    genres?: string[],
    trackCount?: number,
    trackTimeMillis?: number,
    collectionViewUrl?: string,
    country?: string
  ) {
    this.id = id;
    this.trackId = trackId;
    this.collectionId = collectionId;
    this.title = title;
    this.author = author;
    this.description = description;
    this.artworkUrl60 = artworkUrl60;
    this.artworkUrl100 = artworkUrl100;
    this.artworkUrl600 = artworkUrl600;
    this.feedUrl = feedUrl;
    this.releaseDate = releaseDate;
    this.primaryGenreName = primaryGenreName;
    this.genres = genres;
    this.trackCount = trackCount;
    this.trackTimeMillis = trackTimeMillis;
    this.collectionViewUrl = collectionViewUrl;
    this.country = country;
  }
}
