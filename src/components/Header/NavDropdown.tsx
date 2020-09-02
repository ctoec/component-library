import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { useHideOnLostFocus } from '../../hooks';
import { NavLinkType } from './NavLink';

export type NavDropdownLinkProps = {
  text: string;
  path: string;
  target?: string;
  rel?: string;
  renderer?: never;
};

export type NavDropdownRendererProps = {
  text: string;
  renderer: (_: any) => JSX.Element;
};

export type NavDropdownProps = {
  id: string;
  text: string;
  children: (NavDropdownRendererProps | NavDropdownLinkProps)[];
  type: NavLinkType;
  active?: boolean;
  path?: never;
};

const defaultRenderer = (props: NavDropdownLinkProps) => (
  <Link to={props.path} {...props}>
    {props.text}
  </Link>
);

export function NavDropdown({
  id,
  text,
  children = [],
  type = 'primary',
  active = false,
}: NavDropdownProps) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useHideOnLostFocus();

  return (
    <li className={`usa-nav__${type}-item`} key={id}>
      <span id={text} className="display-inline-block with-dropdown" ref={ref}>
        <button
          aria-expanded={isComponentVisible}
          aria-controls={id}
          aria-haspopup="true"
          className={'usa-nav__link' + (active ? ' usa-current' : '')}
          onClick={() => setIsComponentVisible((s) => !s)}
        >
          {text}
        </button>
        <div
          className={cx({ 'display-none': !isComponentVisible }, 'dropdown')}
        >
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
