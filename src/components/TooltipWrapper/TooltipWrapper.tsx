import React from 'react';
import { TooltipIcon } from 'carbon-components-react';

type TooltipWrapperProps = {
  tooltipText: string;
  className?: string;
};

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  tooltipText,
  className,
}) => {
  return (
    <TooltipIcon tooltipText={tooltipText}>
      <div className={className}>{children}</div>
    </TooltipIcon>
  );
};
