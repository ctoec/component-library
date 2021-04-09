import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import {
  DatePicker as CarbonDatePicker,
  DatePickerInput as CarbonDatePickerInput,
} from 'carbon-components-react';
import { FieldSet, FormStatusProps } from '..';
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
  const commonDateInputProps = {
    className: 'oec-date-input__input margin-right-1 margin-top-0',
    disabled: disabled,
    inline: true,
    // Pass an undefined message to make text input show correct outline color, but not a redundant message
    status: status ? { ...status, message: undefined } : undefined,
    optional,
    hideOptionalText: true,
  };

  const _defaultValue = defaultValue ? moment.utc(defaultValue) : undefined;

  const [initialDate, setInitialDate] = useState<string | undefined>(
    _defaultValue ? _defaultValue.format('MM/DD/YYYY') : undefined
  );

  const [date, setDate] = useState<Moment | undefined>(_defaultValue);

  // Calendar
  const [calendarDate, setCalendarDate] = useState<Moment | undefined>(
    _defaultValue
  );

  useEffect(() => {
    console.log('onchange date');
    console.log(date);
    onChange(disabled ? undefined : date);
  }, [onChange, date]);

  const {
    month: hideMonth,
    day: hideDay,
    year: hideYear,
    calendar: hideCalendar,
  } = hideField;

  const formatStrftime = `${hideMonth ? '' : 'm'}${hideDay ? '' : '/d'}${
    hideYear ? '' : '/Y'
  }`;

  const momentFormat = `${hideMonth ? '' : 'MM'}${hideDay ? '' : '/DD'}${
    hideYear ? '' : '/YYYY'
  }`;

  const placeHolder = `${momentFormat.toLocaleLowerCase()}`;

  const simpleCalendar = hideMonth || hideDay || hideYear;

  //Formats date string entered with `/` based on the type
  //of date field. Text is only replaced if text string does
  //not contain `/`'s already
  const formatDateInput = (date: string): string => {
    if (
      (!simpleCalendar && date.match(/^\d{8}$/gm)) ||
      (hideDay && date.match(/^\d{6}$/gm)) ||
      (hideYear && date.match(/^\d{4}$/gm))
    )
      return moment(date, momentFormat.replaceAll('/', '')).format(
        momentFormat
      );
    else return date;
  };

  return (
    <FieldSet
      legend={label}
      id={id}
      showLegend={!hideLegend}
      hint={placeHolder}
      className={className}
      status={status}
      optional={optional}
    >
      <CarbonDatePicker
        value={`${initialDate}`}
        datePickerType={hideCalendar || simpleCalendar ? 'simple' : 'single'}
        dateFormat={formatStrftime}
        minDate="01/01/1900"
        maxDate="01/01/2200"
        onChange={(d) => {
          console.log(d);
          const newDate = moment(
            d[0].toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            momentFormat
          );
          if (newDate.isValid()) {
            console.log('disabled', disabled);
            if (disabled) {
              setDate(undefined);
              setCalendarDate(undefined);
            } else {
              setDate(newDate);
              setCalendarDate(newDate);
            }
          }
        }}
      >
        <CarbonDatePickerInput
          placeholder={placeHolder}
          labelText="Date Picker"
          id="date-picker-single"
          disabled={disabled}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            console.log('disabled - datepickerinput', disabled);
            event.target.value = disabled
              ? ''
              : formatDateInput(event.target.value);
          }}
        />
      </CarbonDatePicker>
    </FieldSet>
  );
};
