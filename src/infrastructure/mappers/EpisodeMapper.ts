import { EpisodeEntity } from '../../domain/entities/Episode';
import type { ItunesEpisodeDto } from '../dto/ItunesEpisodeDto';

export class EpisodeMapper {
  static toDomain(dto: ItunesEpisodeDto): EpisodeEntity {
    return new EpisodeEntity(
      String(dto.trackId),
      dto.trackId,
      dto.collectionId,
      dto.trackName,
      dto.artistName,
      undefined,
      dto.description || dto.longDescription || dto.shortDescription,
      dto.releaseDate,
      dto.trackTimeMillis,
      dto.previewUrl || dto.episodeUrl
    );
  }

  static toDomainList(dtos: ItunesEpisodeDto[]): EpisodeEntity[] {
    return dtos.map((dto) => this.toDomain(dto));
  }
}
