import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { SideNavItem, SideNavItemProps } from './SideNavItem';

export type SideNavProps = {
  items: SideNavItemProps[];
  activeItemId?: string;
};

export const SideNav: React.FC<SideNavProps> = ({
  items,
  activeItemId,
  children,
}) => {
  const [activeId, setActiveId] = useState(activeItemId);

  useEffect(() => {
    setActiveId(activeItemId);
  }, [activeItemId]);

  return (
    <div className="oec-sidenav grid-row">
      <div className="mobile-lg:grid-col-4">
        <nav>
          <ul>
            {items.map((item) => {
              const _onClick = () => {
                setActiveId(item.id);
                item.onClick && item.onClick();
              };
              return (
                <SideNavItem
                  {...item}
                  key={item.id}
                  onClick={_onClick}
                  active={item.id === activeId}
                />
              );
            })}
          </ul>
        </nav>
      </div>
      <div
        className={cx(
          'oec-sidenav__content',
          { 'mobile-lg:grid-col-8': items.length > 0 },
          { 'mobile-lg:grid-col-12': items.length === 0 }
        )}
      >
        {children ||
          (activeId && items.find((i) => i.id === activeId)?.content)}
      </div>
    </div>
  );
};
