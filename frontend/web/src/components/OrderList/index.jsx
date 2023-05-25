import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRouter } from 'next/router';

import LoadingSpinner from '@/components/LoadingSpinner';
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

const OrderList = ({
  orderList,
  updateOrderState,
  loadMoreOrders,
  pageEnd,
}) => {
  /**
   * @type {Order[]}
   */
  const router = useRouter();

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      loadMoreOrders(); // Load more orders when the ref comes into view
    }
  }, [inView, loadMoreOrders]);

  return (
    <div className="flex flex-col py-5 text-primaryfont font-thin h-5/6 max-w-4xl max-h-fit">
      <div className="flex text-2xl text-center mb-5">
        <p className="flex-1">주문내역</p>
        <p className="flex-1">닉네임</p>
        <p className="flex-1">수량</p>
        <p className="flex-1">상태</p>
      </div>
      {router.pathname === '/business' && orderList.length === 0 && (
        <OrderZero />
      )}
      <div className="overflow-y-scroll">
        {orderList.map(order => (
          <OrderListItem
            key={order.orderId}
            order={order}
            updateOrderState={updateOrderState}
          />
        ))}
        {!pageEnd && (
          <div ref={ref} className="w-9 mx-auto">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
