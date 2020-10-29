import React, { useState } from 'react';
import { FieldSetProps, FieldSet } from '../FieldSet/FieldSet';
import { FormField, FormFieldProps } from '../Form';
import { FormFieldSetProps, FormFieldSet } from '../Form/FormFieldSet';
import { Checkbox, SingleCheckbox } from '../Checkbox/Checkbox';

export type CheckboxInGroup = SingleCheckbox & {
  expansion?: React.ReactNode;
};

export type CheckboxOptionInForm<TData> = Omit<
  FormFieldProps<TData, CheckboxInGroup, any>,
  'inputComponent' | 'onChange'
>;

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
  defaultSelectedItemsIds?: string | string[];
};

/**
 * Props for CheckboxGroup, which includes props for InternalCheckboxGroup,
 * props for the wrapping field set(FieldSet or FormFieldSet),
 * and conditionally a flag to indicate when FormFieldSet is used
 */
export type CheckboxGroupProps<TData> =
  | (InternalCheckboxGroupProps & FieldSetProps)
  | (PropsForGroupInForm<TData> & FormFieldSetProps<TData>);

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

  const internalOnChange = (value: string) =>
    setSelectedItems((items) => {
      if (items.includes(value)) {
        return items.filter((i) => i !== value);
      }
      return [...items, value];
    });

  if (inForm) {
    const formFieldSetProps = (props as unknown) as FormFieldSetProps<TData>;
    const _options = options as CheckboxOptionInForm<TData>[];
    return (
      <FormFieldSet {...formFieldSetProps}>
        {_options.map(({ expansion, ...optionProps }) => {
          const { id, parseOnChangeEvent } = optionProps;
          const selected = selectedItems.includes(id);
          return (
            <span key={id}>
              <FormField<TData, SingleCheckbox, any>
                {...optionProps}
                parseOnChangeEvent={(e, dataDriller) => {
                  internalOnChange(id);
                  return parseOnChangeEvent
                    ? parseOnChangeEvent(e, dataDriller)
                    : e;
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
  const _options = options as CheckboxInGroup[];
  return (
    <FieldSet {...fieldSetProps}>
      {_options.map(({ expansion, ...optionProps }) => {
        const { id, onChange } = optionProps;
        const selected = selectedItems.includes(id);
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
