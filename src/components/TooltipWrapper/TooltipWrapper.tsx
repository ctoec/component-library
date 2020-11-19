import React from 'react';
import { Tooltip } from '@material-ui/core';

type TooltipWrapperProps = {
  tooltipText: string;
  className?: string;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  tooltipText,
  className,
}) => {
  return(
    <div className='oec-tooltip-wrapper'>
      <Tooltip title={tooltipText}>
        <div className={className}>
          {children}
        </div>
      </Tooltip>
    </div>
  );
}
