import React from 'react';
import cx from 'classnames';
import { SVGIcon } from '../../assets/images';

export type InlineIconProps = {
	Icon: SVGIcon;
	screenReaderFallback?: string;
  className?: string;
	svgProps?: React.SVGProps<SVGSVGElement>;
	rotate?: '90' | '180' | '270' ;
};

export function InlineIcon({
	Icon,
	screenReaderFallback,
	className,
	svgProps,
	rotate
}: InlineIconProps) {
  return (
    <span
			className={cx(className, 'oec-inline-icon', {[`oec-inline-icon--rotate-${rotate}`]: rotate})}
    >
			<Icon {...svgProps} />
			<span className={cx('usa-sr-only')}>({screenReaderFallback || Icon.toString()})</span>
    </span>
  );
}
