import React from 'react';
import { DateRange } from '../types/calender.type';
import * as Styled from '../styles/calendar.styles';

interface PredefinedRangesProps {
  predefinedRanges: { label: string; range: DateRange }[];
  onSelectRange: (range: DateRange) => void;
}

const PredefinedRanges: React.FC<PredefinedRangesProps> = ({
  predefinedRanges,
  onSelectRange,
}) => {
  return (
    <Styled.RangeButtonContainer>
      {predefinedRanges.map((range, index) => (
        <Styled.RangeButton
          key={index}
          onClick={() => onSelectRange(range.range)}
        >
          {range.label}
        </Styled.RangeButton>
      ))}
    </Styled.RangeButtonContainer>
  );
};

export default PredefinedRanges;
