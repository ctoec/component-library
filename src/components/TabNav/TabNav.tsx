import React, { useState } from 'react';
import { Tabs } from './Tabs';

export type TabItem = {
  id: string;
  tabText: string;
  content?: JSX.Element; // You can either pass tab navs content or just render children
  firstItem?: boolean;
  tabTextFormatter?: (text: string) => string | JSX.Element;
  nestedItemType?: string;
  nestedTabs?: TabItem[];
};

export type TabNav = {
  items: TabItem[];
  itemType?: string;
  activeId?: string;
  nestedActiveId?: string;
  onClick?: (id: string, item: TabItem) => void;
};

export const TabNav: React.FC<TabNav> = ({
  items,
  activeId,
  nestedActiveId,
  onClick,
  itemType,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(
    items.find((i) => i.id === activeId) || items[0]
  );

  const { nestedTabs } = activeTab;
  let initialNestedActiveTab;
  if (nestedTabs) {
    initialNestedActiveTab = nestedActiveId
      ? nestedTabs.find((i) => i.id === nestedActiveId)
      : nestedTabs[0];
  }
  const [nestedActiveTab, setNestedActiveTab] = useState(
    initialNestedActiveTab
  );

  console.log(activeTab, nestedActiveTab)

  return (
    <div className="oec-tab-nav">
      <div className="oec-tab-nav--header">
        <Tabs
          itemType={itemType}
          items={items}
          onClick={onClick}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {nestedTabs && (
          <Tabs
            secondary
            itemType={activeTab.nestedItemType}
            items={nestedTabs}
            onClick={onClick}
            // @ts-ignore TS is not right about this
            activeTab={nestedActiveTab}
            // @ts-ignore TS is not right about this
            setActiveTab={setNestedActiveTab}
          />
        )}
      </div>
      <div
        className="oec-tab-nav--content"
        aria-labelledby={nestedActiveId || activeId}
        role="tabpanel"
      >
        {nestedActiveTab?.content}
        {!nestedActiveTab && activeTab?.content}
        {children}
      </div>
    </div>
  );
};
