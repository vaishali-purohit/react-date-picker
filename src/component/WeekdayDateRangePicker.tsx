import React, { useState } from 'react';
import MonthNavigator from './MonthNavigator';
import CalendarDays from './CalendarDays';
import PredefinedRanges from './PredefinedRanges';
import { DateRange, WeekendDates } from '../types/calender.type';
import { isWeekday } from '../utils/isWeekday';
import { getWeekendDatesInRange } from '../utils/getWeekendDatesInRange';
import { formatDate } from '../utils/dateFormat';
import * as Styled from '../styles/calendar.styles';
import { getNextMonth, getPreviousMonth } from '../utils/dateUtil';

interface WeekdayDateRangePickerProps {
  predefinedRanges?: { label: string; range: DateRange }[];
  onChange: (range: DateRange, weekends: WeekendDates) => void;
  shouldDisableDate?: (date: Date) => boolean; // Function to disable certain dates
  startDateRange: Date | null;
  endDateRange: Date | null;
}

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  predefinedRanges,
  onChange,
  shouldDisableDate,
  startDateRange,
  endDateRange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(startDateRange);
  const [endDate, setEndDate] = useState<Date | null>(endDateRange);

  const [dateState, setDateState] = useState<{
    current: Date;
    month: number;
    year: number;
  }>({
    current: new Date(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const handleDateSelect = (date: Date) => {
    if (!shouldDisableDate || !shouldDisableDate(date)) {
      if (isWeekday(date)) {
        if (!startDate || (startDate && endDate)) {
          setStartDate(date);
          setEndDate(null);
        } else if (startDate && !endDate) {
          if (date < startDate) {
            setEndDate(startDate);
            setStartDate(date);
          } else {
            setEndDate(date);
          }
        }
      }
    }
  };

  const handleMonthChange = (direction: boolean) => {
    const { month, year } = dateState;

    if (direction) {
      const nextMonth = getNextMonth(month, year);
      setDateState({
        month: nextMonth.month,
        year: nextMonth.year,
        current: dateState.current,
      });
    } else {
      const previousMonth = getPreviousMonth(month, year);
      setDateState({
        month: previousMonth.month,
        year: previousMonth.year,
        current: dateState.current,
      });
    }
  };

  const handlePredefinedRangeSelect = (range: DateRange) => {
    const [start, end] = range.map(
      (dateStr: string | number | Date) => new Date(dateStr),
    );
    setStartDate(start);
    setEndDate(end);
    onChange(range, getWeekendDatesInRange(start, end));
  };

  React.useEffect(() => {
    if (startDate && endDate) {
      const range: DateRange = [formatDate(startDate), formatDate(endDate)];
      onChange(range, getWeekendDatesInRange(startDate, endDate));
    }
  }, [startDate, endDate]);

  return (
    <Styled.CalendarContainer>
      <MonthNavigator
        currentYear={dateState.year}
        currentMonth={dateState.month}
        onMonthChange={handleMonthChange}
      />
      <br />
      <CalendarDays
        dateState={dateState}
        setDateState={setDateState}
        startDate={startDate}
        endDate={endDate}
        onSelectDate={handleDateSelect}
        shouldDisableDate={shouldDisableDate}
      />
      <br />
      {predefinedRanges && (
        <PredefinedRanges
          predefinedRanges={predefinedRanges}
          onSelectRange={handlePredefinedRangeSelect}
        />
      )}
    </Styled.CalendarContainer>
  );
};

export default WeekdayDateRangePicker;
