import React from 'react';
import { CircularProgress } from '@material-ui/core';
import cx from 'classnames';

export type LoadingWrapperPrps = {
  loading: boolean;
  text?: string | JSX.Element;
};

export const LoadingWrapper: React.FC<LoadingWrapperPrps> = ({
  children,
  text,
  loading,
}) => {
  return (
    <div className="oec-loading-wrapper">
      <div aria-hidden={loading} className={cx({ 'opacity-0': loading })}>
        {children}
      </div>
      <div
        className={cx('oec-loading-wrapper__indicator', 'bg-white')}
        hidden={!loading}
      >
        <CircularProgress className="indeterminate" />
        {text && <div>{text}</div>}
      </div>
    </div>
  );
};
