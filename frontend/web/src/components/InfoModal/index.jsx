import React from 'react';

import Modal from '@/components/Modal';

const InfoModal = ({ isOpen, onClose, children, onClick, okBtn }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-3xl px-16 py-14 flex flex-col items-center tablet:w-4/5 justify-center tablet:px-10"
    >
      <div className="text-center text-2xl mb-11">{children}</div>
      {okBtn && (
        <button
          type="button"
          className="text-3xl text-bgcolor bg-secondary w-60 h-12 rounded-2xl font-bold"
          onClick={onClick}
        >
          네
        </button>
      )}
    </Modal>
  );
};

export default InfoModal;
