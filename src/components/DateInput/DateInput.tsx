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

  // const _defaultValue = defaultValue ? moment.utc(defaultValue) : undefined;

  const [date, setDate] = useState<Moment | null>(
    !disabled && defaultValue ? moment.utc(defaultValue) : null
  );

  const [dateString, setDateString] = useState<string | undefined>(
    !disabled && defaultValue
      ? moment.utc(defaultValue).format(momentFormat)
      : undefined
  );

  // useEffect(() => {
  //   console.log('onchange date', date);
  //   onChange(date);
  // }, [onChange, date]);

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

  // Formats date string entered with `/` based on the type
  // of date field. Text is only replaced if text string does
  // not contain `/`'s already
  const formatDateInput = (val: string): string => {
    if (isValidDateString(val))
      return moment(val, momentFormat.replaceAll('/', '')).format(momentFormat);
    else return val;
  };

  const updateDate = (val: string) => {
    if (disabled) setDate(null);
    else {
      const newDate = moment(val, momentFormat);
      if (newDate.isValid()) {
        setDate(newDate);
        onChange(date);
      }
    }
  };

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
        value={!disabled && date ? date.format(momentFormat) : undefined}
        datePickerType={hideCalendar || simpleCalendar ? 'simple' : 'single'}
        dateFormat={formatStrftime}
        minDate="01/01/1900"
        maxDate="01/01/2200"
        onChange={(d) => {
          console.log('carbon date picker');
          updateDate(
            d[0].toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          );
        }}
      >
        <CarbonDatePickerInput
          placeholder={momentFormat.toLocaleLowerCase()}
          labelText="Date picker"
          hideLabel={true}
          id="date-picker-single"
          disabled={disabled}
          value={dateString}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const val = event.target.value;
            const formatted = formatDateInput(val);

            setDateString(formatted);
            if (isValidDateString(val)) {
              updateDate(formatted);
            }
          }}
        />
      </CarbonDatePicker>
    </FieldSet>
  );
};
