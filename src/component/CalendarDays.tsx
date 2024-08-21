import React, { Fragment } from 'react';
import { isWeekday } from '../utils/isWeekday';
import * as Styled from '../styles/calendar.styles';
import { CALENDAR_WEEKS, WEEK_DAYS } from '../constants/calender.constant';
import {
  THIS_MONTH,
  THIS_YEAR,
  getDateISO,
  getMonthDays,
  getMonthFirstDay,
  getNextMonth,
  getPreviousMonth,
  isDate,
  isSameDay,
  isSameMonth,
  zeroPad,
} from '../utils/dateUtil';
import { isDateWithinRange } from '../utils/isDateWithinRange';

type DateState = {
  current: Date;
  month: number;
  year: number;
};

interface CalendarDaysProps {
  dateState: DateState;
  setDateState: (date: DateState) => void;
  startDate: Date | null;
  endDate: Date | null;
  onSelectDate: (date: Date) => void;
  shouldDisableDate?: (date: Date) => boolean; // Function to disable certain dates
}

const CalendarDays: React.FC<CalendarDaysProps> = ({
  dateState,
  setDateState,
  startDate,
  endDate,
  onSelectDate,
  shouldDisableDate,
}) => {
  const today = new Date();

  const renderDayLabel = (day: string, index: number) => {
    // Resolve the day of the week label from the WEEK_DAYS object map
    const daylabel = WEEK_DAYS[day as keyof typeof WEEK_DAYS].toUpperCase();
    return (
      <Styled.CalendarDay key={daylabel} index={index}>
        {daylabel}
      </Styled.CalendarDay>
    );
  };

  const addDateToState = (date: Date) => {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();
    setDateState({
      current: isDateObject ? date : new Date(),
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
    });
  };

  const gotoDate = (date: Date) => (evt: MouseEvent) => {
    evt.preventDefault();
    const { current } = dateState;
    if (!(current && isSameDay(date, current))) {
      addDateToState(date);
      onSelectDate(date);
    }
  };

  const renderCalendarDate = (date: (string | number)[], index: number) => {
    const { current, month, year } = dateState;
    const _date = new Date(date.join('-'));

    const isDisabled = shouldDisableDate
      ? shouldDisableDate(_date) || !isWeekday(_date)
      : !isWeekday(_date);

    // Check if a given date is within the selected date range.
    const isSelected =
      startDate && endDate && isDateWithinRange(startDate, endDate, _date);

    const isWeekend = !isWeekday(_date);

    // Check if calendar date is same day as today
    const isToday = isSameDay(_date, today);
    // Check if calendar date is same day as currently selected date
    const isCurrent = current && isSameDay(_date, current);
    // Check if calendar date is in the same month as the state month and year
    const inMonth =
      month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));
    // The click handler
    const onClick = gotoDate(_date);
    const props = {
      index,
      inMonth,
      isDisabled,
      isSelected,
      onClick,
      title: _date.toDateString(),
    };
    // Conditionally render a styled date component
    const DateComponent = isCurrent
      ? Styled.HighlightedCalendarDate
      : isToday
        ? Styled.TodayCalendarDate
        : Styled.CalendarDate;

    return (
      <DateComponent
        className={`calendar-day-button ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isWeekend ? 'weekend' : 'weekday'}`}
        key={getDateISO(_date)}
        disabled={isDisabled}
        {...props}
      >
        {_date.getDate()}
      </DateComponent>
    );
  };

  const calendar = (month = THIS_MONTH, year = THIS_YEAR) => {
    // Get number of days in the month and the month's first day
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);
    // Get number of days to be displayed from previous and next months
    // These ensure a total of 42 days (6 weeks) displayed on the calendar

    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth =
      CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);
    // Get the previous and next months and years

    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
      month,
      year,
    );
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
    // Get number of days in previous month
    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);
    // Builds dates to be displayed from previous month

    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
      const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
      return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
    });
    // Builds dates to be displayed from current month

    const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
      const day = index + 1;
      return [year, zeroPad(month, 2), zeroPad(day, 2)];
    });
    // Builds dates to be displayed from next month

    const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
      const day = index + 1;
      return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
    });
    // Combines all dates from previous, current and next months
    return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
  };

  const getCalendarDates = () => {
    const { current, month, year } = dateState;
    const calendarMonth = month || current?.getMonth() + 1;
    const calendarYear = year || current?.getFullYear();
    return calendar(calendarMonth, calendarYear);
  };

  return (
    <Styled.CalendarGrid>
      <Fragment>{Object.keys(WEEK_DAYS).map(renderDayLabel)}</Fragment>
      <Fragment>{getCalendarDates().map(renderCalendarDate)}</Fragment>
    </Styled.CalendarGrid>
  );
};

export default CalendarDays;
