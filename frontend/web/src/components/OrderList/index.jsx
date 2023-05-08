import React from 'react';

import OrderListItem from '@/components/OrderListItem';

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

const OrderList = () => {
  /**
   * @type {Order[]}
   */
  const orderList = [
    {
      orderId: '1',
      nickname: '김철수',
      quantity: 1,
      orderState: '결제완료',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
    {
      orderId: '2',
      nickname: '김철수',
      quantity: 1,
      orderState: 'PICKUP_COMPLETE',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
  ];
  return (
    <div className="flex flex-col py-10 text-primaryfont font-thin">
      <div className="flex text-2xl text-center mb-5">
        <p className="flex-1">주문내역</p>
        <p className="flex-1">닉네임</p>
        <p className="flex-1">수량</p>
        <p className="flex-1">상태</p>
      </div>
      {orderList.map(order => (
        <OrderListItem key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
