import React from 'react';

import Modal from '@/components/Modal';
import useMember from '@/hooks/memberHook';

const CherryBoxModal = () => {
  const {
    cherryBoxRegisterModalOpen,
    openCherryBoxRegisterAction,
    closeCherryBoxRegisteAction,
  } = useMember();

  const handleRegisterBtnClick = () => {
    // TODO: redux의 store에 open:true로 변경
  };
  return (
    <Modal
      isOpen={cherryBoxRegisterModalOpen}
      onClose={closeCherryBoxRegisteAction}
      className="w-3/5 h-3/5 px-16 py-5 flex flex-col items-center"
    >
      <h1 className="text-center text-3xl">오늘의 체리박스 등록</h1>
      <div>
        <div className="flex">
          <h2>정가 총 가격</h2>
          <input type="number" />
        </div>
        <div className="flex">
          <h2>체리박스 수량</h2>
          <input type="number" />
        </div>
        <div className="flex">
          <h2>할인율</h2>
          <input type="number" />
        </div>
        <div className="flex">
          <h2>체리박스 개당가격</h2>
          <input type="number" />
        </div>
      </div>
      <button
        type="button"
        className="text-3xl text-bgcolor bg-secondary w-60 h-12 rounded-2xl absolute bottom-5"
        onClick={handleRegisterBtnClick}
      >
        네
      </button>
    </Modal>
  );
};

export default CherryBoxModal;
