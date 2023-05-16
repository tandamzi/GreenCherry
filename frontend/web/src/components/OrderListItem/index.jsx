import React, { useState } from 'react';

import OrderDetailModal from '@/components/OrderDetailModal';
import PickUpCompleteModal from '@/components/PickUpCompleteModal';
import StatusButton from '@/components/StatusButton';
import { putOrderComplete } from '@/utils/api/order';

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
const OrderListItem = ({ order, updateOrderState }) => {
  const [isPickUpCompleteModalOpen, setIsPickUpCompleteModalOpen] =
    useState(false);
  const handlePickUpCompleteModalOpen = () =>
    setIsPickUpCompleteModalOpen(true);
  const handlePickUpCompleteModalClose = () => {
    setIsPickUpCompleteModalOpen(false);
  };
  const handlePickUpCompleteClick = () => {
    putOrderComplete(order.orderId).then(res => {
      if (res.code === 0) {
        handlePickUpCompleteModalClose();
        updateOrderState(order.orderId, 'PICKUP_COMPLETE'); // Updating the orderState
      }
    });
  };

  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const handleOrderDetailModalOpen = () => setIsOrderDetailModalOpen(true);
  const handleOrderDetailModalClose = () => {
    setIsOrderDetailModalOpen(false);
  };

  return (
    <div className="flex w-full text-3xl text-center py-3 items-center max-w-4xl">
      <PickUpCompleteModal
        isOpen={isPickUpCompleteModalOpen}
        onClose={handlePickUpCompleteModalClose}
        onClick={handlePickUpCompleteClick}
        order={order}
      />

      <OrderDetailModal
        isOpen={isOrderDetailModalOpen}
        onClose={handleOrderDetailModalClose}
        order={order}
      />
      <button
        type="button"
        className="flex-1"
        onClick={handleOrderDetailModalOpen}
      >
        {order.orderId}
      </button>
      <button
        type="button"
        className="flex-1"
        onClick={handleOrderDetailModalOpen}
      >
        {order.nickname}
      </button>
      <button
        type="button"
        className="flex-1"
        onClick={handleOrderDetailModalOpen}
      >
        {order.quantity}
      </button>
      <div className="flex-1">
        <StatusButton
          orderState={order.orderState}
          onClick={
            order.orderState === 'PICKUP_COMPLETE'
              ? handleOrderDetailModalOpen
              : handlePickUpCompleteModalOpen
          }
        />
      </div>
    </div>
  );
};

export default OrderListItem;
