import React from 'react';
import { storiesOf } from '@storybook/react';
import { Divider } from '..';

storiesOf('Divider', module).add('Default', () => {
  return (
    <div className="grid-container">
      <p>Here's some content</p>
      <Divider />
      <p>Which is separate from other content</p>
    </div>
  );
});
