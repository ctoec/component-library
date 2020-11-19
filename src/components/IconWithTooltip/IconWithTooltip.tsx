import React from 'react';
import { Tooltip } from '@material-ui/core';
import cx from 'classnames';

type IconWithTooltipProps = {
  tooltipText: string;
  icon: JSX.Element;
  className?: string;
}

export const IconWithTooltip = ({
  tooltipText,
  icon,
  className,
}: IconWithTooltipProps) => {

  return(
    <span className={cx('oec-icon-with-tooltip', className)}>
      <Tooltip title={tooltipText}>
        {icon}
      </Tooltip>
    </span>
  );
}