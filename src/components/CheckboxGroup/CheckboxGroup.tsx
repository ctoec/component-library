import React, { useState } from 'react';
import { FieldSetProps } from '..';
import { FormFieldSetProps, FormFieldSet } from '../Form';
import { FieldSet } from '../FieldSet/FieldSet';
import cx from 'classnames';
import { CheckboxProps, Checkbox } from '../Checkbox/Checkbox';

/**
 * Type for the values that will define
 * a single Checkbox option in the CheckboxGroup
 */
export type CheckboxOptionProps = Omit<CheckboxProps, 'onChange'> & {
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  expansion?: React.ReactNode;
};

/**
 * Props for InternalCheckboxGroup
 */
type InternalCheckboxGroupProps = {
  options: CheckboxOptionProps[];
  defaultValue?: string | string[];
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

/**
 * Props for CheckboxGroup, which includes props for InternalCheckboxGroup,
 * props for the wrapping field set (FieldSet or FormFieldSet),
 * and conditionally a flag to indicate which type of field set should be used
 */
export type CheckboxGroupProps<
  TFieldSetProps extends FieldSetProps | FormFieldSetProps<any>
> = InternalCheckboxGroupProps &
  (TFieldSetProps extends FormFieldSetProps<infer T>
    ? { useFormFieldSet: true } & FormFieldSetProps<T>
    : FieldSetProps);

/**
 * Component for displaying a group of related Checkboxes.
 * Renders the checkbox group inside a FieldSet by default, or FormFieldSet
 * if FormFieldSetProps is provided as type param
 */
export const CheckboxGroup = <
  TFieldSetProps extends FieldSetProps | FormFieldSetProps<any> = FieldSetProps
>({
  id,
  childrenGroupClassName,
  ...props
}: CheckboxGroupProps<TFieldSetProps>) => {
  const checkboxGroupProps = { ...props } as InternalCheckboxGroupProps;

  const useFormFieldSet = ((props as unknown) as CheckboxGroupProps<
    FormFieldSetProps<any>
  >).useFormFieldSet;

  if (useFormFieldSet) {
    const formFieldSetProps = ({ ...props } as unknown) as FormFieldSetProps<
      any
    >;
    return (
      <FormFieldSet
        {...formFieldSetProps}
        id={`${id}-fieldset`}
        childrenGroupClassName={cx(childrenGroupClassName, 'margin-top-3')}
      >
        <InternalCheckboxGroup id={id} {...checkboxGroupProps} />
      </FormFieldSet>
    );
  }

  const fieldSetProps = ({ ...props } as unknown) as FieldSetProps;
  return (
    <FieldSet
      {...fieldSetProps}
      id={`${id}-fieldset`}
      childrenGroupClassName={cx(childrenGroupClassName, 'margin-top-3')}
    >
      <InternalCheckboxGroup id={id} {...checkboxGroupProps} />
    </FieldSet>
  );
};

/**
 * Internal component for managing a group of related Checkboxes
 *
 * When each checkbox maps to an individual field, per-checkbox onChange function
 * should be defined in the CheckboxOption render func. Make sure to provide onChange
 * prop after spread props to overwrite props.onChange:
 * 	{
 *		render: (props) => <Checkbox {...props} onChange={onChange} />
 * 		...
 * 	}
 *
 * For other cases where the checkbox group maps to a single field, and each checkbox
 * represents a value for that field that is handled in the same way, a group-level
 * onChange function can be defined. It will be passed in to each Checkbox.
 */
const InternalCheckboxGroup: React.FC<
  InternalCheckboxGroupProps & { id: string }
> = ({ id, options, onChange: groupOnChange = () => {}, defaultValue = [] }) => {
  const defaultSelectedItems = Array.isArray(defaultValue)
    ? defaultValue
		: [defaultValue];
		
	const [selectedItems, setSelectedItems] = useState(defaultSelectedItems);
	const manageInternalState = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked) {
			setSelectedItems((selected) => [...selected, event.target.value])
		} else {
			setSelectedItems((selected) => selected.filter((value) => value !== event.target.value))
		}
	}

	const _groupOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		groupOnChange(event);
		manageInternalState(event);
	}
	
  return (
    <span id={id}>
      {options.map(({ expansion, onChange, selected, value, ...props }) => {

				let _onChange = undefined;
				if(onChange) {
					_onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
						onChange(event);
						manageInternalState(event);
					}
				}
				const _selected = selected === undefined ? selectedItems.includes(value) : selected;

				return (
					<>
						<Checkbox
							onChange={_onChange || _groupOnChange}
							selected={_selected}
							value={value}
							{...props}
						/>
						{expansion && _selected && (
							<div className="oec-itemchooser-expansion">{expansion}</div>
						)}
					</>
      )})}
    </span>
  );
};
