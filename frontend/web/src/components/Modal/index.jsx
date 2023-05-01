import React, { forwardRef } from 'react';
import { IoClose } from 'react-icons/io5';

import classnames from 'classnames';

import style from './index.module.scss';

const Modal = ({ className, children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div id="greencherry-modal" className={classnames(style['modal-overlay'])}>
      <div className={classnames(style['modal-content'], className)}>
        <IoClose size={48} className={style['close-btn']} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
