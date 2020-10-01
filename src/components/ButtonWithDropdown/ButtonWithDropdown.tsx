import React from 'react';
import cx from 'classnames';
import { Button, ButtonProps } from '../Button/Button';
import { useDropdown, DropdownOptions } from '../../hooks';
import { Link } from 'react-router-dom';

export type ButtonOptionProps = {
  text: string;
  value: string;
};

export type ButtonWithDropdownProps = ButtonProps & {
  id: string;
  className?: string;
  dropdownElement: JSX.Element;
} & Omit<DropdownOptions, 'optionRender'>;

export const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = ({
  id,
  className,
  appearance,
  text,
  dropdownElement,
  options,
  optionsProps,
}) => {
  const { dropdownContainer, changeVisibility } = useDropdown({
    options,
    optionsProps,
    optionRender: (props) => (
      <Link to={props.value} {...props}>
        {props.text}
      </Link>
    ),
  });
  return (
    <div
      id={id}
      className={cx(
        'button-container',
        { 'container--button-unstyled': appearance === 'unstyled' },
        className
      )}
    >
      <Button
        aria-haspopup="true"
        className="with-dropdown"
        appearance={appearance}
        text={
          <>
            {text}
            <span>&nbsp;</span>
            {dropdownElement}
          </>
        }
        onClick={changeVisibility}
      />
      {dropdownContainer}
    </div>
  );
};
