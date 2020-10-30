import React, {
  Children,
  useEffect,
  useState,
  isValidElement,
  PropsWithChildren,
  createContext,
  useCallback,
} from 'react';
import cx from 'classnames';
import { Tag } from '..';
import { CardExpansion } from './CardExpansion';

export type CardContextType = {
  isExpanded: boolean;
  toggleExpanded: () => void;
};

const CardContext = createContext<CardContextType>({
  isExpanded: false,
  toggleExpanded: () => { },
});

const { Provider: CardProvider } = CardContext;
export { CardContext };

export type CardProps = {
  appearance?: 'primary' | 'secondary';
  borderless?: boolean;
  className?: string;
  expanded?: boolean;
  onExpansionChange?: (_: boolean) => void;
  forceClose?: boolean; // TODO: ditch this bc we fixed expanded
  showTag?: boolean;
};

export function Card({
  appearance,
  borderless = false,
  className,
  expanded = false,
  onExpansionChange,
  showTag = false,
  children,
}: PropsWithChildren<CardProps>) {
  const [previousIsExpanded, setPreviousIsExpanded] = useState<boolean>();
  const [isExpanded, setIsExpanded] = useState(expanded);
  const updateExpanded = useCallback(
    (_: boolean) => {
      setPreviousIsExpanded(isExpanded);
      setIsExpanded(_);
    },
    [setPreviousIsExpanded, setIsExpanded, isExpanded]
  );
  const toggleExpanded = () => updateExpanded(!isExpanded);

  useEffect(() => {
    // After initial render, previous is expanded should always be a boolean
    const isFirstRender = previousIsExpanded === undefined;
    if (isFirstRender || !onExpansionChange) {
      // We don't want to run on expansion change on the first render of the card
      return;
    }
    onExpansionChange(isExpanded);
  }, [isExpanded, previousIsExpanded, onExpansionChange]);

  useEffect(() => {
    // This allows the parent component to control the card
    updateExpanded(expanded);
  }, [expanded, updateExpanded]);

  return (
    <CardProvider
      value={{
        isExpanded,
        toggleExpanded,
      }}
    >
      <div
        className={cx(
          'oec-card',
          {
            [`oec-card--${appearance}`]: appearance,
            'oec-card--borderless': borderless,
          },
          className
        )}
      >
        {showTag && (
          <Tag
            className="oec-card-tag"
            text="NEW"
            color="theme-color-primary"
          />
        )}
        <div className="oec-card-cell">
          {Children.map(children, (child) => {
            if (!isValidElement(child)) {
              throw new Error('Invalid card child element');
            }
            const type =
              typeof child.type === 'string' ? child.type : child.type.name;
            if (type !== CardExpansion.name) {
              return child;
            }
          })}
        </div>
        <div
          className={cx({
            'oec-card-divider': isExpanded,
          })}
        ></div>
        {isExpanded && (
          <div className={cx('oec-card-cell', 'oec-card-expansion')}>
            {Children.map(children, (child) => {
              if (!isValidElement(child)) {
                throw new Error('Invalid card child element');
              }
              const type =
                typeof child.type === 'string' ? child.type : child.type.name;
              if (type === CardExpansion.name) {
                return child;
              }
            })}
          </div>
        )}
      </div>
    </CardProvider>
  );
}
