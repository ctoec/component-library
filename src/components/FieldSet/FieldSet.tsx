import React from 'react';
import { FormStatus, FormStatusProps } from '..';
import cx from 'classnames';

export type FieldSetProps = {
  legend: string;
  id: string;
  showLegend?: boolean;
  legendStyle?: 'normal' | 'title';
  status?: FormStatusProps;
  optional?: boolean;
  className?: string;
  hint?: string;
  childrenGroupClassName?: string;
  disabled?: boolean;
};

/**
 * Accessibility-following wrapping component for a native fieldset element
 */
export const FieldSet: React.FC<FieldSetProps> = ({
  legend,
  id,
  showLegend = true,
  legendStyle = 'normal',
  status,
  optional,
  className,
  children,
  hint,
  childrenGroupClassName,
  disabled,
}) => {
  const legendId = `fieldset-legend-${id}`;
  const hintId = `${id}-hint`;
  let ariaLabeler = legendId;
  if (hint) {
    ariaLabeler = `${ariaLabeler} ${hintId}`;
  }
  if (status) {
    ariaLabeler = `${ariaLabeler} ${status.id}`;
  }

  return (
    <fieldset
      className={cx(
        'usa-fieldset',
        {
          [`usa-fieldset--${status && status.type}`]: status,
        },
        className
      )}
      id={id}
      aria-labelledby={ariaLabeler}
      aria-invalid={status && status.type === 'error'}
      disabled={disabled}
    >
      <legend id={legendId}>
        {/* Needs to be wrapped in another el because spacing works differently for legends */}
        <span
          className={cx({
            'usa-label': showLegend,
            'usa-sr-only': !showLegend,
            'text-bold font-sans-lg': showLegend && legendStyle === 'title',
          })}
        >
          {legend}
          {optional && <span className="usa-hint">&nbsp;(optional)</span>}
        </span>
      </legend>
      {hint && (
        <span className="usa-hint text-italic" id={hintId}>
          {hint}
        </span>
      )}
      {status && <FormStatus {...status} />}
      <div className={childrenGroupClassName}>{children}</div>
    </fieldset>
  );
};
