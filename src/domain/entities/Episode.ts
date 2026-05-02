export interface Episode {
  id: string;
  trackId: number;
  collectionId: number;
  title: string;
  author: string;
  topic?: string;
  description?: string;
  releaseDate: string;
  trackTimeMillis: number;
  streamUrl?: string;
}

export class EpisodeEntity implements Episode {
  id: string;
  trackId: number;
  collectionId: number;
  title: string;
  author: string;
  topic?: string;
  description?: string;
  releaseDate: string;
  trackTimeMillis: number;
  streamUrl?: string;

  constructor(
    id: string,
    trackId: number,
    collectionId: number,
    title: string,
    author: string,
    topic?: string,
    description?: string,
    releaseDate?: string,
    trackTimeMillis?: number,
    streamUrl?: string
  ) {
    this.id = id;
    this.trackId = trackId;
    this.collectionId = collectionId;
    this.title = title;
    this.author = author;
    this.topic = topic;
    this.description = description;
    this.releaseDate = releaseDate || '';
    this.trackTimeMillis = trackTimeMillis || 0;
    this.streamUrl = streamUrl;
  }
}
