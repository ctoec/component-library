import React from 'react';
import { Loading } from 'carbon-components-react';

export type LoadingWrapperPrps = {
  loading: boolean;
  text?: string | JSX.Element;
};

export const LoadingWrapper: React.FC<LoadingWrapperPrps> = ({
  children,
  text,
  loading,
}) => {
  if (loading) {
    return (
      <div className="oec-loading-wrapper">
        <Loading active={true} withOverlay={false} />
        {text && <div>{text}</div>}
      </div>
    );
  }

  return <>{children}</>;
};
