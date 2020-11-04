import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { LoadingWrapper } from './LoadingWrapper';

storiesOf('LoadingWrapper', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <LoadingWrapper text="Loading so much data..." isLoading={true}>
        <p>You can't see me because it's loading!</p>
      </LoadingWrapper>
    );
  });
