import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

export type NavLinkType = 'primary' | 'secondary';

export type NavLinkProps = {
  text: string;
  path: string;
  type: NavLinkType;
  active?: boolean;
  attentionNeeded?: boolean;
  target?: string;
  external?: boolean;
  children?: never;
};

export function NavLink({
  text,
  path,
  type,
  active = false,
  attentionNeeded = false,
  target,
  external,
}: NavLinkProps) {
  const commonLinkProps = {
    className: cx('usa-nav__link', { 'usa-current': active }),
    to: path,
    target,
  };

  let LinkEl: React.FC = ({ children }) => (
    <Link {...commonLinkProps}>{children}</Link>
  );

  if (external) {
    LinkEl = ({ children }) => (
      <a
        href={commonLinkProps.to}
        {...commonLinkProps}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  switch (type) {
    case 'primary':
      return (
        <li className="usa-nav__primary-item">
          <LinkEl>
            <span>
              {text}
              {attentionNeeded && (
                <span className="attention-needed">
                  &nbsp;&bull;
                  <span className="usa-sr-only"> (attention needed)</span>
                </span>
              )}
            </span>
          </LinkEl>
        </li>
      );
    case 'secondary':
      return (
        <li className="usa-nav__secondary-item">
          <LinkEl>{text}</LinkEl>
        </li>
      );
  }
}
