import React, { useState } from 'react';

import PickUpCompleteModal from '@/components/PickUpCompleteModal';
import StatusButton from '@/components/StatusButton';

// @ts-check

/**
 * typedef {Object} Order
 * @property {string} orderId
 * @property {string} nickname
 * @property {number} quantity
 * @property {string} orderState
 * @property {string} totalSalesAmount
 * @property {string} orderDate
 */

/**
 * @typedef {Object} OrderListItemProps
 * @property {Order} order
 */

/**
 * @param {OrderListItemProps} props
 */
const OrderListItem = ({ order }) => {
  const [isPickUpCompleteModalOpen, setIsPickUpCompleteModalOpen] =
    useState(false);
  const handlePickUpCompleteModalOpen = () =>
    setIsPickUpCompleteModalOpen(true);
  const handlePickUpCompleteModalClose = () =>
    setIsPickUpCompleteModalOpen(false);
  const handlePickUpCompleteClick = () => {
    // TODO: 픽업완료 상태로 바꾸기
  };
  return (
    <div className="flex w-full text-3xl text-center py-3 items-center max-w-4xl">
      <PickUpCompleteModal
        isOpen={isPickUpCompleteModalOpen}
        onClose={handlePickUpCompleteModalClose}
        onClick={handlePickUpCompleteModalOpen}
        order={order}
      />
      <p className="flex-1">{order.orderId}</p>
      <p className="flex-1">{order.nickname}</p>
      <p className="flex-1">{order.quantity}</p>
      <div className="flex-1">
        <StatusButton
          orderState={order.orderState}
          onClick={handlePickUpCompleteModalOpen}
        />
      </div>
    </div>
  );
};

export default OrderListItem;
