import React from 'react';

import InfoModal from '@/components/InfoModal';

const OrderDetailModal = ({ isOpen, onClose, onClick, order }) => {
  return (
    <InfoModal isOpen={isOpen} onClose={onClose}>
      <p>주문상세</p>
      <p>주문자: {order.nickname}</p>
      <p>수량: {order.quantity}</p>
      <p>
        주문상태:
        {order.orderState === 'PICKUP_COMPLETE' ? '픽업완료' : '픽업대기'}
      </p>
    </InfoModal>
  );
};

export default OrderDetailModal;
