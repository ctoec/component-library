import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDropdown, DropdownOptionProps } from '../../hooks';

export type DropDownNavItemProps = {
	id: string;
	title: string;
	children: DropdownOptionProps[];
	type: 'primary' | 'secondary';
	active?: boolean;
	renderer?: (_: any) => JSX.Element;
};

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
	children = [],
	type = 'primary',
	active = false,
	renderer,
	setPreviousFocusedItem,
	setCurrentFocusedItem,
	showDropdown,
}: InternalDropDownNavItemProps) {
	const { ref, dropdownContainer, hide, show } = useDropdown({
		options: children,
		optionsProps: { className: '' },
		optionRender:
			renderer ||
			((props) => (
				<Link to={props.value} {...props}>
					{props.text}
				</Link>
			)),
	});

	useEffect(() => {
		if (showDropdown) {
			show();
		} else {
			hide();
		}
	}, [showDropdown, show, hide]);

	return (
		<li className={`usa-nav__${type}-item`} key={id}>
			<span
				id={title}
				className="display-inline-block with-dropdown"
				ref={ref}
				onFocus={(e) => {
					show();
					setCurrentFocusedItem(e.target);
				}}
				onBlur={(e) => {
					setPreviousFocusedItem(e.target);
				}}
			>
				{!renderer && (
					<span>
						{/* TODO: is this the correct aria logic?  Does it need to say whether it's open? */}
						<button
							id={id}
							aria-haspopup="true"
							className={'usa-nav__link' + (active ? ' usa-current' : '')}
						>
							{title}
						</button>
						{dropdownContainer}
					</span>
				)}
				{/* TODO: we should only use renderer for child elements; this needs to control the popup */}
				{renderer &&
					renderer({
						id: id,
						className: 'usa-nav__link' + (active ? ' usa-current' : ''),
					})}
			</span>
		</li>
	);
}
