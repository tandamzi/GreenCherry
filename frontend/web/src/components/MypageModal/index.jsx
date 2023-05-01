import React from 'react';

import classnames from 'classnames';

import style from './index.module.scss';

import Modal from '@/components/Modal';

const MypageModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={classnames('w-2/3', 'h-5/6')}
    >
      <h2>모달창 제목</h2>
      <p>모달창 내용이 들어가는 부분입니다.</p>
    </Modal>
  );
};

export default MypageModal;
