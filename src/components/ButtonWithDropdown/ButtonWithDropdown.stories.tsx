import React from 'react';
import { storiesOf } from '@storybook/react';
import { ButtonWithDropdown } from './ButtonWithDropdown';

storiesOf('ButtonWithDropdown', module).add('Default', () => {
  return (
    <ButtonWithDropdown
      id="default"
      appearance="unstyled"
      text="Dropdown"
      options={[
        { text: 'Hi', value: 'hi' },
        { text: 'Bye', href: '/bye' },
      ]}
    />
  );
});
