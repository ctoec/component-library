import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { Header } from './Header';
import { NavItemProps } from './NavItem';
import { DropDownNavItemProps } from './DropDownNavItem';

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
  {
    id: 'test2',
    title: 'Attention needed',
    type: 'secondary',
    children: [{ text: 'Child two', value: '/' }],
  },
  {
    id: 'test4',
    title: 'Secondary item',
    type: 'secondary',
    children: [{ text: 'Child one', value: '/child-one' }],
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
    const customNavItems = object('Items', [
      ...defaultNavItems,
      ...dropdownNavItems,
    ]);
    return (
      <Header
        primaryTitle={customTitle}
        navItems={customNavItems}
        loginPath="/login"
        logoutPath="/logout"
      />
    );
  })
  .add('Dropdown with secondary buttons only', () => {
    const customTitle = text('Title', defaultTitle);
    const customNavItems = object('Items', [
      ...defaultNavItems,
      ...dropdownNavItems,
    ]).filter((d) => d.type === 'secondary');
    return (
      <Header
        primaryTitle={customTitle}
        navItems={customNavItems}
        loginPath="/login"
        logoutPath="/logout"
      />
    );
  });
