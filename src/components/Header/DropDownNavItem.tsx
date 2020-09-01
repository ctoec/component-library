import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { useHideOnLostFocus } from '../../hooks';

export type NavDropdownOptionProps = {
  text: string;
  value: string;
  renderer?: (_: any) => JSX.Element;
};

export type DropDownNavItemProps = {
  id: string;
  title: string;
  children: NavDropdownOptionProps[];
  type: 'primary' | 'secondary';
  active?: boolean;
};

const defaultRenderer = (props: any) => (
  <Link to={props.value} {...props}>
    {props.text}
  </Link>
);

export function DropDownNavItem({
  id,
  title,
  children = [],
  type = 'primary',
  active = false,
}: DropDownNavItemProps) {
  const { ref, isComponentVisible, setIsComponentVisible } = useHideOnLostFocus();

  return (
    <li className={`usa-nav__${type}-item`} key={id}>
      <span id={title} className="display-inline-block with-dropdown" ref={ref}>
        <button
          aria-expanded={isComponentVisible}
          aria-controls={id}
          aria-haspopup="true"
          className={'usa-nav__link' + (active ? ' usa-current' : '')}
          onClick={() => setIsComponentVisible((s) => !s)}
        >
          {title}
        </button>
        <div className={cx({ 'display-none': !isComponentVisible }, 'dropdown')}>
          <ul id={id} hidden={!isComponentVisible}>
            {children.map((c, index) => (
              <li key={index} className="option">
                {c.renderer ? c.renderer(c) : defaultRenderer(c)}
              </li>
            ))}
          </ul>
        </div>
      </span>
    </li>
  );
}
