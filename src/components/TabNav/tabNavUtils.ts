import { TabItem } from '..';
import { InternalTabItemType } from './Tabs';

export function formatTabText(tabItem: TabItem) {
  let text: string | JSX.Element = tabItem.tabText;
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

export function getUniqueElementBottomVals(tabRefs: React.MutableRefObject<{
  [key: string]: HTMLButtonElement | null;
}>): number[] {
  return Object.values(tabRefs.current)
    .reduce((valuesAccumulator: number[], thisRef) => {
      if (!thisRef) return valuesAccumulator;
      const { bottom } = thisRef.getBoundingClientRect();
      if (!valuesAccumulator.includes(bottom)) {
        valuesAccumulator.push(bottom);
      }
      return valuesAccumulator;
    }, [])
    .sort((a, b) => a - b);
}