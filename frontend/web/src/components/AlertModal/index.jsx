import React from 'react';

import Modal from '@/components/Modal';

const AlertModal = ({ isOpen, onClose, content, onClick, okBtn }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-96 h-72 px-40 py-11">
      <div className="text-center text-2xl">{content}</div>
      {okBtn && (
        <div className="flex justify-center">
          <button
            type="button"
            className="w-1/3 h-16 text-2xl text-white bg-primary rounded-3xl"
            onClick={onClick}
          >
            확인
          </button>
        </div>
      )}
    </Modal>
  );
};
