import React from 'react';
import cx from 'classnames';
import { TabItem } from './TabNav';
import { formatTabText } from './tabNavUtils';

export type TabProps = {
  tabRefs: any;
  tabItem: TabItem;
  onClick: any;
  isActiveTab?: boolean;
  secondary?: boolean;
};

export const Tab = ({
  tabRefs,
  tabItem,
  isActiveTab,
  secondary,
  onClick,
}: TabProps) => (
    <button
      id={tabItem.id}
      ref={(node) => (tabRefs.current[tabItem.id] = node)}
      role="tab"
      type="button"
      className={cx(
        'oec-tab-nav--tab',
        {
          'oec-tab-nav--tab__active': isActiveTab,
        },
        {
          'oec-tab-nav--tab__secondary': secondary,
        }
      )}
      onClick={() => onClick(tabItem)}
      aria-selected={isActiveTab}
      title={tabItem.tabText}
    >
      <span>{formatTabText(tabItem)}</span>
    </button>
  );
