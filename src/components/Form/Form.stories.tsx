import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import { Form, FormField } from '.';
import { TextInput, TextInputProps } from '..';
import { FormFieldSet } from '../..';

const onSubmit = action('onSubmit');
type FormDataType = {
  firstName: string;
  nickName?: string;
  lastName: string;
  nestedValue: {
    nestType: string;
    nestReason: string;
  };
};

const _formData = {
  firstName: 'James',
  nickName: 'Prongs',
  lastName: 'Potter',
  nestedValue: {
    nestType: 'stag?',
  },
  turningIntoAnAnimal: true,
  notBeingAfraidOfVoldemort: true,
};

const errorfulFormData = {
  firstName: 'Peter',
  nickName: 'Wormtail',
  lastName: 'Pettigrew',
  nestedValue: {
    nestType: 'rat',
  },
  turningIntoAnAnimal: true,
  notBeingAfraidOfVoldemort: false,
};

// TODO: add checkbox example
const possibleSuperPowers = {
  ANIMAL: 'turningIntoAnAnimal',
  VOLDEMORT: 'notBeingAfraidOfVoldemort',
};

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
              message: 'Error: watch out Ron!!!!!',
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
        status={(objectDriller) =>
          objectDriller.at('firstName').value === errorfulFormData.firstName
            ? {
                type: 'error',
                message: 'No characters named Peter allowed',
                id: 'firstName-status',
              }
            : undefined
        }
      />
      <FormField<FormDataType, TextInputProps, string | null>
        getValue={(data) => data.at('nickName')}
        preprocessForDisplay={(value) => `"${value}"`}
        inputComponent={TextInput}
        type="input"
        id="nickName"
        label="Nick name"
        status={(objectDriller) =>
          objectDriller.at('nickName').value === errorfulFormData.nickName
            ? {
                type: 'warning',
                message: 'Nickname is too cutesy for an evil character',
                id: 'nickName-status',
              }
            : undefined
        }
      />
      <FormField<FormDataType, TextInputProps, string | null>
        getValue={(data) => data.at('lastName')}
        inputComponent={TextInput}
        type="input"
        id="lastName"
        label="Last name"
        status={(objectDriller) =>
          objectDriller.at('lastName').value === errorfulFormData.lastName
            ? {
                type: 'success',
                message: 'This is fine though',
                id: 'lastName-status',
              }
            : undefined
        }
      />
    </FormFieldSet>
  </Form>
);

storiesOf('Form components', module)
  .addDecorator(withKnobs)
  .add('Form', () => {
    return <SampleForm formData={_formData} />;
  })
  .add('Form with errors', () => {
    return <SampleForm formData={errorfulFormData} />;
  });
