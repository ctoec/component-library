import React, { PropsWithChildren } from 'react';
import { FormContext, useGenericContext } from './FormContext';
import { FieldSetProps, FieldSet } from '../FieldSet/FieldSet';
import { FieldSetStatusFunc } from './FormStatusFunc';

export type FormFieldSetProps<TData> = {
  status?: FieldSetStatusFunc<TData>;
} & Pick<FieldSetProps, Exclude<keyof FieldSetProps, 'status'>>;

/**
 * Generic fieldset component for use within a Form.
 * FormFieldSet has an optional status function, which
 * determines fieldset status based on the form data,
 * to which this FormFieldSet has access via the FormContext.
 */
export const FormFieldSet = <TData extends object>({
  status = () => undefined,
  children,
  ...props
}: PropsWithChildren<FormFieldSetProps<TData>>) => {
  const { data } = useGenericContext<TData>(FormContext);

  return (
    <FieldSet status={status(data)} {...props}>
      {children}
    </FieldSet>
  );
};
