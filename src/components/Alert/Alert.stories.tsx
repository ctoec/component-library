import React from 'react';
import { storiesOf } from '@storybook/react';

import { Alert } from '..';
import { AlertProps } from '../..';

const successAlertProps: AlertProps = {
  type: 'success',
  heading: 'Success alert!',
  text: 'Good job, you.',
};
const warningAlertProps: AlertProps = {
  type: 'warning',
  heading: 'Watch out!',
  text: 'Is that what you meant to do?',
};
const errorAlertProps: AlertProps = {
  type: 'error',
  heading: 'Hark, an error!',
  text: "Something's not right.",
};
const infoAlertProps: AlertProps = {
  type: 'info',
  heading: 'Information',
  text: 'Neutral information here.',
};
const allAlertProps: AlertProps[] = [
  successAlertProps,
  warningAlertProps,
  errorAlertProps,
  infoAlertProps,
];

storiesOf('Alert', module)
  .add('Success', () => {
    return <Alert {...successAlertProps} />;
  })
  .add('Warning', () => {
    return <Alert {...warningAlertProps} />;
  })
  .add('Error', () => {
    return <Alert {...errorAlertProps} />;
  })
  .add('Info', () => {
    return <Alert {...infoAlertProps} />;
  })
  .add('Lots of alerts', () => {
    return (
      <>
        <div>The content above the alerts should have some breathing room</div>
        {allAlertProps.map((p, i) => (
          <Alert {...p} key={i} />
        ))}
        <div>As should the content below.</div>
      </>
    );
  });
