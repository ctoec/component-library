import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { FieldSet, TextInput, FormStatusProps } from '..';


type inputDetailType = {
  props: {
    label: string;
    inputProps: any;
  };
  parseMoment: (inputMoment: Moment | null) => string | undefined;
  checkValidity: (value: any) => boolean;
  errorMessage: string;
};

type inputDetailsType = { [key: string]: inputDetailType };

type DateInputProps = {
  date: Date;
  onChange: (newDate: Date) => void;
  id: string;
  label: string;
  disabled?: boolean;
  optional?: boolean;
  status?: FormStatusProps;
  className?: string;
};

const inputDetails: inputDetailsType = {
  month: {
    props: {
      inputProps: { maxLength: 2, type: 'number', min: 1, max: 12 },
      label: 'Month',
    },
    parseMoment: (inputMoment: Moment | null) =>
      inputMoment ? inputMoment.format('MM') : undefined,
    checkValidity: value => +value > 0 && +value < 13,
    errorMessage: 'Invalid month',
  },
  day: {
    props: {
      label: 'Day',
      inputProps: { maxLength: 2, type: 'number', min: 1, max: 31 },
    },
    parseMoment: (inputMoment: Moment | null) =>
      inputMoment ? inputMoment.format('DD') : undefined,
    checkValidity: value => +value < 32 && +value > 0,
    errorMessage: 'Invalid day',
  },
  year: {
    props: {
      label: 'Year',
      inputProps: { maxLength: 4, type: 'number', min: 1990, max: 2100 },
    },
    parseMoment: (inputMoment: Moment | null) =>
      inputMoment ? inputMoment.format('YYYY') : undefined,
    checkValidity: value =>
      value.length === 2 || (value.length === 4 && +value > 1989 && +value < 2101),
    errorMessage: 'Invalid year',
  },
};

export const DateInput: React.FC<DateInputProps> = ({
  date,
  onChange,
  id,
  label,
  disabled,
  optional,
  status,
  className,
}) => {

  const commonDateInputProps = {
    className: 'oec-date-input__input',
    disabled: disabled,
    type: 'number',
    inline: true,
  };

  return (
    <FieldSet
      legend={label}
      id={id}
      showLegend={true}
      hint={`For example: ${moment.format('MM DD YYYY')}`}
      childrenGroupClassName="flex-row flex-align-end usa-memorable-date"
      className={className}
      status={status}
    >
      {Object.keys(inputDetails).map(key => (
        <div key={key}>
          <TextInput
            defaultValue={rangeByVal[key].start}
            onChange={event => {
              const newRangeVals = Object.assign({}, rangeByVal);
              newRangeVals[key].start = event.target.value;
              setRangeByVal(newRangeVals);
            }}
            id={`${id}-${key}-start-date`}
            {...inputDetails[key].props}
            {...commonDateInputProps}
            onBlur={event => {
              const newRangeVals = Object.assign({}, rangeByVal);
              newRangeVals[key].startIsInvalid = !inputDetails[key].checkValidity(
                event.target.value
              );
              setRangeByVal(newRangeVals);
            }}
            optional={optional}
            status={
              rangeByVal[key].startIsInvalid
                ? {
                  type: 'warning',
                  message: inputDetails[key].errorMessage,
                  id: `${id}-${key}-start-error`,
                }
                : undefined
            }
          />
        </div>
      ))}{' '}
    </FieldSet>
  )
};