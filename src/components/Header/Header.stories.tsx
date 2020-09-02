import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { Header } from './Header';
import { NavLinkProps } from './NavLink';
import { NavDropdownProps } from './NavDropdown';

const defaultTitle = 'Hello world!';
const defaultName = 'Chris';
const defaultNavLinks: NavLinkProps[] = [
  { type: 'primary', text: 'Active section', path: '/' },
  { type: 'primary', text: 'Another section', path: '/another' },
  {
    type: 'primary',
    text: 'Attention needed',
    attentionNeeded: true,
    path: '/attention',
  },
  { type: 'secondary', text: 'Secondary item', path: '/secondary' },
  { type: 'secondary', text: 'Another secondary item', path: '/secondary2' },
];
const navDropdowns: NavDropdownProps[] = [
  {
    id: 'test2',
    text: 'Attention needed',
    type: 'secondary',
    children: [{ text: 'Child two', path: '/' }],
  },
  {
    id: 'test4',
    text: 'Secondary item',
    type: 'secondary',
    children: [{ text: 'Child one', path: '/child-one' }],
  },
];

storiesOf('Header', module)
  .addDecorator(withKnobs)
  .add('Logged in', () => {
    const customTitle = text('Title', defaultTitle);
    const customName = text('Name', defaultName);
    const customNavLinks = object('Items', defaultNavLinks);
    return (
      <Header
        primaryTitle={customTitle}
        navLinks={customNavLinks}
        loginPath="/login"
        logoutPath="/logout"
        userFirstName={customName}
      />
    );
  })
  .add('Logged out', () => {
    const customTitle = text('Title', defaultTitle);
    const customNavLinks = object('Items', defaultNavLinks);
    return (
      <Header
        primaryTitle={customTitle}
        navLinks={customNavLinks}
        loginPath="/login"
        logoutPath="/logout"
      />
    );
  })
  .add('Dropdown', () => {
    const customTitle = text('Title', defaultTitle);
    const customNavLinks = object('Items', [
      ...defaultNavLinks,
      ...navDropdowns,
    ]);
    return (
      <Header
        primaryTitle={customTitle}
        navLinks={customNavLinks}
        loginPath="/login"
        logoutPath="/logout"
      />
    );
  })
  .add('Dropdown with secondary buttons only', () => {
    const customTitle = text('Title', defaultTitle);
    const customNavLinks = object('Items', [
      ...defaultNavLinks,
      ...navDropdowns,
    ]).filter((d) => d.type === 'secondary');
    return (
      <Header
        primaryTitle={customTitle}
        navLinks={customNavLinks}
        loginPath="/login"
        logoutPath="/logout"
      />
    );
  });
