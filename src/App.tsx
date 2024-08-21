import React from 'react';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import DatePicker from './component/DatePicker';
import './App.css';

const App: React.FC = () => {
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <div className="App container">
        <h1>Date Range Picker</h1>
        <DatePicker />
      </div>
    </StyleSheetManager>
  );
};

export default App;
