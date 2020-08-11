import React from 'react';
import cx from 'classnames';
import { Button, ButtonProps } from '../Button/Button';
import { useDropdown, DropdownOptions } from '../../hooks';

export type ButtonOptionProps = {
	text: string;
	value: string;
};

export type ButtonWithDropdownProps = ButtonProps & {
	id: string;
	className?: string;
	dropdownElement: JSX.Element;
} & DropdownOptions;

export const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = ({
	id,
	className,
	appearance,
	text,
	dropdownElement,
	options,
	optionsProps,
}) => {
	const { ref, dropdownContainer, changeVisibility } = useDropdown({
		options,
		optionsProps
	});
	return (
		<div
			id={id}
			ref={ref}
			className={cx('button-container', { 'container--button-unstyled': appearance === 'unstyled' }, className)}
		>
			<Button
				className="with-dropdown"
				appearance={appearance}
				text={
					<>
						{text}
						<span>&nbsp;</span>
						{dropdownElement}
					</>
				}
				onClick={changeVisibility}
			/>
			{dropdownContainer}
		</div>
	);
};
