import React, { useState } from 'react';
import { FieldSetProps, FieldSet } from '../FieldSet/FieldSet';
import { FormField, FormFieldProps } from '../Form';
import { FormFieldSetProps, FormFieldSet } from '../Form/FormFieldSet';
import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton';

export type RadioOption = RadioButtonProps & {
  expansion?: React.ReactNode;
};

export type RadioOptionInForm<TData> = Omit<FormFieldProps<TData, RadioOption, any>, 'inputComponent' | 'onChange'>;

/**
 * Props for InternalRadioButtonGroup
 */
type InternalRadioButtonGroupProps = {
  options: RadioOption[];
  inForm?: boolean;
  defaultSelectedItemId?: string;
};

type PropsForGroupInForm<TData> = {
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
  | (InternalRadioButtonGroupProps &
    (PropsForGroupInForm<TData> & FormFieldSetProps<TData>));

/**
 * Component for displaying a group of related RadioButtons.
 * Renders the radio button group in a FieldSet by default, or FormFieldSet
 * if FormFieldSetProps is provided as type param
 */
export const RadioButtonGroup = <TData extends {}>({
  options,
  defaultSelectedItemId,
  inForm,
  ...props
}: RadioButtonGroupProps<TData>) => {
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItemId);

  if (inForm) {
    const formFieldSetProps = (props as unknown) as FormFieldSetProps<TData>;
    return (
      <FormFieldSet {...formFieldSetProps}>
        {options.map((optionProps) => {
          const _optionProps = (optionProps as unknown) as RadioOptionInForm<
            TData
          >;
          const { id, parseOnChangeEvent, expansion } = _optionProps;
          return (
            <span key={id}>
              <FormField<TData, RadioButtonProps, any>
                {..._optionProps}
                parseOnChangeEvent={(e, dataDriller) => {
                  setSelectedItem(e.target.value);
                  parseOnChangeEvent && parseOnChangeEvent(e, dataDriller);
                }}
                selected={id === selectedItem}
                inputComponent={RadioButton}
              />
              {expansion && selectedItem === id && (
                <div className="oec-itemchooser-expansion">{expansion}</div>
              )}
            </span>
          );
        })}
      </FormFieldSet>
    );
  }

  const fieldSetProps = (props as unknown) as FieldSetProps;
  return (
    <FieldSet {...fieldSetProps}>
      {options.map((optionProps) => {
        const { id, onChange, expansion } = optionProps;
        return (
          <span key={id}>
            <RadioButton
              {...optionProps}
              onChange={(e) => {
                setSelectedItem(e.target.value);
                onChange(e);
              }}
              selected={id === selectedItem}
            />
            {expansion && selectedItem === id && (
              <div className="oec-itemchooser-expansion">{expansion}</div>
            )}
          </span>
        );
      })}
    </FieldSet>
  );
};
