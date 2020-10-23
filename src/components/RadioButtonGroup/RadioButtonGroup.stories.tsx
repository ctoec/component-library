import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormStatusProps } from '..';
import { TextInput } from '../TextInput/TextInput';
import { RadioButtonGroup, RadioOption } from './RadioButtonGroup';
import '../../assets/styles/index.scss';

const onChange = action('onChange');
const options: RadioOption[] = [
  {
    value: 'one',
    id: 'one',
    text: 'One',
    name: 'one',
    onChange,
  },
  {
    value: 'two',
    id: 'two',
    text: 'Two',
    name: 'two',
    onChange,
  },
];
const optionsWithOneExpansion: RadioOption[] = [
  {
    ...options[0],
    expansion: <p>Thank you for selecting option one!</p>,
  },
  options[1],
];
const optionsWithOneComplexExpansion: RadioOption[] = [
  {
    ...options[0],
    expansion: (
      <>
        <p>Thank you for selecting option one!</p>
        <TextInput
          id="radio-multi-text-input"
          label="Interactive Element?"
          defaultValue="Yes, you can!"
          onChange={onChange}
        />
      </>
    ),
  },
  options[1],
];
const optionsWithTwoExpansions: RadioOption[] = [
  {
    ...options[0],
    expansion: <p>Thank you for selecting option one!</p>,
  },
  {
    ...options[1],
    expansion: <p>Woo! #2</p>,
  },
];
const warning: FormStatusProps = {
  type: 'warning',
  message: 'These fields need your attention',
  id: 'checklist-warning',
};
const error: FormStatusProps = {
  type: 'error',
  message: 'These fields will block your progress',
  id: 'checklis-error',
};
const success: FormStatusProps = {
  type: 'success',
  message: 'These fields were validated woo',
  id: 'checklist-success',
};

storiesOf('RadioButtonGroup', module)
  .add('RadioButtonGroup', () => {
    return (
      <RadioButtonGroup
        legend="RadioButtonGroup"
        options={options}
        id="storybook-RadioButtonGroup"
      />
    );
  })
  .add('RadioButtonGroup with success', () => {
    return (
      <RadioButtonGroup
        legend="RadioButtonGroup"
        options={options}
        id="storybook-RadioButtonGroup"
        status={success}
      />
    );
  })
  .add('RadioButtonGroup with warning', () => {
    return (
      <RadioButtonGroup
        legend="RadioButtonGroup"
        options={options}
        id="storybook-RadioButtonGroup"
        status={warning}
      />
    );
  })
  .add('RadioButtonGroup with error', () => {
    return (
      <RadioButtonGroup
        legend="RadioButtonGroup"
        options={options}
        id="storybook-RadioButtonGroup"
        status={error}
      />
    );
  })
  .add('Disabled RadioButtonGroup', () => {
    return (
      <RadioButtonGroup
        legend="RadioButtonGroup"
        options={options}
        id="storybook-RadioButtonGroup"
        disabled={true}
      />
    );
  })
  .add('RadioButtonGroup with one single element expansion', () => {
    return (
      <RadioButtonGroup
        legend="RadioButtonGroup"
        options={optionsWithOneExpansion}
        id="storybook-RadioButtonGroup"
      />
    );
  })
  .add('RadioButtonGroup with one multi element expansion', () => {
    return (
      <RadioButtonGroup
        legend="RadioButtonGroup"
        options={optionsWithOneComplexExpansion}
        id="storybook-RadioButtonGroup"
      />
    );
  })
  .add('RadioButtonGroup with both single element expansion', () => {
    return (
      <RadioButtonGroup
        legend="RadioButtonGroup"
        options={optionsWithTwoExpansions}
        id="storybook-RadioButtonGroup"
      />
    );
  });
