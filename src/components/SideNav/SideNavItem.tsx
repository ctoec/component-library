import React from 'react';
import cx from 'classnames';
import { Button } from '..';

export type SideNavItemProps = {
  title: string | JSX.Element;
  description: string;
  onClick?: () => any;
  content: JSX.Element;
};

type InternalSideNavItemProps = SideNavItemProps & {
  active: boolean;
  onClick: () => any;
};

export const SideNavItem = ({
  title,
  description,
  active,
  onClick,
}: InternalSideNavItemProps) => {
  return (
    <li className={cx('oec-sidenav__item', { active })}>
      <Button
        onClick={onClick}
        appearance="unstyled"
        text={
          <div>
            <p className="oec-sidenav-item__title">
              {title}
            </p>
            <p className="oec-sidenav-item__desc">{description}</p>
          </div>
        }
      ></Button>
    </li>
  );
};
