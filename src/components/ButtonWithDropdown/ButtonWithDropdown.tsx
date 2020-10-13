import React from 'react';
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
  const { ref, isComponentVisible, setIsComponentVisible } = useHideOnLostFocus<
    HTMLDivElement
  >();

  const getOnClick = (optionOnClick?: (_event: any) => any) => {
    return (_event: any) => {
      setIsComponentVisible(false);
      if (optionOnClick) optionOnClick(_event);
    };
  };

  return (
    <div
      // Clicking outside this div will hide the ul
      ref={ref}
      id={id}
      className="oec-drop-button"
    >
      <Button
        aria-haspopup="true"
        aria-expanded={isComponentVisible}
        text={
          <span>
            {text}
            <span>&nbsp;</span>
            <AngleArrowDown />
          </span>
        }
        onClick={() => setIsComponentVisible((v) => !v)}
        {...props}
      />
      {isComponentVisible && (
        <ul>
          {options.map((o) => (
            <li>
              <Button
                {...o}
                appearance="unstyled"
                onClick={getOnClick(o.onClick)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
