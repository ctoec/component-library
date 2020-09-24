import React from 'react';
import cx from 'classnames';
import { SVGIcon } from '../../assets/images';

export type InlineIconProps = {
	Icon: SVGIcon;
	screenReaderFallback?: string;
  className?: string;
	svgProps?: React.SVGProps<SVGSVGElement>;
};

export function InlineIcon({
	Icon,
	screenReaderFallback,
	className,
  svgProps,
}: InlineIconProps) {
  return (
    <span
      className={cx(className, 'oec-inline-icon')}
    >
			<Icon {...svgProps} />
			<span className={cx('usa-sr-only')}>({screenReaderFallback})</span>
    </span>
  );
}
