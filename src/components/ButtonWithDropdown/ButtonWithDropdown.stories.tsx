import React from 'react';
import { storiesOf } from '@storybook/react';
import { ButtonWithDropdown } from './ButtonWithDropdown';

storiesOf('ButtonWithDropdown', module).add('Default', () => {
  return (
    <ButtonWithDropdown
      id="default"
      appearence="outline"
      text="Dropdown"
      options={[
        { text: 'Hi', value: 'hi' },
        { text: 'Bye', value: 'bye' },
      ]}
    />
  );
});
