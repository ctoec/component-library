import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DropDownNavItemProps, DropDownNavItem } from '../Header/DropDownNavItem';
import cx from 'classnames';

export type SimpleHeaderProps = {
  primaryTitle: string;
  secondaryTitle?: string;
  navItems: DropDownNavItemProps[];
  loginPath?: string;
  logoutPath?: string;
  userFirstName?: string;
};

const setActiveStateOfNavItem = function (
  item: DropDownNavItemProps,
  index: number,
  path: string
) {
  let active: boolean;

  if (index === 0 && path === '/') {
    // By convention, the first section should be active when at the root path
    active = true;
  } else {
    active = !!matchPath(path, { path: item.path });
  }

  return { ...item, active };
};

const SimpleHeaderWithoutRouter: React.FC<
  SimpleHeaderProps & RouteComponentProps
> = ({
  primaryTitle,
  secondaryTitle,
  navItems,
  logoutPath = '/logout',
  userFirstName,
  location,
}) => {
    const [previousFocusedItem, setPreviousFocusedItem] = useState<
      HTMLElement | undefined
    >();
    const [currentFocusedItem, setCurrentFocusedItem] = useState<
      HTMLElement | undefined
    >();
    const [activeItem, setActiveItem] = useState<HTMLElement | undefined>();

    useEffect(() => {
      // Update active item when tabing through top-level of navigation
      // If tabbing through dropdown, we don't want to update the active element
      if (
        !currentFocusedItem ||
        currentFocusedItem.parentElement?.nodeName !== 'LI'
      ) {
        setActiveItem(currentFocusedItem);
      }
    }, [previousFocusedItem, currentFocusedItem]);

    const processedNavItems = navItems.map((item, index) =>
      setActiveStateOfNavItem(item, index, location.pathname)
    );

    return (
      <div>
        <header
          className={cx(
            'usa-header',
            'usa-header--extended',
            'usa-header--oec-default'
          )}
          role="banner"
        >
          <div className={cx('usa-navbar')}>
            <div className={cx('usa-logo')} id="extended-logo">
              <Link to="/" aria-label={`${primaryTitle} home`}>
                <div
                  className={cx(
                    'usa-logo__text',
                    'display-flex',
                    'flex-align-center'
                  )}
                >
                  <div>
                    <div
                      className={cx('primary-title', {
                        'primary-title--only': !secondaryTitle,
                      })}
                    >
                      {primaryTitle}
                    </div>
                    {secondaryTitle && (
                      <div className="secondary-title">{secondaryTitle}</div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <nav className={cx('usa-nav')}>
            <div className={cx('usa-nav__inner')}>
              <div
                className={cx(
                  'usa-nav__secondary',
                  'usa-nav__secondary--centered',
                  'usa-accordion'
                )}
              >
                <ul className={cx('usa-nav__secondary-links')}>
                  {processedNavItems.map((item, index) => (
                    <DropDownNavItem
                      key={index}
                      {...item}
                      previousFocusedItem={previousFocusedItem}
                      setPreviousFocusedItem={setPreviousFocusedItem}
                      currentFocusedItem={currentFocusedItem}
                      setCurrentFocusedItem={setCurrentFocusedItem}
                      showDropdown={
                        activeItem ? activeItem.id === item.id : false
                      }
                    />
                  ))}
                  {userFirstName && (
                    <DropDownNavItem
                      id="logout"
                      title="Log out"
                      path={logoutPath}
                      previousFocusedItem={previousFocusedItem}
                      setPreviousFocusedItem={setPreviousFocusedItem}
                      currentFocusedItem={currentFocusedItem}
                      setCurrentFocusedItem={setCurrentFocusedItem}
                      showDropdown={false}
                    />
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  };

export const SimpleHeader = withRouter(SimpleHeaderWithoutRouter);
