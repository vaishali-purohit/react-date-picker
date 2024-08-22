import React from 'react';
import * as Styled from '../styles/calendar.styles'; // Adjust the path as necessary

interface YearNavigatorProps {
  onSelectYear: (direction: boolean) => void;
  selectedYear?: number;
}

const YearNavigator: React.FC<YearNavigatorProps> = ({
  onSelectYear,
  selectedYear = new Date().getFullYear(),
}) => {
  return (
    <Styled.CalendarHeader>
      <Styled.ArrowLeft
        onClick={() => onSelectYear(false)}
        title="Previous Year"
      />
      <Styled.CalendarMonth>{selectedYear}</Styled.CalendarMonth>
      <Styled.ArrowRight onClick={() => onSelectYear(true)} title="Next Year" />
    </Styled.CalendarHeader>
  );
};

export default YearNavigator;
