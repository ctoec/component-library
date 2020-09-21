import React from 'react';
import ReactModal from 'react-modal';
import cx from 'classnames';
import { Cancel } from '../../assets/images';
import { Button } from '..';

type ModalProps = {
  appElementId?: string;
  isOpen: boolean;
  toggleOpen: () => void;
  header: JSX.Element;
  showHeaderBorder?: boolean;
  content: JSX.Element;
};
export const Modal: React.FC<ModalProps> = ({
  appElementId = 'root',
  isOpen,
  toggleOpen,
  header,
  showHeaderBorder = false,
  content,
}) => {
  return (
    <ReactModal
			className="grid-container"
      isOpen={isOpen}
      onRequestClose={toggleOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      appElement={document.getElementById(appElementId) || undefined}
      style={{
        content: {
          bottom: 'auto',
          position: 'absolute',
          top: '50%',
          transform: 'translate(0%, -50%)',
        },
      }}
    >
      <div className="grid-col">
        <div
          className={cx(
            'grid-row display-flex flex-justify flex-align-center',
            { 'border-bottom border-base-lighter': showHeaderBorder }
          )}
        >
          {header}
          <Button
            className="margin-bottom-2"
            appearance="unstyled"
            text={
              <div className="display-flex flex-column flex-align-center">
                {/* <Cancel className="height-3 text-base-darker" /> */}
                <p className="margin-y-05">close</p>
              </div>
            }
            onClick={toggleOpen}
          />
        </div>
        <div className={cx('grid-row', { 'margin-top-2': showHeaderBorder })}>
          {content}
        </div>
      </div>
    </ReactModal>
  );
};
