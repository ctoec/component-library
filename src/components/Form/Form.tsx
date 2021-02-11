import React, {
  FormHTMLAttributes,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import cx from 'classnames';
import { FormProvider } from './FormContext';
import { ObjectDriller, TObjectDriller } from './ObjectDriller';
import produce from 'immer';
import set from 'lodash/set';

export type FormProps<T> = {
  onSubmit: (_: T) => void;
  data: T;
  className?: string;
  hideStatus?: boolean;
} & /**
 * Creates a set of props that includes
 * all FormHTMLAttributes<HTMLFormElement> props, except onSubmit
 */ Pick<
  FormHTMLAttributes<HTMLFormElement>,
  Exclude<keyof FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>
>;

/**
 * Generic form component for updating an object of type T.
 * The form tracks state of the object, and requires the use of a
 * 'submit' button (should be a FormSubmitButton)
 */
export const Form = <T extends object>({
  className,
  onSubmit,
  data,
  hideStatus,
  children,
  ...props
}: PropsWithChildren<FormProps<T>>) => {
  const [_data, updateData] = useState(data);

  // If data prop changes, update the internal store as multiple forms can track the same data
  useEffect(() => {
    updateData(data);
  }, [data]);

  /**
   * onSubmit function to supply to the form. The form event
   * default is suppressed, and the Form component's onSubmit
   * function is called with the form data as an argument.
   * @param e FormEvent
   */
  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(_data);
  };

  const immutableUpdateData = <
    TField extends string | number | boolean | undefined
  >(
    fieldDriller: TObjectDriller<TField>,
    value: TField
  ) => {
    updateData(
      produce<T>(data, (draft) => set(draft, fieldDriller.path, value))
    );
  };

  return (
    <FormProvider
      value={{
        data: _data,
        dataDriller: new ObjectDriller(_data),
        updateData,
        immutableUpdateData,
        hideStatus,
      }}
    >
      <form
        className={cx('usa-form', className)}
        onSubmit={_onSubmit}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};
