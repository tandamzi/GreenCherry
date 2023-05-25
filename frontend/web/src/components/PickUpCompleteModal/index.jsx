import React from 'react';

import InfoModal from '@/components/InfoModal';

const PickUpCompleteModal = ({ isOpen, onClose, onClick, order }) => {
  return (
    <InfoModal isOpen={isOpen} onClose={onClose} onClick={onClick} okBtn>
      <p className="text-3xl font-sans mb-6 mt-4 tablet:text-2xl">
        픽업 완료 상태로 바꾸시겠습니까?
      </p>
      <p className="mb-4">주문번호: {order.orderId}</p>
      <p>주문자: {order.nickname}</p>
    </InfoModal>
  );
};

export default PickUpCompleteModal;
