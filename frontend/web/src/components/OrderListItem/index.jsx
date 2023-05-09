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
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handlePickUpCompleteClick = () => {
    handleClose();
  };
  return (
    <div className="flex w-full text-3xl text-center py-3 items-center max-w-4xl">
      <PickUpCompleteModal
        isOpen={isOpen}
        onClose={handleClose}
        onClick={handleOpen}
        order={order}
      />
      <p className="flex-1">{order.orderId}</p>
      <p className="flex-1">{order.nickname}</p>
      <p className="flex-1">{order.quantity}</p>
      <div className="flex-1">
        <StatusButton orderState={order.orderState} onClick={handleOpen} />
      </div>
    </div>
  );
};

export default OrderListItem;
