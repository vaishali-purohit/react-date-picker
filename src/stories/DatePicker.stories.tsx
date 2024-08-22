import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import DatePicker, { DatePickerProps } from '../component/DatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const handleChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleBirthDateChange = (date: Date) => {
    setBirthDate(date);
  };

  return (
    <DatePicker
      {...args}
      startDate={startDate}
      endDate={endDate}
      birthDate={birthDate}
      onChange={args.isDateRange ? handleChange : handleBirthDateChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Select a Date',
  placeholderValue: 'Pick a date range...',
  isDateRange: true,
};

export const BirthdayPicker = Template.bind({});
BirthdayPicker.args = {
  label: 'Select Birthdate',
  placeholderValue: 'Pick a birthdate...',
  isDateRange: false,
};

export const DateRangeWithHidePastDate = Template.bind({});
DateRangeWithHidePastDate.args = {
  label: 'Select a Date',
  placeholderValue: 'Pick a date range...',
  isDateRange: true,
  isHidePastValue: true,
};
