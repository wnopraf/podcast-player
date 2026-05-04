import { format, formatDuration, formatDistanceToNow, intervalToDuration } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatEpisodeDuration = (seconds: number): string => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  return formatDuration(duration, { format: ['minutes', 'seconds'], zero: false });
};

export const formatReleaseDate = (date: Date): string => {
  return format(date, 'dd MMM yyyy', { locale: es });
};

export const formatTimeAgo = (date: Date): string => {
  return formatDistanceToNow(date, { locale: es, addSuffix: true });
};
