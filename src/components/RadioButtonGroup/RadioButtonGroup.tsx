import React, { useState } from 'react';
import { FieldSetProps, FieldSet } from '../FieldSet/FieldSet';
import { FormField, FormFieldProps } from '../Form';
import { FormFieldSetProps, FormFieldSet } from '../Form/FormFieldSet';
import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton';

export type RadioOption = Omit<RadioButtonProps, 'name'> & {
  expansion?: React.ReactNode;
};

// TODO: we probably actually want to let the user specify the return type
export type RadioOptionInForm<TData> = Omit<
  FormFieldProps<TData, RadioOption, any>,
  'inputComponent' | 'onChange'
>;

type CommonRadioGroupProps = {
  inputName: string;
  defaultSelectedItemId?: string;
};

/**
 * Props for InternalRadioButtonGroup
 */
type InternalRadioButtonGroupProps = CommonRadioGroupProps & {
  options: RadioOption[];
  inForm?: boolean;
};

type PropsForGroupInForm<TData> = CommonRadioGroupProps & {
  options: RadioOptionInForm<TData>[];
  inForm: true;
};

/**
 * Props for RadioButtonGroup, which includes props for InternalRadioButtonGroup,
 * props for the wrapping field set(FieldSet or FormFieldSet),
 * and conditionally a flag to indicate when FormFieldSet is used
 */
export type RadioButtonGroupProps<TData> =
  | (InternalRadioButtonGroupProps & FieldSetProps)
  | (PropsForGroupInForm<TData> & FormFieldSetProps<TData>);

/**
 * Component for displaying a group of related RadioButtons.
 * Renders the radio button group in a FieldSet by default, or FormFieldSet
 * if FormFieldSetProps is provided as type param
 */
export const RadioButtonGroup = <TData extends {}>({
  options,
  defaultSelectedItemId,
  inForm,
  inputName,
  ...props
}: RadioButtonGroupProps<TData>) => {
  const [selectedItemId, setSelectedItemId] = useState(defaultSelectedItemId);

  if (inForm) {
    const formFieldSetProps = (props as unknown) as FormFieldSetProps<TData>;
    const _options = options as RadioOptionInForm<TData>[];
    return (
      <FormFieldSet {...formFieldSetProps}>
        {_options.map(({ expansion, ...optionProps }) => {
          const { id, parseOnChangeEvent } = optionProps;
          return (
            <span key={id}>
              <FormField<TData, RadioButtonProps, any>
                {...optionProps}
                name={inputName}
                parseOnChangeEvent={(e, dataDriller) => {
                  setSelectedItemId(id);
                  return parseOnChangeEvent ? parseOnChangeEvent(e, dataDriller) : e;
                }}
                defaultValue={id === selectedItemId}
                inputComponent={RadioButton}
              />
              {expansion && selectedItemId === id && (
                <div className="oec-itemchooser-expansion">{expansion}</div>
              )}
            </span>
          );
        })}
      </FormFieldSet>
    );
  }

  const fieldSetProps = (props as unknown) as FieldSetProps;
  const _options = options as RadioOption[];
  return (
    <FieldSet {...fieldSetProps}>
      {_options.map(({ expansion, ...optionProps }) => {
        const { id, onChange } = optionProps;
        return (
          <span key={id}>
            <RadioButton
              {...optionProps}
              name={inputName}
              onChange={(e) => {
                setSelectedItemId(e.target.value);
                onChange(e);
              }}
              defaultValue={id === selectedItemId}
            />
            {expansion && selectedItemId === id && (
              <div className="oec-itemchooser-expansion">{expansion}</div>
            )}
          </span>
        );
      })}
    </FieldSet>
  );
};
