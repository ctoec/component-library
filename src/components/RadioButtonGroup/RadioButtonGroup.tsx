import React, { useState } from 'react';
import { FieldSetProps, FieldSet } from '../FieldSet/FieldSet';
import { FormFieldSetProps, FormFieldSet } from '../Form/FormFieldSet';
import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton';

export type RadioOption = RadioButtonProps & {
  render: (props: RadioButtonProps) => JSX.Element;
  expansion?: React.ReactNode;
};

/**
 * Props for InternalRadioButtonGroup
 */
type InternalRadioButtonGroupProps = {
  options: RadioOption[];
  defaultValue?: string;
  useFormFieldSet?: boolean;
};

/**
 * Props for RadioButtonGroup, which includes props for InternalRadioButtonGroup,
 * props for the wrapping field set(FieldSet or FormFieldSet),
 * and conditionally a flag to indicate when FormFieldSet is used
 */
export type RadioButtonGroupProps<
  TFieldSetProps extends FieldSetProps | FormFieldSetProps<any> = FieldSetProps
> = InternalRadioButtonGroupProps &
  (TFieldSetProps extends FormFieldSetProps<infer T>
    ? { useFormFieldSet: true } & FormFieldSetProps<T>
    : FieldSetProps);

/**
 * Component for displaying a group of related RadioButtons.
 * Renders the radio button group in a FieldSet by default, or FormFieldSet
 * if FormFieldSetProps is provided as type param
 */
export const RadioButtonGroup = <
  TFormFieldSetProps extends
    | FieldSetProps
    | FormFieldSetProps<any> = FieldSetProps
>(
  props: RadioButtonGroupProps<TFormFieldSetProps>
) => {
  const radioButtonGroupProps = props as InternalRadioButtonGroupProps;
  const { useFormFieldSet } = props;

  if (useFormFieldSet) {
    const formFieldSetProps = (props as unknown) as FormFieldSetProps<any>;
    return (
      <FormFieldSet {...formFieldSetProps}>
        <InternalRadioButtonGroup {...radioButtonGroupProps} />
      </FormFieldSet>
    );
  }

  const fieldSetProps = (props as unknown) as FieldSetProps;
  return (
    <FieldSet {...fieldSetProps}>
      <InternalRadioButtonGroup {...radioButtonGroupProps} />
    </FieldSet>
  );
};
/**
 * Internal component for managing a group of related RadioButtons
 *
 * When the radio group maps to a single field, and each button representes
 * a value for that field that is handled the same way, a group-level
 * onChange function can be defined. It will be passed into each RadioButton.
 * (Especially useful when creating a RadioButtonGroup FormField, where onChange
 * is created & defined behind the scenes by FormField)
 *
 * For more complex use cases, the group-level onChange can be omitted and/or
 * overwritten by a per-button onChange defined in the RadioButtonOption
 * render func. Make sure to provide onChange prop after spread props to overwrite
 * props.onChange :
 * 	{
 * 		render: (props) => <RadioButton {...props} onChange={thisButtonOnChange} />
 * 		...
 * 	}
 */
const InternalRadioButtonGroup: React.FC<InternalRadioButtonGroupProps> = ({
  options,
  defaultValue = '',
}) => {
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  return (
    <>
      {options.map((props) => {
        const { id, onChange, value, expansion } = props;
        return (
          <span key={id}>
            <RadioButton
              {...props}
              onChange={(e) => {
                setSelectedItem(e.target.value);
                onChange(e);
              }}
            />
            {expansion && selectedItem === value && (
              <div className="oec-itemchooser-expansion">{expansion}</div>
            )}
          </span>
        );
      })}
    </>
  );
};
