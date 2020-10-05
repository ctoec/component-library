import React from 'react';
import { Button } from '..';
import { ButtonProps } from '../Button/Button';

export type FormSumbitButtonProps = {
  text?: string;
} & Pick<ButtonProps, Exclude<keyof ButtonProps, 'text'>>;

/**
 * Component for adding a form submit button,
 * to be used with generic Form
 * @param props
 */
export const FormSubmitButton: React.FC<FormSumbitButtonProps> = ({
  text = 'Submit',
  ...props
}) => {
  return <Button {...props} text={text} onClick="submit" />;
};
