import React from 'react';
import ReactModal from 'react-modal';
import cx from 'classnames';
import { X, Button } from '../..';

export type ModalProps = {
  appElementId?: string;
  isOpen: boolean;
  onXClick: () => void;
  header: JSX.Element;
  showHeaderBorder?: boolean;
  content: JSX.Element;
};

export const Modal: React.FC<ModalProps> = ({
  appElementId = 'root',
  isOpen,
  onXClick,
  header,
  showHeaderBorder = false,
  content,
}) => (
  <ReactModal
    isOpen={isOpen}
    // onRequestClose={onXClick}
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
          onClick={onXClick}
        />
      </div>
    </div>
    <div className={cx({ 'margin-top-2': showHeaderBorder })}>{content}</div>
  </ReactModal>
);
