import React from 'react';
import cx from 'classnames';
import { AccordionItemProps, AccordionItem } from './AccordionItem';
import { HeadingLevel } from '..';

export type AccordionProps = {
  items: AccordionItemProps[];
	titleHeadingLevel?: HeadingLevel;
	className?: string;
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
	titleHeadingLevel = 'h2',
	className,
}) => {
  return (
    <div className={cx("oec-accordion", className)} aria-multiselectable>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          {...item}
          headingLevel={titleHeadingLevel}
        />
      ))}
    </div>
  );
};
