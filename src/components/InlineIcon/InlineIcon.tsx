import React from 'react';
import {
  Error,
  Info,
  Success,
  AngleArrowDown,
  ArrowDown,
} from '../../assets/images';
import cx from 'classnames';

export type Icon =
  | 'attentionNeeded'
  | 'complete'
  | 'incomplete'
  | 'arrowDown'
  | 'angleArrowDown';

export type InlineIconProps = {
  icon: Icon;
  provideScreenReaderFallback?: boolean;
  className?: string;
  svgProps?: React.SVGProps<SVGSVGElement>;
};

export function InlineIcon({
  icon,
  provideScreenReaderFallback = true,
  className,
  svgProps,
}: InlineIconProps) {
  let text: string;
  let iconComponent;

  // TODO: why are arrowdown and anglearrowdown basically the same?
  // Revisit when we decide this vs textwithicon

  switch (icon) {
    case 'attentionNeeded':
      text = 'attention needed';
      iconComponent = <Error {...svgProps} />;
      break;
    case 'complete':
      text = 'complete';
      iconComponent = <Success {...svgProps} />;
      break;
    case 'incomplete':
      text = 'incomplete';
      iconComponent = <Error {...svgProps} />;
      break;
    case 'arrowDown':
      text = 'select dropdown';
      iconComponent = <ArrowDown {...svgProps} />;
      break;
    case 'angleArrowDown':
      text = 'select dropdown';
      iconComponent = <AngleArrowDown {...svgProps} />;
      break;
    default:
      text = '';
      iconComponent = <Info />;
  }

  return (
    <span
      className={cx(className, 'oec-inline-icon', `oec-inline-icon--${icon}`)}
    >
      {iconComponent}
      {provideScreenReaderFallback && (
        <span className={cx('usa-sr-only')}>({text})</span>
      )}
    </span>
  );
}
