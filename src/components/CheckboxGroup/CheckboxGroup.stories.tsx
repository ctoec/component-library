import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormStatusProps } from '..';
import { TextInput } from '../TextInput/TextInput';
import { CheckboxInGroup, CheckboxGroup } from './CheckboxGroup';

const onChange = action('onChange');
const options: CheckboxInGroup[] = [
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
const optionsWithOneExpansion: CheckboxInGroup[] = [
  {
    ...options[0],
    expansion: <p>Thank you for selecting option one!</p>,
  },
  options[1],
];
const optionsWithOneComplexExpansion: CheckboxInGroup[] = [
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
const optionsWithTwoExpansions: CheckboxInGroup[] = [
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

storiesOf('CheckboxGroup', module)
  .add('CheckboxGroup', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        showLegend
        options={options}
        id="storybook-CheckboxGroup"
      />
    );
  })
  .add('CheckboxGroup with default value', () => {
    return (
      <CheckboxGroup
        legend="RadioButtonGroup"
        options={options}
        id="storybook-RadioButtonGroup"
        defaultSelectedItemsIds="one"
      />
    );
  })
  .add('CheckboxGroup with success', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        options={options}
        id="storybook-CheckboxGroup"
        status={success}
      />
    );
  })
  .add('CheckboxGroup with warning', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        options={options}
        id="storybook-CheckboxGroup"
        status={warning}
      />
    );
  })
  .add('CheckboxGroup with error', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        options={options}
        id="storybook-CheckboxGroup"
        status={error}
        showLegend
      />
    );
  })
  .add('Disabled CheckboxGroup', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        options={options}
        id="storybook-CheckboxGroup"
        disabled={true}
      />
    );
  })
  .add('CheckboxGroup with one single element expansion', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        options={optionsWithOneExpansion}
        id="storybook-CheckboxGroup"
      />
    );
  })
  .add('CheckboxGroup with one multi element expansion', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        options={optionsWithOneComplexExpansion}
        id="storybook-CheckboxGroup"
      />
    );
  })
  .add('CheckboxGroup with both single element expansion', () => {
    return (
      <CheckboxGroup
        legend="CheckboxGroup"
        options={optionsWithTwoExpansions}
        id="storybook-CheckboxGroup"
      />
    );
  });
