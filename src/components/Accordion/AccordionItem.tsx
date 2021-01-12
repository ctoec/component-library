import React, { useState } from 'react';
import cx from 'classnames';
import { AngleArrowDown } from '../../assets/images';
import { HeadingLevel } from '../..';

export type AccordionItemProps = {
  id: string;
  title: JSX.Element | string;
  headerContent?: JSX.Element;
  expandText?: JSX.Element | string;
  collapseText?: JSX.Element | string;
  content: JSX.Element | string;
  isExpanded?: boolean;
};

type InternalAccordionItemProps = AccordionItemProps & {
  headingLevel: HeadingLevel;
};

export const AccordionItem: React.FC<InternalAccordionItemProps> = ({
  id,
  title,
  headerContent,
  expandText = 'Show',
  collapseText = 'Hide',
  content,
  isExpanded: initialIsExpanded = false,
  headingLevel,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);
  const Heading = headingLevel;
  return (
    <>
      <div className="oec-accordion__heading">
        <div className="display-flex flex-justify flex-col flex-align-center padding-top-3 padding-bottom-3">
          <div>
            <Heading className="oec-accordion__heading-title">{title}</Heading>
            {headerContent}
          </div>
          <div className="oec-accordion__heading-expand">
            <button
              className="oec-accordion__button"
              onClick={() => setIsExpanded((e) => !e)}
              aria-expanded={isExpanded}
              aria-controls={id}
            >
              {isExpanded && collapseText}
              {!isExpanded && expandText}
              <AngleArrowDown
                className={cx('oec-accordion__button-icon', {
                  'oec-accordion__button-icon--expanded': isExpanded,
                })}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="oec-accordion__content" id={id} aria-hidden={!isExpanded}>
        {content}
      </div>
    </>
  );
};
