import React from 'react';
import { AccordionItemProps, AccordionItem } from './AccordionItem';
// import cx from 'classnames';
// import { AngleArrowDown } from '../../assets/images';

type HeadingLevel = 'h2' | 'h3' | 'h4' | 'h5';
export type AccordionProps = {
	items: AccordionItemProps[];
	titleHeadingLevel: HeadingLevel;
}

export const Accordion: React.FC<AccordionProps> = ({
	items,
	titleHeadingLevel
}) => {
	return (
		<div
			className="oec-accordion"
			aria-multiselectable
		>
			{items.map((item) => (
				<AccordionItem
					{...item}
					headingLevel={titleHeadingLevel}
				/>
			))}
		</div>
	);
}

