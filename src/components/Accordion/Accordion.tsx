import React from 'react';
import {
  AccordionItem as CarbonAccordionItem,
  Accordion as CarbonAccordion,
} from 'carbon-components-react';
import { HeadingLevel } from '..';

export type AccordionItemProps = {
  id: string;
  title: JSX.Element | string;
  headerContent?: JSX.Element;
  expandText?: JSX.Element | string;
  collapseText?: JSX.Element | string;
  content: JSX.Element | string;
  isExpanded?: boolean;
};

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
  const ItemTitleHeading = titleHeadingLevel;
  return (
    <CarbonAccordion className={className}>
      {items.map((i) => (
        <CarbonAccordionItem
          title={
            <>
              <ItemTitleHeading>{i.title}</ItemTitleHeading>
              {i.headerContent}
            </>
          }
          open={i.isExpanded}
        >
          {i.content}
        </CarbonAccordionItem>
      ))}
    </CarbonAccordion>
  );
};
