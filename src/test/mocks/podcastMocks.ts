import { faker } from '@faker-js/faker';
import type { Podcast } from '@domain/entities/Podcast';

export const createMockPodcast = (overrides?: Partial<Podcast>): Podcast => ({
  id: faker.string.uuid(),
  trackId: faker.number.int({ min: 1, max: 999999 }),
  collectionId: faker.number.int({ min: 1, max: 999999 }),
  title: faker.lorem.sentence({ min: 3, max: 8 }),
  author: faker.person.fullName(),
  description: faker.helpers.maybe(() => faker.lorem.paragraph()),
  artworkUrl60: faker.helpers.maybe(() => faker.image.url()),
  artworkUrl100: faker.helpers.maybe(() => faker.image.url()),
  artworkUrl600: faker.helpers.maybe(() => faker.image.url()),
  feedUrl: faker.helpers.maybe(() => faker.internet.url()),
  releaseDate: faker.helpers.maybe(() => faker.date.recent({ days: 365 }).toISOString()),
  primaryGenreName: faker.helpers.maybe(() => faker.lorem.word()),
  genres: faker.helpers.maybe(() => [faker.lorem.word(), faker.lorem.word()]),
  trackCount: faker.helpers.maybe(() => faker.number.int({ min: 1, max: 500 })),
  trackTimeMillis: faker.helpers.maybe(() => faker.number.int({ min: 60000, max: 7200000 })),
  collectionViewUrl: faker.helpers.maybe(() => faker.internet.url()),
  country: faker.helpers.maybe(() => faker.location.countryCode('alpha-2')),
  ...overrides,
});

export const createMockPodcasts = (count: number = 3): Podcast[] => {
  return Array.from({ length: count }, () => createMockPodcast());
};
