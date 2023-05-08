import React from 'react';

// @ts-check

/**
 * typedef {Object} Order
 * @property {string} id
 * @property {string} nickname
 * @property {number} quantity
 * @property {string} status
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
    <div className="flex w-full text-3xl text-center py-1">
      <p className="flex-1">{order.id}</p>
      <p className="flex-1">{order.nickname}</p>
      <p className="flex-1">{order.quantity}</p>
      <p className="flex-1 w-16">{order.status}</p>
    </div>
  );
};

export default OrderListItem;
