import { describe, it, expect } from 'vitest';
import { isWeekday } from '../utils/isWeekday'; // Adjust the path

describe('isWeekday', () => {
  it('should return true for Monday', () => {
    const date = new Date('2024-08-19'); // Monday
    expect(isWeekday(date)).toBe(true);
  });

  it('should return true for Tuesday', () => {
    const date = new Date('2024-08-20'); // Tuesday
    expect(isWeekday(date)).toBe(true);
  });

  it('should return true for Wednesday', () => {
    const date = new Date('2024-08-21'); // Wednesday
    expect(isWeekday(date)).toBe(true);
  });

  it('should return true for Thursday', () => {
    const date = new Date('2024-08-22'); // Thursday
    expect(isWeekday(date)).toBe(true);
  });

  it('should return true for Friday', () => {
    const date = new Date('2024-08-23'); // Friday
    expect(isWeekday(date)).toBe(true);
  });

  it('should return false for Saturday', () => {
    const date = new Date('2024-08-24'); // Saturday
    expect(isWeekday(date)).toBe(false);
  });

  it('should return false for Sunday', () => {
    const date = new Date('2024-08-25'); // Sunday
    expect(isWeekday(date)).toBe(false);
  });

  it('should handle the edge case of a negative date', () => {
    const date = new Date(-8640000000000000); // Very old date
    expect(isWeekday(date)).toBe(true); // Negative dates are handled like any other date
  });
});
