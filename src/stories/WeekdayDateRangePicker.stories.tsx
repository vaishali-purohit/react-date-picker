import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import WeekdayDateRangePicker, {
  WeekdayDateRangePickerProps,
} from '../component/WeekdayDateRangePicker';

export default {
  title: 'Components/WeekdayDateRangePicker',
  component: WeekdayDateRangePicker,
} as Meta;

const Template: Story<WeekdayDateRangePickerProps> = (args) => {
  const [range, setRange] = useState<[string, string] | null>(null);
  const [weekends, setWeekends] = useState<string[]>([]);

  const handleChange = (
    selectedRange: [string, string],
    weekendList: string[],
  ) => {
    setRange(selectedRange);
    setWeekends(weekendList);
  };

  return (
    <div>
      <WeekdayDateRangePicker {...args} onChange={handleChange} />
      {range && (
        <div>
          <p>
            Selected Range: {range[0]} - {range[1]}
          </p>
          <p>Weekends: {weekends.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isDateRange: true,
};

export const WithPredefinedRanges = Template.bind({});
WithPredefinedRanges.args = {
  predefinedRanges: [
    {
      label: 'Next 7 Days',
      range: ['2023-12-01', '2023-12-07'],
    },
    {
      label: 'Next 30 Days',
      range: ['2023-12-01', '2023-12-30'],
    },
  ],
  isDateRange: true,
};
