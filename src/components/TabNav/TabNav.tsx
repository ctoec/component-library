import React, { useEffect, useState } from 'react';
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

  // TODO: does this need to be the same when a user clicks back to the original tab?
  const [nestedActiveTab, setNestedActiveTab] = useState<TabItem>();

  const { nestedTabs } = activeTab;
  useEffect(() => {
    if (nestedTabs && nestedTabs.length) {
      const defaultNestedActiveTab = nestedActiveId
        ? nestedTabs.find((i) => i.id === nestedActiveId)
        : nestedTabs[0];
      setNestedActiveTab(defaultNestedActiveTab);
    }
  }, [activeTab, nestedActiveId, nestedTabs])

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
