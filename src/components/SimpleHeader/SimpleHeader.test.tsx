import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { SimpleHeader, SimpleHeaderProps } from './SimpleHeader';
// @ts-ignore
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const headerProps: SimpleHeaderProps = {
	primaryTitle: 'Header test',
	navItems: [
		{ id: 'dropdown1', title: 'Active section', path: '/first' },
		{ id: 'dropdown2', title: 'Another section', path: '/another' },
		{ id: 'dropdown3', title: 'Attention needed', path: '/attention' },
		{ id: 'dropdown4', title: 'Secondary item', path: '/secondary' },
		{ id: 'dropdown5', title: 'Another secondary item', path: '/secondary2' },
	],
	loginPath: '/login',
	logoutPath: '/logout',
};

const getClosestAnchorAndValidateExists = (
	get: any,
	text: string | RegExp
): Exclude<any, undefined> => {
	const section = get(text).closest('a');
	expect(section).toBeDefined();
	if (!section) {
		throw new Error('Typescript guarding');
	}
	return section;
};

const getMenuElementsAndValidateOpenMenu = (getByText: any, getByRole: any, getByTestId: any) => {
	const menu = getByText(/menu/i);
	const overlay = getByTestId('overlay');
	const nav = getByRole(/navigation/i);
	// TODO: (After CSS refactor) Ensure the menu is not visible
	expect(overlay.classList.contains('is-visible')).toBeFalsy();
	expect(nav.classList.contains('is-visible')).toBeFalsy();

	// Resize window so that menu button appears
	act(() => {
		// @ts-ignore TS does not allow changing innerWidth
		window.innerWidth = 100;
		fireEvent(window, new Event('resize'));
	});

	// TODO: (After CSS refactor) Ensure the menu is visible
	fireEvent.click(menu);

	expect(overlay.classList.contains('is-visible')).toBeTruthy();
	expect(nav.classList.contains('is-visible')).toBeTruthy();
	return { menu, overlay, nav };
};

it('shows first section as active when at the root path', () => {
	const { getByText } = render(
		<MemoryRouter>
			<SimpleHeader {...headerProps} />
		</MemoryRouter>
	);
	const activeSection = getClosestAnchorAndValidateExists(getByText, /Active Section/i);
	const otherSection = getClosestAnchorAndValidateExists(getByText, /Another Section/i);
	expect(activeSection.classList.contains('usa-current')).toBeTruthy();
	expect(otherSection.classList.contains('usa-current')).toBeFalsy();
});

it('shows the path as active when matching', () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={['/another/nested/path']}>
			<SimpleHeader {...headerProps} />
		</MemoryRouter>
	);
	const activeSection = getClosestAnchorAndValidateExists(getByText, /Active Section/i);
	const otherSection = getClosestAnchorAndValidateExists(getByText, /Another Section/i);
	expect(activeSection.classList.contains('usa-current')).toBeFalsy();
	expect(otherSection.classList.contains('usa-current')).toBeTruthy();
});
