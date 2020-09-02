import React, { useState, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { NavItem, NavItemProps } from './NavItem';
import closeIcon from 'uswds/src/img/close.svg';
import { DropDownNavItemProps, DropDownNavItem } from './DropDownNavItem';

export type HeaderProps = {
  primaryTitle: string;
  secondaryTitle?: string;
  navItems: (NavItemProps | DropDownNavItemProps)[];
  loginPath?: string;
  logoutPath?: string;
  userFirstName?: string;
};

const setActiveStateOfNavItem = function (
  item: NavItemProps | DropDownNavItemProps,
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

export const Header: React.FC<HeaderProps> = ({
  primaryTitle,
  secondaryTitle,
  navItems,
  logoutPath = '/logout',
  userFirstName,
}) => {
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const location = useLocation();

  function hideMenu() {
    setMobileMenuIsVisible(false);
  }
  useEffect(() => {
    window.addEventListener('resize', hideMenu);
    return function cleanup() {
      window.removeEventListener('resize', hideMenu);
    };
  }, []);

  const primaryNavItems = navItems
    .filter((item) => item.type === 'primary')
    .map((item, index) =>
      setActiveStateOfNavItem(item, index, location.pathname)
    );

  const secondaryNavItems = navItems.filter(
    (item) => item.type === 'secondary'
  );

  return (
    <div
      className={cx({
        'usa-js-mobile-nav--active': mobileMenuIsVisible,
      })}
    >
      <div
        data-testid="overlay"
        className={cx('usa-overlay', { 'is-visible': mobileMenuIsVisible })}
        onClick={hideMenu}
      ></div>
      <header
        className={cx(
          'usa-header',
          'usa-header--extended',
          'usa-header--oec-default'
        )}
        role="banner"
      >
        <div className="usa-navbar">
          <div className="usa-logo" id="extended-logo">
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
          <button
            className="usa-menu-btn"
            onClick={() => setMobileMenuIsVisible(!mobileMenuIsVisible)}
          >
            Menu
          </button>
        </div>
        <nav
          aria-label="Primary navigation"
          className={cx('usa-nav', { 'is-visible': mobileMenuIsVisible })}
        >
          <div className="usa-nav__inner">
            <button className="usa-nav__close" onClick={hideMenu}>
              <img src={closeIcon} alt="close" />
            </button>
            <ul className="usa-nav__primary usa-accordion">
              {primaryNavItems.map((item, index) =>
                item.children ? (
                  <DropDownNavItem {...item} key={index} />
                ) : (
                  <NavItem {...item} key={index} />
                )
              )}
            </ul>
            <div className="usa-nav__secondary usa-nav__secondary--extended">
              <ul className="usa-nav__secondary-links">
                {secondaryNavItems.map((item, index) =>
                  item.children ? (
                    <DropDownNavItem {...item} key={index} />
                  ) : (
                    <NavItem {...item} key={index} />
                  )
                )}
                {userFirstName && (
                  <NavItem type="secondary" title="Log out" path={logoutPath} />
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
