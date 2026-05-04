import { faker } from '@faker-js/faker';
import type { Episode } from '@domain/entities/Episode';

export const createMockEpisode = (overrides?: Partial<Episode>): Episode => ({
  id: faker.string.uuid(),
  trackId: faker.number.int({ min: 1, max: 999999 }),
  collectionId: faker.number.int({ min: 1, max: 999999 }),
  title: faker.lorem.sentence({ min: 3, max: 8 }),
  author: faker.person.fullName(),
  topic: faker.helpers.maybe(() => faker.lorem.word()),
  description: faker.helpers.maybe(() => faker.lorem.paragraph()),
  releaseDate: faker.date.recent({ days: 365 }).toISOString(),
  trackTimeMillis: faker.number.int({ min: 60000, max: 7200000 }),
  streamUrl: faker.helpers.maybe(() => faker.internet.url()),
  ...overrides,
});

export const createMockEpisodes = (count: number = 3): Episode[] => {
  return Array.from({ length: count }, () => createMockEpisode());
};
