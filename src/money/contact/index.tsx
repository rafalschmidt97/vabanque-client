import React from 'react';
import classNames from 'classnames';

type Props = {
  isActive: boolean;
  text: string;
};

const Modal = (props: Props) => {
  return (
    <>
      <div
        className={classNames('modal', {
          'is-active': props.isActive,
        })}
      >
        <div className="modal-background" />
        <div className="modal-content">{props.text}</div>
        <div
          className="modal-close is-large"
          aria-label="close"
          onClick={() => {
            props.isActive = false;
          }}
        />
      </div>
    </>
  );
};

export default Modal;
