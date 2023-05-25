/* eslint-disable no-promise-executor-return */
import React, { useState, useEffect } from 'react';

import CarbonContainer from '@/components/CarbonContainer';
import LongBoxContainer from '@/components/LongBoxContainer';
import OrderList from '@/components/OrderList';
import OrderZero from '@/components/OrderZero';
import useMember from '@/hooks/memberHook';
import useStore from '@/hooks/storeHook';
import { getTodayOrderList, getPagableOrderList } from '@/utils/api/order';
import getCurrentDate from '@/utils/getCurrentDate';

const AfterOpen = ({ renderKey }) => {
  const { memberAttributes } = useMember();
  const { setCherryPoint } = useStore();
  const [quantity, setQuantity] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageEnd, setpageEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPagableOrderList(memberAttributes.storeId, getCurrentDate(), page).then(
      res => {
        setOrderList(res.orderList);
      },
    );
    getTodayOrderList(memberAttributes.storeId).then(res => {
      setQuantity(res.cherryBoxQuantity);
      setCherryPoint(res.cherryPoint);
    });
    setPage(0);
    setpageEnd(false);
    setIsLoading(false);
  }, [renderKey]);

  const loadMoreOrders = async () => {
    if (pageEnd || isLoading) return;
    setIsLoading(true);
    const nextPage = page + 1;
    getPagableOrderList(memberAttributes.storeId, getCurrentDate(), nextPage)
      .then(res => new Promise(resolve => setTimeout(() => resolve(res), 1000)))
      .then(res => {
        if (res.orderList.length === 0) {
          setpageEnd(true);
          return;
        }
        setOrderList(prevList => [...prevList, ...res.orderList]);
        setPage(prevPage => prevPage + 1);
      })
      .finally(() => setIsLoading(false)); // Stop loading
  };

  const updateOrderState = (orderId, newState) => {
    setOrderList(prevList =>
      prevList.map(order =>
        order.orderId === orderId ? { ...order, orderState: newState } : order,
      ),
    );
  };
  return (
    <div className="w-full max-w-4xl h-full relative">
      <LongBoxContainer className="fixed max-w-4xl">
        <p>{quantity}개 남았습니다</p>
      </LongBoxContainer>
      <OrderList
        orderList={orderList}
        updateOrderState={updateOrderState}
        loadMoreOrders={loadMoreOrders}
        pageEnd={pageEnd}
      />
      <CarbonContainer />
    </div>
  );
};

export default AfterOpen;
