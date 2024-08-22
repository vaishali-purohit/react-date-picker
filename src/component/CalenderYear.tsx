import React, { Fragment, useEffect, useState } from 'react';
import * as Styled from '../styles/calendar.styles';

interface CalenderYearProps {
  yearRange: Array<number>;
  onSelectYear: (year: number) => void;
  selectedYear?: number;
  isHidePastValue: boolean;
}

const CalenderYear: React.FC<CalenderYearProps> = ({
  yearRange,
  onSelectYear,
  selectedYear,
  isHidePastValue,
}) => {
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const yearsArray = [];
    for (let year = yearRange[0]; year <= yearRange[1]; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, [yearRange]);

  const handleYearSelect = (year: number) => (evt: MouseEvent) => {
    evt.preventDefault();
    onSelectYear(year);
  };

  const renderCalenderYear = (year: number, index: number) => {
    const isSelected = year === selectedYear;
    const isDisabled = isHidePastValue && year < new Date().getFullYear();

    const onClick = handleYearSelect(year);
    const props = { index, inMonth: true, onClick, title: year.toString() };

    const YearComponent = isSelected
      ? Styled.HighlightedCalendarDate
      : Styled.CalendarDate;

    return (
      <YearComponent key={year} disabled={isDisabled} {...props}>
        {year}
      </YearComponent>
    );
  };

  return (
    <Styled.CalendarGrid>
      <Fragment>{years.map(renderCalenderYear)}</Fragment>
    </Styled.CalendarGrid>
  );
};

export default CalenderYear;
