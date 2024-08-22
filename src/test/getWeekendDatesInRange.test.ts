import { describe, it, expect } from 'vitest';
import { getWeekendDatesInRange } from '../utils/getWeekendDatesInRange'; // Adjust the path
import { formatDate } from '../utils/dateFormat';

describe('getWeekendDatesInRange', () => {
  it('should return weekend dates within a short range', () => {
    const start = new Date('2024-08-15'); // Thursday
    const end = new Date('2024-08-18'); // Sunday

    const weekends = getWeekendDatesInRange(start, end);

    expect(weekends).toEqual([
      formatDate('2024-08-17'), // Saturday
      formatDate('2024-08-18'), // Sunday
    ]);
  });

  it('should return weekend dates within a long range', () => {
    const start = new Date('2024-08-01'); // Thursday
    const end = new Date('2024-08-31'); // Saturday

    const weekends = getWeekendDatesInRange(start, end);

    expect(weekends).toEqual([
      formatDate('2024-08-03'), // Saturday
      formatDate('2024-08-04'), // Sunday
      formatDate('2024-08-10'), // Saturday
      formatDate('2024-08-11'), // Sunday
      formatDate('2024-08-17'), // Saturday
      formatDate('2024-08-18'), // Sunday
      formatDate('2024-08-24'), // Saturday
      formatDate('2024-08-25'), // Sunday
      formatDate('2024-08-31'), // Saturday
    ]);
  });

  it('should return an empty array when there are no weekends in the range', () => {
    const start = new Date('2024-08-05'); // Monday
    const end = new Date('2024-08-09'); // Friday

    const weekends = getWeekendDatesInRange(start, end);

    expect(weekends).toEqual([]);
  });

  it('should handle a single day range that is a weekend', () => {
    const start = new Date('2024-08-17'); // Saturday
    const end = new Date('2024-08-17'); // Saturday

    const weekends = getWeekendDatesInRange(start, end);

    expect(weekends).toEqual([formatDate('2024-08-17')]);
  });

  it('should return an empty array for a single day range that is not a weekend', () => {
    const start = new Date('2024-08-14'); // Wednesday
    const end = new Date('2024-08-14'); // Wednesday

    const weekends = getWeekendDatesInRange(start, end);

    expect(weekends).toEqual([]);
  });
});
