import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import { Header } from './Header';
import { NavItemProps } from './NavItem';
import { DropDownNavItemProps } from '../SimpleHeader/DropDownNavItem';

const defaultTitle = 'Hello world!';
const defaultName = 'Chris';
const defaultNavItems: NavItemProps[] = [
  { type: 'primary', title: 'Active section', path: '/' },
  { type: 'primary', title: 'Another section', path: '/another' },
  {
    type: 'primary',
    title: 'Attention needed',
    attentionNeeded: true,
    path: '/attention',
  },
  { type: 'secondary', title: 'Secondary item', path: '/secondary' },
  { type: 'secondary', title: 'Another secondary item', path: '/secondary2' },
];
const dropdownNavItems: DropDownNavItemProps[] = [
  { id: 'test1', title: 'Active section', path: '/' },
  {
    id: 'test2',
    title: 'Attention needed',
    path: '/attention',
    children: [{ id: 'test3', title: 'Child two', path: '/child-two' }],
  },
  {
    id: 'test4',
    title: 'Secondary item',
    path: '/secondary',
    children: [{ id: 'test5', title: 'Child one', path: '/child-one' }],
  },
];

storiesOf('Header', module)
  .addDecorator(withKnobs)
  .add('Logged in', () => {
    const customTitle = text('Title', defaultTitle);
    const customName = text('Name', defaultName);
    const customNavItems = object('Items', defaultNavItems);
    return (
      <Header
        primaryTitle={customTitle}
        navItems={customNavItems}
        loginPath="/login"
        logoutPath="/logout"
        userFirstName={customName}
      />
    );
  })
  .add('Logged out', () => {
    const customTitle = text('Title', defaultTitle);
    const customNavItems = object('Items', defaultNavItems);
    return (
      <Header
        primaryTitle={customTitle}
        navItems={customNavItems}
        loginPath="/login"
        logoutPath="/logout"
      />
    );
  })
  .add('Dropdown', () => {
    const customTitle = text('Title', defaultTitle);
    const customNavItems = object('Items', dropdownNavItems);
    return (
      <Header
        primaryTitle={customTitle}
        navItems={customNavItems}
        loginPath="/login"
        logoutPath="/logout"
      />
    );
  });
