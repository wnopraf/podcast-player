import { PodcastEntity } from '@domain/entities/Podcast';
import type { ItunesPodcastDto } from '@infrastructure/dto/ItunesPodcastDto';

export class PodcastMapper {
  static toDomain(dto: ItunesPodcastDto): PodcastEntity {
    return new PodcastEntity(
      String(dto.collectionId),
      dto.trackId,
      dto.collectionId,
      dto.collectionName || dto.trackName,
      dto.artistName,
      dto.description || dto.longDescription || dto.shortDescription,
      dto.artworkUrl60,
      dto.artworkUrl100,
      dto.artworkUrl600,
      dto.feedUrl,
      dto.releaseDate,
      dto.primaryGenreName,
      dto.genres,
      dto.trackCount,
      dto.trackTimeMillis,
      dto.collectionViewUrl,
      dto.country
    );
  }

  static toDomainList(dtos: ItunesPodcastDto[]): PodcastEntity[] {
    return dtos.map((dto) => this.toDomain(dto));
  }
}
