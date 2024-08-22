import React from 'react';
import * as Styled from '../styles/calendar.styles';
import { CALENDAR_MONTHS } from '../constants/calender.constant';

interface MonthNavigatorProps {
  currentYear: number;
  currentMonth: number;
  onMonthChange: (direction: boolean) => void;
  onYearChange: () => void;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  currentYear,
  currentMonth,
  onMonthChange,
  onYearChange,
}) => {
  // Resolve the month name from the CALENDAR_MONTHS object map
  const currentMonthName =
    Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(currentMonth - 1, 11))];

  return (
    <Styled.CalendarHeader>
      <Styled.ArrowLeft
        onClick={() => onMonthChange(false)}
        title="Previous Month"
      />
      <Styled.CalendarMonth onClick={onYearChange}>
        {currentMonthName} {currentYear}
      </Styled.CalendarMonth>
      <Styled.ArrowRight
        onClick={() => onMonthChange(true)}
        title="Next Month"
      />
    </Styled.CalendarHeader>
  );
};

export default MonthNavigator;
