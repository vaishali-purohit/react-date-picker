import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/dateFormat'; // Adjust the import path accordingly

describe('formatDate', () => {
  it('should format a Date object correctly', () => {
    const date = new Date(2023, 7, 21); // August 21, 2023
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2023/08/21');
  });

  it('should format a date string correctly', () => {
    const dateStr = '2023-08-21T00:00:00Z';
    const formattedDate = formatDate(dateStr);
    expect(formattedDate).toBe('2023/08/21');
  });

  it('should format a date string in different format', () => {
    const dateStr = '08/21/2023';
    const formattedDate = formatDate(dateStr);
    expect(formattedDate).toBe('2023/08/21');
  });

  it('should format a date string in ISO format', () => {
    const dateStr = '2023-08-21';
    const formattedDate = formatDate(dateStr);
    expect(formattedDate).toBe('2023/08/21');
  });

  it('should handle a date with single digit month and day', () => {
    const date = new Date(2023, 0, 9); // January 9, 2023
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2023/01/09');
  });
});
