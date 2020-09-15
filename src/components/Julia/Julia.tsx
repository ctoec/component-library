import React from 'react';
import cx from 'classnames';

export type TProps = {
  text: string;
  key?: string;
  color?: string;
  className?: string;
};

export function Julia({ key, text, color, className }: TProps) {
  const colorClass = color ? `bg-${color}` : undefined;
  return (
    <span
      key={key}
      className={cx('usa-tag', 'usa-tag--no-transform', className, colorClass)}
    >
      {text}
    </span>
  );
}
