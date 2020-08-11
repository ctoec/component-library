import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDropdown } from '../../hooks';

export type DropDownNavItemProps = {
	id: string;
	title: string;
	path?: string;
	active?: boolean;
	children?: DropDownNavItemProps[];
}

type InternalDropDownNavItemProps = DropDownNavItemProps & {
	previousFocusedItem: any;
	setPreviousFocusedItem: any;
	currentFocusedItem: any;
	setCurrentFocusedItem: any;
	showDropdown: boolean;
};

export function DropDownNavItem({
	id,
	title,
	path,
	active = false,
	children = [],
	setPreviousFocusedItem,
	setCurrentFocusedItem,
	showDropdown
}: InternalDropDownNavItemProps) {
	const { ref, dropdownContainer, hide, show } = useDropdown({
		options: children.map(child => ({
			text: child.title,
			value: child.path || ''
		})),
		optionsProps: { className: '' },
		optionRender: (props) => (
			<Link
				to={props.value}
				{...props}
			>
				{props.text}
			</Link>
		)
	});

	useEffect(() => {
		if (showDropdown) {
			show();
		} else {
			hide();
		}
	}, [showDropdown])

	return (
		<li className="usa-nav__secondary-item">
			<span
				id={title}
				className="display-inline-block with-dropdown"
				ref={ref}
				onFocus={(e) => {
					setCurrentFocusedItem(e.target);
				}}
				onBlur={(e) => {
					setPreviousFocusedItem(e.target);
				}}
			>
				{children.length > 0
					? (
						<span>
							<a id={id} href="javascript:void" aria-haspopup="true" className={'usa-nav__link' + (active ? ' usa-current' : '')}>{title}</a>
							{dropdownContainer}
						</span>
					)
					: (
						<Link id={id} className={'usa-nav__link' + (active ? ' usa-current' : '')} to={path || '/'}>
							<span>
								{title}
							</span>
						</Link>
					)
				}
			</span>
		</li>
	);
}
