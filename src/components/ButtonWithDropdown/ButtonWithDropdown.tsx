import React from 'react';
import cx from 'classnames';
import { Button, ButtonProps } from '../Button/Button';
import { useHideOnLostFocus } from '../../hooks';
import { AngleArrowDown } from '../../assets/images';

export type ButtonWithDropdownProps = {
  id: string;
  // Buttons all the way down
  options: Omit<ButtonProps, 'appearance'>[];
} & Omit<ButtonProps, 'onClick' | 'href' | 'external'>;

export const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = ({
  id,
  options,
  text,
  ...props
}) => {
  const { isComponentVisible, setIsComponentVisible } = useHideOnLostFocus<
    HTMLDivElement
  >();

  const getOnClick = (optionOnClick?: () => any) => {
    return () => {
      setIsComponentVisible(false);
      if (optionOnClick) optionOnClick();
    }
  }

  return (
    <div
      id={id}
      className="oec-drop-button"
    >
      <Button
        aria-haspopup="true"
        text={
          <span>
            {text}
            <span>&nbsp;</span>
            <AngleArrowDown />
          </span>
        }
        onClick={() => setIsComponentVisible(v => !v)}
        {...props}
      />
      {isComponentVisible &&
        <ul aria-expanded={isComponentVisible}>
          {options.map(o => (
            <li><Button {...o} appearance="unstyled" onClick={getOnClick(o.onClick)} /></li>
          ))}
        </ul>
      }
    </div>
  );
};
