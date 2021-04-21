import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import {
  DatePicker as CarbonDatePicker,
  DatePickerInput as CarbonDatePickerInput,
} from 'carbon-components-react';
import { FieldSet, FormStatusProps } from '..';
import 'react-dates/lib/css/_datepicker.css';

export type DateInputProps = {
  onChange: (newDate: Moment | null) => void;
  id: string;
  label: string;
  defaultValue?: Date | Moment;
  disabled?: boolean;
  optional?: boolean;
  status?: FormStatusProps;
  className?: string;
  hideLegend?: boolean;
  hideField?: {
    month?: boolean;
    day?: boolean;
    year?: boolean;
    calendar?: boolean;
  };
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
  hideLegend = false,
  hideField = {},
}) => {
  const {
    month: hideMonth,
    day: hideDay,
    year: hideYear,
    calendar: hideCalendar,
  } = hideField;

  const formatStrftime = `${hideMonth ? '' : 'm'}${hideDay ? '' : '/d'}${
    (!hideMonth || !hideDay) && !hideYear ? '/' : ''
  }${hideYear ? '' : 'Y'}`;

  const momentFormat = `${hideMonth ? '' : 'MM'}${hideDay ? '' : '/DD'}${
    (!hideMonth || !hideDay) && !hideYear ? '/' : ''
  }${hideYear ? '' : 'YYYY'}`;

  const [date, setDate] = useState<Moment | null>(
    !disabled && defaultValue ? moment.utc(defaultValue) : null
  );

  const [calendarDate, setCalendarDate] = useState<Moment | null>(
    !disabled && defaultValue ? moment.utc(defaultValue) : null
  );

  const [dateString, setDateString] = useState<string>(
    !disabled && defaultValue
      ? moment.utc(defaultValue).format(momentFormat)
      : ''
  );

  const simpleCalendar = hideMonth || hideDay || hideYear;

  const isValidDateString = (val: string): boolean => {
    const strip = val.replaceAll('/', '');
    if (
      (!simpleCalendar && strip.match(/^\d{8}$/gm)) ||
      (hideDay && strip.match(/^\d{6}$/gm)) ||
      (hideYear && strip.match(/^\d{4}$/gm))
    )
      return true;
    return false;
  };

  // Set the three representations of "date": the date and dateString
  // local states and the onChange external Form state
  const updateDate = (val: string | null) => {
    console.log('update date: ', val);
    if (!val) {
      setDateString('');
      setDate(null);
      setCalendarDate(null);
      // onChange(null);
    } else {
      const newDateSlash = moment(
        val.replaceAll('/', ''),
        momentFormat.replaceAll('/', '')
      );
      const newDate = moment.utc(
        newDateSlash.format('YYYY-MM-DD'),
        'YYYY-MM-DD'
      );
      if (isValidDateString(val) && newDate.isValid()) {
        console.log('valid date string');
        setDateString(newDate.format(momentFormat));
        setDate(newDate);
        setCalendarDate(newDate);
        // onChange(newDate);
      } else {
        setDateString(val);
      }
    }
  };

  useEffect(() => {
    if (disabled) updateDate(null);
  }, [onChange, disabled]);

  useEffect(() => {
    onChange(date);
  }, [onChange, date]);

  return (
    <FieldSet
      legend={label}
      id={id}
      showLegend={!hideLegend}
      hint={`For example: ${moment().format(momentFormat)}`}
      className={className}
      status={status}
      optional={optional}
    >
      <CarbonDatePicker
        value={date?.format(momentFormat)}
        datePickerType={hideCalendar || simpleCalendar ? 'simple' : 'single'}
        dateFormat={formatStrftime}
        id={`${id}-picker`}
        minDate="01/01/1900"
        maxDate="01/01/2200"
        onChange={(d) =>
          updateDate(
            d[0]?.toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          )
        }
      >
        <CarbonDatePickerInput
          placeholder={momentFormat.toLocaleLowerCase()}
          labelText="Date picker"
          hideLabel={true}
          id={`${id}-input`}
          disabled={disabled}
          value={dateString}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            updateDate(event.target.value)
          }
        />
      </CarbonDatePicker>
    </FieldSet>
  );
};
