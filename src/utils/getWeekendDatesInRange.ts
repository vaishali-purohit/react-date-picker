import { formatDate } from './dateFormat';
import { isWeekday } from './isWeekday';

export const getWeekendDatesInRange = (start: Date, end: Date): string[] => {
  const weekends: string[] = [];
  const date = new Date(start);
  while (date <= end) {
    if (!isWeekday(date)) {
      weekends.push(formatDate(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return weekends;
};
