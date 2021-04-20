import React from 'react';
import ReactModal from 'react-modal';
import cx from 'classnames';
import { X, Button } from '../..';

export type ModalProps = {
  appElementId?: string;
  isOpen: boolean;
  onModalClose: () => void;
  header: JSX.Element;
  content: JSX.Element;
  // On x click is separate in case we want additional closing side effects (like clearing form data)
  // Default x click behavior is same as modal close
  onXClick?: () => void;
  showHeaderBorder?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  appElementId = 'root',
  isOpen,
  onModalClose,
  onXClick,
  header,
  showHeaderBorder = false,
  content,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onModalClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      appElement={document.getElementById(appElementId) || undefined}
      style={{
        content: {
          bottom: 'auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '100%',
          overflowY: 'scroll',
        },
        overlay: {
          zIndex: 10000000
        }
      }}
    >
      <div
        className={cx('grid-row display-flex flex-justify flex-align-center', {
          'border-bottom border-base-lighter': showHeaderBorder,
        })}
      >
        {header}
        <div className="oec-modal-close">
          <Button
            appearance="unstyled"
            text={
              <div className="display-flex flex-column flex-align-center">
                <X className="height-3 text-base-darker" />
                <p className="margin-y-05">close</p>
              </div>
            }
            onClick={onXClick || onModalClose}
          />
        </div>
      </div>
      <div className={cx({ 'margin-top-2': showHeaderBorder })}>{content}</div>
    </ReactModal>
  );
};
