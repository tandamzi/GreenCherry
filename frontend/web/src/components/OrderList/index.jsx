import React from 'react';

import OrderListItem from '@/components/OrderListItem';
import OrderZero from '@/components/OrderZero';

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

const OrderList = ({ orderList }) => {
  /**
   * @type {Order[]}
   */
  /*
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
    {
      orderId: '3',
      nickname: '김철수',
      quantity: 1,
      orderState: 'PICKUP_COMPLETE',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
    {
      orderId: '4',
      nickname: '김철수',
      quantity: 1,
      orderState: 'PICKUP_COMPLETE',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
    {
      orderId: '5',
      nickname: '김철수',
      quantity: 1,
      orderState: 'PICKUP_COMPLETE',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
    {
      orderId: '6',
      nickname: '김철수',
      quantity: 1,
      orderState: 'PICKUP_COMPLETE',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
    {
      orderId: '7',
      nickname: '김철수',
      quantity: 1,
      orderState: 'PICKUP_COMPLETE',
      totalSalesAmount: '10000',
      orderDate: '2021-01-01',
    },
  ];
   */
  return (
    <div className="flex flex-col py-5 text-primaryfont font-thin h-5/6 max-w-4xl max-h-fit">
      <div className="flex text-2xl text-center mb-5">
        <p className="flex-1">주문내역</p>
        <p className="flex-1">닉네임</p>
        <p className="flex-1">수량</p>
        <p className="flex-1">상태</p>
      </div>

      {orderList.length === 0 && <OrderZero />}
      <div className="overflow-y-scroll">
        {orderList.map(order => (
          <OrderListItem key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
