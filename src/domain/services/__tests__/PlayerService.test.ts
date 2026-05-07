import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PlayerService, type AudioPlayer } from '../PlayerService';
import { EpisodeQueueService } from '../EpisodeQueueService';
import { createMockEpisodes } from '@test/mocks/episodeMocks';
import { createMockAudioPlayer } from '@test/mocks/playerMocks';

describe('PlayerService', () => {
  let mockAudioPlayer: ReturnType<typeof createMockAudioPlayer>;
  let playerService: PlayerService;
  let queueService: EpisodeQueueService;

  const mockEpisodes = createMockEpisodes(3).map((ep, index) => ({
    ...ep,
    id: `episode-${index + 1}`,
    streamUrl: `https://example.com/ep${index + 1}.mp3`,
  }));

  beforeEach(() => {
    mockAudioPlayer = createMockAudioPlayer();
    queueService = new EpisodeQueueService();
    playerService = new PlayerService(mockAudioPlayer, queueService);
  });

  const mockedPlayer = () => vi.mocked(mockAudioPlayer);

  it('should initialize with audio player and queue service', () => {
    expect(playerService).toBeDefined();
    expect(playerService.getCurrentEpisodeId()).toBeNull();
  });

  it('should play an episode', async () => {
    const episodeId = mockEpisodes[0].id;
    await playerService.playEpisode(mockEpisodes, episodeId, mockEpisodes[0].streamUrl!);

    expect(mockAudioPlayer.load).toHaveBeenCalledWith(mockEpisodes[0].streamUrl);
    expect(mockAudioPlayer.play).toHaveBeenCalled();
    expect(playerService.getCurrentEpisodeId()).toBe(episodeId);
  });

  it('should create queue when playing episode', async () => {
    const episodeId = mockEpisodes[0].id;
    await playerService.playEpisode(mockEpisodes, episodeId, mockEpisodes[0].streamUrl!);

    const queue = playerService.getQueue();
    expect(queue).not.toBeNull();
    expect(queue?.episodes).toEqual(mockEpisodes);
    expect(queue?.currentIndex).toBe(0);
  });

  it('should pause playback', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    await playerService.pause();

    expect(mockAudioPlayer.pause).toHaveBeenCalled();
  });

  it('should resume playback', async () => {
    mockedPlayer().isPlaying.mockReturnValue(false);
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    await playerService.resume();

    expect(mockAudioPlayer.play).toHaveBeenCalled();
  });

  it('should not resume if already playing', async () => {
    mockedPlayer().isPlaying.mockReturnValue(true);
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    await playerService.resume();

    // play was called once during playEpisode, not again during resume
    expect(mockAudioPlayer.play).toHaveBeenCalledTimes(1);
  });

  it('should seek to specific time', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    playerService.seekTo(30);

    expect(mockAudioPlayer.seek).toHaveBeenCalledWith(30);
  });

  it('should set volume', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    playerService.setVolume(0.5);

    expect(mockAudioPlayer.setVolume).toHaveBeenCalledWith(0.5);
  });

  it('should clamp volume to valid range', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    playerService.setVolume(1.5);

    expect(mockAudioPlayer.setVolume).toHaveBeenCalledWith(1);
  });

  it('should clamp negative volume to 0', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    playerService.setVolume(-0.5);

    expect(mockAudioPlayer.setVolume).toHaveBeenCalledWith(0);
  });

  it('should get current position', async () => {
    mockedPlayer().getCurrentTime.mockReturnValue(25);
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    const position = playerService.getCurrentPosition();

    expect(position).toBe(25);
  });

  it('should get duration', async () => {
    mockedPlayer().getDuration.mockReturnValue(120);
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    const duration = playerService.getDuration();

    expect(duration).toBe(120);
  });

  it('should check if playing', async () => {
    mockedPlayer().isPlaying.mockReturnValue(true);
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    const isPlaying = playerService.isPlaying();

    expect(isPlaying).toBe(true);
  });

  it('should play next episode', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    await playerService.playNext();

    expect(playerService.getCurrentEpisodeId()).toBe(mockEpisodes[1].id);
    expect(mockAudioPlayer.load).toHaveBeenCalledWith(mockEpisodes[1].streamUrl);
  });

  it('should not play next when at last episode', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[2].id, mockEpisodes[2].streamUrl!);
    await playerService.playNext();

    expect(playerService.getCurrentEpisodeId()).toBe(mockEpisodes[2].id);
  });

  it('should play previous episode', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[1].id, mockEpisodes[1].streamUrl!);
    await playerService.playPrevious();

    expect(playerService.getCurrentEpisodeId()).toBe(mockEpisodes[0].id);
    expect(mockAudioPlayer.load).toHaveBeenCalledWith(mockEpisodes[0].streamUrl);
  });

  it('should not play previous when at first episode', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    await playerService.playPrevious();

    expect(playerService.getCurrentEpisodeId()).toBe(mockEpisodes[0].id);
  });

  it('should toggle shuffle', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    playerService.toggleShuffle();

    const queue = playerService.getQueue();
    expect(queue?.isShuffle).toBe(true);
  });

  it('should get queue', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    const queue = playerService.getQueue();

    expect(queue).not.toBeNull();
    expect(queue?.episodes).toEqual(mockEpisodes);
  });

  it('should register time update callback', async () => {
    const callback = vi.fn();
    playerService.onTimeUpdate(callback);

    // Simulate time update event
    const timeUpdateCallback = mockedPlayer().onTimeUpdate.mock.calls[0][0];
    timeUpdateCallback(30);

    expect(callback).toHaveBeenCalledWith(30);
  });

  it('should register episode ended callback', async () => {
    const callback = vi.fn();
    playerService.onEpisodeEnded(callback);

    // Simulate ended event
    const endedCallback = mockedPlayer().onEnded.mock.calls[0][0];
    await endedCallback();

    expect(callback).toHaveBeenCalled();
  });

  it('should destroy player', async () => {
    await playerService.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!);
    playerService.destroy();

    expect(mockAudioPlayer.destroy).toHaveBeenCalled();
    expect(playerService.getCurrentEpisodeId()).toBeNull();
    expect(playerService.getQueue()).toBeNull();
  });

  it('should throw error when audio player not initialized', () => {
    const service = new PlayerService(null as unknown as AudioPlayer, queueService);

    expect(() =>
      service.playEpisode(mockEpisodes, mockEpisodes[0].id, mockEpisodes[0].streamUrl!)
    ).rejects.toThrow('Audio player not initialized');
  });
});
