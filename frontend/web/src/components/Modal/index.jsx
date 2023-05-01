import React, { forwardRef } from 'react';

import classnames from 'classnames';

import style from './index.module.scss';

const Modal = ({ className, children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      id="greencherry-modal"
      className={classnames(style['modal-overlay'], className)}
      onClick={onClose}
    >
      <div className={classnames(style['modal-content'])}>
        <button type="button" className={style['close-btn']} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
