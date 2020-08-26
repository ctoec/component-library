import React, { useState } from 'react';
import cx from 'classnames';

export type TabItemProps = {
	id: string;
	text: JSX.Element | string;
	content: JSX.Element;
};

export type TabNavProps = {
	items: TabItemProps[];
	activeId?: string;
	onClick?: (id: string) => void;
};

export const TabNav: React.FC<TabNavProps> = ({
	items,
	activeId,
	onClick: _onClick
}) => {
	const startingIndex = items.findIndex((item) => item.id === activeId);
	const [activeTabIndex, setActiveTabIndex] = useState(startingIndex < 0 ? 0 : startingIndex);

	// Cleanest way to handle tab switching.
	// Don't need to use effects because we don't have to actually
	// run functions after the DOM renders.
	// This prevents getting caught in infinite state loops.
	const onClick = (index: number, id: string) => {
				setActiveTabIndex(index);
				_onClick && _onClick(id);
	};

	const tabs = items.map(({ text, id }, index) => (
		<li key={index}>
			<button
				type="button"
				className={cx('oec-tab-nav--tab', { 'oec-tab-nav--tab__active': index === activeTabIndex })}
				onClick={() => onClick(index, id)}
			>
				{text}
			</button>
		</li>
	));

	const activeTab = items[activeTabIndex];

	return (
		<div className="oec-tab-nav">
			<div className="oec-tab-nav--header">
				<nav>
					<ul>{tabs}</ul>
				</nav>
			</div>
			<div className="oec-tab-nav--content">{activeTab.content}</div>
		</div>
	);
};
