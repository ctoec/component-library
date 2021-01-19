import React from 'react';
// import { Link } from 'react-router-dom';
import {
  Button as CarbonButton,
  Link as CarbonLink,
} from 'carbon-components-react';

export type ButtonAppearance =
  | 'default'
  | 'base'
  | 'secondary'
  | 'unstyled'
  | 'outline';

export type BaseButtonProps = {
  href?: string;
  external?: boolean;
  appearance?: ButtonAppearance;
  disabled?: boolean;
  className?: string;
};

export type ButtonProps = BaseButtonProps &
  React.HTMLProps<HTMLButtonElement | HTMLAnchorElement> & {
    text: string | JSX.Element;
    onClick?: (e: any) => any;
  };

export type SubmitButtonProps = BaseButtonProps & {
  text: string;
  onClick?: 'submit';
  title?: string;
};

export function Button({
  text,
  onClick,
  href,
  appearance,
  disabled,
  className,
  title,
}: ButtonProps | SubmitButtonProps) {
  const classString =
    'usa-button' +
    (appearance && appearance !== 'default'
      ? ' usa-button--' + appearance
      : '') +
    (className ? ' ' + className : '');

  if (onClick === 'submit') {
    return (
      <CarbonButton type="submit" className={classString}>
        {text}
      </CarbonButton>
    );
  }
  onClick = typeof onClick === 'function' ? onClick : () => {};

  if (href) {
    return (
			<CarbonLink
        href={href}
        className={classString}
        onClick={onClick}
        title={title}
      >
        {text}
      </CarbonLink>
    );
  }

  return (
    <CarbonButton
      className={classString}
      disabled={disabled}
      onClick={onClick}
      type="button"
      title={title}
    >
      {text}
    </CarbonButton>
  );
}
