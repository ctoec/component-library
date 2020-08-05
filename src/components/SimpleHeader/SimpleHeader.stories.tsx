import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import { SimpleHeader } from './SimpleHeader';
import { DropDownNavItemProps } from './DropDownNavItem';

const defaultTitle = 'Hello world!';
const defaultName = 'Chris';
const defaultNavItems: DropDownNavItemProps[] = [
	{ id: 'test1', title: 'Active section', path: '/' },
	{ id: 'test2', title: 'Attention needed', path: '/attention', children: [
		{ id: 'test3', title: 'Child two', path: '/child-two' }
	] },
	{ id: 'test4', title: 'Secondary item', path: '/secondary', children: [
		{ id: 'test5', title: 'Child one', path: '/child-one' }
	] },
];

storiesOf('SimpleHeader', module)
	.addDecorator(withKnobs)
	.add('Logged in', () => {
		const customTitle = text('Title', defaultTitle);
		const customName = text('Name', defaultName);
		const customNavItems = object('Items', defaultNavItems);
		return (
			<SimpleHeader
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
			<SimpleHeader
				primaryTitle={customTitle}
				navItems={customNavItems}
				loginPath="/login"
				logoutPath="/logout"
			/>
		);
	});
