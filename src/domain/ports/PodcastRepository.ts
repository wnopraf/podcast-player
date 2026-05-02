import type { Podcast } from '@domain/entities/Podcast';
import type { Result } from '@shared/types/Result';
import type { ApplicationError } from '@shared/errors/ApplicationError';

export interface PodcastRepository {
  findAll(): Promise<Result<Podcast[], ApplicationError>>;
  findById(id: string): Promise<Result<Podcast | null, ApplicationError>>;
}
