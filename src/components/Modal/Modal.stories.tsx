import React from 'react';
import { storiesOf } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../';

storiesOf('Modal', module)
  .add('Default', () => {
    return (
      <Modal
        isOpen={true}
        toggleOpen={() => {}}
        header={<h1>This is a modal</h1>}
        content={
          <div>
            <div> This is the stuff in the modal </div>
            <Button text="click me!" />
          </div>
        }
      />
    );
  })
  .add('With header border', () => {
    return (
      <Modal
        isOpen={true}
        toggleOpen={() => {}}
        header={
          <div>
            <h1>This is a modal</h1>
            <p className="margin-top-05">with more info in the header</p>
          </div>
        }
        showHeaderBorder
        content={
          <div>
            <div> This is the stuff in the modal </div>
            <Button text="click me!" />
          </div>
        }
      />
    );
  });
