import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
import { FieldSet, TextInput, FormStatusProps, Button } from '..';
import { Calendar } from '../../assets/images';
import 'react-dates/lib/css/_datepicker.css';

export type DateInputProps = {
  onChange: (newDate: Moment | undefined) => void;
  id: string;
  label: string;
  defaultValue?: Date | Moment;
  disabled?: boolean;
  optional?: boolean;
  status?: FormStatusProps;
  className?: string;
};

export const DateInput: React.FC<DateInputProps> = ({
  defaultValue,
  onChange,
  id,
  label,
  disabled,
  optional,
  status,
  className,
}) => {
  const commonDateInputProps = {
    className: 'oec-date-input__input margin-right-1',
    disabled: disabled,
    inline: true,
    // Pass an undefined message to make text input show correct outline color, but not a redundant message
    status: status ? { ...status, message: undefined } : undefined,
  };

  const [date, setDate] = useState<Moment | undefined>(
    moment.utc(defaultValue)
  );

  // Text input values
  const [month, setMonth] = useState<number | string>(
    date ? date.format('M') : ''
  );
  const [day, setDay] = useState<number | string>(date ? date.format('D') : '');
  const [year, setYear] = useState<number | string>(
    date ? date.format('YYYY') : ''
  );

  // Calendar
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [calendarDate, setCalendarDate] = useState<Moment | undefined>(date);

  useEffect(() => {
    const newDate = moment.utc(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    if (newDate.isValid()) {
      setDate(newDate);
    }
  }, [month, day, year]);

  useEffect(() => {
    if (!calendarDate) return;
    setDate(calendarDate);
    setMonth(calendarDate.format('M'));
    setDay(calendarDate.format('D'));
    setYear(calendarDate.format('YYYY'));
  }, [calendarDate]);

  useEffect(() => {
    onChange(date);
  }, [onChange, date]);

  return (
    <FieldSet
      legend={label}
      id={id}
      showLegend={true}
      hint={`For example: ${moment().format('M D YYYY')}`}
      className={className}
      status={status}
      optional={optional}
    >
      <div className="flex-row flex-align-end usa-memorable-date">
        <TextInput
          value={month}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newMonth = event.target.value;
            setMonth(newMonth);
          }}
          id={`${id}-month`}
          label="Month"
          inputProps={{ min: 1, max: 12, type: 'number' }}
          {...commonDateInputProps}
        />
        <TextInput
          value={day}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newDay = event.target.value;
            setDay(newDay);
          }}
          id={`${id}-day`}
          label="Day"
          inputProps={{ min: 1, max: 31, type: 'number' }}
          {...commonDateInputProps}
        />
        <TextInput
          value={year}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newYear = event.target.value;
            setYear(newYear);
          }}
          id={`${id}-year`}
          label="Year"
          inputProps={{ min: 1000, max: 2200, type: 'number' }}
          {...commonDateInputProps}
        />
        <div className="oec-calendar-dropdown oec-date-input__calendar-dropdown">
          <Button
            text={<Calendar className="oec-calendar-toggle__icon" />}
            onClick={() => {
              setCalendarOpen(!calendarOpen);
            }}
            title={`${calendarOpen ? 'close' : 'open'} calendar`}
            className="oec-calendar-toggle oec-calendar-dropdown__toggle"
          />
          <div
            className="oec-calendar-dropdown__calendar position-absolute z-top"
            hidden={!calendarOpen}
          >
            <DayPickerSingleDateController
              // Key forces re-render, which helps deal with bugs in this library-- see scss file
              key={JSON.stringify({ calendarDate, calendarOpen })}
              date={date || null}
              onDateChange={(newDate) => {
                setCalendarDate(newDate || undefined);
              }}
              focused={calendarOpen}
              // Annoyingly this does not do anything for keyboard users
              onFocusChange={(f) => setCalendarOpen(f.focused || false)}
              onBlur={() => setCalendarOpen(false)}
              // TODO: IMPLEMENT ON TAB ONCE TYPES FOR THIS LIBRARY ARE UPDATED :/
              // onTab={() => {}}
              onOutsideClick={(e) => {
                const clickOnCalendarOrButton = e.target.closest(
                  `#${id} .oec-calendar-dropdown`
                );
                // If a user clicks the button again, the button will handle closing it, and this would fire first and cause problems
                if (!clickOnCalendarOrButton) {
                  setCalendarOpen(false);
                }
              }}
              initialVisibleMonth={() => date || moment()}
            />
          </div>
        </div>
      </div>
    </FieldSet>
  );
};
