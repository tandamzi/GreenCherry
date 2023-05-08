import React from 'react';

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
  return (
    <div className="flex w-full text-3xl text-center py-1 items-center">
      <p className="flex-1">{order.orderId}</p>
      <p className="flex-1">{order.nickname}</p>
      <p className="flex-1">{order.quantity}</p>
      <div className="flex-1">
        <StatusButton orderState={order.orderState} />
      </div>
    </div>
  );
};

export default OrderListItem;
