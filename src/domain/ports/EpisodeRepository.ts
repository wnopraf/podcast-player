import type { Episode } from '@domain/entities/Episode';
import type { Result } from '@shared/types/Result';
import type { ApplicationError } from '@shared/errors/ApplicationError';

export interface EpisodeRepository {
  findByCollectionId(collectionId: string): Promise<Result<Episode[], ApplicationError>>;
}
