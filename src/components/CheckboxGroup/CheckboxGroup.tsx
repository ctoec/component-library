import React, { useState } from 'react';
import { FieldSetProps, FieldSet } from '../FieldSet/FieldSet';
import { FormField, FormFieldProps } from '../Form';
import { FormFieldSetProps, FormFieldSet } from '../Form/FormFieldSet';
import { Checkbox, SingleCheckbox } from '../Checkbox/Checkbox';

export type CheckboxInGroup = SingleCheckbox & {
  expansion?: React.ReactNode;
};

export type CheckboxOptionInForm<TData> = Omit<FormFieldProps<TData, CheckboxInGroup, any>, 'inputComponent' | 'onChange'>;

/**
 * Props for InternalCheckboxGroup
 */
type InternalCheckboxGroupProps = {
  options: CheckboxInGroup[];
  inForm?: boolean;
  defaultSelectedItemsIds?: string | string[];
};

type PropsForGroupInForm<TData> = {
  options: CheckboxOptionInForm<TData>[];
  inForm: true;
};

/**
 * Props for CheckboxGroup, which includes props for InternalCheckboxGroup,
 * props for the wrapping field set(FieldSet or FormFieldSet),
 * and conditionally a flag to indicate when FormFieldSet is used
 */
export type CheckboxGroupProps<TData> =
  | (InternalCheckboxGroupProps & FieldSetProps)
  | (InternalCheckboxGroupProps &
    (PropsForGroupInForm<TData> & FormFieldSetProps<TData>));

/**
 * Component for displaying a group of related Checkboxs.
 * Renders the radio button group in a FieldSet by default, or FormFieldSet
 * if FormFieldSetProps is provided as type param
 */
export const CheckboxGroup = <TData extends {}>({
  options,
  defaultSelectedItemsIds,
  inForm,
  ...props
}: CheckboxGroupProps<TData>) => {
  const selectedItemsOnInput = Array.isArray(defaultSelectedItemsIds)
    ? defaultSelectedItemsIds
    : [defaultSelectedItemsIds];
  const [selectedItems, setSelectedItems] = useState(selectedItemsOnInput);

  const internalOnChange = (value: string) => setSelectedItems((items) => {
    if (items.includes(value)) {
      return items.filter((i) => i !== value);
    }
    return [...items, value];
  });

  if (inForm) {
    const formFieldSetProps = (props as unknown) as FormFieldSetProps<TData>;
    return (
      <FormFieldSet {...formFieldSetProps}>
        {options.map((optionProps) => {
          const _optionProps = (optionProps as unknown) as CheckboxOptionInForm<
            TData
          >;
          const { id, parseOnChangeEvent, expansion } = _optionProps;
          const selected = selectedItems.includes(id)
          return (
            <span key={id}>
              <FormField<TData, SingleCheckbox, any>
                {..._optionProps}
                parseOnChangeEvent={(e, dataDriller) => {
                  internalOnChange(id);
                  parseOnChangeEvent && parseOnChangeEvent(e, dataDriller);
                }}
                defaultValue={selected}
                inputComponent={Checkbox}
              />
              {expansion && selected && (
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
        const selected = selectedItems.includes(id)
        return (
          <span key={id}>
            <Checkbox
              {...optionProps}
              onChange={(e) => {
                internalOnChange(id);
                onChange(e);
              }}
              defaultValue={selected}
            />
            {expansion && selected && (
              <div className="oec-itemchooser-expansion">{expansion}</div>
            )}
          </span>
        );
      })}
    </FieldSet>
  );
};
