import React, { useEffect, useRef, useState } from 'react';
import WeekdayDateRangePicker from './WeekdayDateRangePicker'; // Adjust the path as necessary
import * as Styled from '../styles/calendar.styles';
import { formatDate } from '../utils/dateFormat';
import { getPreviousWeekday } from '../utils/dateUtil';

// Utility function to combine multiple date rules
const combine = (...rules: ((date: Date) => boolean)[]) => {
  return (date: Date) => {
    return rules.some((rule) => rule(date));
  };
};

// Utility function to disable dates before today
const beforeToday = () => {
  return (date: Date) => date < new Date();
};

// Utility function to restrict date selection to a maximum of X days
// const allowedMaxDays = (maxDays: number) => {
//   return (date: Date, startDate: Date | null) => {
//     if (startDate) {
//       const maxEndDate = new Date(startDate);
//       maxEndDate.setDate(maxEndDate.getDate() + maxDays);
//       return date > maxEndDate;
//     }
//     return false;
//   };
// };

const DatePicker: React.FC = () => {
  const [dateRange, setDateRange] = useState<[string, string] | []>([]);
  const [weekendsList, setWeekendsList] = useState<string[]>([]);
  const today = new Date();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as HTMLElement)
      ) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateChange = (range: [string, string], weekends: string[]) => {
    setDateRange(range);
    setWeekendsList(weekends);
  };

  const toggleCalendar = () => setCalendarOpen(!calendarOpen);

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <Styled.DatePickerContainer>
        <Styled.DatePickerFormGroup>
          <Styled.DatePickerLabel>Enter Range</Styled.DatePickerLabel>
          <Styled.DatePickerInput
            onClick={toggleCalendar}
            type="text"
            value={dateRange.length ? `${dateRange[0]} ~ ${dateRange[1]}` : ''}
            placeholder="YYYY / MM / DD"
            readOnly
          />
        </Styled.DatePickerFormGroup>
        <br />
        <div>
          <b>Weekend Dates:</b>{' '}
          {weekendsList.length
            ? weekendsList.map((data) => {
                return `${data}, `;
              })
            : 'No weekends'}
        </div>
        <br />
        <Styled.DatePickerDropdown isOpen={calendarOpen}>
          <Styled.DatePickerDropdownMenu>
            {calendarOpen && (
              <div>
                <WeekdayDateRangePicker
                  // shouldDisableDate={combine(allowedMaxDays(7), beforeToday())}
                  shouldDisableDate={combine(beforeToday())}
                  onChange={handleDateChange}
                  startDateRange={
                    dateRange.length ? new Date(dateRange[0]) : null
                  }
                  endDateRange={
                    dateRange.length ? new Date(dateRange[1]) : null
                  }
                  predefinedRanges={[
                    {
                      label: 'Last 7 Days',
                      range: [
                        formatDate(
                          getPreviousWeekday(
                            new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
                          ),
                        ),
                        formatDate(today),
                      ],
                    },
                    {
                      label: 'Last 30 Days',
                      range: [
                        formatDate(
                          getPreviousWeekday(
                            new Date(
                              today.getTime() - 30 * 24 * 60 * 60 * 1000,
                            ),
                          ),
                        ),
                        formatDate(today),
                      ],
                    },
                  ]}
                />
                <Styled.DatePickerButton onClick={closeCalendar}>
                  Save
                </Styled.DatePickerButton>
              </div>
            )}
          </Styled.DatePickerDropdownMenu>
        </Styled.DatePickerDropdown>
      </Styled.DatePickerContainer>
    </div>
  );
};

export default DatePicker;
