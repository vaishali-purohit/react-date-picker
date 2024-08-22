import React, { useState } from 'react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import DatePicker from './component/DatePicker';
import './App.css';

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [weekendList, setWeekendList] = useState<string[]>([]);

  const onChange = (start: Date, end: Date, weekendList: Array<string>) => {
    setStartDate(start);
    setEndDate(end);
    setWeekendList(weekendList);
  };

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <div className="App container">
        <h1>Date Range Picker</h1>
        {/* For Date range selction from present */}
        <DatePicker
          label="Enter Range"
          placeholderValue="YYYY / MM / DD"
          startDate={startDate}
          endDate={endDate}
          weekendList={weekendList}
          isDateRange={true}
          onChange={onChange}
          isHidePastValue={true}
        />
      </div>
    </StyleSheetManager>
  );
};

export default App;
