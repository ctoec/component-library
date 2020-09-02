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
  rel?: string;
  children?: never;
};

export function NavLink({
  text,
  path,
  type,
  active = false,
  attentionNeeded = false,
  target,
  rel,
}: NavLinkProps) {
  const commonLinkProps = {
    className: cx('usa-nav__link', { 'usa-current': active }),
    to: path,
    target,
    rel,
  };
  switch (type) {
    case 'primary':
      return (
        <li className="usa-nav__primary-item">
          <Link {...commonLinkProps}>
            <span>
              {text}
              {attentionNeeded && (
                <span className="attention-needed">
                  &nbsp;&bull;
                  <span className="usa-sr-only"> (attention needed)</span>
                </span>
              )}
            </span>
          </Link>
        </li>
      );
    case 'secondary':
      return (
        <li className="usa-nav__secondary-item">
          <Link {...commonLinkProps}>{text}</Link>
        </li>
      );
  }
}
