import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import { Form, FormField } from '.';
import { TextInput, TextInputProps } from '..';
import { CheckboxGroupProps, FormFieldSet } from '../..';

const onSubmit = action('onSubmit');
type FormDataType = {
  firstName: string;
  lastName: string;
  nestedValue: {
    nestType: string;
    nestReason: string;
  };
};

const _formData = {
  firstName: 'Peter',
  lastName: 'Pettigrew',
  nestedValue: {
    nestType: 'rat',
  },
  turningIntoAnAnimal: true,
  notBeingAfraidOfVoldemort: false,
};

const possibleSuperPowers = {
  ANIMAL: 'turningIntoAnAnimal',
  VOLDEMORT: 'notBeingAfraidOfVoldemort'
}

const SampleForm = ({ formData }) => (
  <Form onSubmit={onSubmit} data={formData}>
    <FormFieldSet<FormDataType>
      id="name-fields"
      legend="Character name"
      showLegend
      status={(data) =>
        data.nestedValue.nestType === 'rat'
          ? {
            type: 'error',
            id: 'character-name',
            message: 'Peter Pettigrew is an animagus!!!!!',
          }
          : undefined
      }
    >
      <FormField<FormDataType, TextInputProps, string | null>
        getValue={(data) => data.at('firstName')}
        inputComponent={TextInput}
        type="input"
        id="firstName"
        label="First name"
        status={(data) => ({
          type: 'error',
          message: 'No characters named Peter allowed',
          id: 'firstName-status',
        })}
      />
      <FormField<FormDataType, TextInputProps, string | null>
        getValue={(data) => data.at('lastName')}
        inputComponent={TextInput}
        type="input"
        id="lastName"
        label="Last name"
        status={() => ({
          type: 'error',
          message: 'He is a death eater!',
          id: 'lastName-status',
        })}
      />
    </FormFieldSet>
  </Form>
);

storiesOf('Form components', module)
  .addDecorator(withKnobs)
  .add('Form with text fields', () => {
    return <SampleForm formData={_formData} />;
  });
