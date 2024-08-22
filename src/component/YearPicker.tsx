import React, { Fragment, useState } from 'react';
import YearNavigator from './YearNavigator';
import CalenderYear from './CalenderYear';
import { DateState } from './WeekdayDateRangePicker';

interface YearPickerProps {
  dateState: DateState;
  setDateState: (dates: DateState) => void;
  setIsYearChange: (value: boolean) => void;
  isHidePastValue: boolean;
}

const YearPicker: React.FC<YearPickerProps> = ({
  dateState,
  setDateState,
  setIsYearChange,
  isHidePastValue,
}) => {
  const [yearRange, setYearRange] = useState<[number, number]>([
    dateState.year - 34,
    dateState.year,
  ]);

  const handleYearSelect = (year: number) => {
    setDateState({
      ...dateState,
      year,
    });
    setIsYearChange(false);
  };

  const handleYearChange = (direction: boolean) => {
    if (direction) {
      setYearRange([yearRange[0] + 34, yearRange[1] + 34]);
    } else {
      setYearRange([yearRange[0] - 34, yearRange[1] - 34]);
    }
  };

  return (
    <Fragment>
      <YearNavigator
        onSelectYear={handleYearChange}
        selectedYear={dateState.year}
      />
      <br />
      <CalenderYear
        yearRange={yearRange}
        onSelectYear={handleYearSelect}
        selectedYear={dateState.year}
        isHidePastValue={isHidePastValue}
      />
    </Fragment>
  );
};

export default YearPicker;
