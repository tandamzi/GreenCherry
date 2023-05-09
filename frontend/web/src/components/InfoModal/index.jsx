import React from 'react';

import Modal from '@/components/Modal';

const InfoModal = ({ isOpen, onClose, children, onClick, okBtn }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-2/5 h-2/5 px-16 py-5 flex flex-col items-center tablet:w-4/5"
    >
      <div className="text-center text-2xl">{children}</div>
      {okBtn && (
        <button
          type="button"
          className="text-3xl text-bgcolor bg-secondary w-60 h-12 rounded-2xl absolute bottom-5"
          onClick={onClick}
        >
          네
        </button>
      )}
    </Modal>
  );
};

export default InfoModal;
