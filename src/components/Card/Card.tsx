import React, {
	Children,
	useEffect,
	useState,
	isValidElement,
	PropsWithChildren,
	createContext,
	useCallback,
} from 'react';
import cx from 'classnames';
import { Tag } from '..';
import { CardExpansion } from './CardExpansion';

export type CardContextType = {
	isExpanded: boolean;
	toggleExpanded: () => void;
};

const CardContext = createContext<CardContextType>({
	isExpanded: false,
	toggleExpanded: () => { },
});

const { Provider: CardProvider } = CardContext;
export { CardContext };

export type CardProps = {
	appearance?: 'primary' | 'secondary';
	borderless?: boolean
	className?: string;
	expanded?: boolean;
	expandDirection?: 'up' | 'down';
	onExpansionChange?: (_: boolean) => void;
	forceClose?: boolean;
	showTag?: boolean;
};

export function Card({
	appearance,
	borderless = false,
	className,
	expanded = false,
	expandDirection = 'down',
	onExpansionChange,
	forceClose,
	showTag = false,
	children,
}: PropsWithChildren<CardProps>) {
	const [previousIsExpanded, setPreviousIsExpanded] = useState<boolean>();
	const [isExpanded, setIsExpanded] = useState(expanded);
	const updateExpanded = useCallback(
		(_: boolean) => {
			setPreviousIsExpanded(isExpanded);
			setIsExpanded(_);
		},
		[setPreviousIsExpanded, setIsExpanded, isExpanded]
	);
	const toggleExpanded = () => updateExpanded(!isExpanded);

	useEffect(() => {
		if (onExpansionChange && previousIsExpanded !== undefined) {
			onExpansionChange(isExpanded);
		}
	}, [isExpanded, previousIsExpanded, onExpansionChange]);

	useEffect(() => {
		if (forceClose) {
			updateExpanded(false);
		}
	}, [forceClose, updateExpanded]);

	const expansion = (
		<>
			<div
				className={cx({
					'oec-card-divider': expandDirection === 'down' && isExpanded,
				})}
			></div>
			<div className={cx('oec-card-cell', 'oec-card-expansion')}>

				{Children.map(children, (child) => {
					if(!isValidElement(child)) {
						throw new Error('Invalid card child element');
					}

					const type = typeof child.type === 'string' ? child.type : child.type.name;
					if (type === CardExpansion.name) {
						return child;
					}
				})}

			</div>
			<div
				className={cx({
					'oec-card-divider': expandDirection === 'up' && isExpanded,
				})}
			></div>
		</>
	);

	return (
		<CardProvider
			value={{
				isExpanded,
				toggleExpanded,
			}}
		>
			<div
				className={cx(
					'oec-card',
					{
						[`oec-card--${appearance}`]: appearance,
						"oec-card--borderless": borderless,
					},
					className
				)}
			>
				{isExpanded && expandDirection === 'up' && expansion}
				{showTag && <Tag className="oec-card-tag" text="NEW" color="theme-color-primary" />}
				<div className="oec-card-cell">
					{Children.map(children, (child) => {
						if (!isValidElement(child)) {
							throw new Error('Invalid card child element');
						}
						const type = typeof child.type === 'string' ? child.type : child.type.name;
						if (type !== CardExpansion.name) {
							return child;
						}
					})}
				</div>
				{isExpanded && expandDirection === 'down' && expansion}
			</div>
		</CardProvider>
	);
}
