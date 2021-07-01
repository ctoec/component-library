import React, { useState, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import closeIcon from 'uswds/src/img/close.svg';
import { HeaderNavigation, HeaderMenuItem, HeaderMenu } from 'carbon-components-react';

export type HeaderProps = {
  primaryTitle: string;
  secondaryTitle?: string;
  navItems: HeaderItemProps[];
  loginPath?: string;
  logoutPath?: string;
  userFirstName?: string;
};

export type HeaderItemProps = {
  label: string;
  href?: string;
  dropdownItems?: ({ label: string; path: string; target?: string; })[];
}

const isActiveNavItem = function (
  item: HeaderItemProps,
  path: string
) {
    return !!matchPath(path, { path: item.href });
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

  useEffect(() => {
    hideMenu();
  }, [location]);

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
            <div className="usa-nav__secondary usa-nav__secondary--extended">
              <div className="usa-nav__secondary-links">
                <HeaderNavigation>
                  {navItems.map((item, index) =>
                    item.dropdownItems ? (
                      <HeaderMenu menuLinkName={item.label} key={index}>
                        {item.dropdownItems.map((dropdown, dropIdx) => (
                          <HeaderMenuItem
                            href={dropdown.path}
                            target={dropdown.target}
                            key={index.toString + '-' + dropIdx.toString()}
                          >
                            {dropdown.label}
                          </HeaderMenuItem>
                        ))}
                      </HeaderMenu>
                    ) : (
                      <HeaderMenuItem href={item.href} key={index}>
                        <span className={
                          cx("", isActiveNavItem(item, location.pathname) ? "active-page" : "")
                        }>
                          {item.label}</span>
                      </HeaderMenuItem>
                    )
                  )}
                  {userFirstName && (
                    <HeaderMenuItem href={logoutPath}>
                      Log out
                    </HeaderMenuItem>
                  )}
                </HeaderNavigation>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
