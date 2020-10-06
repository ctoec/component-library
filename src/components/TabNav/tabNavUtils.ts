import { TabItem } from '..';
import { InternalTabItemType } from './Tabs';

export function formatTabText(tabItem: TabItem) {
  let text: string | JSX.Element = tabItem.tabText;
  if (text.length > 20) {
    text = `${text.slice(0, 19)}...`;
  }
  if (tabItem.tabTextFormatter) {
    text = tabItem.tabTextFormatter(text);
  }
  return text;
}

export function resetTabItems(
  tabItems: (InternalTabItemType | TabItem)[]
): InternalTabItemType[] {
  return tabItems.map(
    (item: TabItem | InternalTabItemType) =>
      ({ ...item, inDropdown: false } as InternalTabItemType)
  );
}
