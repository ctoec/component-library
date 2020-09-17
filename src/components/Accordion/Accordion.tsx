import React from 'react';
import { AccordionItemProps, AccordionItem } from './AccordionItem';
import { HeadingLevel } from '..';

export type AccordionProps = {
  items: AccordionItemProps[];
  titleHeadingLevel?: HeadingLevel;
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  titleHeadingLevel = 'h2',
}) => {
  return (
    <div className="oec-accordion" aria-multiselectable>
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
