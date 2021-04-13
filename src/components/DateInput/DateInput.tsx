import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import {
  DatePicker as CarbonDatePicker,
  DatePickerInput as CarbonDatePickerInput,
} from 'carbon-components-react';
import { FieldSet, FormStatusProps } from '..';
import 'react-dates/lib/css/_datepicker.css';

export type DateInputProps = {
  onChange: (newDate: Moment | undefined | null) => void;
  id: string;
  label: string;
  defaultValue?: Date | Moment | null;
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
    hideYear ? '' : '/Y'
  }`;

  const momentFormat = `${hideMonth ? '' : 'MM'}${hideDay ? '' : '/DD'}${
    hideYear ? '' : '/YYYY'
  }`;

  const _defaultValue = defaultValue ? moment.utc(defaultValue) : undefined;

  const [date, setDate] = useState<Moment | undefined | null>(
    !disabled ? _defaultValue : null
  );

  const [dateString, setDateString] = useState<string | undefined>(
    !disabled && _defaultValue ? _defaultValue.format(momentFormat) : undefined
  );

  useEffect(() => {
    onChange(date);
  }, [onChange, date]);

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

  const formatCalendarValue = (date: string): string => {
    if (simpleCalendar) return date;
    if (date.includes('/')) return date;
    if (date.length === 2) return `${date}/01/${moment().format('YYYY')}`;
    return date;
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
        value={dateString ? formatCalendarValue(dateString) : ''}
        datePickerType={hideCalendar || simpleCalendar ? 'simple' : 'single'}
        dateFormat={formatStrftime}
        minDate="01/01/1900"
        maxDate="01/01/2200"
        onChange={(d) => {
          const newDate = moment(
            d[0].toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            momentFormat
          );
          if (newDate.isValid()) {
            if (disabled) {
              setDate(null);
            } else {
              setDate(newDate);
            }
          }
        }}
      >
        <CarbonDatePickerInput
          placeholder={placeHolder}
          labelText="Date picker"
          hideLabel={true}
          id="date-picker-single"
          disabled={disabled}
          value={dateString}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            disabled
              ? setDateString('')
              : setDateString(formatDateInput(event.target.value));
          }}
        />
      </CarbonDatePicker>
    </FieldSet>
  );
};
