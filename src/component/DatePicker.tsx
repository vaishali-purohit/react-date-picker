import React, { useEffect, useRef, useState } from 'react';
import WeekdayDateRangePicker from './WeekdayDateRangePicker'; // Adjust the path as necessary
import * as Styled from '../styles/calendar.styles';
import { formatDate } from '../utils/dateFormat';
import { getPreviousWeekday } from '../utils/dateUtil';
import BirthDayDatePicker from './BirthDayDatePicker';

interface DatePickerProps {
  endDate?: Date;
  startDate?: Date;
  weekendList?: Array<string>;
  isDateRange?: boolean;
  birthDate?: Date;
  label: string;
  placeholderValue: string;
  onChange:
    | ((start: Date, end: Date, weekendList: Array<string>) => void)
    | ((birthDate: Date) => void);
  isHidePastValue?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  endDate,
  startDate,
  weekendList = [],
  isDateRange = false,
  birthDate,
  label,
  placeholderValue,
  onChange,
  isHidePastValue = false,
}) => {
  const [dateRange, setDateRange] = useState<[string, string] | []>([]);
  const [weekendsList, setWeekendsList] = useState<string[]>([]);
  const today = new Date();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startDate && endDate) {
      setDateRange([formatDate(startDate), formatDate(endDate)]);
      setWeekendsList(weekendList);
    }
  }, [startDate, endDate, weekendList]);

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
    onChange(new Date(range[0]), new Date(range[1]), weekends);
  };

  const toggleCalendar = () => setCalendarOpen(!calendarOpen);

  return (
    <div ref={dropdownRef}>
      <Styled.DatePickerContainer>
        <Styled.DatePickerFormGroup>
          <Styled.DatePickerLabel>{label}</Styled.DatePickerLabel>
          <Styled.DatePickerInput
            onClick={toggleCalendar}
            type="text"
            value={
              !isDateRange && birthDate
                ? formatDate(birthDate)
                : dateRange.length
                  ? `${dateRange[0]} ~ ${dateRange[1]}`
                  : ''
            }
            placeholder={placeholderValue}
            readOnly
          />
        </Styled.DatePickerFormGroup>
        <br />
        {isDateRange && (
          <div>
            <b>Weekend Dates:</b>{' '}
            {weekendsList.length
              ? weekendsList.map((data) => {
                  return `${data}, `;
                })
              : 'No weekends'}
            <br />
          </div>
        )}
        <Styled.DatePickerDropdown isOpen={calendarOpen}>
          <Styled.DatePickerDropdownMenu>
            {calendarOpen && (
              <div>
                {isDateRange ? (
                  <WeekdayDateRangePicker
                    onChange={handleDateChange}
                    startDateRange={
                      dateRange.length ? new Date(dateRange[0]) : null
                    }
                    endDateRange={
                      dateRange.length ? new Date(dateRange[1]) : null
                    }
                    predefinedRanges={[
                      {
                        label: 'Next 7 Days',
                        range: [
                          formatDate(today),
                          formatDate(
                            getPreviousWeekday(
                              new Date(
                                today.getTime() + 7 * 24 * 60 * 60 * 1000,
                              ),
                            ),
                          ),
                        ],
                      },
                      {
                        label: 'Next 30 Days',
                        range: [
                          formatDate(today),
                          formatDate(
                            getPreviousWeekday(
                              new Date(
                                today.getTime() + 30 * 24 * 60 * 60 * 1000,
                              ),
                            ),
                          ),
                        ],
                      },
                    ]}
                    isDateRange={isDateRange}
                    isHidePastValue={isHidePastValue}
                  />
                ) : (
                  <BirthDayDatePicker
                    onChange={onChange as (birthDate: Date) => void}
                    isDateRange={isDateRange}
                    birthDay={birthDate}
                    isHidePastValue={isHidePastValue}
                  />
                )}
              </div>
            )}
          </Styled.DatePickerDropdownMenu>
        </Styled.DatePickerDropdown>
      </Styled.DatePickerContainer>
    </div>
  );
};

export default DatePicker;
