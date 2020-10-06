import React from 'react';
import moment, { Moment } from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import { Form, FormField } from '.';
import { TextInput, TextInputProps, CheckboxGroup } from '..';
import {
  Checkbox,
  CheckboxProps,
  DateInput,
  DateInputProps,
  FormFieldSet,
  FormFieldSetProps,
  FormSubmitButton,
} from '../..';

const onSubmit = action('onSubmit');

type FormDataType = {
  firstName: string;
  nickName?: string;
  lastName: string;
  turningIntoAnAnimal: boolean;
  notBeingAfraidOfVoldemort: boolean;
  date: Moment;
};

const possibleSuperPowers: { [key: string]: keyof FormDataType } = {
  ANIMAL: 'turningIntoAnAnimal',
  VOLDEMORT: 'notBeingAfraidOfVoldemort',
};

const _formData = {
  firstName: 'James',
  nickName: 'Prongs',
  lastName: 'Potter',
  turningIntoAnAnimal: true,
  notBeingAfraidOfVoldemort: true,
  date: moment(),
};

const errorfulFormData = {
  firstName: 'Peter',
  nickName: 'Wormtail',
  lastName: 'Pettigrew',
  turningIntoAnAnimal: true,
  notBeingAfraidOfVoldemort: false,
};

const SampleForm = ({ formData }) => (
  <Form onSubmit={onSubmit} data={formData}>
    <FormFieldSet<FormDataType>
      id="name-fields"
      legend="Character name"
      showLegend
      status={(data) =>
        data.firstName === 'Peter'
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
              type: 'error',
              message: 'Nickname is too cutesy for an evil character',
              id: 'nickName-status',
            }
          : undefined
      }
    />
    <CheckboxGroup<FormFieldSetProps<FormDataType>>
      legend="Character superpowers"
      hint="As identified by readers"
      id="powers"
      useFormFieldSet
      options={[
        {
          render: ({ id, selected }) => (
            <FormField<FormDataType, CheckboxProps, string | boolean | Moment>
              getValue={(data) => data.at(possibleSuperPowers.ANIMAL)}
              parseOnChangeEvent={(e) => e.target.checked}
              defaultValue={selected}
              inputComponent={Checkbox}
              id={id}
              text="Can turn into an animal"
            />
          ),
          value: possibleSuperPowers.ANIMAL,
        },
        {
          render: ({ id, selected }) => (
            <FormField<FormDataType, CheckboxProps, string | boolean | Moment>
              getValue={(data) => data.at(possibleSuperPowers.VOLDEMORT)}
              parseOnChangeEvent={(e) => e.target.checked}
              defaultValue={selected}
              inputComponent={Checkbox}
              id={id}
              text="Is not afraid of Voldemort"
            />
          ),
          value: possibleSuperPowers.VOLDEMORT,
        },
      ]}
      status={(characterData) =>
        characterData === errorfulFormData
          ? {
              id: 'checkboxStatus',
              type: 'error',
              message: 'Nope, gotta stand up to Voldy',
            }
          : undefined
      }
    />
    <FormField<FormDataType, DateInputProps, Moment>
      getValue={(data) => data.at('date')}
      parseOnChangeEvent={(e) => (e as unknown) as Moment}
      inputComponent={DateInput}
      id="date"
      label="Pick a date"
      status={(objectDriller) =>
        objectDriller.at('date').value?.isValid()
          ? undefined
          : { id: 'dateStatus', type: 'error', message: 'Pick one' }
      }
    />
    <FormSubmitButton />
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
