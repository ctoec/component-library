import React from 'react';
import { storiesOf } from '@storybook/react';

import { StepList, StepListProps } from './StepList';
import { Button } from '..';

const props: StepListProps<any> = {
  steps: [
    {
      key: '1',
      name: 'One small step',
      status: () => 'complete',
      editPath: '1',
      Summary: () => <p>For a man.</p>,
      Form: () => <></>,
    },
    {
      key: '2',
      name: 'One giant leap',
      status: () => 'complete',
      EditComponent: () => <Button text="edit component" />,
      Summary: () => <></>,
      Form: () => <p>For mankind.</p>,
    },
    {
      key: '3',
      name: 'To infinity and beyond',
      status: () => 'complete',
      editPath: '3',
      Summary: () => <></>,
      Form: () => <></>,
    },
    {
      key: '4',
      name: 'Without a summary',
      status: () => 'complete',
      Form: () => <></>,
    },
  ],
  props: {},
  activeStep: '3',
};

storiesOf('StepList', module).add('Default', () => {
  return <StepList {...props} />;
});
