import React from 'react';
import { CircularProgress } from '@material-ui/core';

export type LoadingWrapperPrps = {
  isLoading: boolean;
  text?: string | JSX.Element;
};

export const LoadingWrapper: React.FC<LoadingWrapperPrps> = ({
  children,
  text,
  isLoading,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }
  return (
    <div className="oec-loading-wrapper">
      <CircularProgress className="indeterminate" />
      {text && <div>{text}</div>}
    </div>
  );
};
