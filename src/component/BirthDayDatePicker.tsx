import React, { useState } from 'react';
import MonthNavigator from './MonthNavigator';
import CalendarDays from './CalendarDays';
import * as Styled from '../styles/calendar.styles';
import { getNextMonth, getPreviousMonth } from '../utils/dateUtil';
import YearPicker from './YearPicker';

interface BirthDayDatePickerProps {
  onChange: (birthDay: Date) => void;
  isDateRange: boolean;
  birthDay?: Date;
  isHidePastValue: boolean;
}

const BirthDayDatePicker: React.FC<BirthDayDatePickerProps> = ({
  onChange,
  isDateRange,
  birthDay,
  isHidePastValue,
}) => {
  const [dateState, setDateState] = useState<{
    current: Date;
    month: number;
    year: number;
  }>({
    current: birthDay ?? new Date(),
    month: birthDay ? birthDay.getMonth() + 1 : new Date().getMonth() + 1,
    year: birthDay?.getFullYear() ?? new Date().getFullYear(),
  });
  const [isYearChange, setIsYearChange] = useState<boolean>(false);

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

  return (
    <Styled.CalendarContainer>
      {isYearChange ? (
        <YearPicker
          {...{ dateState, setDateState, setIsYearChange, isHidePastValue }}
        />
      ) : (
        <>
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
            onSelectDate={onChange}
            isDateRange={isDateRange}
            isHidePastValue={isHidePastValue}
          />
        </>
      )}
    </Styled.CalendarContainer>
  );
};

export default BirthDayDatePicker;
