import React, { useState } from 'react';
import { DateRange, WeekendDates } from '../types/calender.type';
import * as Styled from '../styles/calendar.styles';
import DayPicker from './DayPicker';
import YearPicker from './YearPicker';

export interface WeekdayDateRangePickerProps {
  predefinedRanges?: { label: string; range: DateRange }[];
  onChange: (range: DateRange, weekends: WeekendDates) => void;
  startDateRange: Date | null;
  endDateRange: Date | null;
  isDateRange: boolean;
  isHidePastValue: boolean;
}

export type DateState = {
  current: Date;
  month: number;
  year: number;
};

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  predefinedRanges,
  onChange,
  startDateRange,
  endDateRange,
  isDateRange,
  isHidePastValue,
}) => {
  const [isYearChange, setIsYearChange] = useState<boolean>(false);

  const [dateState, setDateState] = useState<DateState>({
    current: startDateRange ?? new Date(),
    month: startDateRange
      ? startDateRange?.getMonth() + 1
      : new Date().getMonth() + 1,
    year: startDateRange?.getFullYear() ?? new Date().getFullYear(),
  });

  return (
    <Styled.CalendarContainer>
      {isYearChange ? (
        <YearPicker
          {...{ dateState, setDateState, setIsYearChange, isHidePastValue }}
        />
      ) : (
        <DayPicker
          {...{
            dateState,
            setDateState,
            predefinedRanges,
            onChange,
            startDateRange,
            endDateRange,
            isDateRange,
            setIsYearChange,
            isHidePastValue,
          }}
        />
      )}
    </Styled.CalendarContainer>
  );
};

export default WeekdayDateRangePicker;
