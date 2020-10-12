import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { TabItem, TabNav } from './TabNav';
import { useHideOnLostFocus } from '../..';
import {
  formatTabText,
  getUniqueElementBottomVals,
  resetTabItems,
} from './tabNavUtils';
import { Tab } from './Tab';

type TabsProps = {
  items: TabItem[];
  activeTab: TabItem;
  setActiveTab:
  | Dispatch<SetStateAction<TabItem>>
  | Dispatch<SetStateAction<TabItem | undefined>>;
  itemType?: string;
  onClick?: TabNav['onClick'];
  secondary?: boolean;
};

export type InternalTabItemType = TabItem & {
  inDropdown: boolean;
};

export const Tabs: React.FC<TabsProps> = ({
  items: inputItems,
  onClick: _onClick,
  activeTab,
  setActiveTab,
  secondary,
  itemType = 'tabs',
}) => {
  const activeTabId = activeTab?.id;

  // All tab items, regardless of whether they're in dropdown
  const [items, setItems] = useState<InternalTabItemType[]>(
    resetTabItems(inputItems)
  );

  // Refs for tabs not in dropdown
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Ref for dropdown
  const {
    ref: dropdownRef,
    isComponentVisible: isDropdownVisible,
    setIsComponentVisible: setIsDropdownVisible,
  } = useHideOnLostFocus<HTMLDivElement>();

  // If container resizes or order is changed, need to reset dropdown items
  const [resetDropdownItems, setResetDropdownItems] = useState(false);
  useEffect(() => {
    // Need to reset dropdown items if conatiner resized
    const onResize = () => setResetDropdownItems(true);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // On any tab click
  const onClick = (tab: InternalTabItemType) => {
    if (tab.inDropdown) {
      setItems((_items) => {
        const thisIndex = _items.findIndex((i) => i.id === tab.id);

        // Remove this tab from the items
        _items.splice(thisIndex, 1);

        // This will never be one of the items that stays in front bc it's in the dropdown
        const itemsThatStayInFront = _items.filter((i) => i.firstItem);
        const notFirstItems = _items.filter((i) => !i.firstItem);

        return [...itemsThatStayInFront, tab, ...notFirstItems];
      });
      // Then reset dropdown items
      setResetDropdownItems(true);
    }
    setActiveTab(tab);
    _onClick && _onClick(tab.id, tab);
  };

  const [determineDropdownItems, setDetermineDropdownItems] = useState(true);
  useEffect(() => {
    // After we reset the dropdown items, then we need to redetermine what they are
    if (resetDropdownItems) {
      setItems((oldItems) => resetTabItems(oldItems));
      setResetDropdownItems(false);
      setDetermineDropdownItems(true);
    }
  }, [resetDropdownItems]);

  // Also need to redetermine dropdown items if input items change
  useEffect(() => {
    setItems(resetTabItems(inputItems));
    setDetermineDropdownItems(true);
  }, [inputItems]);

  // When container width changes, change which tabs show
  useLayoutEffect(() => {
    const { bottom: dropdownBottom } =
      dropdownRef.current?.getBoundingClientRect() || {};

    if (!determineDropdownItems || !dropdownBottom) return;

    const uniqueTabBottomVals = getUniqueElementBottomVals(tabRefs);
    const baselineBottom = uniqueTabBottomVals[0];

    const newItems = items.map((item) => {
      const ref = tabRefs.current[item.id];
      if (!ref) {
        return item;
      }
      // Tab goes in dropdown if on initial render it was
      // pushed to the next line
      const { bottom: refBottom } = ref.getBoundingClientRect();
      const inDropdown = refBottom > baselineBottom;
      return { ...item, inDropdown };
    });

    if (uniqueTabBottomVals.length > 1) {
      // If we're using the dropdown, then we need to account for its width
      let combinedWidthReduced = 0;
      const {
        width: dropdownWidth,
      } = dropdownRef.current?.getBoundingClientRect() || { width: 0 };

      newItems
        .filter((i) => !i.inDropdown)
        .reverse()
        .some((item) => {
          const ref = tabRefs.current[item.id];
          const thisItem = newItems.find((_item) => _item.id === item.id);
          if (!ref || !thisItem) {
            return false;
          }

          thisItem.inDropdown = true;
          const { width: refWidth } = ref?.getBoundingClientRect() || {};
          combinedWidthReduced += refWidth;
          if (combinedWidthReduced >= dropdownWidth) {
            return true;
          }
          return false;
        });
    }

    setItems(newItems);
    setDetermineDropdownItems(false);
  }, [items, dropdownRef, determineDropdownItems]);

  const dropdownItems = items.filter((i) => i.inDropdown);

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="grid-row oec-tab-nav--tab-container"
    >
      {items
        .filter((i) => !i.inDropdown)
        .map((tabItem, index) => (
          <Tab
            key={`${tabItem.id}-${index}`}
            tabItem={tabItem}
            tabRefs={tabRefs}
            isActiveTab={activeTabId === tabItem.id}
            onClick={onClick}
            secondary={secondary}
          />
        ))}
      <div
        ref={dropdownRef}
        className={cx('oec-tab-nav--dropdown', {
          'opacity-0': !dropdownItems.length,
        })}
      >
        <button
          className={cx('oec-tab-nav--tab', {
            'oec-tab-nav--tab__secondary': secondary,
          })}
          // We need to disable this button and sketchily hide it instead of just display: none because it has to exist before the dropdownItems are determined for layout purposes
          disabled={!dropdownItems.length}
          aria-hidden={!dropdownItems.length}
          aria-haspopup={!!dropdownItems.length}
          aria-expanded={!!dropdownItems.length && isDropdownVisible}
          onClick={() => setIsDropdownVisible((v) => !v)}
        >{`+${dropdownItems.length} ${itemType}`}</button>
        {isDropdownVisible && (
          <ul className="position-absolute">
            {dropdownItems.map((tabItem, index) => (
              <li key={`${index}-${tabItem.id}`}>
                <button
                  id={tabItem.id}
                  role="tab"
                  type="button"
                  aria-selected={tabItem.id === activeTabId}
                  onClick={() => {
                    onClick(tabItem);
                    setIsDropdownVisible(false);
                  }}
                >
                  <span>{formatTabText(tabItem)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
