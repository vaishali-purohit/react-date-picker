import React, { Fragment, useState } from 'react';
import MonthNavigator from './MonthNavigator';
import CalendarDays from './CalendarDays';
import PredefinedRanges from './PredefinedRanges';
import { DateRange, WeekendDates } from '../types/calender.type';
import { isWeekday } from '../utils/isWeekday';
import { getWeekendDatesInRange } from '../utils/getWeekendDatesInRange';
import { formatDate } from '../utils/dateFormat';
import { getNextMonth, getPreviousMonth } from '../utils/dateUtil';
import { DateState } from './WeekdayDateRangePicker';

interface DayPickerProps {
  predefinedRanges?: { label: string; range: DateRange }[];
  onChange: (range: DateRange, weekends: WeekendDates) => void;
  startDateRange: Date | null;
  endDateRange: Date | null;
  isDateRange: boolean;
  setIsYearChange: (value: boolean) => void;
  dateState: DateState;
  setDateState: (dates: DateState) => void;
  isHidePastValue: boolean;
}

const DayPicker: React.FC<DayPickerProps> = ({
  predefinedRanges,
  onChange,
  startDateRange,
  endDateRange,
  isDateRange,
  setIsYearChange,
  dateState,
  setDateState,
  isHidePastValue,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(startDateRange);
  const [endDate, setEndDate] = useState<Date | null>(endDateRange);

  const handleDateSelect = (date: Date) => {
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
    <Fragment>
      <MonthNavigator
        currentYear={dateState.year}
        currentMonth={dateState.month}
        onMonthChange={handleMonthChange}
        onYearChange={() => setIsYearChange(true)}
      />
      <br />
      <CalendarDays
        dateState={dateState}
        setDateState={setDateState}
        startDate={startDate}
        endDate={endDate}
        onSelectDate={handleDateSelect}
        isDateRange={isDateRange}
        isHidePastValue={isHidePastValue}
      />
      <br />
      {predefinedRanges && (
        <PredefinedRanges
          predefinedRanges={predefinedRanges}
          onSelectRange={handlePredefinedRangeSelect}
        />
      )}
    </Fragment>
  );
};

export default DayPicker;
