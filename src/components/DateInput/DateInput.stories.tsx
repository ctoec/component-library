import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import 'react-dates/initialize';
import { DateInput, FormStatusProps } from '..';

const commonProps = {
  onChange: action('onChange'),
  date: new Date(),
  label: 'Date',
  id: 'dateinput-example',
};
const error: FormStatusProps = {
  type: 'error',
  message: 'Pick a better date',
  id: 'date-error',
};
const warning: FormStatusProps = {
  type: 'warning',
  message: 'Meh, fine',
  id: 'date-warning',
};
const success: FormStatusProps = {
  type: 'success',
  message: 'You did good',
  id: 'date-success',
};

storiesOf('Date input', module)
  .add('Default', () => {
    return <DateInput {...commonProps} />;
  })
  .add('Optional', () => {
    return <DateInput {...commonProps} optional={true} />;
  })
  .add('Disabled day input', () => {
    return <DateInput {...commonProps} disabled />;
  })
  .add('Hidden field', () => {
    return (
      <DateInput {...commonProps} hideField={{ day: true, calendar: true }} />
    );
  })
  .add('Success', () => {
    return <DateInput {...commonProps} status={success} />;
  })
  .add('Warning', () => {
    return <DateInput {...commonProps} status={warning} />;
  })
  .add('Error', () => {
    return <DateInput {...commonProps} status={error} />;
  });
