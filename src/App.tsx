import React, { useState } from 'react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import DatePicker from './component/DatePicker';
import './App.css';

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [weekendList, setWeekendList] = useState<string[]>([]);
  // const [birthDay, setBirthDay] = useState<Date | undefined>(undefined);

  const onChange = (start: Date, end: Date, weekendList: Array<string>) => {
    setStartDate(start);
    setEndDate(end);
    setWeekendList(weekendList);
  };

  // const onChangeBirthDate = (birthday: Date) => {
  //   setBirthDay(birthday);
  // };

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
        {/* For single birthdate selection */}
        {/* <DatePicker
          label="Enter BirhDay"
          placeholderValue="YYYY / MM / DD"
          onChange={onChangeBirthDate}
          birthDate={birthDay}
        /> */}
      </div>
    </StyleSheetManager>
  );
};

export default App;
