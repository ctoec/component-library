import React from 'react';
import { storiesOf } from '@storybook/react';
import { FileInput } from '..';
import 'uswds/dist/js/uswds';

storiesOf('FileInput', module).add('Default', () => {
  return (
    <FileInput
      id="default"
      label="File"
      ariaDescribedById=""
      ariaDescribedByText=""
    />
  );
});
