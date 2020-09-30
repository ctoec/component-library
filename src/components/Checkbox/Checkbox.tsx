import React, { InputHTMLAttributes } from 'react';
import cx from 'classnames';

export type CheckboxProps = {
  id: string;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  defaultValue?: boolean;
  className?: string;
  disabled?: boolean;
  // Needs a value if it's not in a checkbox group
  value?: string | undefined;
  name?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'defaultValue'>;

/**
 * Component that wraps a native checkbox input element
 */
export function Checkbox({
  id,
  text,
  onChange,
  value,
  defaultValue,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <div className={cx('usa-checkbox', className)}>
      <input
        className="usa-checkbox__input"
        id={id}
        value={value}
        type="checkbox"
        defaultChecked={defaultValue}
        onChange={onChange}
        disabled={!!disabled}
        {...props}
      />
      <label className="usa-checkbox__label" htmlFor={id}>
        {text}
      </label>
    </div>
  );
}
