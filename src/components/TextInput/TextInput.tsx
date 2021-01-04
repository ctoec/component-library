import React, { useState } from 'react';
import cx from 'classnames';
import { FormStatus, FormStatusProps } from '..';

export type TextInputProps =
  | TextInputHTMLInputElementProps
  | TextInlineInputHTMLInputElementProps
  | TextInputHTMLTextAreaElementProps;

type InternalTextInputProps = {
  name?: string;
  label: string | JSX.Element;
  id: string;
  // If you want a controlled component, pass it the value
  // Otherwise just pass a defaultValue or nothing
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  status?: FormStatusProps;
  small?: boolean;
  optional?: boolean;
  hideOptionalText?: boolean;
  // You might want to hide the text if it's in a fieldset that is optional, like in the date input component
  srOnlyLabel?: boolean;
  className?: string;
  inline?: boolean;
  beforeContent?: string | JSX.Element;
  afterContent?: string | JSX.Element;
};

export type TextInputHTMLInputElementProps = InternalTextInputProps & {
  type?: 'input';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  inputProps?: React.HTMLProps<HTMLInputElement>;
};

export type TextInlineInputHTMLInputElementProps = InternalTextInputProps & {
  type: 'inline-input';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  inputProps?: React.HTMLProps<HTMLInputElement>;
};

export type TextInputHTMLTextAreaElementProps = InternalTextInputProps & {
  type: 'textarea';
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => any;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => any;
  inputProps?: React.HTMLProps<HTMLTextAreaElement> & { inputMode: 'text' } & {
    type: 'textarea';
  };
};

export function TextInput({
  type = 'input',
  name,
  label,
  onChange: inputOnChange,
  onBlur,
  id,
  value,
  defaultValue,
  disabled,
  status,
  small,
  optional,
  hideOptionalText,
  srOnlyLabel,
  className,
  inputProps,
  inline,
  beforeContent,
  afterContent,
}:
  | TextInputHTMLInputElementProps
  | TextInlineInputHTMLInputElementProps
  | TextInputHTMLTextAreaElementProps) {
  const [_value, updateValue] = useState(defaultValue);
  const onChange = (e: any) => {
    inputOnChange(e);
    if (!value) {
      // If there isn't an input value, then this component should manage its own value
      updateValue(e.target.value);
    }
  };

  const commonProps = {
    id,
    name,
    disabled,
    defaultValue,
    // Use the value if one is passed in; otherwise this manages its own state
    value: value || _value || '',
    'aria-describedby': status ? status.id : undefined,
    'aria-invalid': status && status.type === 'error',
    // Using aria-required to avoid default Chrome behavior
    'aria-required': !optional,
  };

  let inputElement;
  switch (type) {
    case 'textarea':
      inputElement = (
        <textarea
          className={cx('usa-textarea')}
          onChange={
            onChange as (_: React.ChangeEvent<HTMLTextAreaElement>) => any
          }
          onBlur={onBlur as (_: React.FocusEvent<HTMLTextAreaElement>) => any}
          aria-describedby={status ? status.id : undefined}
          aria-invalid={status && status.type === 'error'}
          {...commonProps}
          {...(inputProps as React.HTMLProps<HTMLTextAreaElement>)}
        />
      );
      break;
    case 'inline-input':
      // For when the input needs additional context in addition to its label
      // i.e. "[input box] number of children"
      inputElement = (
        <>
          {beforeContent && (
            <span className="display-inline-flex padding-right-1">
              {beforeContent}
            </span>
          )}
          <input
            className={cx(
              'usa-input',
              'display-inline-flex',
              {
                [`usa-input--${status && status.type}`]: status,
              },
              {
                'usa-input--small': small,
              },
              {
                'usa-input--inline': inline,
              }
            )}
            type="text"
            onChange={
              onChange as (_: React.ChangeEvent<HTMLInputElement>) => any
            }
            onBlur={onChange as (_: React.ChangeEvent<HTMLInputElement>) => any}
            {...commonProps}
            {...(inputProps as React.HTMLProps<HTMLInputElement>)}
          />
          {afterContent && (
            <span className="display-inline-flex padding-left-1">
              {afterContent}
            </span>
          )}
        </>
      );
      break;
    case 'input':
    default:
      inputElement = (
        <input
          className={cx(
            'usa-input',
            'oec-text-input',
            {
              [`usa-input--${status && status.type}`]: status,
            },
            {
              'usa-input--small': small,
            },
            {
              'usa-input--inline': inline,
            }
          )}
          type="text"
          onChange={onChange as (_: React.ChangeEvent<HTMLInputElement>) => any}
          onBlur={onBlur as (_: React.FocusEvent<HTMLInputElement>) => any}
          {...commonProps}
          {...(inputProps as React.HTMLProps<HTMLInputElement>)}
        />
      );
  }

  return (
    <div
      className={`${className || ''} usa-form-group${
        status ? ` usa-form-group--${status.type}` : ''
      }`}
    >
      <label
        className={cx('usa-label', status ? `usa-label--${status.type}` : '', {
          'usa-sr-only': srOnlyLabel,
        })}
        htmlFor={id}
      >
        {label}{' '}
        {optional && !hideOptionalText && (
          <span className="usa-hint">&nbsp;(optional)</span>
        )}
      </label>
      {status && status.message && <FormStatus {...status} />}
      {inputElement}
    </div>
  );
}
