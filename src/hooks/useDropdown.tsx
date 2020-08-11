import React from 'react';
import cx from 'classnames';
import { useHideOnLostFocus } from './useHideOnLostFocus';

export type DropdownOptionProps = {
	text: string;
	value: string;
};

export type DropdownOptions = {
	options: DropdownOptionProps[];
	optionsProps?: { className: string };
	optionRender: (_: any) => JSX.Element;
}

export const useDropdown: (_: DropdownOptions) => {
	ref: React.Ref<HTMLDivElement>;
	dropdownContainer: JSX.Element;
	isComponentVisible: boolean;
	hide: () => void;
	show: () => void;
	changeVisibility: () => void;
} = ({
	options,
	optionsProps,
	optionRender
}) => {
	// TODO: aria popup role kind of stuff probably
	const { ref, isComponentVisible, setIsComponentVisible } = useHideOnLostFocus<HTMLDivElement>();

	const changeVisibility = () => setIsComponentVisible((hide) => !hide);
	const hide = () => setIsComponentVisible(false);
	const show = () => setIsComponentVisible(true);

	const dropdownContainer = (
		<div
			className={cx(
				optionsProps && optionsProps.className,
				{ 'display-none': !isComponentVisible },
				'dropdown'
			)}
		>
			<ul aria-expanded="true">
				{options.map((_option, index) => {
					if (index === options.length - 1) {
						return (
							<li>
								{optionRender({
									key: _option.value,
									value: _option.value,
									className: "option",
									onClick: changeVisibility,
									text: _option.text,
									onBlur: hide
								})}
							</li>
						);
					} else {
						return (
							<li>
								{optionRender({
									key: _option.value,
									value: _option.value,
									className: "option",
									onClick: changeVisibility,
									text: _option.text,
								})}
							</li>
						)
					}
				})}
			</ul>
		</div>
	)
	return { ref, dropdownContainer, isComponentVisible, hide, show, changeVisibility };
};
