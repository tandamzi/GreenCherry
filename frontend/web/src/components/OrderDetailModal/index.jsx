import React from 'react';

import InfoModal from '@/components/InfoModal';

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  return (
    <InfoModal isOpen={isOpen} onClose={onClose}>
      <p className="text-3xl font-sans mb-6 mt-4">주문상세</p>
      <div className="flex text-left text-2xl items-center">
        <p className="flex-1 px-4 py-1 fl">주문자</p>
        <p className="flex-1 px-4 py-1 font-sans">{order.nickname}</p>
      </div>
      <div className="flex text-left text-2xl">
        <p className="flex-1 px-4 py-1 fl">수량</p>
        <p className="flex-1 px-4 py-1 font-sans">{order.quantity}</p>
      </div>
      <div className="flex text-left text-2xl">
        <p className="px-4 py-1 fl">주문상태</p>
        <p className="px-4 py-1 font-sans">
          {order.orderState === 'PICKUP_COMPLETE' ? ' 픽업완료' : ' 픽업대기'}
        </p>
      </div>
      {/*       <p>주문자: {order.nickname}</p>
      <p>수량: {order.quantity}</p>
      <p>
        주문상태:
        {order.orderState === 'PICKUP_COMPLETE' ? ' 픽업완료' : ' 픽업대기'}
      </p> */}
    </InfoModal>
  );
};

export default OrderDetailModal;
