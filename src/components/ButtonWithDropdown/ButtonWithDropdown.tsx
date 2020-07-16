import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { useHideOnLostFocus } from '../../hooks/useHideOnLostFocus';
import { Button, ButtonProps } from '../Button/Button';

export type ButtonOptionProps = {
	text: string;
	value: string;
};

export type ButtonWithDropdownProps = ButtonProps & {
	id: string;
	className?: string;
	onChange?: (_: React.ChangeEvent<HTMLSelectElement>) => any;
	dropdownElement: JSX.Element;
	options: ButtonOptionProps[];
	optionsProps?: { className: string };
};

export const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = ({
	id,
	appearance,
	text,
	dropdownElement,
	options,
	className,
	optionsProps,
}) => {
	// TODO: aria popup role kind of stuff probably
	const { ref, isComponentVisible, setIsComponentVisible } = useHideOnLostFocus<HTMLDivElement>();

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
				onClick={() => setIsComponentVisible((hide) => !hide)}
			/>
			<div
				className={cx(
					optionsProps && optionsProps.className,
					{ hidden: !isComponentVisible },
					'dropdown'
				)}
			>
				{options.map((_option) => (
					<Link
						key={_option.value}
						className="option"
						onClick={() => setIsComponentVisible((hide) => !hide)}
						to={_option.value}
					>
						{_option.text}
					</Link>
				))}
			</div>
		</div>
	);
};